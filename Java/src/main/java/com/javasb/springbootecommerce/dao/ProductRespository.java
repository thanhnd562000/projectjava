package com.javasb.springbootecommerce.dao;

import com.javasb.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * package-> new interface (entity,key).
*/

public interface ProductRespository extends JpaRepository<Product, Long> {}
