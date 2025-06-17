FROM node:current-alpine3.22
WORKDIR /client
COPY package*.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]
