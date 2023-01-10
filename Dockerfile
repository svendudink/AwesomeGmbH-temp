# build
FROM node:18.0.0 as build
ARG BUILD_CONTEXT

WORKDIR /
COPY package.json .
COPY yarn.lock .
COPY ./$BUILD_CONTEXT/package.json /$BUILD_CONTEXT/
RUN yarn install
COPY ./$BUILD_CONTEXT /$BUILD_CONTEXT
RUN yarn build:$BUILD_CONTEXT

#webserver
FROM nginx:stable-alpine
ARG BUILD_CONTEXT
COPY --from=build /$BUILD_CONTEXT/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

