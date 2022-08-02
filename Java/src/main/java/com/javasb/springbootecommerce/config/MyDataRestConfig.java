package com.javasb.springbootecommerce.config;

import com.javasb.springbootecommerce.entity.Country;
import com.javasb.springbootecommerce.entity.Order;
import com.javasb.springbootecommerce.entity.Product;
import com.javasb.springbootecommerce.entity.ProductCategory;
import com.javasb.springbootecommerce.entity.State;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 *Disable http method .
 */

@SuppressWarnings("checkstyle:Indentation")
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

  @Value("${allowed.origins}")
  private String[] theAllowedOrigins;
  private EntityManager entityManager;

  @Autowired
  public MyDataRestConfig(EntityManager theEntityManager) {
    entityManager = theEntityManager;
  }

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
      CorsRegistry cors) {

    RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
    HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST,HttpMethod.PATCH};
    //disable Http method Product
    httpDiasbleHttpMethod(Product.class, config, theUnsupportedActions);
    httpDiasbleHttpMethod(ProductCategory.class, config, theUnsupportedActions);
    httpDiasbleHttpMethod(Country.class, config, theUnsupportedActions);
    httpDiasbleHttpMethod(State.class, config, theUnsupportedActions);
    httpDiasbleHttpMethod(Order.class, config, theUnsupportedActions);
    exposeIds(config);
    //configure core mapping
    cors.addMapping(config.getBasePath()+"/**").allowedOrigins(theAllowedOrigins);
  }

  private ExposureConfigurer httpDiasbleHttpMethod(Class theClass, RepositoryRestConfiguration config,
      HttpMethod[] theUnsupportedActions) {
    return config.getExposureConfiguration()
        .forDomainType(theClass)
        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
        .withCollectionExposure(
            (metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
  }

  private void exposeIds(RepositoryRestConfiguration config) {

    Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();


    List <Class> entityClasses = new ArrayList<>();


    for (EntityType tempEntityType : entities) {
      entityClasses.add(tempEntityType.getJavaType());
    }

    Class [] domainTypes = entityClasses.toArray(new Class[0]);
    config.exposeIdsFor(domainTypes);
  }
}
