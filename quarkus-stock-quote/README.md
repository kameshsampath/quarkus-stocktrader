# Quarkus Portfolio

```shell script
oc new-project daytrader-dev
```

## Create the API Key Secret
```shell script
oc create secret generic quarkus-portfolio --from-literal=IEX_API_KEY=$IEX_API_KEY
```

## Create OpenShift Application

```shell script
./mvnw clean package -Dquarkus.kubernetes.deploy=true
```

## Create Routes

```shell script
oc create route edge --service=quarkus-stock-quote --port=8080 stock-quote
```
