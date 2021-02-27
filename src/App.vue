<template>
  <div id="app">
    <CardArea @pre-loader="PreLoaderShow = $event"></CardArea>
    <CreateMemoButton></CreateMemoButton>
    <PreLoader :show="PreLoaderShow"></PreLoader>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import CardArea from "./components/CardArea.vue";
import PreLoader from "./components/PreLoader.vue";
import CreateMemoButton from "./components/CreateMemoButton.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    PreLoader,
    CardArea,
    CreateMemoButton,
  },
  data() {
    return {
      PreLoaderShow: false,
    };
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
