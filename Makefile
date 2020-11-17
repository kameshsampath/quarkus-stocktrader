ENV_FILE := .env
include ${ENV_FILE}
export $(shell sed 's/=.*//' ${ENV_FILE})
CURRENT_DIR = $(shell pwd)
APP_VERSION := $(shell bash -c "xml sel -N ns='http://maven.apache.org/POM/4.0.0' -t -v '//ns:project/ns:version/text()' $(CURRENT_DIR)/pom.xml")

format:	
	@mvn editorconfig:format

install_jars:
	@mvn -DskipTests clean install

clean:
	@mvn clean

##################################################################
### Quarkus Stock Quote
##################################################################

qsq_jvm_image_build_push:	
	@docker build --no-cache -t $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)-jar" -f quarkus-stock-quote/src/main/docker/Dockerfile.jvm quarkus-stock-quote
	@docker push $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)-jar"
	@docker tag $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)-jar" $(IMAGE_REPO)/quarkus-stock-quote
	@docker push "$(IMAGE_REPO)"/quarkus-stock-quote

##################################################################
### Quarkus Portfolio
##################################################################

qp_jvm_image_build_push:	
	@docker build --no-cache -t $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)-jar" -f quarkus-portfolio/src/main/docker/Dockerfile.jvm quarkus-portfolio
	@docker push $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)-jar"
	@docker tag $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)-jar" $(IMAGE_REPO)/quarkus-portfolio
	@docker push $(IMAGE_REPO)/quarkus-portfolio

##################################################################
### Trade Orders Service
##################################################################

tos_jvm_image_build_push:	
	@docker build --no-cache -t $(IMAGE_REPO)/trade-orders-service:"$(APP_VERSION)-jar" -f trade-orders-service/src/main/docker/Dockerfile.jvm trade-orders-service
	@docker push $(IMAGE_REPO)/trade-orders-service:"$(APP_VERSION)-jar"
	@docker tag $(IMAGE_REPO)/trade-orders-service:"$(APP_VERSION)-jar" $(IMAGE_REPO)/trade-orders-service
	@docker push $(IMAGE_REPO)/trade-orders-service

##################################################################
### Tradr
##################################################################

tradr_image_build_push:	
	@docker build --no-cache -t $(IMAGE_REPO)/tradr:"$(TRADR_VERSION)" -f tradr/Dockerfile tradr
	@docker push $(IMAGE_REPO)/tradr:"$(TRADR_VERSION)"
	@docker tag $(IMAGE_REPO)/tradr:"$(TRADR_VERSION)" $(IMAGE_REPO)/tradr
	@docker push $(IMAGE_REPO)/tradr

.PHONY:	all
all:	clean install_jars	qsq_jvm_image_build_push	qp_jvm_image_build_push	tos_jvm_image_build_push	tradr_image_build_push