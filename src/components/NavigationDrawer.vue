<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list nav>
      <v-list-group prepend-icon="mdi-tag" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Tags</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="tag in tags"
          :key="tag"
          @click="narrowTag(tag, $event)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ tag }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="dialog = true">
          <v-icon>
            mdi-plus
          </v-icon>
          タグを追加・編集
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-title class="headline">タグを追加</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="タグ名" v-model="newTagText"></v-text-field>
            </v-col>
          </v-row>

          <v-row v-for="tag in tags" :key="tag">
            <v-col md="auto">
              <v-icon>mdi-delete</v-icon>
            </v-col>
            <v-col>
              {{ tag }}
            </v-col>
            <v-col md="auto">
              <v-icon>mdi-pencil</v-icon>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="addTag">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
import TagAdministrator from "./TagAdministrator.js";

export default {
  name: "NavigationDrawer",
  data() {
    return {
      drawer: false,
      tags: [],
      dialog: false,
      newTagText: "",
      tagAdmin: null,
    };
  },
  mounted() {
    const tagAdmin = new TagAdministrator();
    tagAdmin.echo();
    // this.tagAdmin = TagAdministrator.hoge();

    axios
      .post("es/tags/_search")
      .then((response) => {
        console.log("通信成功！！");
        console.log(response);
        const tagData = response.data.hits.hits;
        this.tags = tagData.map((data) => data._source.tagName);
      })
      .catch((error) => {
        console.log("通信失敗！！");
        console.log(error);
      });
  },
  methods: {
    open() {
      this.drawer = true;
    },
    close() {
      this.drawer = false;
    },
    addTag() {
      const tagText = this.newTagText;
      axios
        .post("es/tags/tag_type/?pretty", {
          tagName: tagText,
        })
        .then((response) => {
          console.log(response);
          confirm("タグの追加に成功！！");
        })
        .catch((error) => {
          console.error(error);
          confirm("タグの追加に失敗。。");
        });
      this.newTagText = "";
      this.dialog = false;
    },
    narrowTag(tag, event) {
      console.log(event);
      confirm("narrow tag: " + tag);
      // 検索と同様に処理する。App.vue経由でCardArea.vueに処理を移す
      this.$emit("tag-narrow-event", tag);
    },
  },
};
</script>
