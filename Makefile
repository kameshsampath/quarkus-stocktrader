ENV_FILE := .env
include ${ENV_FILE}
export $(shell sed 's/=.*//' ${ENV_FILE})
CURRENT_DIR = $(shell pwd)
IMAGE_REPO := 'quay.io/kameshsampath'
APP_VERSION := $(shell bash -c "xml sel -N ns='http://maven.apache.org/POM/4.0.0' -t -v '//ns:project/ns:version/text()' $(CURRENT_DIR)/pom.xml")
NATIVE_BULID_ARGS = -DskipTests -Dquarkus.native.native-image-xmx=6G -Dquarkus.native.container-build=true -Dquarkus.package.type=native  clean package

.PHONY: start_docker
start_docker:
	@./bin/start-docker.sh

format:	
	@mvn editorconfig:format

install_jars:
	@mvn -DskipTests clean install

test:
	mvn -P$(PROFILES) -DfailIfNoTests=false -DskipTests=false -Dquarkus.package.type=jar clean test -Dtest=$(TEST_FILTER)

native_test:
	mvn -P$(PROFILES) -DfailIfNoTests=false -Dquarkus.native.native-image-xmx=6G  -DskipTests=false -Dquarkus.package.type=native verify -Dtest=$(TEST_FILTER)

clean:
	@mvn clean

##################################################################
### Quarkus Stock Quote
##################################################################
quarkus-stock-quote/target/quarkus-app/quarkus-run.jar:
	@mvn -DskipTests clean install

qsq_build:	quarkus-stock-quote/target/quarkus-app/quarkus-run.jar

quarkus-stock-quote/target/quarkus-app/quarkus-run.jar:	qsq_build
	@mvn -Pnative $(NATIVE_BULID_ARGS)

qsq_jvm_image_build_push:	start_docker	qsq_build
	@docker build -t $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)-jar" -f quarkus-stock-quote/src/main/docker/Dockerfile.fast-jar quarkus-stock-quote
	@docker push $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)-jar"
	@docker tag $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)-jar" $(IMAGE_REPO)/quarkus-stock-quote
  @docker push "$(IMAGE_REPO)"/quarkus-stock-quote

qsq_native:	quarkus-stock-quote/target/quarkus-app/quarkus-run.jar

qsq_native_image_build_push:	start_docker	qsq_native
	@docker build -t $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)-native" -f quarkus-stock-quote/Dockerfile.native quarkus-stock-quote
	@docker tag $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)-native" $(IMAGE_REPO)/quarkus-stock-quote
	@docker push $(IMAGE_REPO)/quarkus-stock-quote:"$(APP_VERSION)-native"
	@docker push $(IMAGE_REPO)/quarkus-stock-quote

##################################################################
### Quarkus Portfolio
##################################################################
quarkus-portfolio/target/quarkus-app/quarkus-run.jar:
	@mvn -DskipTests clean install

qp_build: quarkus-portfolio/target/quarkus-app/quarkus-run.jar

quarkus-portfolio/target/quarkus-app/quarkus-run.jar:	qp_build
	@mvn -Pnative $(NATIVE_BULID_ARGS)

qp_jvm_image_build_push:	start_docker	qp_build
	@docker build -t $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)-jar" -f quarkus-portfolio/src/main/docker/Dockerfile.fast-jar quarkus-portfolio
	@docker push $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)-jar"
	@docker tag $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)-jar" $(IMAGE_REPO)/quarkus-portfolio
	@docker push $(IMAGE_REPO)/quarkus-portfolio

qp_native:	quarkus-portfolio/target/quarkus-app/quarkus-run.jar

qp_native_image_build_push:	start_docker	qp_native
	@docker build -t $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)-native" -f quarkus-portfolio/Dockerfile.native quarkus-portfolio
	@docker tag $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)-native" $(IMAGE_REPO)/quarkus-portfolio
  @docker push $(IMAGE_REPO)/quarkus-portfolio:"$(APP_VERSION)-native"
	@docker push $(IMAGE_REPO)/quarkus-portfolio

##################################################################
### Tradr
##################################################################

tradr_image_build_push: start_docker
	@docker build -t $(IMAGE_REPO)/tradr:"$(TRADR_VERSION)" -f tradr/Dockerfile tradr
	@docker push $(IMAGE_REPO)/tradr:"$(TRADR_VERSION)"
  @docker tag $(IMAGE_REPO)/tradr:"$(TRADR_VERSION)" $(IMAGE_REPO)/tradr
  @docker push $(IMAGE_REPO)/tradr

.PHONY:	all
all:
	clean	start_docker	qsq_jvm_image_build_push qp_jvm_image_build_push tradr_image_build_push