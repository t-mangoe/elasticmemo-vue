<template>
  <div id="card-area">
    <MemoCard
      v-for="(memo, key) in memos"
      :id="memo.id"
      :key="key"
      :title="memo.title"
      :message="memo.message"
      :tags="memo.tags"
      @delete-memo-event="deleteMemo"
    ></MemoCard>
    <ul v-for="(d, key) in datas" :key="key">
      <li>{{ d }}</li>
    </ul>
    <v-btn
      id="reset-btn"
      v-if="searching"
      color="primary"
      dark
      @click.stop="resetSearch"
    >
      Reset
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import MemoCard from "./MemoCard.vue";

export default {
  components: { MemoCard },
  name: "CardArea",
  data() {
    return {
      datas: [],
      memos: [],
      searching: false,
    };
  },
  mounted() {
    console.log("CardAreaを表示します");
    this.showPreLoader(true);

    this.getMemos();
  },
  methods: {
    showPreLoader(flag) {
      this.$emit("pre-loader", flag);
    },

    getMemos() {
      const _this = this;
      console.log(this);
      axios
        // .post("/es/my_index/_search", {
        .get("/express/get-memo/", {
          sort: [
            {
              date: "desc",
            },
          ],
        })
        .then((response) => {
          console.log("通信成功！！");
          console.log(response);
          const hitsArray = response.data.hits.hits;
          console.log(hitsArray);
          const result = [];
          for (const elem of hitsArray) {
            const tmp = {};
            tmp.id = elem._id;
            tmp.title = elem._source.title;
            tmp.message = elem._source.message;
            tmp.tags = elem._source.tags;
            result.push(tmp);
          }
          // メモを一旦全削除
          _this.memos.splice(0, _this.memos.length);
          // 再度入れ直す
          _this.memos.push(...result);
          _this.showPreLoader(false);
        })
        .catch(function(error) {
          console.error("通信失敗！！");
          console.error(error);
          _this.showPreLoader(false);
        });
    },

    addMemo(memo) {
      this.memos.unshift(memo);
    },

    deleteMemo(id) {
      console.log("ローカルのメモを削除します id = " + id);
      this.memos = this.memos.filter((item) => item.id != id);
    },

    search({ searchWord = "", tagName = "" } = {}) {
      const _this = this;
      this.showPreLoader(true);
      const term = {};
      // タイトル部分も検索対象とするように拡張
      const multi_match = {};
      multi_match.fields = ["title", "message"];
      const must_queries = [];
      if (searchWord !== "") {
        multi_match.query = searchWord;
        must_queries.push({ multi_match });
      }
      if (tagName !== "") {
        // タグは、keywordを使って完全一致の検索とする
        term["tags.keyword"] = tagName;
        must_queries.push({ term });
      }
      const option = {
        query: {
          bool: {
            must: must_queries,
          },
        },
      };
      // 検索処理
      // TODO: express経由でESのデータを取得できるようにする
      axios
        // .post("/es/my_index/_search", option)
        .post("/express/search-memo/", option)
        .then((response) => {
          _this.searching = true;
          console.log(response);
          const hitsArray = response.data.hits.hits;
          const result = [];
          for (const elem of hitsArray) {
            const tmp = {};
            tmp.id = elem._id;
            tmp.title = elem._source.title;
            tmp.message = elem._source.message;
            tmp.tags = elem._source.tags;
            result.push(tmp);
          }
          // メモを一旦全削除
          _this.memos.splice(0, _this.memos.length);
          // 再度入れ直す
          _this.memos.push(...result);
          _this.showPreLoader(false);
        })
        .catch((error) => {
          console.error("通信失敗！！");
          console.error(error);
          _this.showPreLoader(false);
        });
    },

    resetSearch() {
      this.searching = false;
      this.getMemos();
    },
    window: (onload = function() {}),
  },
};
</script>

<style>
#reset-btn {
  display: block;
  margin: 0 0 0 80%;
}
</style>
