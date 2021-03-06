<template>
  <v-container>
    <v-card class="mx-auto" outlined>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "MemoCard",
  props: {
    title: {
      type: String,
      default: "タイトルなし",
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
</style>