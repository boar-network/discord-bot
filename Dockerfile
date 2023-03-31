FROM node:16-alpine

RUN apk add --update --no-cache && \
    rm -rf /var/cache/apk/ && mkdir /var/cache/apk/ && \
    rm -rf /usr/share/man

ENV WORK_DIR=/discord-bot

RUN mkdir -p $WORK_DIR
WORKDIR $WORK_DIR

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

ARG TOKEN
ARG ROLE
ARG GUILD

ENTRYPOINT [ "npm", "start"]
