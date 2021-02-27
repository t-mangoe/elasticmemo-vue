<template>
  <div v-if="show" id="preloader" class="preloader-background">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
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