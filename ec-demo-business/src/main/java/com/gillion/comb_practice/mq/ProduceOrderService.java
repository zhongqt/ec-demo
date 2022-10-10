package com.gillion.comb_practice.mq;

import com.gillion.comb_practice.entity.CommandMessage;
import com.gillion.ec.mq.annotation.MQProducer;
import com.gillion.ec.mq.annotation.ProducerConfig;
import com.gillion.ec.mq.config.MessageMode;
import com.gillion.model.entity.PreOrder;
import com.gillion.model.entity.Stock;
import com.gillion.mq.Order;
import org.mvel2.sh.Command;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@MQProducer

public interface ProduceOrderService {
    //批量将原始订单写入消息队列
    @Transactional(rollbackFor = Exception.class)
    @ProducerConfig(topic = "PreOrderList", key="#message.body.skuCode",messageMode = MessageMode.Batch,tags = "PreOrderList")
    void createOrders(List<PreOrder> preOrders);
    //生成库存指令
    @Transactional(rollbackFor = Exception.class)
    @ProducerConfig(topic = "PreOrderList",key = "#message.body.preOrderId",tags = "decreaseCommand",messageMode = MessageMode.Single,transaction = true)
    void sendCommand(CommandMessage message);
}
