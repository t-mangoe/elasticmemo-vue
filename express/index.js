const express = require("express");
const axiosBase = require("axios");
const axios = axiosBase.create({
  baseURL: "http://es:9200/",
});
const bodyParser = require("body-parser");

// expressアプリを生成する
const app = express();

// body-parserの設定
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// 動作確認用の処理
app.get("/", function (req, res) {
  res.send("ページが表示されました！");
});

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

// メモを検索する処理
app.post("/search-memo", function (req, res) {
  const option = req.body;
  console.log("req = " + req);
  console.log("option = " + option);
  axios
    .post("/my_index/_search", option)
    .then((response) => {
      console.log("ElasticSearchからのデータ検索に成功しました");
      console.log(response);
      const data = response.data;
      res.send(JSON.stringify(data));
    })
    .catch((error) => {
      console.error("メモの検索に失敗！！");
      console.error(error);
      res.status(500);
      res.send(error);
    });
});

// メモを新規作成する処理
app.post("/create-memo", function (req, res) {
  const option = req.body;
  console.log("req = " + req);
  console.log("option = " + option);
  axios
    .post("/my_index/my_type/?pretty", option)
    .then((response) => {
      console.log("新規メモの作成に成功しました");
      console.log(response);
      const data = response.data;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      console.error("新規メモの作成に失敗！！");
      console.error(error);
      res.status(500);
      res.send(error);
    });
});

// メモを更新する処理
app.put("/update-memo", function (req, res) {
  const option = req.body;
  console.log("req = " + req);
  console.log("option = " + option);
  const id = option.id;
  const url = "/my_index/my_type/" + id + "?pretty";
  const updated_data = option.updated_data;

  axios
    .put(url, updated_data)
    .then((response) => {
      console.log("メモの更新に成功しました");
      console.log(response);
      const data = response.data;
      res.send(JSON.stringify(data));
    })
    .catch((error) => {
      console.error("メモの更新に失敗！！");
      console.error(error);
      res.status(500);
      res.send(error);
    });
});

// メモを削除する処理
app.delete("/delete-memo", function (req, res) {
  const option = req.body;
  console.log("req = " + req);
  console.log("option = " + option);
  const id = option.id;
  const url = "/my_index/my_type/" + id + "?pretty";

  axios
    .delete(url)
    .then((response) => {
      console.log("メモの削除に成功しました");
      console.log(response);
      const data = response.data;
      res.send(JSON.stringify(data));
    })
    .catch((error) => {
      console.error("メモの削除に失敗！！");
      console.error(error);
      res.status(500);
      res.send(error);
    });
});

// タグを削除する処理。メモからタグを外すのではなく、タグの存在を消す。
app.delete("/delete-tag", async function (req, res) {
  const request_body = req.body;
  console.log("req = " + req);
  console.log("request_body = " + request_body);
  const delete_tag_id = request_body.delete_tag_id;
  const delete_tag_name = request_body.delete_tag_name;
  const url = "/tags/tag_type/" + delete_tag_id;

  const delete_tag_from_memo_func = async (delete_tag_name) => {
    // メモからタグを削除する処理
    const search_query = {
      query: {
        bool: {
          must: [
            {
              term: {
                "tags.keyword": delete_tag_name,
              },
            },
          ],
        },
      },
    };

    await axios
      .post("/my_index/_search", search_query)
      .then((response) => {
        console.log("ElasticSearchからのデータ検索に成功しました");
        console.log(response);

        const memos = response.data.hits.hits;
        memos.forEach(async (element) => {
          const memo_id = element._id;
          const memo_data = element._source;
          // 現在のタグ。削除するタグを消す前の状態
          const current_tags = memo_data.tags;
          // 更新後のタグ。削除するタグを除いたものたち
          const new_tags = current_tags.filter((e) => {
            return e !== delete_tag_name;
          });
          console.log(new_tags);

          const url = "/my_index/my_type/" + memo_id + "/_update";
          // メモを更新する。部分更新は、以下のようにdocを使用する。
          await axios
            .post(url, {
              doc: {
                tags: new_tags,
              },
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
        });
        return;
      })
      .catch((error) => {
        console.error("メモの検索に失敗！！");
        console.error(error);
        return;
      });
  };

  await axios
    .delete(url)
    .then(async (response) => {
      console.log("タグの削除処理に成功");
      console.log(response);

      // 削除したタグがつけられたメモをESから取得する。取得したメモから、削除したタグを取り除く。
      // メモからタグの削除が終わるまで待つ必要あるので、async/awaitを使う
      await delete_tag_from_memo_func(delete_tag_name);

      const data = response.data;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      console.error("タグを削除する通信に失敗！！");
      console.error(error);
      res.status(500);
      res.send(error);
    });
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log("Listening on port 3000"));
