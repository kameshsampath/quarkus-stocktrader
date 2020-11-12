FROM registry.access.redhat.com/ubi8/nodejs-12

ENV YARN_ENABLED="true" \
    OUTPUT_DIR="dist" \
    NPM_RUN="start"

USER 0
ADD . /tmp/src
RUN chown -R 1001:0 /tmp/src
USER 1001

RUN /usr/libexec/s2i/assemble

CMD /usr/libexec/s2i/run