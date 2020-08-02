FROM node:12

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN apt-get update
RUN apt-get install -y mecab libmecab-dev mecab-ipadic-utf8 git make curl xz-utils file

CMD ["npm", "start"]
