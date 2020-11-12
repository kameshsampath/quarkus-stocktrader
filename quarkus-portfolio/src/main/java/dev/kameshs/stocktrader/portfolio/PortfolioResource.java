package dev.kameshs.stocktrader.portfolio;

import dev.kameshs.stocktrader.portfolio.client.StockQuoteClient;
import dev.kameshs.stocktrader.portfolio.panache.Portfolio;
import dev.kameshs.stocktrader.portfolio.client.Quote;
import dev.kameshs.stocktrader.portfolio.panache.Stock;
import java.net.URI;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Path("/api/portfolios")
public class PortfolioResource {

  private static final Logger LOGGER = Logger.getLogger(
      PortfolioResource.class.getName());

  private static final String BASIC = "Basic";
  private static final String BRONZE = "Bronze";
  private static final String SILVER = "Silver";
  private static final String GOLD = "Gold";
  private static final String PLATINUM = "Platinum";

  @Inject
  @RestClient
  StockQuoteClient stockQuoteClient;

  @GET
  @Path("/all")
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response getPortfolios() {
    LOGGER.log(Level.INFO, "Getting all Portfolios");
    return Response.ok(Portfolio.listAll())
                   .build();
  }

  @GET
  @Path("/{owner}")
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response getPortfolio(@PathParam("owner") String owner) {
    Portfolio portfolio = portfolioForOwner(owner);
    if (portfolio != null) {
      return Response.ok(portfolio)
                     .build();
    }
    return Response.status(Status.NOT_FOUND)
                   .entity("Portfolio with owner " + owner + " not found")
                   .build();
  }


  @POST
  @Path("/{owner}")
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response createPortfolio(@PathParam("owner") String owner) {
    try {
      var portfolio = Portfolio.findById(owner);

      if (portfolio == null) {
        LOGGER.log(Level.INFO, "Creating Portfolio for {0}", owner);
        portfolio = new Portfolio(owner, 0.0, "Basic", 50.0, 0.0, 0,
            "Unknown", 9.99);
        portfolio.persistAndFlush();
      } else {
        LOGGER.log(Level.WARNING, "Portfolio for {0} owner already exists",
            owner);
      }
      var uri = new URI("/" + owner);
      return Response.created(uri)
                     .build();
    } catch (Exception e) {
      LOGGER.log(Level.WARNING, "Error creating location URI for owner {}",
          owner);
    }
    return Response.created(null)
                   .build();
  }

  @PUT
  @Path("/{owner}")
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response updatePortfolio(@PathParam("owner") String owner,
      @QueryParam("symbol") String symbol, @QueryParam("shares") int shares) {
    Portfolio portfolio = Portfolio.findById(owner);
    if (portfolio != null) {
      double commission = processCommission(portfolio);
      Stock stock = new Stock();
      stock.commission = commission;
      stock.shares = shares;
      stock.symbol = symbol;
      stock.portfolio = portfolio;

      List<Stock> stockResults = Stock.findByOwnerAndSymbol(owner,
          symbol.toUpperCase());

      if (!stockResults.isEmpty()) {
        stockResults
            .forEach(s -> {

              int oldShares = s.shares;
              double oldCommission = s.commission;

              int newShares = oldShares + shares;
              double newCommission = oldCommission + commission;
              if (newShares > 0) {
                LOGGER.fine(
                    "Updating Stocks shares = " + newShares
                        + ", commission = "
                        + newCommission + " WHERE owner = '" + owner
                        + "' AND symbol = '" + symbol + "'");
                s.shares = newShares;
                s.commission = newCommission;
              } else {
                LOGGER.fine(
                    "DELETE Stock with owner = '"
                        + owner + "' AND symbol = '" + symbol + "'");
                s.delete();
              }
            });
      } else {
        LOGGER.fine(
            "Create new Stock (owner, symbol, shares, commission) with VALUES ('"
                + owner + "', '" + symbol + "', " + shares + ", " + commission
                + ")");
        stock.persistAndFlush();
      }

      LOGGER.info("Refreshing portfolio for " + owner);
      portfolio = portfolioForOwner(owner);

      return Response.ok(portfolio)
                     .build();
    } else {
      LOGGER.warning("No Portfolio exists with owner" + owner);
      return Response.status(Status.NOT_FOUND)
                     .entity("Portfolio with owner " + owner + " not found")
                     .build();
    }
  }

