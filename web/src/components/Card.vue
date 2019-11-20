<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card-header d-flex ai-center pb-2">
      <i class="bl"></i>
      <div class="fs-xl flex-1 px-2">{{ title }}</div>
      <i class="sprite sprite-9" v-if="more"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true
    },
    more: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.card {
  .bl {
    display: inline-block;
    height: 12px;
    border-left: 1px solid map-get($colors, 'primary');
  }
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>
