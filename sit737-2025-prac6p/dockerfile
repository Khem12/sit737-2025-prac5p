FROM node:23.9.0 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3040
CMD [ "node", "server.js" ]