  //TODO
  @GET
  @Path("/{owner}/returns")
  @Produces(MediaType.TEXT_PLAIN)
  @Transactional
  public Response getPortfolioReturns(@PathParam("owner") String owner) {
    LOGGER.warning("Method not implemented");
    return Response.ok("Method not implemented")
                   .build();
  }

  @DELETE
  @Path("/{owner}")
  @Produces(MediaType.APPLICATION_JSON)
  @Transactional
  public Response deletePortfolio(@PathParam("owner") String owner) {
    LOGGER.log(Level.INFO, "Deleting Portfolio for owner {0}", owner);

    Portfolio portfolio = Portfolio.findById(owner);

    if (portfolio != null) {
      portfolio.delete();
      return Response.noContent()
                     .build();
    } else {
      LOGGER.warning("No Portfolio exists with owner" + owner);
      return Response.status(Status.NOT_FOUND)
                     .entity("Portfolio with owner " + owner + " not found")
                     .build();
    }
  }

  private Portfolio portfolioForOwner(String owner) {
    Portfolio portfolio = Portfolio.findById(owner);

    if (portfolio != null) {
      AtomicReference<Double> overallTotal = new AtomicReference<>();
      overallTotal.set(0d);
      List<Stock> stockResults = Stock.findByOwner(owner);
      stockResults.forEach(stock -> {
        long date = 0;
        double price = 0;
        double total = 0;

        var symbol = stock.symbol;
        int shares = stock.shares;
        LOGGER.info("Calling StockQuote to get Symbol" + symbol + " updates");
        Quote quote = stockQuoteClient.getStockQuote(symbol);
        date = quote.date;
        price = quote.price;

        total = shares * price;
        stock.date = date;
        stock.price = price;
        stock.total = total;
        stock.portfolio = portfolio;

        Stock.updateStock(stock);
        Stock.detachStock(stock);

        var oTotal = overallTotal.get();
        overallTotal.set(oTotal + total);

        portfolio.addStock(stock);

      });
      portfolio.total = overallTotal.get();
      //TODO Can we use Kogito in place of IBM ODM to compute loyalty??
      portfolio.loyalty = BASIC;
      portfolio.nextCommission =
          portfolio.free > 0 ? 0.0 : getCommission(portfolio.loyalty);
      portfolio.persistAndFlush();

    }
    return portfolio;
  }

  //TODO can this also be moved to Kogito as a business rule ??
  private double processCommission(Portfolio portfolio) {
    portfolio.persistAndFlush();
    String loyalty = portfolio.loyalty;
    String owner = portfolio.owner;

    double commission = getCommission(loyalty);

    int free = portfolio.free;
    if (free > 0) { //use a free trade if available
      free--;
      commission = 0.0;

      LOGGER.info("Using free trade for " + owner);
      portfolio.free = free;
    } else {
      double commissions = portfolio.commissions;
      commissions += commission;

      double balance = portfolio.balance;
      balance -= commission;

      LOGGER.info("Charging commission of $" + commission + " for " + owner);
      portfolio.commissions = commissions;
      portfolio.balance = balance;
    }

    LOGGER.info("Returning a commission of $" + commission);
    return commission;
  }

  private double getCommission(String loyalty) {
    double commission = 9.99;
    if (loyalty != null) {
      if (loyalty.equalsIgnoreCase(BRONZE)) {
        commission = 8.99;
      } else if (loyalty.equalsIgnoreCase(SILVER)) {
        commission = 7.99;
      } else if (loyalty.equalsIgnoreCase(GOLD)) {
        commission = 6.99;
      } else if (loyalty.equalsIgnoreCase(PLATINUM)) {
        commission = 5.99;
      }
    }

    return commission;
  }

}