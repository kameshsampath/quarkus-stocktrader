/*
 * Copyright Debezium Authors.
 *
 * Licensed under the Apache Software License version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 */
package io.debezium.examples.outbox.trade.messagelog;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import java.time.Instant;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ConsumedMessage extends PanacheEntityBase {

    @Id
    public UUID eventId;
    public Instant timeOfReceiving;

    public ConsumedMessage() {
    }

    public ConsumedMessage(UUID eventId, Instant timeOfReceiving){
        this.eventId = eventId;
        this.timeOfReceiving = timeOfReceiving;
    }

}
