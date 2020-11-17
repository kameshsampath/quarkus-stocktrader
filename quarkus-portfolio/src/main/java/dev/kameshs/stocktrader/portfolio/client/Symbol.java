package dev.kameshs.stocktrader.portfolio.client;

import java.util.Date;

public class Symbol {

  public String symbol;
  public String name;
  public Date date;
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
