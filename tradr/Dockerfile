FROM nodeshift/ubi8-s2i-web-app as builder

ENV YARN_ENABLED="true" \
    OUTPUT_DIR="dist"

USER 0
ADD . /tmp/src
RUN chown -R 1001:0 /tmp/src

USER 1001

RUN /usr/libexec/s2i/assemble

FROM registry.access.redhat.com/ubi8/nginx-118

USER 0
COPY --from=builder /opt/app-root/output/ /tmp/src/dist
COPY --from=builder /tmp/src/index.html /tmp/src/index.html

RUN chown -R 1001:0 /tmp/src
USER 1001

RUN /usr/libexec/s2i/assemble

CMD /usr/libexec/s2i/run
