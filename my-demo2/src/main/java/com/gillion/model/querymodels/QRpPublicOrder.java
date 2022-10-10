package com.gillion.model.querymodels;

import com.gillion.ds.client.api.queryobject.expressions.BaseModelExpression;
import com.gillion.ds.client.api.queryobject.expressions.FieldExpression;
import com.gillion.ds.client.api.queryobject.expressions.OperatorExpression;
import com.gillion.model.entity.RpPublicOrder;

import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
* @author daoServiceGenerator
* @version 1.0.0.0
*/
@SuppressWarnings({"AlibabaConstantFieldShouldBeUpperCase", "unused", "AlibabaClassNamingShouldBeCamel"})
public class QRpPublicOrder extends BaseModelExpression<RpPublicOrder, String> {

    public static final BaseModelExpression<RpPublicOrder, String> rpPublicOrder = new QRpPublicOrder();
    public static final FieldExpression<String> publicOrderId = rpPublicOrder.fieldOf("publicOrderId", String.class);
    public static final FieldExpression<String> refSystemType = rpPublicOrder.fieldOf("refSystemType", String.class);
    public static final FieldExpression<String> refBusinessId = rpPublicOrder.fieldOf("refBusinessId", String.class);
    public static final FieldExpression<BigDecimal> publicCompletedSign = rpPublicOrder.fieldOf("publicCompletedSign", BigDecimal.class);
    public static final FieldExpression<String> publicVesselName = rpPublicOrder.fieldOf("publicVesselName", String.class);
    public static final FieldExpression<String> publicVoyage = rpPublicOrder.fieldOf("publicVoyage", String.class);
    public static final FieldExpression<Date> publicBusinessDate = rpPublicOrder.fieldOf("publicBusinessDate", Date.class);
    public static final FieldExpression<String> publicCustomNo = rpPublicOrder.fieldOf("publicCustomNo", String.class);
    public static final FieldExpression<String> publicBlNo = rpPublicOrder.fieldOf("publicBlNo", String.class);
    public static final FieldExpression<String> publicSalesName = rpPublicOrder.fieldOf("publicSalesName", String.class);
    public static final FieldExpression<String> publicBkNo = rpPublicOrder.fieldOf("publicBkNo", String.class);
    public static final FieldExpression<String> publicConsignorName = rpPublicOrder.fieldOf("publicConsignorName", String.class);
    public static final FieldExpression<String> publicContactName = rpPublicOrder.fieldOf("publicContactName", String.class);
    public static final FieldExpression<String> publicPolName = rpPublicOrder.fieldOf("publicPolName", String.class);
    public static final FieldExpression<String> publicPodName = rpPublicOrder.fieldOf("publicPodName", String.class);
    public static final FieldExpression<String> publicDestinalPlace = rpPublicOrder.fieldOf("publicDestinalPlace", String.class);
    public static final FieldExpression<String> azConsigneeName = rpPublicOrder.fieldOf("azConsigneeName", String.class);
    public static final FieldExpression<String> azShipperName = rpPublicOrder.fieldOf("azShipperName", String.class);
    public static final FieldExpression<String> azNotifyName = rpPublicOrder.fieldOf("azNotifyName", String.class);
    public static final FieldExpression<String> azAgentName = rpPublicOrder.fieldOf("azAgentName", String.class);
    public static final FieldExpression<Date> azEtd = rpPublicOrder.fieldOf("azEtd", Date.class);
    public static final FieldExpression<Date> azEta = rpPublicOrder.fieldOf("azEta", Date.class);
    public static final FieldExpression<String> azCarrierName = rpPublicOrder.fieldOf("azCarrierName", String.class);
    public static final FieldExpression<String> azOrderHbl = rpPublicOrder.fieldOf("azOrderHbl", String.class);
    public static final FieldExpression<String> azFlightNo = rpPublicOrder.fieldOf("azFlightNo", String.class);
    public static final FieldExpression<String> azIoInd = rpPublicOrder.fieldOf("azIoInd", String.class);
    public static final FieldExpression<String> azServiceName = rpPublicOrder.fieldOf("azServiceName", String.class);
    public static final FieldExpression<String> azOperatorName = rpPublicOrder.fieldOf("azOperatorName", String.class);
    public static final FieldExpression<String> azSalesOfficeName = rpPublicOrder.fieldOf("azSalesOfficeName", String.class);
    public static final FieldExpression<String> azSoourceMode = rpPublicOrder.fieldOf("azSoourceMode", String.class);
    public static final FieldExpression<String> azSupplierName = rpPublicOrder.fieldOf("azSupplierName", String.class);
    public static final FieldExpression<String> ooShipperName = rpPublicOrder.fieldOf("ooShipperName", String.class);
    public static final FieldExpression<String> ooConsigneeName = rpPublicOrder.fieldOf("ooConsigneeName", String.class);
    public static final FieldExpression<String> ooAgentName = rpPublicOrder.fieldOf("ooAgentName", String.class);
    public static final FieldExpression<String> ooLinedefId = rpPublicOrder.fieldOf("ooLinedefId", String.class);
    public static final FieldExpression<String> ooSourceMode = rpPublicOrder.fieldOf("ooSourceMode", String.class);
    public static final FieldExpression<Date> ooEtd = rpPublicOrder.fieldOf("ooEtd", Date.class);
    public static final FieldExpression<Date> ooEta = rpPublicOrder.fieldOf("ooEta", Date.class);
    public static final FieldExpression<String> ooHblNo = rpPublicOrder.fieldOf("ooHblNo", String.class);
    public static final FieldExpression<String> ooPrecarrierName = rpPublicOrder.fieldOf("ooPrecarrierName", String.class);
    public static final FieldExpression<String> ooServiceName = rpPublicOrder.fieldOf("ooServiceName", String.class);
    public static final FieldExpression<String> ooOperatorName = rpPublicOrder.fieldOf("ooOperatorName", String.class);
    public static final FieldExpression<String> ooSalesOfficeName = rpPublicOrder.fieldOf("ooSalesOfficeName", String.class);
    public static final FieldExpression<String> ooSourceModeName = rpPublicOrder.fieldOf("ooSourceModeName", String.class);
    public static final FieldExpression<String> ooCustOrderId = rpPublicOrder.fieldOf("ooCustOrderId", String.class);
    public static final FieldExpression<String> ooShipAgentName = rpPublicOrder.fieldOf("ooShipAgentName", String.class);
    public static final FieldExpression<String> cnDischargeArea = rpPublicOrder.fieldOf("cnDischargeArea", String.class);
    public static final FieldExpression<String> cnReturnPlace = rpPublicOrder.fieldOf("cnReturnPlace", String.class);
    public static final FieldExpression<String> cnDangerFlag = rpPublicOrder.fieldOf("cnDangerFlag", String.class);
    public static final FieldExpression<String> cnSocFlag = rpPublicOrder.fieldOf("cnSocFlag", String.class);
    public static final FieldExpression<String> cnIeFlag = rpPublicOrder.fieldOf("cnIeFlag", String.class);
    public static final FieldExpression<String> cnJobType = rpPublicOrder.fieldOf("cnJobType", String.class);
    public static final FieldExpression<String> cnCntNo = rpPublicOrder.fieldOf("cnCntNo", String.class);
    public static final FieldExpression<String> cnCntSizetype = rpPublicOrder.fieldOf("cnCntSizetype", String.class);
    public static final FieldExpression<String> cnCntSealNo = rpPublicOrder.fieldOf("cnCntSealNo", String.class);
    public static final FieldExpression<String> cnCntStatus = rpPublicOrder.fieldOf("cnCntStatus", String.class);
    public static final FieldExpression<String> cnHaulierCode = rpPublicOrder.fieldOf("cnHaulierCode", String.class);
    public static final FieldExpression<String> cnCntUserCode = rpPublicOrder.fieldOf("cnCntUserCode", String.class);
    public static final FieldExpression<String> cnCntOperator = rpPublicOrder.fieldOf("cnCntOperator", String.class);
    public static final FieldExpression<String> cnLoadAreaCode = rpPublicOrder.fieldOf("cnLoadAreaCode", String.class);
    public static final FieldExpression<String> cnDeliveryPlace = rpPublicOrder.fieldOf("cnDeliveryPlace", String.class);
    public static final FieldExpression<String> huImpVoyageCode = rpPublicOrder.fieldOf("huImpVoyageCode", String.class);
    public static final FieldExpression<String> huExpVoyageCode = rpPublicOrder.fieldOf("huExpVoyageCode", String.class);
    public static final FieldExpression<String> huShipCnName = rpPublicOrder.fieldOf("huShipCnName", String.class);
    public static final FieldExpression<Date> huEtaTime = rpPublicOrder.fieldOf("huEtaTime", Date.class);
    public static final FieldExpression<Date> huEtdTime = rpPublicOrder.fieldOf("huEtdTime", Date.class);
    public static final FieldExpression<Date> huBerthingTime = rpPublicOrder.fieldOf("huBerthingTime", Date.class);
    public static final FieldExpression<Date> huSailingTime = rpPublicOrder.fieldOf("huSailingTime", Date.class);
    public static final FieldExpression<String> seLoadAreaCode = rpPublicOrder.fieldOf("seLoadAreaCode", String.class);
    public static final FieldExpression<String> seBookingParty = rpPublicOrder.fieldOf("seBookingParty", String.class);
    public static final FieldExpression<String> seCarrierName = rpPublicOrder.fieldOf("seCarrierName", String.class);
    public static final FieldExpression<String> sePayTypeCode = rpPublicOrder.fieldOf("sePayTypeCode", String.class);
    public static final FieldExpression<String> seConsignee = rpPublicOrder.fieldOf("seConsignee", String.class);
    public static final FieldExpression<String> seSndVoyageCode = rpPublicOrder.fieldOf("seSndVoyageCode", String.class);
    public static final FieldExpression<String> seSndEnVessel = rpPublicOrder.fieldOf("seSndEnVessel", String.class);
    public static final FieldExpression<String> seMovementDisch = rpPublicOrder.fieldOf("seMovementDisch", String.class);
    public static final FieldExpression<String> seMovementLoading = rpPublicOrder.fieldOf("seMovementLoading", String.class);
    public static final FieldExpression<Date> seEtdTime = rpPublicOrder.fieldOf("seEtdTime", Date.class);
    public static final FieldExpression<Date> seSailingTime = rpPublicOrder.fieldOf("seSailingTime", Date.class);
    public static final FieldExpression<String> siPayTypeCode = rpPublicOrder.fieldOf("siPayTypeCode", String.class);
    public static final FieldExpression<String> siPreBlNo = rpPublicOrder.fieldOf("siPreBlNo", String.class);
    public static final FieldExpression<String> siConsignee = rpPublicOrder.fieldOf("siConsignee", String.class);
    public static final FieldExpression<String> siLoadAreaCode = rpPublicOrder.fieldOf("siLoadAreaCode", String.class);
    public static final FieldExpression<String> siMovementDischar = rpPublicOrder.fieldOf("siMovementDischar", String.class);
    public static final FieldExpression<String> siMovementLoading = rpPublicOrder.fieldOf("siMovementLoading", String.class);
    public static final FieldExpression<String> siDiscAreaCode = rpPublicOrder.fieldOf("siDiscAreaCode", String.class);
    public static final FieldExpression<Date> siBerthingTime = rpPublicOrder.fieldOf("siBerthingTime", Date.class);
    public static final FieldExpression<String> siCarrierId = rpPublicOrder.fieldOf("siCarrierId", String.class);
    public static final FieldExpression<Date> siEtaTime = rpPublicOrder.fieldOf("siEtaTime", Date.class);
    public static final FieldExpression<String> siImpVoyageCode = rpPublicOrder.fieldOf("siImpVoyageCode", String.class);
    public static final FieldExpression<String> siCarrierName = rpPublicOrder.fieldOf("siCarrierName", String.class);
    public static final FieldExpression<String> siPreShipEnName = rpPublicOrder.fieldOf("siPreShipEnName", String.class);
    public static final FieldExpression<String> siPreVoyageNo = rpPublicOrder.fieldOf("siPreVoyageNo", String.class);
    public static final FieldExpression<String> publicVesselNameCn = rpPublicOrder.fieldOf("publicVesselNameCn", String.class);
    public static final FieldExpression<String> publicConsignorFullname = rpPublicOrder.fieldOf("publicConsignorFullname", String.class);
    public static final FieldExpression<String> publicSourceAgentId = rpPublicOrder.fieldOf("publicSourceAgentId", String.class);
    public static final FieldExpression<String> publicSourceAgentName = rpPublicOrder.fieldOf("publicSourceAgentName", String.class);
    public static final FieldExpression<String> ooFwPartnerId = rpPublicOrder.fieldOf("ooFwPartnerId", String.class);
    public static final FieldExpression<String> ooFwPartnerName = rpPublicOrder.fieldOf("ooFwPartnerName", String.class);
    public static final FieldExpression<String> publicCooperatorOfficeId = rpPublicOrder.fieldOf("publicCooperatorOfficeId", String.class);
    public static final FieldExpression<String> publicCooperatorOfficeName = rpPublicOrder.fieldOf("publicCooperatorOfficeName", String.class);
    public static final FieldExpression<String> publicOverseaOfficeId = rpPublicOrder.fieldOf("publicOverseaOfficeId", String.class);
    public static final FieldExpression<String> publicOverseaOfficeName = rpPublicOrder.fieldOf("publicOverseaOfficeName", String.class);
    public static final FieldExpression<String> inputCompanyId = rpPublicOrder.fieldOf("inputCompanyId", String.class);
    public static final FieldExpression<String> isNotax = rpPublicOrder.fieldOf("isNotax", String.class);
    public static final FieldExpression<String> publicSalesId = rpPublicOrder.fieldOf("publicSalesId", String.class);
    public static final FieldExpression<String> inputOfficeId = rpPublicOrder.fieldOf("inputOfficeId", String.class);
    public static final FieldExpression<String> inputPerson = rpPublicOrder.fieldOf("inputPerson", String.class);
    public static final FieldExpression<Date> inputDate = rpPublicOrder.fieldOf("inputDate", Date.class);
    public static final FieldExpression<String> refBusinessType = rpPublicOrder.fieldOf("refBusinessType", String.class);
    public static final FieldExpression<String> publicJobNo = rpPublicOrder.fieldOf("publicJobNo", String.class);
    public static final FieldExpression<Date> modifyLastTime = rpPublicOrder.fieldOf("modifyLastTime", Date.class);


    public QRpPublicOrder() {
        super("RpPublicOrder", RpPublicOrder.class);
    }

    QRpPublicOrder(BaseModelExpression<?, ?> parent, String alias) {
        super(parent, "RpPublicOrder", RpPublicOrder.class, alias);
    }

    @Override
    public OperatorExpression<String> primaryKey() {
        return publicOrderId;
    }
}
