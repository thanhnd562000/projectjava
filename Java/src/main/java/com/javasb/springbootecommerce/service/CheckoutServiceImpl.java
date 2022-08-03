package com.javasb.springbootecommerce.service;

import com.javasb.springbootecommerce.dao.CustomerRepository;
import com.javasb.springbootecommerce.dto.Purchase;
import com.javasb.springbootecommerce.dto.PurchaseResponse;
import com.javasb.springbootecommerce.entity.Customer;
import com.javasb.springbootecommerce.entity.Order;
import com.javasb.springbootecommerce.entity.OrderItem;
import java.util.Set;
import java.util.UUID;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * checkout servie.
 */
@Service
public class CheckoutServiceImpl implements CheckoutService {

  private final CustomerRepository customerRepository;

  @Autowired
  public CheckoutServiceImpl(CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  @Override
  @Transactional
  public PurchaseResponse placeOrder(Purchase purchase) {

    Order order = purchase.getOrder();

    String orderTrackingNumber = generateOrderTrackingNumber();
    order.setOrderTrackingNumber(orderTrackingNumber);

    Set<OrderItem> orderItems = purchase.getOrderItems();
    orderItems.forEach(order::add);

    order.setBillingAddress(purchase.getBillingAddress());
    order.setShippingAddress(purchase.getShippingAddress());

    Customer customer = purchase.getCustomer();

    String theEmail = customer.getEmail();

    Customer customerFromDb = customerRepository.findByEmail(theEmail);

    if (customerFromDb != null) {
      customer = customerFromDb;
    }
    customer.add(order);

    customerRepository.save(customer);

    return new PurchaseResponse(orderTrackingNumber);
  }

  private String generateOrderTrackingNumber() {
    return UUID.randomUUID().toString();
  }
}
