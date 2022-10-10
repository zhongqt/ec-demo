package com.gillion.comb_practice.service.impl;

import com.gillion.comb_practice.entity.OrderStatus;
import com.gillion.comb_practice.service.OrderListService;
import com.gillion.ds.entity.base.RowStatusConstants;
import com.gillion.model.entity.OrderList;
import com.gillion.model.entity.OrderSource;
import com.gillion.model.entity.PreOrder;
import com.gillion.model.entity.Sku;
import com.gillion.model.querymodels.QOrderList;
import com.gillion.model.querymodels.QOrderSource;
import com.gillion.model.querymodels.QSku;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OrderListServiceImpl implements OrderListService {

    @Override
    public OrderList createOrder(PreOrder preOrder) {
        log.info("根据原始订单：{}生成订单",preOrder.getPreOrderId());
        Sku SkuId = QSku.sku.selectOne().where(QSku.skuCode.eq$(preOrder.getSkuCode())).execute();
        OrderList orderList=new OrderList();
        String orderCode="";
        Long orderSourceId;
        Long skuId;
        Long customerId;
        String areaCode="";
        int quantity=preOrder.getQuantity();
        String address="";


        orderCode=preOrder.getOrderCode();
        OrderSource orderSource = QOrderSource.orderSource.selectOne()
                .where(QOrderSource.sourceCode.eq$(preOrder.getSourceCode())).execute();
        orderSourceId=orderSource.getOrderSourceId();
        skuId=SkuId.getSkuId();
        customerId=SkuId.getCustomerId();
        areaCode=preOrder.getAreaCode();
        address=preOrder.getAddress();

        orderList.setOrderCode(orderCode);
        orderList.setOrderSourceId(orderSourceId);
        orderList.setSkuId(skuId);
        orderList.setCustomerId(customerId);
        orderList.setAreaCode(areaCode);
        orderList.setAddress(address);
        orderList.setQuantity(quantity);
        orderList.setStatus(OrderStatus.UNHANDLED);
        return orderList;
    }

    @Override
    public void saveOrderList(OrderList orderList) {
        log.info("保存订单：{}",orderList.getOrderCode());
        orderList.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);
        QOrderList.orderList.save(orderList);
    }
}
