ENV_FILE := .env
include ${ENV_FILE}
export $(shell sed 's/=.*//' ${ENV_FILE})
CURRENT_DIR = $(shell pwd)
APP_VERSION := $(shell mvn help:evaluate -Dexpression=project.version -q -DforceStdout)

format:	
	@mvn editorconfig:format

install_jars:
	@mvn -DskipTests install

clean:
	@mvn clean

##################################################################
### Quarkus Stock Quote
##################################################################

qsq_jvm_image_build_push:		install_jars
	@mvn -pl quarkus-stock-quote -DskipTests k8s:push
	@docker tag $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)" $(IMAGE_REPO)/quarkus-stock-quote
	@docker push "$(IMAGE_REPO)"/quarkus-stock-quote

##################################################################
### Quarkus Portfolio
##################################################################

qp_jvm_image_build_push:	install_jars
	@mvn -pl quarkus-portfolio -DskipTests  k8s:push
	@docker tag $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)" $(IMAGE_REPO)/quarkus-portfolio
	@docker push $(IMAGE_REPO)/quarkus-portfolio

##################################################################
### Trade Orders Service
##################################################################

tos_jvm_image_build_push:	install_jars
	@mvn -pl trade-orders-service -DskipTests k8s:push
	@docker tag $(IMAGE_REPO)/trade-orders-service:"$(APP_VERSION)" $(IMAGE_REPO)/trade-orders-service
	@docker push $(IMAGE_REPO)/trade-orders-service

##################################################################
### Tradr
##################################################################

tradr_image_build_push:	
	@docker build --no-cache -t $(IMAGE_REPO)/tradr:"$(TRADR_VERSION)" -f tradr/Dockerfile tradr
	@docker push $(IMAGE_REPO)/tradr:"$(TRADR_VERSION)"
	@docker tag $(IMAGE_REPO)/tradr:"$(TRADR_VERSION)" $(IMAGE_REPO)/tradr
	@docker push $(IMAGE_REPO)/tradr

update_tradr_deployment_image:
	yq eval -i '.spec.template.spec.containers[0].image="$(IMAGE_REPO)/tradr"' k8s/tradr/base/deployment.yaml

.PHONY:	all
all:	clean	qsq_jvm_image_build_push	qp_jvm_image_build_push	tos_jvm_image_build_push	tradr_image_build_push