/*
 * Copyright Debezium Authors.
 *
 * Licensed under the Apache Software License version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 */
package io.debezium.examples.outbox.trade.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.debezium.examples.outbox.trade.client.Quote;
import io.debezium.examples.outbox.trade.client.StockQuoteClient;
import io.debezium.examples.outbox.trade.client.Symbol;
import io.debezium.examples.outbox.trade.model.StockSymbol;
import io.debezium.examples.outbox.trade.model.TradeOrder;
import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.core.eventbus.EventBus;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Random;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ApplicationScoped
public class TradeOrderService {

  private static final Logger LOGGER = LoggerFactory.getLogger(
    TradeOrderService.class);

  private final ObjectMapper objectMapper = new ObjectMapper();

  Random rand = new Random();

  @Inject
  EventBus eventBus;

  @Inject
  @RestClient
  StockQuoteClient stockQuoteClient;

  @Transactional(value = TxType.MANDATORY)
  public void orderCreated(JsonNode event)
    throws JsonMappingException, JsonProcessingException {
    LOGGER.info("Processing 'OrderCreated' event: {}", event.asText());

    event = objectMapper.readTree(event.asText());

    LOGGER.info("type: " + event.get("type") + " " + event.get("type")
                                                          .asText());

    final long orderId = Long.parseLong(event.get("id")
                                             .asText());
    final String orderType = event.get("type")
                                  .asText();
    final Date openDate = new Date(event.get("openDate")
                                        .asLong());
    final String symbol = getMappedSymbol(event.get("symbol")
                                               .asText());

    final int quantity = event.get("quantity")
                              .asInt();

    final Double price = updatePrice(symbol,
      Double.parseDouble(event.get("price")
                              .asText()));
    final String orderFee = event.get("orderFee")
                                 .asText();
    final int accountId = event.get("accountId")
                               .asInt();

    LOGGER.info("Going to persist 'TradeOrder'");

    TradeOrder tradeOrder = new TradeOrder(orderId, orderType, openDate, symbol,
      quantity, price, orderFee, accountId);

    LOGGER.info("Persisting 'TradeOrder': {}", tradeOrder);

    tradeOrder.persist();

    final JsonObject jsonObject = JsonObject.mapFrom(tradeOrder);
    eventBus.publish("order_stream", jsonObject);
  }

  @Transactional(value = TxType.MANDATORY)
  public void orderLineUpdated(JsonNode event) {
    LOGGER.info("Processing 'OrderLineUpdated' event: {}", event);
  }

  protected Double updatePrice(String symbol, Double price) {
    LOGGER.info("Getting price for symbol {} ", symbol);
    try {
      Quote quote = stockQuoteClient.getStockQuote(symbol);
      price = quote.price;
    } catch (Exception e) {
      LOGGER.warn(
        "Unable to get price for symbol " + symbol + " using existing price",
        e);
    }

    return price;
  }

  protected String getMappedSymbol(String symbol) {
    LOGGER.info("Getting mapping symbol for {} ", symbol);
    String actualSymbol;
    try {
      StockSymbol stockSymbol = StockSymbol.findById(symbol);
      actualSymbol = stockSymbol.actualSymbol;
    } catch (Exception e) {
      //Just get some random symbol
      actualSymbol = randomStockSymbol();
    }
    LOGGER.info("Mapped {} to  symbol {} ", actualSymbol, symbol);
    return actualSymbol;
  }

  public String randomStockSymbol() {
    List<Symbol> symbols = stockQuoteClient.symbols();
    int numberOfElements = 2;
    String randomElement = "unknown";
    for (int i = 0; i < numberOfElements; i++) {
      int randomIndex = rand.nextInt(symbols.size());
      randomElement = symbols.get(randomIndex).symbol;
    }
    return randomElement;
  }
}
