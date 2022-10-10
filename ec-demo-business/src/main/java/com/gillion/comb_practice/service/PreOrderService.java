package com.gillion.comb_practice.service;

import com.gillion.model.entity.PreOrder;
import oracle.jdbc.proxy.annotation.Pre;

import java.util.List;


public interface PreOrderService {
    //修改原始订单状态
    void ModifyPreOrderStatus(PreOrder preOrder);
    //获取原始订单数据
    List<PreOrder> QueryPreorderByStatus(int sharded);
    PreOrder queryPreOrderById(Long id);
}
