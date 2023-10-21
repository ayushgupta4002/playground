FROM node:latest

COPY package.json /home/test_network_aws/

WORKDIR /home/test_network_aws/

RUN npm install

COPY . /home/test_network_aws/



EXPOSE 5001

CMD ["npm", "run","dev"]