#!/bin/bash
set -e 

trap '{ echo "" ; exit 1; }' INT

KAFKA_CLUSTER_NS=${1:-'daytrader-dev'}
KAFKA_CLUSTER_NAME=${2:-'daytrader'}
KAFKA_TOPIC=${3:-'openshift.traderdb.outboxevent'}

kubectl -n "$KAFKA_CLUSTER_NS" run kafka-producer -ti \
 --image=docker.io/strimzi/kafka:latest-kafka-2.5.0 \
 --rm=true \
 --restart=Never \
 -- bin/kafka-console-producer.sh \
 --broker-list "$KAFKA_CLUSTER_NAME-kafka-bootstrap:9092" \
 --topic "$KAFKA_TOPIC"
