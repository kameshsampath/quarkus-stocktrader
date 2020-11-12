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

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table
public class Portfolio extends PanacheEntityBase {

  @Id
  @Column(nullable = false, length = 32)
  public String owner;
  public double total;
  @Column(length = 8)
  public String loyalty;
  public double balance;
  public double commissions;
  public int free;
  public String sentiment;
  @Transient
  public double nextCommission;
  @Transient
  public JsonObject stocks;

  @JsonbTransient
  @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
  public List<Stock> stockList = new ArrayList<Stock>();

  public Portfolio() { //default constructor
  }

  public Portfolio(String owner) {
    this.owner = owner;
  }

  public Portfolio(String owner, double total, String loyalty, double balance,
      double commissions, int free, String sentiment, double nextCommission) {
    this.owner = owner;
    this.total = total;
    this.loyalty = loyalty;
    this.balance = balance;
    this.commissions = commissions;
    this.free = free;
    this.sentiment = sentiment;
    this.nextCommission = nextCommission;
  }

  public void addStock(Stock newStock) {
    if (newStock != null) {
      String symbol = newStock.symbol;
      if (symbol != null) {
        JsonObjectBuilder stocksBuilder = Json.createObjectBuilder();

        if (stocks
            != null) { //JsonObject is immutable, so copy current "stocks" into new builder
          Iterator<String> iter = stocks.keySet()
                                        .iterator();
          while (iter.hasNext()) {
            String key = iter.next();
            JsonObject obj = stocks.getJsonObject(key);
            stocksBuilder.add(key, obj);
          }
        }

        //can only add a JSON-P object to a JSON-P object; can't add a JSON-B object.  So converting...
        JsonObjectBuilder builder = Json.createObjectBuilder();

        builder.add("symbol", symbol);
        builder.add("shares", newStock.shares);
        builder.add("commission", newStock.commission);
        builder.add("price", newStock.price);
        builder.add("total", newStock.total);
        builder.add("date", newStock.date);

        JsonObject stock = builder.build();

        stocksBuilder.add(symbol,
            stock); //might be replacing an item; caller needs to do any merge (like updatePortfolio does)
        stocks = stocksBuilder.build();
      }
    }
  }

  public String toString() {
    return "{\"owner\": \"" + owner + "\", \"total\": " + total
        + ", \"loyalty\": \"" + loyalty + "\", \"balance\": " + balance
        + ", \"commissions\": " + commissions + ", \"free\": " + free
        + ", \"nextCommission\": " + nextCommission
        + ", \"sentiment\": \"" + sentiment + "\", \"stocks\": " + (
        stocks != null ? stocks.toString() : "{}") + "}";
  }
}