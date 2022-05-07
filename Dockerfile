FROM node:16.15.0-alpine

WORKDIR /vada

COPY package*.json ./

RUN rm -rf node_modules

RUN npm install

COPY . .

RUN npm run build

ENV NUXT_HOST=0.0.0.0

EXPOSE 8765

CMD npm start
