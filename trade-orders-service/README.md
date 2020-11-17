# Quarkus Day Trader

A simple service to test Debezium Outbox pattern

## Pre-requisites

- JDK 11
- OpenShift 4 Cluster

## Navigate to project

__NOTE__: If the *daytrader* project does not exist, create it using the command `oc new-project daytrader-dev`

```shell script
oc project daytrader-dev
```

## Build and  Deploy Application

Login to the OpenShift server using oc login -u <user> -p password <API SERVER>

```shell script
./mvnw clean package -Dquarkus.kubernetes.deploy=true
```

## Expose Route

```shell script
oc create route edge --service=trade-orders-service --port=8080 trade-orders
```

## Access the Application

```shell script
export QUARKUS_ORDER_SVC_URL="https://$(oc get route trade-orders-service -o=jsonpath='{.spec.host}')"
```

Open the $QUARKUS_ORDER_SVC_URL in your browser.