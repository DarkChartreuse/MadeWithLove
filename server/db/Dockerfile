FROM postgres
ENV POSTGRES_DB=mwl_db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
COPY init.sql /docker-entrypoint.initdb.d/10-init.sql
