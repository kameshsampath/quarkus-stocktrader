# Tradr

This is a new Node.js-hosted and Vue.js-based user interface for StockTrader.  It calls the default `portfolio`
JAX-RS web services when interacting with stock portfolios. As such `portfolio` must be exposed via ingress for `tradr` to work properly.

*Note:* There is a bug where the UI does not function if the portfolio database is empty.  

## Prerequisites

- Docker for Mac, Windows and Linux

## Environment Settings

All production related environment variables are configured in `.env.production.local`.
Update them as needed before building the image.

The following are the variables used by the application:

- `VUE_APP_PORTFOLIO_API_URL` -- the Quarkus Portfolio Application REST URL e.g. <https://portfolio-daytrader-dev.example.com/api/portfolios>

## Build and Deploy

To build `tradr` clone this repo and run:

```bash
docker build -t quay.io/kameshsampath/tradr:latest
docker push quay.io/kameshsampath/tradr:latest
```

__NOTE__: update `quay.io/kameshsampath` to match your repository

Deploy the application to Kubernetes Cluster by:

```shell
kubectl apply -k quay.io/kameshsampath/tradr:latest
```
