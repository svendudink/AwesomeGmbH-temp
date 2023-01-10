

# build
FROM node:18.0.0 as build

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY client client
RUN yarn install --network-timeout 12000000
RUN yarn build:client

#webserver
FROM nginx:stable-alpine
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/client/build /app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


