FROM node:18
WORKDIR /use/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/src/main.js" ]