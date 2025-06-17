FROM node:22.16-bookworm
WORKDIR /api
COPY package*.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]
