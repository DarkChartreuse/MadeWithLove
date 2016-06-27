FROM node
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
RUN npm install nodemon
EXPOSE 3000
CMD ["npm", "start"]
