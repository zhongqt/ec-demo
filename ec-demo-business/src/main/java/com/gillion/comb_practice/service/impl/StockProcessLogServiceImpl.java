package com.gillion.comb_practice.service.impl;

import com.gillion.comb_practice.service.StockProcessLogService;
import com.gillion.ds.entity.base.RowStatusConstants;
import com.gillion.model.entity.StockProcessLog;
import com.gillion.model.querymodels.QStockProcessLog;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class StockProcessLogServiceImpl implements StockProcessLogService {
    @Override
    public boolean updateProcessLog(Long preOrderId,Integer status) {

        StockProcessLog stockLog=new StockProcessLog();
        int count= QStockProcessLog.stockProcessLog.selectCount().where(QStockProcessLog.preOrderId.eq$(preOrderId)).execute();
        if(count>0){
            stockLog.setStatus(status);
            stockLog.setStatus(RowStatusConstants.ROW_STATUS_MODIFIED);
            return  QStockProcessLog.stockProcessLog.save(stockLog)>1;
        }else{
            stockLog.setPreOrderId(preOrderId);
            stockLog.setStatus(status);
            stockLog.setRowStatus(RowStatusConstants.ROW_STATUS_ADDED);
            return QStockProcessLog.stockProcessLog.save(stockLog)>1;
        }
    }
}
