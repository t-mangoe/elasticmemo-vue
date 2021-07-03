<template>
  <v-app-bar color="pink lighten-2">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Elasticsearchを使ったメモアプリ</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-text-field
      hide-details
      single-line
      v-model="searchWord"
      color="black"
    ></v-text-field>
    <v-btn icon @click="search">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchWord: "",
    };
  },
  methods: {
    search() {
      // alert(this.searchWord);
      this.$emit("search-event", this.searchWord);
    },
  },
};
</script>

<style scoped></style>
