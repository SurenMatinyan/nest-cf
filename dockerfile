FROM node:16

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm install --only=prod

RUN npm run build

EXPOSE 3000

# COPY /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]