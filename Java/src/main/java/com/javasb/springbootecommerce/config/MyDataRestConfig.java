package com.javasb.springbootecommerce.config;

import com.javasb.springbootecommerce.entity.Product;
import com.javasb.springbootecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 *Disable http method .
 */

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
      CorsRegistry cors) {
    RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
    HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};
    //disable Http method Product
    config.getExposureConfiguration()
        .forDomainType(Product.class)
        .withCollectionExposure(
            (metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    // disable HTTP methods for ProductCategory: PUT, POST, DELETE and PATCH
    config.getExposureConfiguration()
        .forDomainType(ProductCategory.class)
        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
        .withCollectionExposure(
            (metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
  }
}
