package com.javasb.springbootecommerce.controller;


import com.javasb.springbootecommerce.dto.Purchase;
import com.javasb.springbootecommerce.dto.PurchaseResponse;
import com.javasb.springbootecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * chec.
 */
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
  private final CheckoutService checkoutService;

  public CheckoutController(CheckoutService checkoutService) {
    this.checkoutService = checkoutService;
  }

  /**
   * post.
   *
   * @param purchase a
   * @return checkout.
   */
  @PostMapping("/purchase")
  public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

    return  checkoutService.placeOrder(purchase);
  }

}
