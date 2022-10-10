package com.gillion.comb_practice.mq.impl;

import com.gillion.comb_practice.api.StockService;
import com.gillion.comb_practice.entity.BackMessage;
import com.gillion.comb_practice.entity.CommandMessage;
import com.gillion.comb_practice.entity.OrderStatus;
import com.gillion.comb_practice.entity.PreOrderStatus;
import com.gillion.comb_practice.mq.ProduceOrderService;
import com.gillion.comb_practice.mq.UpdateOrderService;
import com.gillion.comb_practice.service.OrderListService;
import com.gillion.comb_practice.service.PreOrderService;
import com.gillion.comb_practice.service.StockProcessLogService;
import com.gillion.ds.entity.base.RowStatusConstants;
import com.gillion.ec.mq.annotation.ConsumerConfig;
import com.gillion.ec.mq.annotation.MQConsumer;
import com.gillion.ec.mq.config.MessageMode;
import com.gillion.model.entity.*;
import com.gillion.model.querymodels.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Slf4j
@MQConsumer
public class UpdateOrderServiceImpl implements UpdateOrderService {
    @Autowired
    ProduceOrderService service;
    @Autowired
    OrderListService orderListService;
    @Autowired
    PreOrderService preOrderService;
    @Autowired
    StockProcessLogService processLogService;
    @Autowired
    StockService stockService;
    @Override
    @Transactional(rollbackFor = Exception.class)
    @ConsumerConfig(topic = "PreOrderList",group = "CreatePreOrders",messageMode = MessageMode.Batch)
    public void handlerPreOrder(List<PreOrder> orders) {
        //将所有厂库代码集合
        List<String> stockCodeLists=orders.stream().map(PreOrder::getSkuCode).distinct().collect(Collectors.toList());
        //通过厂库代码获取厂库关系集合
        List<Sku> skuLists=QSku.sku.select().where(QSku.skuCode.in$(stockCodeLists)).execute();
        //获取所有客户id 集合
        //List<Long> customerList=skuLists.stream().map(Sku::getCustomerId).distinct().collect(Collectors.toList());
        Map<String,Long> skuCodeCustomers=skuLists.stream().collect(Collectors.toMap(Sku::getSkuCode,Sku::getCustomerId));
        orders.forEach(x->{

            log.info("处理订单:{}",x.getPreOrderId());
            //根据skucode获得订单库存判断是否充足
            String skuCode = x.getSkuCode();
           // Sku SkuId = QSku.sku.selectOne().where(QSku.skuCode.eq$(skuCode)).execute();
            Long customerId = skuCodeCustomers.get(x.getSkuCode());
            if (stockService.stockAdequate(customerId,x.getQuantity())){

                //通过队列将扣减指令发送给ec-demo3执行库存扣减操作

                CommandMessage message=new CommandMessage();
                message.setPreOrderId(x.getPreOrderId());
                message.setQuantity(x.getQuantity());
                message.setCustomerId(customerId);

                log.info("库存充足发送消息给订单处理,处理订单号:{}",message.getPreOrderId());
                service.sendCommand(message);

            }else{
                log.info("库存不充足,修改原始订单:{}",x.getPreOrderId());
                x.setStatus(PreOrderStatus.HANDLE_FAIL);
                //preOrderService.ModifyPreOrderStatus(x);

            }

        });
        //批量修改原始订单状态
        orders.forEach(x->{x.setRowStatus(RowStatusConstants.ROW_STATUS_MODIFIED);});
        QPreOrder.preOrder.save(orders);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    @ConsumerConfig(topic = "PreOrderList",group = "BackMessage",messageMode = MessageMode.Single)
    public void updatePreOrder(BackMessage backMessage) {
        PreOrder preOrder =preOrderService.queryPreOrderById(backMessage.getPreOrderId());
        if(backMessage.isSuccess()){

            //订单字段初始化并保存

            OrderList orderList = orderListService.createOrder(preOrder);


            orderListService.saveOrderList(orderList);

            log.info("扣减库存成功，开始执行修改原始订单:{}状态:{}",preOrder.getPreOrderId(),PreOrderStatus.HANDLE_FINISHED);

            preOrder.setStatus(PreOrderStatus.HANDLE_FINISHED);
            preOrderService.ModifyPreOrderStatus(preOrder);

            log.info("订单处理成功，更新处理订单：{}的处理日志",preOrder.getPreOrderId());
            processLogService.updateProcessLog(preOrder.getPreOrderId(),PreOrderStatus.HANDLE_FINISHED);

        }else{
            log.error("扣减库存失败，修改原始订单状态：{}",preOrder.getPreOrderId());
            preOrder.setStatus(PreOrderStatus.HANDLE_FAIL);
            preOrderService.ModifyPreOrderStatus(preOrder);

            log.info("订单处理失败，更新处理订单：{}的处理日志",preOrder.getPreOrderId());
            processLogService.updateProcessLog(preOrder.getPreOrderId(),PreOrderStatus.HANDLE_FAIL);
        }

    }
    //消费消息队列中的消息判断库存并修改原始表

}
