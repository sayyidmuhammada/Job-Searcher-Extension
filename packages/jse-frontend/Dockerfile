FROM node:16
WORKDIR /packages/jse-frontend
RUN rm -rf node_modules .next yarn.lock
COPY package.json package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]