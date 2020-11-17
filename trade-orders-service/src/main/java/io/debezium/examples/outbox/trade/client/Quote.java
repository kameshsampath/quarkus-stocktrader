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

package io.debezium.examples.outbox.trade.client;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Quote {

  @JsonProperty("symbol")
  public String symbol;
  @JsonProperty("latestPrice")
  public double price;
  @JsonProperty("latestUpdate")
  public long date;

  public Quote() { //default constructor
  }

  public Quote(String symbol) {
    this.symbol = symbol;
  }

  public Quote(String symbol, double price, long date) {
    this.symbol = symbol;
    this.price = price;
    this.date = date;
  }


  public String toString() {
    return "{\"symbol\": \"" + symbol + "\", \"price\": " + price
        + ", \"date\": \"" + date + "}";
  }
}
