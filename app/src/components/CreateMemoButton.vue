<template>
  <v-container>
    <v-speed-dial
      v-model="speedDial"
      absolute
      bottom
      right
      direction="top"
      transition="scale-transition"
    >
      <template v-slot:activator>
        <v-btn color="primary" fab dark @click.stop="openCreateMemoWindow">
          <v-icon v-if="speedDial">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>

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
          <v-row>
            <v-select
              v-model="tags"
              :items="items"
              chips
              label="Tags"
              multiple
              solo
            ></v-select>
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

      const title = this.titleText;
      const message = this.contentsText;
      const tags = this.tags;

      axios
        // .post("/es/my_index/my_type/?pretty", {
        .post("/express/create-memo", {
          user_name: "user",
          date: dateStr,
          title,
          message,
          tags,
        })
        .then((response) => {
          console.log(response);
          const id = response.data._id;

          const memo = {
            id,
            title,
            message,
            tags,
          };

          // this.$emit("update-event");
          this.$emit("create-event", memo);
        })
        .catch(function(error) {
          console.error("通信失敗！！");
          console.error(error);
        });

      this.titleText = "";
      this.contentsText = "";
      this.dialog = false;
    },
    openCreateMemoWindow() {
      const tagAdmin = this.$tagAdmin;
      this.items = tagAdmin.getAllTagName();
      this.dialog = true;
    },
  },
  data() {
    return {
      dialog: false,
      speedDial: false,
      titleText: "",
      contentsText: "",
      tags: [],
      items: ["foo", "bar", "fizz", "buzz"],
    };
  },
};
</script>

<style scoped></style>
