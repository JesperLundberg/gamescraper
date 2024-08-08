FROM node:lts-alpine AS runtime
WORKDIR /app

COPY package*.json .
COPY src/backend/ .

RUN npm i

CMD [ "node", "server.js" ]
