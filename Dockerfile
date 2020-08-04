FROM node:12 AS base

ENV NODE_ENV=production

WORKDIR /usr/src/app

FROM base AS builder

#RUN apt-get update
#RUN apt-get install -y build-essential

COPY package*.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM base AS runner

RUN apt-get update
RUN apt-get install -y mecab libmecab-dev mecab-ipadic-utf8 git make curl xz-utils file

# -a オプションを削るとビルド時のメモリが減ります
# 以下のセクションを実行せずにNEologd辞書をインストールしないこともできます (その場合configからmecabDicをコメントアウト)
RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git \
    && cd mecab-ipadic-neologd \
    && bin/install-mecab-ipadic-neologd -n -y -u -a

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/built ./built
COPY . ./

CMD ["npm", "start"]
