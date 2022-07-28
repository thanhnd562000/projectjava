package com.javasb.springbootecommerce.service;

import com.javasb.springbootecommerce.dto.Purchase;
import com.javasb.springbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {

  PurchaseResponse placeOrder(Purchase purchase);
}
