FROM mongo:7

LABEL maintainer = "xadmax@gmail.com"

COPY setup-db.sh /docker-entrypoint-initdb.d/
RUN chmod 755 /docker-entrypoint-initdb.d/*.sh

EXPOSE 27017
