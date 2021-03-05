<template>
  <v-app>
    <div id="app">
      <Header></Header>
      <CardArea @pre-loader="PreLoaderShow = $event"></CardArea>
      <CreateMemoButton></CreateMemoButton>
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

  data: () => ({
    PreLoaderShow: false,
  }),
};
</script>
