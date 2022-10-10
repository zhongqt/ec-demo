package com.gillion.comb_practice.entity;
//订单状态
public class OrderStatus {
    //未处理订单=0x1，时效已生成=0x2，履行序列已生成=0x4，地址解析已完成=0x8
    public static final  int  UNHANDLED=0x1;
    public static final int AGING_GENERATE=0x2;
    public  static  final  int SEQUENCE=0x4;
    public  static  final int ADDRESS=0x8;
}
