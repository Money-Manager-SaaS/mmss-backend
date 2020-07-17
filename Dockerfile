FROM node:13.10.1-alpine
EXPOSE 3000

ADD package.json .
ADD package-lock.json .
RUN npm ci

ADD . .

RUN npm i -g ts-node typescript pm2
RUN npm run build


CMD npm run migrate && npm run start:pm2

