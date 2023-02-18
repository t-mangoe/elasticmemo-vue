const express = require("express");

// expressアプリを生成する
const app = express();

// 動作確認用の処理
app.get("/", function (req, res) {
  res.send("ページが表示されました！");
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log("Listening on port 3000"));
