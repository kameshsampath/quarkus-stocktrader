package io.debezium.examples.outbox.trade.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Simple mapper  to map masked symbol to some actual stock symbols
 */
@Entity
public class StockSymbol extends PanacheEntityBase {

  @Id
  public String symbolAlias;
  public String actualSymbol;
}
