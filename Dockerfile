FROM node:13.14.0-alpine

EXPOSE 3000
ENV DB_PATH /mm/demo.db

RUN mkdir /mm
WORKDIR /mm

ADD package.json .
ADD package-lock.json .
RUN npm ci

ADD . .
RUN chmod 777 /mm/demo.db

RUN npm run seed && npm run postinstall

CMD ["node", "dist/server.js"]

