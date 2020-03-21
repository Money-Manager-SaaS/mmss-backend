FROM node:13.10.1-alpine

RUN mkdir /mm
WORKDIR /mm

ADD . .


RUN npm ci
RUN npm build && npm seed
RUN chmod 777 /mm/src/db/demo.db

CMD ["npm", "start"]
