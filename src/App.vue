<template>
  <v-app>
    <div id="app">
      <Header @search-event="search"></Header>
      <CardArea @pre-loader="PreLoaderShow = $event" ref="cardArea"></CardArea>
      <CreateMemoButton @update-event="update"></CreateMemoButton>
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

export default {
  name: "App",

  components: {
    // HelloWorld,
    PreLoader,
    CardArea,
    CreateMemoButton,
    Header,
  },

  methods: {
    update() {
      this.$refs.cardArea.getMemos();
    },
    search(searchWord) {
      this.$refs.cardArea.search(searchWord);
    },
  },

  data: () => ({
    PreLoaderShow: false,
  }),
};
</script>
