package com.gillion.comb_practice.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "ec-demo-zqt3",path = "ec-demo3")

@Component
public interface StockService {
    @GetMapping("/stockAdequate/{customerId}/{quantity}")
     boolean stockAdequate(@PathVariable("customerId") Long customerId, @PathVariable("quantity") Integer quantity);
}
