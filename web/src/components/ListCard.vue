<template>
  <card :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{ active: active === i }"
        v-for="(category, i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-2">
      <swiper
        ref="list"
        :options="{autoHeight: true}"
        @slide-change="() => (active = $refs.list.swiper.realIndex)"
      >
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </card>
</template>

<script>
import Card from '../components/Card'
export default {
  props: {
    title: {
      type: String,
      require: true
    },
    categories: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      active: 0
    }
  },
  components: {
    Card
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
