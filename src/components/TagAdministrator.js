import axios from "axios";

export default class {
  constructor() {
    const _this = this;
    this.hoge = "hoge";
    this.tags = [];

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

  echo() {
    console.log(this.hoge);
    return 111;
  }

  getAllTags(){
    return this.tags;
  }
}
