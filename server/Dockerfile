FROM node:18.16.1

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src

RUN ls -a

ARG REACT_APP_WB_API

ENV REACT_APP_WB_API $REACT_APP_WB_API

RUN npm install
RUN npm run tsc

EXPOSE 8080

CMD [ "node", "./dist/server.js" ]