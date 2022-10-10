package com.gillion.comb_practice.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class BackMessage implements Serializable {
    private static final long serialVersionUID = 1;
    private  boolean success;
   private Long preOrderId;
}
