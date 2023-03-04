const express = require("express");
const axiosBase = require("axios");
const axios = axiosBase.create({
  baseURL: "http://es:9200/",
});

// expressアプリを生成する
const app = express();

// 動作確認用の処理
app.get("/", function (req, res) {
  res.send("ページが表示されました！");
});

// TODO: ElasticSearchとの通信処理を作成する

axios.defaults.base;

// メモを取得する処理
app.get("/get-memo", function (req, res) {
  axios
    .post("/my_index/_search", {
      sort: [
        {
          date: "desc",
        },
      ],
    })
    .then((response) => {
      console.log("ElasticSearchからのデータ取得に成功しました");
      console.log(response);
      const data = response.data;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      console.error("ElasticSearchからのデータ取得に失敗！！");
      console.error(error);
      res.status(500);
      res.send(error);
    });
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log("Listening on port 3000"));
