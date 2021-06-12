<template>
  <v-container>
    <v-btn color="primary" dark @click.stop="dialog = true"> Create </v-btn>

    <v-dialog v-model="dialog" max-width="75%">
      <v-card>
        <v-card-title class="headline">メモを作成</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="タイトル" v-model="titleText"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="内容"
                value=""
                rows="10"
                v-model="contentsText"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="createMemo">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateMemoButton",
  methods: {
    clicked() {
      console.log("クリックされました！！！");
    },
    createMemo() {
      console.log("メモを作成します");
      console.log(this.titleText);
      console.log(this.contentsText);
      const date = new Date();
      const dateStr = date.toISOString();

      axios
        .post("http://192.168.11.50:9200/my_index/my_type/?pretty", {
          user_name: "user",
          date: dateStr,
          title: this.titleText,
          message: this.contentsText,
        })
        .then((response) => {
          console.log(response);
          this.$emit("update-event");
        })
        .catch(function(error) {
          console.error("通信失敗！！");
          console.error(error);
        });

      this.titleText = "";
      this.contentsText = "";
      this.dialog = false;
    },
  },
  data() {
    return {
      dialog: false,
      titleText: "",
      contentsText: "",
    };
  },
};
</script>

<style scoped></style>
