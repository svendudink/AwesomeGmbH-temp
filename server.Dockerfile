FROM node:18.0.0

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY server server
RUN yarn install  --network-timeout 12000000

CMD ["node", "/app/server/index.js"]