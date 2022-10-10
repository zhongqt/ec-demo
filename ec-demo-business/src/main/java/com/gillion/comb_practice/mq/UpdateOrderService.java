package com.gillion.comb_practice.mq;

import com.gillion.comb_practice.entity.BackMessage;
import com.gillion.model.entity.PreOrder;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UpdateOrderService {
    void handlerPreOrder(List<PreOrder> orders);
    void updatePreOrder(BackMessage backMessage);
}
