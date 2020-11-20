# Quarkus Stock Trader

The [IBMStockTrader](https://github.com/IBMStockTrader) application rebuilt with https://quarkus.io[Quarkus]

## Deploy KeyCloak

```shell script
oc apply -k k8s/keycloak
```


## Deploy Modules 

- [StockQuote](./quarkus-stock-quote)

```shell script
oc apply -k k8s/stock-quote/prod
```

- [Portfolio](./quarkus-portfolio)

```shell script
oc apply -k k8s/portfolio/prod
```

- [Trader Orders](./trade-orders-service)

```shell script
oc apply -k k8s/trade-orders-service/prod
```

- [Tradr ](./tradr)

```shell script
oc apply -k k8s/tradr/prod
```

## Kafka Mirror Maker

__IMPORTANT__: 

* Should be done only on the target clusters, i.e. the clusters where the topics/data needs to mirrored, from the Kafka Cluster where sampledaytrader8 is deployed.

Copy the *$PROJECT_HOME/k8s/kafka-mirrormaker/daytrader-mirrormaker-example.yaml* to *$PROJECT_HOME/k8s/kafka-mirrormaker/daytrader-mirrormaker.yaml*:

```shell script
cp $PROJECT_HOME/k8s/kafka-mirrormaker/daytrader-mirrormaker-example.yaml  $PROJECT_HOME/k8s/kafka-mirrormaker/daytrader-mirrormaker.yaml
```

Update the `$PROJECT_HOME/k8s/kafka-mirrormaker/daytrader-mirrormaker.yaml` for cluster bootstrapserver LoadBalancer IP Address.

The Cluster __bootstrapservers__ can be retrieved using the command:

```shell script
oc get svc daytrader-kafka-external-bootstrap \
  -ojsonpath='{.status.loadBalancer.ingress[0].ip}'
```

```shell script
oc apply -k k8s/kafka-mirrormaker/prod
```

## Building Application Container Images

```shell script
make all
```