package com.gillion.comb_practice.Job.impl;


import com.gillion.comb_practice.Job.FreightOrderJobService;
import com.gillion.comb_practice.entity.PreOrderStatus;
import com.gillion.comb_practice.mq.ProduceOrderService;
import com.gillion.comb_practice.service.PreOrderService;
import com.gillion.ds.client.api.queryobject.model.Page;
import com.gillion.ec.scheduler.worker.Scheduled;
import com.gillion.model.entity.PreOrder;
import com.gillion.model.querymodels.QPreOrder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class FreightOrderJobServiceImpl implements FreightOrderJobService {
    @Autowired
    ProduceOrderService orderService;
    @Autowired
    PreOrderService preOrderService;
  @Scheduled("PRE_ORDER_TEST")
    @Override
    public void readBbJob(int sharded) {
        //定时并发读取原始表单数据
        log.info("分片读取原始表单的数据，当前分片为：{}",sharded);

        List<PreOrder> preOrderList=preOrderService.QueryPreorderByStatus(sharded);
        log.info("将分片查询数据存入消息队列");
        orderService.createOrders(preOrderList);

    }
}
