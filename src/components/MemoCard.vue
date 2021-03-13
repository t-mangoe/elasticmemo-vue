<template>
  <v-container>
    <v-card class="mx-auto" outlined @click.stop="dialog = true">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="75%">
      <v-card>
        <v-card-title class="headline">メモを編集</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="タイトル" v-model="title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="内容"
                value=""
                rows="10"
                v-model="message"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Update
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteMemo">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "MemoCard",
  methods: {
    deleteMemo() {
      console.log("delete memo.");
      const url =
        "http://192.168.11.50:9200/my_index/my_type/" + this.id + "?pretty";

      axios
        .delete(url)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.error("通信失敗！！");
          console.error(error);
        });

      this.dialog = false;
    },
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "タイトルなし",
    },
    message: {
      type: String,
      default: "",
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

<style scoped>
</style>