<template>
  <v-app>
    <div id="app">
      <Header
        @search-event="search"
        @clear-search-event="clearSearch"
        @open-navigation-drawer-event="openNavigationDrawer"
      ></Header>
      <NavigationDrawer
        @tag-narrow-event="filterByTag"
        @refresh-cardarea-event="update"
        ref="navigationDrawer"
      ></NavigationDrawer>
      <CreateMemoButton @create-event="addMemoToCardArea"></CreateMemoButton>
      <CardArea @pre-loader="PreLoaderShow = $event" ref="cardArea"></CardArea>
      <PreLoader :show="PreLoaderShow"></PreLoader>
    </div>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import CardArea from "./components/CardArea.vue";
import PreLoader from "./components/PreLoader.vue";
import CreateMemoButton from "./components/CreateMemoButton.vue";
import Header from "./components/Header.vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";

export default {
  name: "App",

  components: {
    // HelloWorld,
    PreLoader,
    CardArea,
    CreateMemoButton,
    Header,
    NavigationDrawer,
  },

  methods: {
    update() {
      this.$refs.cardArea.getMemos();
    },
    search(searchWord) {
      this.$refs.cardArea.search({ searchWord });
    },
    clearSearch() {
      this.$refs.cardArea.resetSearch();
    },
    openNavigationDrawer() {
      this.$refs.navigationDrawer.open();
    },
    filterByTag(tag) {
      console.log(tag);
      this.$refs.cardArea.search({ tagName: tag });
    },
    addMemoToCardArea(memo) {
      this.$refs.cardArea.addMemo(memo);
    },
  },

  data: () => ({
    PreLoaderShow: false,
  }),
};
</script>
