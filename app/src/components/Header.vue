<template>
  <v-app-bar color="pink lighten-2">
    <v-app-bar-nav-icon @click="openSideNav"></v-app-bar-nav-icon>

    <v-toolbar-title>Elasticsearchを使ったメモアプリ</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field
      hide-details
      single-line
      clearable
      prepend-inner-icon="mdi-magnify"
      v-model="searchWord"
      color="black"
      label="検索ワード"
      @keydown.enter="search"
      @click:prepend-inner="search"
      @click:clear="clearSearch"
    ></v-text-field>
    <!-- <v-btn icon @click="search">
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->
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
      this.$emit("search-event", this.searchWord);
    },
    clearSearch() {
      this.$emit("clear-search-event");
    },
    openSideNav() {
      this.$emit("open-navigation-drawer-event");
    },
  },
};
</script>

<style scoped></style>
