package dev.kameshs.stocktrader;

import dev.kameshs.stocktrader.client.IEXClient;
import dev.kameshs.stocktrader.client.Quote;
import dev.kameshs.stocktrader.client.Symbol;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Path("/api/stock")
public class StockQuoteResource {

  private static final Logger LOGGER = Logger.getLogger(
    StockQuoteResource.class.getName());

  @Inject
  @RestClient
  IEXClient iexClient;

  @ConfigProperty(name = "iex.api.key")
  String iexApiKey;

  @PostConstruct
  @Transactional
  void init() {
    LOGGER.log(Level.ALL, "Querying Symbols from API");
    iexClient
      .allSymbols(iexApiKey)
      .forEach(s -> s.persist());
  }

  @GET
  @Path("/symbols")
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response allSymbols() {
    List<Symbol> symbols = Symbol.listAll();
    return Response.ok()
                   .entity(Symbol.listAll())
                   .build();
  }

  @GET
  @Path("/quotes")
  @Produces(MediaType.APPLICATION_JSON)
  public Response allQuotes() {
    return Response.ok()
                   .entity(Quote.listAll())
                   .build();
  }

  @GET
  @Path("/{symbol}")
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response getQuote(@PathParam("symbol") String symbol) {
    LOGGER.log(Level.INFO, "Getting Quote {0}", symbol);
    var sym = symbol.toUpperCase();
    Quote quote = Quote.findById(sym);
    if (quote == null) {
      quote = getStockQuoteViaIEX(sym);
      LOGGER.log(Level.INFO, "Got Quote {0} from IEX caching it", quote);
      quote.persist();
    }
    return Response.ok(quote)
                   .build();
  }

  public Quote getStockQuoteViaIEX(String symbol) {
    LOGGER.log(Level.INFO, "Getting Quote {0} via IEX", symbol);
    return iexClient.getStockQuoteViaIEX(symbol, iexApiKey);
  }
}
