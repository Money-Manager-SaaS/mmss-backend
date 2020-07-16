FROM node:13.10.1-alpine
EXPOSE 3000

RUN mkdir /mm
WORKDIR /mm

ADD package.json .
ADD package-lock.json .
RUN npm ci

ADD . .

RUN npm run build
RUN npm db:migrate

CMD ["node", "dist/server.js"]

