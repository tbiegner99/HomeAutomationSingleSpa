FROM node:14 as build


COPY ./package-lock.json ./
COPY ./package.json ./
RUN npm ci

COPY ./scripts ./scripts
COPY ./index.html ./index.html
COPY ./babel.config.js ./
COPY ./webpack.config.js ./
RUN npm run build

FROM nginx
RUN apt-get update
COPY --from=build ./build /srv/package/main
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443
