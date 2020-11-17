package dev.kameshs.stocktrader.client;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Symbol extends PanacheEntityBase {

  @Id
  public String symbol;
  public String name;
  public String date;
  public String type;
  public String iexId;
  public String region;
  public String currency;
  public Boolean isEnabled;
  public String figi;
  public String cik;

  @Override
  public String toString() {
    return "Symbol{" +
      "symbol='" + symbol + '\'' +
      ", name='" + name + '\'' +
      ", region='" + region + '\'' +
      '}';
  }
}
