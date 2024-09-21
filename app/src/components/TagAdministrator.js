import axios from "axios";

export default class {
  constructor() {
    this.hoge = "hoge";
    this.tags = [];

    this.updateTagInfo();
  }

  echo() {
    console.log(this.hoge);
    return 111;
  }

  updateTagInfo() {
    // サーバからタグ情報を取得し、this.tags変数の状態を更新する
    const _this = this;

    axios
      .post("es/tags/_search")
      .then((response) => {
        console.log("通信成功！！");
        console.log(response);
        const tagData = response.data.hits.hits;
        _this.tags = tagData.map((data) => data._source.tagName);
      })
      .catch((error) => {
        console.log("通信失敗！！");
        console.log(error);
      });
  }

  getAllTags() {
    return this.tags;
  }
}
