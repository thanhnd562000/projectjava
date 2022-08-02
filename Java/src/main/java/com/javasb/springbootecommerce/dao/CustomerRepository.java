package com.javasb.springbootecommerce.dao;

import com.javasb.springbootecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
Customer findByEmail(String theEmail);
}
