# mecab-server

mecabを実行して結果を返すだけのサーバー

## インストール

1. mecab と mecab-ipadic-NEologd などを入れる  
   https://github.com/neologd/mecab-ipadic-neologd/blob/master/README.ja.md
2. `config.example.yml` を `config.yml` としてコピーしてパス等を変える
3. `yarn install && yarn build`
4. `PORT=3062 yarn start`

## 使い方

`GET http://localhost:3062/?text=テキスト`

とか

`POST http://localhost:3062/`
```json
{
  "text": "テキスト"
}
```