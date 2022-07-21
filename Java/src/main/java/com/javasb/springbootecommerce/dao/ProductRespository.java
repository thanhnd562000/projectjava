package com.javasb.springbootecommerce.dao;

import com.javasb.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * package-> new interface (entity,key).
*/
@CrossOrigin("http://localhost:4200")
public interface ProductRespository extends JpaRepository<Product, Long> {}
