-- Adminer 4.7.7 PostgreSQL dump

DROP TABLE IF EXISTS "consumedmessage";
CREATE TABLE "public"."consumedmessage" (
                                            "eventid" uuid NOT NULL,
                                            "timeofreceiving" timestamp,
                                            CONSTRAINT "consumedmessage_pkey" PRIMARY KEY ("eventid")
) WITH (oids = false);


DROP TABLE IF EXISTS "portfolio";
CREATE TABLE "public"."portfolio" (
                                      "owner" character varying(32) NOT NULL,
                                      "balance" double precision NOT NULL,
                                      "commissions" double precision NOT NULL,
                                      "free" integer NOT NULL,
                                      "loyalty" character varying(8),
                                      "sentiment" character varying(255),
                                      "total" double precision NOT NULL,
                                      CONSTRAINT "portfolio_pkey" PRIMARY KEY ("owner")
) WITH (oids = false);


DROP TABLE IF EXISTS "quote";
CREATE TABLE "public"."quote" (
                                  "symbol" character varying(255) NOT NULL,
                                  "date" bigint NOT NULL,
                                  "price" double precision NOT NULL,
                                  CONSTRAINT "quote_pkey" PRIMARY KEY ("symbol")
) WITH (oids = false);


DROP TABLE IF EXISTS "stock";
CREATE TABLE "public"."stock" (
                                  "id" bigint NOT NULL,
                                  "commission" double precision NOT NULL,
                                  "datequoted" bigint,
                                  "price" double precision NOT NULL,
                                  "shares" integer NOT NULL,
                                  "symbol" character varying(255),
                                  "total" double precision NOT NULL,
                                  "owner" character varying(32),
                                  CONSTRAINT "stock_pkey" PRIMARY KEY ("id"),
                                  CONSTRAINT "fka66q1uyh4sop09qdccnsuys8o" FOREIGN KEY (owner) REFERENCES portfolio(owner) NOT DEFERRABLE
) WITH (oids = false);


DROP TABLE IF EXISTS "stocksymbol";
CREATE TABLE "public"."stocksymbol" (
                                        "symbolalias" character varying(255) NOT NULL,
                                        "actualsymbol" character varying(255),
                                        CONSTRAINT "stocksymbol_pkey" PRIMARY KEY ("symbolalias")
) WITH (oids = false);


DROP TABLE IF EXISTS "symbol";
CREATE TABLE "public"."symbol" (
                                   "symbol" character varying(255) NOT NULL,
                                   "cik" character varying(255),
                                   "currency" character varying(255),
                                   "date" character varying(255),
                                   "figi" character varying(255),
                                   "iexid" character varying(255),
                                   "isenabled" boolean,
                                   "name" character varying(255),
                                   "region" character varying(255),
                                   "type" character varying(255),
                                   CONSTRAINT "symbol_pkey" PRIMARY KEY ("symbol")
) WITH (oids = false);


DROP TABLE IF EXISTS "tradeorder";
CREATE TABLE "public"."tradeorder" (
                                       "id" bigint NOT NULL,
                                       "accountid" integer NOT NULL,
                                       "opendate" timestamp,
                                       "orderfee" character varying(255),
                                       "orderid" bigint NOT NULL,
                                       "ordertype" character varying(255),
                                       "price" double precision NOT NULL,
                                       "quantity" integer NOT NULL,
                                       "symbol" character varying(255),
                                       CONSTRAINT "tradeorder_pkey" PRIMARY KEY ("id")
) WITH (oids = false);