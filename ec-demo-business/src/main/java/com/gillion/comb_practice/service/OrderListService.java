package com.gillion.comb_practice.service;

import com.gillion.model.entity.OrderList;
import com.gillion.model.entity.PreOrder;


public interface OrderListService {
    //生成订单
    OrderList createOrder(PreOrder preOrder);
    //保存的订单
    void saveOrderList(OrderList orderList);
}
