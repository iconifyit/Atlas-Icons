FROM node:16

WORKDIR /app/client

COPY  package*.json /var/app/client/

RUN npm install

COPY . /var/app/client/

RUN npm run build

CMD ["/usr/local/bin/npm", "start"]