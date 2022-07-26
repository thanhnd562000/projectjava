package com.javasb.springbootecommerce.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * Create table country.
 */

@Entity
@Table(name = "country")
@Getter
@Setter
public class Country {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = " id ")
  private  int id;

  @Column(name = "code")
  private  String code;

  @Column(name = "name")
  private String name;

  //Tode: set up one-to-many with states
  @OneToMany(mappedBy = "country")
  @JsonIgnore
  private List<State> states;

}
