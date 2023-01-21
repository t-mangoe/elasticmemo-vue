<template>
  <div v-if="show" id="preloader" class="preloader-background">
    <div class="text-center">
      <v-progress-circular
        indeterminate
        color="primary"
        :size="50"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreLoader",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.preloader-background {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  opacity: 0.5;

  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>