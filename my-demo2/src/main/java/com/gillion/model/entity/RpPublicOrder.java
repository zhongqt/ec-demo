package com.gillion.model.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.gillion.ec.core.annotations.Generator;
import com.gillion.ds.entity.base.BaseModel;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.lang.String;
import java.math.BigDecimal;
import java.util.Date;


/**
 * @author DaoServiceGenerator
 */
@SuppressWarnings("JpaDataSourceORMInspection")
        @EqualsAndHashCode(callSuper = true)
    @Data
    @Entity
@Table(name = "rp_public_order")
public class RpPublicOrder extends BaseModel implements Serializable{
private static final long serialVersionUID=1;

    /**主键ID*/
    @Id
    @Column(name = "public_order_id")
    @Generator("snowFlakeGenerator")
    private String publicOrderId;

    /**系统类型*/
    @Column(name = "ref_system_type")
    private String refSystemType;

    /**业务单ID*/
    @Column(name = "ref_business_id")
    private String refBusinessId;

    /**公共  完成标志*/
    @Column(name = "public_completed_sign")
    private BigDecimal publicCompletedSign;

    /**公共  船舶名称(英文)*/
    @Column(name = "public_vessel_name")
    private String publicVesselName;

    /**公共  航次/航班*/
    @Column(name = "public_voyage")
    private String publicVoyage;

    /**公共  业务日期*/
    @Column(name = "public_business_date")
    private Date publicBusinessDate;

    /**公共  海关编号*/
    @Column(name = "public_custom_no")
    private String publicCustomNo;

    /**公共  提单号*/
    @Column(name = "public_bl_no")
    private String publicBlNo;

    /**公共  业务员*/
    @Column(name = "public_sales_name")
    private String publicSalesName;

    /**公共  工作编号*/
    @Column(name = "public_bk_no")
    private String publicBkNo;

    /**公共  委托人*/
    @Column(name = "public_consignor_name")
    private String publicConsignorName;

    /**公共  委托人联系人*/
    @Column(name = "public_contact_name")
    private String publicContactName;

    /**公共  装货港*/
    @Column(name = "public_pol_name")
    private String publicPolName;

    /**公共  卸货港*/
    @Column(name = "public_pod_name")
    private String publicPodName;

    /**公共  目的地*/
    @Column(name = "public_destinal_place")
    private String publicDestinalPlace;

    /**空运  收货人*/
    @Column(name = "az_consignee_name")
    private String azConsigneeName;

    /**空运  发货人*/
    @Column(name = "az_shipper_name")
    private String azShipperName;

    /**空运  通知人*/
    @Column(name = "az_notify_name")
    private String azNotifyName;

    /**空运  海外代理*/
    @Column(name = "az_agent_name")
    private String azAgentName;

    /**空运  实际航期*/
    @Column(name = "az_etd")
    private Date azEtd;

    /**空运  抵达航期*/
    @Column(name = "az_eta")
    private Date azEta;

    /**空运  航空公司*/
    @Column(name = "az_carrier_name")
    private String azCarrierName;

    /**空运  分单号*/
    @Column(name = "az_order_hbl")
    private String azOrderHbl;

    /**空运  航班号*/
    @Column(name = "az_flight_no")
    private String azFlightNo;

    /**空运  进出口*/
    @Column(name = "az_io_ind")
    private String azIoInd;

    /**空运  客服*/
    @Column(name = "az_service_name")
    private String azServiceName;

    /**空运  操作*/
    @Column(name = "az_operator_name")
    private String azOperatorName;

    /**空运  揽货部门*/
    @Column(name = "az_sales_office_name")
    private String azSalesOfficeName;

    /**空运  揽货方式*/
    @Column(name = "az_soource_mode")
    private String azSoourceMode;

    /**空运  订舱单位*/
    @Column(name = "az_supplier_name")
    private String azSupplierName;

    /**海运  发货人*/
    @Column(name = "oo_shipper_name")
    private String ooShipperName;

    /**海运  收货人*/
    @Column(name = "oo_consignee_name")
    private String ooConsigneeName;

    /**海运  海外代理*/
    @Column(name = "oo_agent_name")
    private String ooAgentName;

    /**海运  航线*/
    @Column(name = "oo_linedef_id")
    private String ooLinedefId;

    /**海运  揽货方式*/
    @Column(name = "oo_source_mode")
    private String ooSourceMode;

