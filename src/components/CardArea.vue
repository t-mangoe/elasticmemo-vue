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
      console.log(this);
      axios
        .post("http://192.168.11.50:9200/my_index/_search", {
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
          this.memos = result;
          this.showPreLoader(false);
        })
        .catch(function (error) {
          console.error("通信失敗！！");
          console.error(error);
        });
    },
    window: (onload = function () {}),
  },
};
</script>

<style>
</style>