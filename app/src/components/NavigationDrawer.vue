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
          :key="tag.id"
          @click="narrowTag(tag, $event)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ tag.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="openDialog">
          <v-icon>
            mdi-plus
          </v-icon>
          タグを追加・編集
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-title>タグの新規作成</v-card-title>
        <v-container>
          <v-row>
            <v-col class="pa-1" offset="1">
              <v-text-field label="タグ名" v-model="newTagText"></v-text-field>
            </v-col>
            <v-col md="1">
              <v-icon @click="addTag">mdi-plus-circle</v-icon>
            </v-col>
          </v-row>

          <v-card-subtitle>タグ一覧</v-card-subtitle>
          <v-row v-for="tag in tags" :key="tag.id">
            <v-col md="1" align-content="center">
              <v-icon @click="deleteTag(tag)">mdi-delete</v-icon>
            </v-col>
            <v-col class="pa-1">
              <v-text-field
                class="pt-0"
                v-model="tag.editingText"
              ></v-text-field>
            </v-col>
            <v-col md="1">
              <v-icon @click="editTag(tag)">mdi-pencil</v-icon>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <!-- <v-btn color="green darken-1" text @click="addTag">
            Create
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
// import TagAdministrator from "./TagAdministrator.js";

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
    // const tagAdmin = new TagAdministrator();
    // tagAdmin.echo();
    // this.tagAdmin = TagAdministrator.hoge();

    this.getAndUpdateTags();
  },
  methods: {
    open() {
      this.drawer = true;
    },
    close() {
      this.drawer = false;
    },
    openDialog() {
      this.dialog = true;
      // タグ編集用の文字列を作成。原本(name)をコピーするだけ
      // this.tags.forEach((tag) => {
      //   tag.editingText = tag.name;
      // });
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
          this.getAndUpdateTags();
        })
        .catch((error) => {
          console.error(error);
          confirm("タグの追加に失敗。。");
        });
      this.newTagText = "";
      // this.dialog = false;
    },
    narrowTag(tag, event) {
      console.log(event);
      confirm("narrow tag: " + tag.name);
      // 検索と同様に処理する。App.vue経由でCardArea.vueに処理を移す
      this.$emit("tag-narrow-event", tag.name);
    },
    deleteTag(tag) {
      confirm("タグを削除します。ID:" + tag.id);
      const url = "/express/delete-tag/";
      const sendedData = {
        delete_tag_id: tag.id,
        delete_tag_name: tag.name,
      };

      axios
        .delete(url, {
          data: sendedData,
        })
        .then((response) => {
          console.log(response);
          confirm("タグの削除に成功");
          this.getAndUpdateTags();
          this.refreshCardArea();
        })
        .catch((error) => {
          console.error(error);
          confirm("タグの削除に失敗");
        });
    },
    editTag(tag) {
      confirm("タグを編集します：" + tag.editingText);
      // const oldTagName = tag.name;
      axios
        .post("es/tags/_update/" + tag.id, {
          doc: {
            tagName: tag.editingText,
          },
        })
        .then((response) => {
          console.log(response);
          confirm("タグの編集に成功");
          this.getAndUpdateTags();
          // TODO: メモに設定されているタグの情報について、更新処理をかける
          // タグの管理は、ESでやるより、RDBを使ったほうが、情報が多くてやりやすいかな？
          // TODO: 直接ESを参照しようとするより、APサーバを経由させたほうがいいと思う。タグの管理のためにも。
          // this.updateTagInMemos(oldTagName, tag.editingText);
        })
        .catch((error) => {
          console.error(error);
          confirm("タグの編集に失敗");
        });
    },
    async getAndUpdateTags() {
      this.tags = [];

      // TODO: 以下でタグの検索をしているが、タグの情報はTagAdministratorに任せたほうがよい
      // axios
      //   .post("es/tags/_search")
      //   .then((response) => {
      //     console.log("通信成功！！");
      //     console.log(response);
      //     const tagData = response.data.hits.hits;
      //     this.tags = tagData.map((data) => ({
      //       id: data._id,
      //       name: data._source.tagName,
      //       // タグ編集用の文字列を作成。原本(name)をコピーするだけ
      //       editingText: data._source.tagName,
      //     }));

      //     this.$tagAdmin.updateTagInfo();
      //   })
      //   .catch((error) => {
      //     console.log("通信失敗！！");
      //     console.log(error);
      //   });

      await this.$tagAdmin.updateTagInfo().then(() => {
        this.tags = this.$tagAdmin.getAllTagData().map((data) => ({
          id: data.id,
          name: data.name,
          // タグ編集用の文字列を作成。原本(name)をコピーするだけ
          editingText: data.name,
        }));
      });
    },
    refreshCardArea() {
      // App.vue経由でCardArea.vueに処理を移す
      this.$emit("refresh-cardarea-event");
    },

    updateTagInMemos(oldTagName, newTagName) {
      // メモに設定されているタグ情報を更新する
      // うまく機能していません！！！将来的には廃止予定！
      axios.post("es/my_index/_update_by_query", {
        script: {
          source:
            "if (ctx._source.tags.contains(params.oldTag)) { ctx._source.tags.remove[ctx._source.tags.indexOf(params.oldTag)] = newTagName }",
          lang: "painless",
          params: {
            oldTag: oldTagName,
            newTag: newTagName,
          },
        },
        query: {
          term: {
            tags: oldTagName,
          },
        },
      });
    },
  },
};
</script>
