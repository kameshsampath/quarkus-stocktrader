/*
       Copyright 2017 IBM Corp All Rights Reserved

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

/**
 * JSON-B POJO class representing a Stock Purchase JSON object
 */
public class StockPurchase {

  public String id; //each trade will have its own UUID
  public String owner;
  public String symbol;
  public int shares;
  public double price;
  public String when;
  public double commission;


  public StockPurchase() { //default constructor
  }

  public StockPurchase(String id, String owner, String symbol, int shares,
      double price, String when, double commission) {
    this.id = id;
    this.owner = owner;
    this.symbol = symbol;
    this.shares = shares;
    this.price = price;
    this.when = when;
    this.commission = commission;
  }

  public String toString() {
    return "{\"id\": \"" + id + "\", \"owner\": \"" + owner
        + "\", \"symbol\": \"" + symbol + "\", \"shares\": " + shares +
        ", \"price\": " + price + ", \"when\": \"" + when
        + "\", \"commission\": " + commission + "}";
  }
}
