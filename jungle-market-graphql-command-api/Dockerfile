FROM node:13.10.1-alpine3.11 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm test && npm run build


FROM node:13.10.1-alpine3.11 as run

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./

RUN npm i --only=prod

COPY --from=build /usr/src/app/build ./build

CMD [ "npm", "start" ]
