[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## About

- 日本語のタイピングソフト向けにローマ字入力補助を行います
- 例えば「あいうえお」という文字列からローマ字「aiueo」の入力待ちを行い、ユーザの入力の成否をチェックが可能です
- 柔軟なローマ字入力に対応しており、例として「ちゃ」に対して「tya」「cha」「tixya」等の入力いずれも正として受けつけます。また小さな「っ」や「ん」で発生する特殊な入力にも対応しています
- ブラウザで動作するJavaScriptライブラリです
- かなとローマ字の対応はディクショナリ型設計のため、文字が不足する場合は誰でも簡単に追加できます（/src/instructionSet.js）

## Usage

### Browser

```html
<script src="https://cdn.jsdelivr.net/gh/satodai42/Firis/dist/bundle.js"></script>
```

### Node.js
##### Install package
```sh
npm install @satodai42/firis
```
```sh
yarn add @satodai42/firis
```

##### Example
```javascript
import Firis from 'https://cdn.jsdelivr.net/gh/satodai42/Firis/dist/bundle.js';

const firis = new Firis()
firis.createStringContainer("あいうえおかきくけこ") //入力してほしい文字列をセット

console.log(firis.getRomaji()) //["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko"]
console.log(firis.getKana()) //["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"]

firis.inputKey('a') //実際はキーボード入力を取得して入力文字をセット

console.log(firis.getEnteredRomaji()) //a
console.log(firis.getEnteredKana()) //あ

```

## License

このプロジェクトはMITライセンスの下でライセンスされています。詳細については、[LICENSE](LICENSE)ファイルをご覧ください。

