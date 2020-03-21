FROM node:13.10.1-alpine
EXPOSE 3000
RUN mkdir /mm
WORKDIR /mm

ADD . .


RUN npm ci
RUN npm run seed && npm run postinstall
RUN chmod +x /mm/src/db/demo.db

#CMD ["npm", "start"]
