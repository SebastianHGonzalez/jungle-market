FROM node:13.10.1-alpine3.11 as build

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm test && npm run build


FROM node:13.10.1-alpine3.11 as run

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY wait-for.sh wait-for.sh

COPY --from=build /usr/src/app/package*.json ./

RUN npm i --only=prod

COPY --from=build /usr/src/app/.next ./.next

COPY --from=build /usr/src/app/server ./server

COPY --from=build /usr/src/app/public ./public

COPY --from=build /usr/src/app/next.config.js ./next.config.js

CMD [ "npm", "start" ]
