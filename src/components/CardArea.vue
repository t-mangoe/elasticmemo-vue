<template>
  <div id="card-area">
    <MemoCard
      v-for="(memo, key) in memos"
      :id="memo.id"
      :key="key"
      :title="memo.title"
      :message="memo.message"
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
    // alert("データ追加！！！");
    // this.datas.push("cccc");
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
        .post("/es/my_index/_search", {
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
    search(searchWord) {
      const _this = this;
      this.showPreLoader(true);
      // 検索処理
      axios
        // .post("http://192.168.11.50:9200/my_index/_search", {
        .post("/es/my_index/_search", {
          query: {
            match: {
              message: searchWord,
            },
          },
        })
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
