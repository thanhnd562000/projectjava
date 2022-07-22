package com.javasb.springbootecommerce.dao;

import com.javasb.springbootecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * package-> new interface (entity,key).
*/
@CrossOrigin("http://localhost:4200")
public interface ProductRespository extends JpaRepository<Product, Long> {
  Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
}
