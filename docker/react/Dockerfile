#セットアップ用イメージ
FROM node:20.14.0-bookworm-slim as base

#appディレクトリで作業
WORKDIR /app

#npmをinstall
RUN npm install -g npm@10.8.1

#開発環境用イメージ
#devを継承する
FROM base as dev

ENV NODE_ENV=development

#package jsonなどをコンテナ環境に移し、installする
COPY ./react/package*.json ./
RUN npm install
