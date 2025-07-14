FROM node:20-alpine
LABEL maintainer="xadmax@gmail.com"
ENV GEO_SRV="geography-server:4000"
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . .
EXPOSE 3000
USER 1
CMD ["npm", "start"]
