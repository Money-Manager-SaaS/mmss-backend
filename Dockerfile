FROM node:13.10.1-alpine

EXPOSE 3000
ENV DB_PATH /mm/demo.db

RUN mkdir /mm
WORKDIR /mm

ADD . .
RUN chmod 777 /mm/demo.db

RUN npm ci
RUN npm run seed && npm run postinstall


CMD ["node", "dist/server.js"]
