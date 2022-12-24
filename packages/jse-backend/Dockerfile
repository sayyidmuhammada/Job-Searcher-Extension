# Get the base image of Node version 16
FROM node:16

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal
WORKDIR /packages/jse-backend
LABEL maintainer="Sayyid Muhammad A"

COPY package.json package*.json ./
ENV LISTEN_PORT=8080
ENV USE_DOCKER=true
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
RUN npm install

EXPOSE 8080

COPY . .

CMD ["npm", "run", "dev"]