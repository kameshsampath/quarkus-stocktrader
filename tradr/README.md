# Tradr

This is a new Node.js-hosted and Vue.js-based user interface for StockTrader.  It calls the default `portfolio`
JAX-RS web services when interacting with stock portfolios. As such `portfolio` must be exposed via ingress for `tradr` to work properly.

*Note:* There is a bug where the UI does not function if the portfolio database is empty.

## Prerequisites

- Docker for Mac, Windows and Linux

## Environment Settings

All production related environment variables are configured in the file `.env`.
Update them as needed before building the image.

The following are the variables used by the application:

|Variable|Description|Default
|:---:|:---:|:---:|
KEYCLOAK_AUTH_URL| The Keycloak Auth Server URL |
|KEYCLOAK_REALM| The Keycloak Relam to use |
|KEYCLOAK_CLIENT_ID| The Keycloak Client Id | tradr
|APP_PORTFOLIO_API_URL| The Quarkus StockTrader Portfolio API URL |

## Build and Deploy

To build `tradr` clone this repo and run:

```shell
docker build --no-cache -t quay.io/kameshsampath/tradr:latest .
docker push quay.io/kameshsampath/tradr:latest
```

__NOTE__: Update `quay.io/kameshsampath` to match your repository

Deploy the application to Kubernetes Cluster by:

```shell
cd ..
kubectl apply -k k8s/tradr/
```

