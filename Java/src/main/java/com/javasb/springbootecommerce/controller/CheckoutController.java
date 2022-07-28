package com.javasb.springbootecommerce.controller;


import com.javasb.springbootecommerce.dto.Purchase;
import com.javasb.springbootecommerce.dto.PurchaseResponse;
import com.javasb.springbootecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
  private CheckoutService  checkoutService;

  public CheckoutController(CheckoutService checkoutService) {
    this.checkoutService = checkoutService;
  }

  @PostMapping("/purchase")
  public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

    PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

    return purchaseResponse;
  }

}
