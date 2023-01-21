<template>
  <v-container>
    <v-card class="mx-auto" outlined @click.stop="openEditWindow">
      <!-- <v-card-title class="headline">{{ editingTitle }}</v-card-title> -->
      <v-card-title class="headline">{{ title }}</v-card-title>
      <!-- <v-card-text>{{ editingMessage }}</v-card-text> -->
      <v-card-text class="card-text">{{ message }}</v-card-text>
      <v-card-text>
        <v-chip v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
      </v-card-text>
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
            <v-col cols="12">
              <v-select
                v-model="editingTags"
                :items="items"
                chips
                label="タグ"
                multiple
              ></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="updateMemo">
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
      const _this = this;
      console.log("delete memo.");
      const url = "/es/my_index/my_type/" + this.id + "?pretty";

      axios
        .delete(url)
        .then((response) => {
          console.log(response);

          this.$emit("delete-memo-event", _this.id);
        })
        .catch(function(error) {
          console.error("通信失敗！！");
          console.error(error);
        });

      this.dialog = false;
    },
    updateMemo() {
      console.log("update memo.");
      const date = new Date();
      const dateStr = date.toISOString();
      const url = "/es/my_index/my_type/" + this.id + "?pretty";
      const title = this.title;
      const message = this.message;

      axios
        .put(url, {
          user_name: "user",
          date: dateStr,
          title,
          message,
          tags: this.editingTags,
        })
        .then((response) => {
          console.log(response);
          this.tags = this.editingTags;
        })
        .catch((error) => {
          console.error(error);
        });
      this.dialog = false;
    },
    openEditWindow() {
      const tagAdmin = this.$tagAdmin;
      this.items = tagAdmin.getAllTags();
      this.editingTags = this.tags;
      this.dialog = true;
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
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      items: ["foo", "bar", "fizz", "buzz"],
      editingTags: [],
      // editingTitle: this.title,
      // editingMessage: this.message,
    };
  },
};
</script>

<style scoped>
.card-text {
  white-space: pre-line;
}
</style>
