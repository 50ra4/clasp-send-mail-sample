[![CI](https://github.com/50ra4/clasp-send-mail-sample/actions/workflows/ci.yml/badge.svg)](https://github.com/50ra4/clasp-send-mail-sample/actions/workflows/ci.yml) [![CD](https://github.com/50ra4/clasp-send-mail-sample/actions/workflows/cd.yml/badge.svg)](https://github.com/50ra4/clasp-send-mail-sample/actions/workflows/cd.yml)

clasp-send-mail-sample
====
## Description

ClaspとTypeScriptを利用して作成したGoogleAppScripts（GAS）のサンプルプロジェクト。

## Requirement

- node.js（14.16.0）のインストール
- GoogleのアカウントでGASの新しいプロジェクトを作成し、scriptIdを取得
- プロジェクトのスクリプトプロパティにkeyを`toEmailAddress`として、送信先のメールアドレスを設定（カンマ区切りで複数指定可）

## Usage

1. `git clone`

```bash
$ git clone https://github.com/50ra4/clasp-send-mail-sample.git
```

2. `npm packages`のインストール

```bash
$ npm install
```

3. `.clasp.json.sample`を参考に`.clasp.json`を作成


4. `Clasp`を使ってGoogleアカウントにログイン（ログインしている場合は不要）

```bash
$ npx clasp login
```

5. ソースコードをビルドし、GASにアップロード

```bash
$ npm run publish
```

6. GASのコンソールをブラウザで開く

```bash
$ npx clasp open
```

7. 必要に応じて、ブラウザでアップロードした関数の実行やトリガーの設定を行う

8. 関数の修正、追加がある場合、`src/entryPoint.ts`のglobalのプロパティに関数を追加し、5~7の手順を繰り返す

## Install

- node.js（14.16.0）

## Licence

[MIT](https://github.com/50ra4/clasp-send-mail-sample/blob/main/LICENSE)

## Author

[s.igarashi](https://github.com/50ra4)