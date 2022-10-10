package com.gillion.comb_practice.service;

import com.gillion.model.entity.StockProcessLog;
import com.sun.org.apache.xpath.internal.operations.Bool;

public interface StockProcessLogService {
    boolean updateProcessLog(Long preOrderId,Integer status);
}
