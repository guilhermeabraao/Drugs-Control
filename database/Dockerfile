FROM postgres:latest

ENV POSTGRES_PASSWORD="Your password"
ENV POSTGRES_USER="your user"
ENV POSTGRES_DB="drugstore"

EXPOSE 5432

CMD ["postgres"]
COPY dump.sql /docker-entrypoint-initb.d/dumpsql