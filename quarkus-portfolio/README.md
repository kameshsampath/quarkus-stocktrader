# Quarkus Portfolio

```shell script
oc new-project new-stocktrader
```

## Create the API Key Secret
```shell script
oc create secret generic quarkus-portfolio --from-literal=IEX_API_KEY=$IEX_API_KEY
```

## Create OpenShift Application

```shell script
./mvnw clean package -Dquarkus.kubernetes.deploy=true
```