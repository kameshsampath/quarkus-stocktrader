#!/bin/bash
set -e 

trap '{ echo "" ; exit 1; }' INT

KAFKA_CLUSTER_NS=${1:-'daytrader-dev'}
KAFKA_CLUSTER_NAME=${2:-'daytrader'}

pod_number=$(shuf -i 0-2 -n 1)

kubectl exec -it "$KAFKA_CLUSTER_NAME-zookeeper-$pod_number" \
 -n "$KAFKA_CLUSTER_NS" \
 -- ./bin/kafka-topics.sh \
 --list \
 --zookeeper localhost:12181
