import path from 'path';
import { fileURLToPath } from 'url';

// __dirname を ES6 モジュールで使用するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//webpackの出力設定
export default {
  //実行開始地点となるファイル
  entry: './src/index.js',
  //出力先
  output: {
    //カレントパス/dist
    path: path.resolve(__dirname, "dist"),
    //出力ファイル名
    filename: "bundle.js",
    library: {
      type: 'module',
    },

  },
  experiments: {
    outputModule: true,
  },
  //依存関係解決の対象とするモジュール
  module: {
  },
  //webpack-dev-serverの起動設定
  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
    },
    devMiddleware: {
      publicPath: '/dist/'
    },
    host: "127.0.0.1",
    port: 9000,
    open: true,
    hot: false
  },
  resolve: {
    extensions: [".js"],
  }
};