    /**海运  开航日*/
    @Column(name = "oo_etd")
    private Date ooEtd;

    /**海运  到港日*/
    @Column(name = "oo_eta")
    private Date ooEta;

    /**海运  货代提单号*/
    @Column(name = "oo_hbl_no")
    private String ooHblNo;

    /**海运  船公司*/
    @Column(name = "oo_precarrier_name")
    private String ooPrecarrierName;

    /**海运  客服*/
    @Column(name = "oo_service_name")
    private String ooServiceName;

    /**海运  操作*/
    @Column(name = "oo_operator_name")
    private String ooOperatorName;

    /**海运  揽货部门*/
    @Column(name = "oo_sales_office_name")
    private String ooSalesOfficeName;

    /**海运  揽货方式*/
    @Column(name = "oo_source_mode_name")
    private String ooSourceModeName;

    /**海运  客户委托号*/
    @Column(name = "oo_cust_order_id")
    private String ooCustOrderId;

    /**海运  订舱代理*/
    @Column(name = "oo_ship_agent_name")
    private String ooShipAgentName;

    /**箱管  卸货作业区*/
    @Column(name = "cn_discharge_area")
    private String cnDischargeArea;

    /**箱管  还箱点*/
    @Column(name = "cn_return_place")
    private String cnReturnPlace;

    /**箱管  危险品标识*/
    @Column(name = "cn_danger_flag")
    private String cnDangerFlag;

    /**箱管  SOC标识*/
    @Column(name = "cn_soc_flag")
    private String cnSocFlag;

    /**箱管  进出口标志*/
    @Column(name = "cn_ie_flag")
    private String cnIeFlag;

    /**箱管  作业类型*/
    @Column(name = "cn_job_type")
    private String cnJobType;

    /**箱管  箱号*/
    @Column(name = "cn_cnt_no")
    private String cnCntNo;

    /**箱管  尺寸*/
    @Column(name = "cn_cnt_sizetype")
    private String cnCntSizetype;

    /**箱管  铅封号*/
    @Column(name = "cn_cnt_seal_no")
    private String cnCntSealNo;

    /**箱管  箱状态*/
    @Column(name = "cn_cnt_status")
    private String cnCntStatus;

    /**箱管  运箱人*/
    @Column(name = "cn_haulier_code")
    private String cnHaulierCode;

    /**箱管  用箱人*/
    @Column(name = "cn_cnt_user_code")
    private String cnCntUserCode;

    /**箱管  箱经营人*/
    @Column(name = "cn_cnt_operator")
    private String cnCntOperator;

    /**箱管  装货作业区*/
    @Column(name = "cn_load_area_code")
    private String cnLoadAreaCode;

    /**箱管  提箱点*/
    @Column(name = "cn_delivery_place")
    private String cnDeliveryPlace;

    /**船务调度  进口航次*/
    @Column(name = "hu_imp_voyage_code")
    private String huImpVoyageCode;

    /**船务调度  出口航次*/
    @Column(name = "hu_exp_voyage_code")
    private String huExpVoyageCode;

    /**船务调度  中文船名*/
    @Column(name = "hu_ship_cn_name")
    private String huShipCnName;

    /**船务调度  预抵日期*/
    @Column(name = "hu_eta_time")
    private Date huEtaTime;

    /**船务调度  预离日期*/
    @Column(name = "hu_etd_time")
    private Date huEtdTime;

    /**船务调度  靠泊时间*/
    @Column(name = "hu_berthing_time")
    private Date huBerthingTime;

    /**船务调度  开航时间*/
    @Column(name = "hu_sailing_time")
    private Date huSailingTime;

    /**出口单证  装货作业区*/
    @Column(name = "se_load_area_code")
    private String seLoadAreaCode;

    /**出口单证  托运人*/
    @Column(name = "se_booking_party")
    private String seBookingParty;

    /**出口单证  舱位公司*/
    @Column(name = "se_carrier_name")
    private String seCarrierName;

    /**出口单证  运费条款*/
    @Column(name = "se_pay_type_code")
    private String sePayTypeCode;

    /**出口单证  收货人*/
    @Column(name = "se_consignee")
    private String seConsignee;

    /**出口单证  二程航次*/
    @Column(name = "se_snd_voyage_code")
    private String seSndVoyageCode;

