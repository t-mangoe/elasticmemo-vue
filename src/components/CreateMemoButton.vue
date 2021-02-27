<template>
  <a
    id="new-memo"
    class="waves-effect waves-light btn modal-trigger"
    href="#modal1"
    v-on:click.prevent="clicked"
    >新規作成</a
  >
</template>

<script>
export default {
  name: "CreateMemoButton",
  methods: {
    clicked() {
      console.log("クリックされました！！！");
    },
  },
};
</script>

<style scoped>
</style>