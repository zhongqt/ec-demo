package com.gillion.comb_practice.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class CommandMessage implements Serializable {
    private static final long serialVersionUID = 1;
   private Long customerId;
    private  Integer quantity;
    private Long preOrderId;

}
