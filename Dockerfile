FROM node
RUN mkdir /usr/src/app
COPY package.json /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm install nodemon
ADD . /usr/src/app
EXPOSE 3000
CMD ["npm", "start"]
