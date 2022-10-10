package com.gillion.comb_practice.service.impl;

import com.gillion.comb_practice.entity.PreOrderStatus;
import com.gillion.comb_practice.service.PreOrderService;
import com.gillion.ds.entity.base.RowStatusConstants;
import com.gillion.model.entity.PreOrder;
import com.gillion.model.querymodels.QPreOrder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class PreOrderServiceImpl implements PreOrderService {
    @Override
    public void ModifyPreOrderStatus(PreOrder preOrder) {
        log.info("修改订单：{}状态",preOrder.getPreOrderId());
        preOrder.setRowStatus(RowStatusConstants.ROW_STATUS_MODIFIED);
        QPreOrder.preOrder.save(preOrder);
    }

    @Override
    public List<PreOrder> QueryPreorderByStatus(int sharded) {
        log.info("通过分片参数：{}获取原始订单数据",sharded);
        return  QPreOrder.preOrder.select(QPreOrder.preOrderId,
                QPreOrder.orderCode,
                QPreOrder.sourceCode,
                QPreOrder.skuCode,
                QPreOrder.areaCode,
                QPreOrder.customerCode,
                QPreOrder.quantity,
                QPreOrder.address,
                QPreOrder.status,
                QPreOrder.shardedNumber)
                .where(QPreOrder.shardedNumber.eq$(sharded).and(QPreOrder.status.eq$(PreOrderStatus.UNHANDLED))).execute();
    }

    @Override
    public PreOrder queryPreOrderById(Long id) {
        log.info("通过id：{}获取订单",id);
        return QPreOrder.preOrder.selectOne().where(QPreOrder.preOrderId.eq$(id)).execute();
    }
}
