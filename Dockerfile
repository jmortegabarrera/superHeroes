FROM node:12.18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200
EXPOSE 3000
CMD npm run start & npm run backend-docker

