FROM mcr.microsoft.com/playwright:bionic
WORKDIR /packages/jse-backend
LABEL maintainer="Sayyid Muhammad A"

COPY package.json ./

ENV PLAYWRIGHT_BROWSERS_PATH=0
# Install deps for server.
RUN yarn install

ENV LISTEN_PORT=8080
ENV USE_DOCKER=true
EXPOSE 8080

COPY . .

CMD ["yarn", "run", "dev"]