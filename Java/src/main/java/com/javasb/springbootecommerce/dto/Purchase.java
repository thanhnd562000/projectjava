package com.javasb.springbootecommerce.dto;


import com.javasb.springbootecommerce.entity.Address;
import com.javasb.springbootecommerce.entity.Customer;
import com.javasb.springbootecommerce.entity.Order;
import com.javasb.springbootecommerce.entity.OrderItem;
import java.util.Set;
import lombok.Data;


@Data
public class Purchase {

  private Customer customer;
  private Address shippingAddress;
  private Address billingAddress;
  private Order order;
  private Set<OrderItem> orderItems;
}
