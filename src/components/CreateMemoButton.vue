<template>
  <!-- <a
    id="new-memo"
    class="waves-effect waves-light btn modal-trigger"
    href="#modal1"
    v-on:click.prevent="clicked"
    >新規作成</a
  > -->
  <!-- <v-app id="button"> -->
  <v-row>
    <v-btn color="primary" dark @click.stop="dialog = true">
      Open Dialog
    </v-btn>

    <v-dialog v-model="dialog" max-width="75%">
      <v-card>
        <v-card-title class="headline">メモを作成</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="タイトル" v-model="titleText"></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- marerializeのCSSと競合しているので、rowsはうまく反映されない -->
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
          <v-btn color="green darken-1" text @click="dialog = false">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <!-- </v-app> -->
</template>

<script>
export default {
  name: "CreateMemoButton",
  methods: {
    clicked() {
      console.log("クリックされました！！！");
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