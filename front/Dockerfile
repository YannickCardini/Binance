FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod



FROM nginx:1.15.8-alpine

COPY nginx.conf /etc/nginx/conf.d/nginx.conf

COPY --from=builder /usr/src/app/dist/Binance/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
