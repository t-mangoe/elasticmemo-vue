<template>
  <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey lighten-5">
        <div class="card-content blue-grey-text text-darken-4">
          <span class="card-title">{{ title }}</span>
          <p>
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </div>
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