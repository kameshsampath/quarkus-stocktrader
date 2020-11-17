/*
 * Copyright Debezium Authors.
 *
 * Licensed under the Apache Software License version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 */
package io.debezium.examples.outbox.trade.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import java.util.Date;
import javax.persistence.Entity;

@Entity
public class TradeOrder extends PanacheEntity {

  public long orderId;
  public String orderType;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy")
  public Date openDate;
  public String symbol;
  public int quantity;
  public double price;
  public String orderFee;
  public int accountId;

  public TradeOrder() {
  }

  public TradeOrder(long orderId, String orderType, Date openDate,
    String symbol, int quantity, Double price, String orderFee, int accountId) {
    this.orderId = orderId;
    this.orderType = orderType;
    this.openDate = openDate;
    this.symbol = symbol;
    this.quantity = quantity;
    this.price = price;
    this.orderFee = orderFee;
    this.accountId = accountId;
  }

  @Override
  public String toString() {
    return "TradeOrder{" +
      "orderId=" + orderId +
      ", orderType='" + orderType + '\'' +
      ", openDate=" + openDate +
      ", symbol='" + symbol + '\'' +
      ", quantity=" + quantity +
      ", price=" + price +
      ", orderFee='" + orderFee + '\'' +
      ", accountId=" + accountId +
      '}';
  }
}