    /**出口单证  二程船名*/
    @Column(name = "se_snd_en_vessel")
    private String seSndEnVessel;

    /**出口单证  运输方式（卸）*/
    @Column(name = "se_movement_disch")
    private String seMovementDisch;

    /**出口单证  运输方式（装）*/
    @Column(name = "se_movement_loading")
    private String seMovementLoading;

    /**出口单证  预离时间*/
    @Column(name = "se_etd_time")
    private Date seEtdTime;

    /**出口单证  开航时间*/
    @Column(name = "se_sailing_time")
    private Date seSailingTime;

    /**进口单证  付费方式*/
    @Column(name = "si_pay_type_code")
    private String siPayTypeCode;

    /**进口单证  前程提单号*/
    @Column(name = "si_pre_bl_no")
    private String siPreBlNo;

    /**进口单证  收货人*/
    @Column(name = "si_consignee")
    private String siConsignee;

    /**进口单证  装船作业区*/
    @Column(name = "si_load_area_code")
    private String siLoadAreaCode;

    /**进口单证  运输条款（卸）*/
    @Column(name = "si_movement_dischar")
    private String siMovementDischar;

    /**进口单证  运输条款（装）*/
    @Column(name = "si_movement_loading")
    private String siMovementLoading;

    /**进口单证  卸船作业区*/
    @Column(name = "si_disc_area_code")
    private String siDiscAreaCode;

    /**进口单证  靠泊时间*/
    @Column(name = "si_berthing_time")
    private Date siBerthingTime;

    /**进口单证  舱位公司*/
    @Column(name = "si_carrier_id")
    private String siCarrierId;

    /**进口单证  预抵时间*/
    @Column(name = "si_eta_time")
    private Date siEtaTime;

    /**进口单证  进口航次*/
    @Column(name = "si_imp_voyage_code")
    private String siImpVoyageCode;

    /**进口单证  舱位公司*/
    @Column(name = "si_carrier_name")
    private String siCarrierName;

    /**进口单证  前程船名*/
    @Column(name = "si_pre_ship_en_name")
    private String siPreShipEnName;

    /**进口单证  前程航次*/
    @Column(name = "si_pre_voyage_no")
    private String siPreVoyageNo;

    /**公共  船舶名称(中文)*/
    @Column(name = "public_vessel_name_cn")
    private String publicVesselNameCn;

    /**公共  委托人全称*/
    @Column(name = "public_consignor_fullname")
    private String publicConsignorFullname;

    /**公共  揽货代理id*/
    @Column(name = "public_source_agent_id")
    private String publicSourceAgentId;

    /**公共  揽货代理name*/
    @Column(name = "public_source_agent_name")
    private String publicSourceAgentName;

    /**海运  外托货代id*/
    @Column(name = "oo_fw_partner_id")
    private String ooFwPartnerId;

    /**海运  外托货代name*/
    @Column(name = "oo_fw_partner_name")
    private String ooFwPartnerName;

    /**公共  订舱部门id*/
    @Column(name = "public_cooperator_office_id")
    private String publicCooperatorOfficeId;

    /**公共  订舱部门name*/
    @Column(name = "public_cooperator_office_name")
    private String publicCooperatorOfficeName;

    /**公共  代理部门id*/
    @Column(name = "public_oversea_office_id")
    private String publicOverseaOfficeId;

    /**公共  代理部门name*/
    @Column(name = "public_oversea_office_name")
    private String publicOverseaOfficeName;

    /**结算公司*/
    @Column(name = "input_company_id")
    private String inputCompanyId;

    /**是否免税：1-免税；0-带税*/
    @Column(name = "is_notax")
    private String isNotax;

    /**公共  业务员ID*/
    @Column(name = "public_sales_id")
    private String publicSalesId;

    /**业务归属部门ID*/
    @Column(name = "input_office_id")
    private String inputOfficeId;

    /**公共 创建人*/
    @Column(name = "input_person")
    private String inputPerson;

    /**公共 创建时间*/
    @Column(name = "input_date")
    private Date inputDate;

    /**业务类型*/
    @Column(name = "ref_business_type")
    private String refBusinessType;

    /**公共 统一订单编号*/
    @Column(name = "public_job_no")
    private String publicJobNo;

    /**最后修改时间*/
    @Column(name = "modify_last_time")
    private Date modifyLastTime;

}