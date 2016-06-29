FROM node
RUN mkdir /app
COPY package.json /app
WORKDIR /app
RUN npm install
RUN npm install nodemon
ADD . /app
EXPOSE 3000
CMD ["npm", "start"]
