DROP TABLE IF EXISTS "consumedmessage";
CREATE TABLE "public"."consumedmessage"
(
    "eventid"         uuid NOT NULL,
    "timeofreceiving" timestamp,
    CONSTRAINT "consumedmessage_pkey" PRIMARY KEY ("eventid")
) WITH (oids = false);


DROP TABLE IF EXISTS "tradeorder";
DROP SEQUENCE IF EXISTS tradeorder_id_seq;
CREATE SEQUENCE tradeorder_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "public"."tradeorder"
(
    "id"        bigint DEFAULT nextval('tradeorder_id_seq') NOT NULL,
    "accountid" integer                                     NOT NULL,
    "opendate"  timestamp,
    "orderfee"  character varying(255),
    "orderid"   bigint                                      NOT NULL,
    "ordertype" character varying(255),
    "price"     character varying(255),
    "quantity"  integer                                     NOT NULL,
    "symbol"    character varying(255),
    CONSTRAINT "tradeorder_pkey" PRIMARY KEY ("id")
) WITH (oids = false);