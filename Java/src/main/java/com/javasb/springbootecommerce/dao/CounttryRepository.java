package com.javasb.springbootecommerce.dao;

import com.javasb.springbootecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * create interface.
 */

@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
public interface CounttryRepository extends JpaRepository<Country,Integer> {

}
