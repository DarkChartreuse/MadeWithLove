FROM node
RUN mkdir /usr/src/app
COPY package.json /usr/src/app
WORKDIR /usr/src/app
RUN npm config set registry http://registry.nodejitsu.com
RUN npm install
RUN npm config set registry http://registry.npmjs.org
ADD . /usr/src/app
EXPOSE 3000 5432 9200 9300
CMD ["npm", "run", "start_prod"]
