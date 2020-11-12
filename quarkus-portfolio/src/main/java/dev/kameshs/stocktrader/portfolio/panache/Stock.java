/*
       Copyright 2017-2019 IBM Corp All Rights Reserved

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

package dev.kameshs.stocktrader.portfolio.panache;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.panache.common.Parameters;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table
@NamedQuery(name = "Stock.findByOwner", query = "SELECT s FROM Stock s WHERE s.portfolio.owner = :owner")
@NamedQuery(name = "Stock.findByOwnerAndSymbol",
    query = "SELECT s FROM Stock s WHERE s.portfolio.owner = :owner AND s.symbol = :symbol")
public class Stock extends PanacheEntity {

  public String symbol;
  public int shares;
  public double commission;
  public double price;
  public double total;

  @Column(name = "dateQuoted")
  public long date;

  @ManyToOne
  @JoinColumn(name = "owner")
  public Portfolio portfolio;

  public Stock() { //default constructor
  }

  public Stock(String initialSymbol) { //primary key constructor
    this.symbol = initialSymbol;
  }

  public Stock(String initialSymbol, int initialShares,
      double initialCommission,
      double initialPrice, double initialTotal, long initialDate) {
    this.symbol = initialSymbol;
    this.shares = initialShares;
    this.commission = initialCommission;
    this.price = initialPrice;
    this.total = initialTotal;
    this.date = initialDate;
  }


  public static void createStock(Stock stock) {
    //em.persist(stock);
    persist(stock);
  }

  public static Stock readEvent(String symbol) {
    //em.find(Stock.class, symbol);
    return find("symbol", symbol).firstResult();
  }

  public static void updateStock(Stock stock) {
    stock.persistAndFlush();
  }


  public static void detachStock(Stock stock) {
    //em.detach(stock);
    stock.getEntityManager()
         .detach(stock);
  }

  public static List<Stock> findByOwner(String owner) {
    return find("#Stock.findByOwner",
        Parameters.with("owner", owner)).list();
  }


  public static List<Stock> findByOwnerAndSymbol(String owner,
      String symbol) {

    return find("#Stock.findByOwnerAndSymbol",
        Parameters.with("owner", owner)
                  .and("symbol", symbol)).list();
  }

  public String toString() {
    return "{\"symbol\": \"" + symbol + "\", \"shares\": " + shares
        + ", \"commission\": " + commission
        + ", \"price\": " + price + ", \"total\": " + total + ", \"date\": \""
        + date + "\"}";
  }
}