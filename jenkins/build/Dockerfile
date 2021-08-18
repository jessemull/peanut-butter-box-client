FROM node:12

ARG STAGE 

ENV NODE_OPTIONS="--max-old-space-size=8192"

COPY . /app

WORKDIR /app

RUN echo "BUILD STAGE - ${STAGE}" && npm install && npm run build


