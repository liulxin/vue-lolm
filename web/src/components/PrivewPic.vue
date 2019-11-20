<template>
  <div
    class="priview-pic d-flex flex-column jc-center"
    :class="{ active: show }"
    @click.self="onClose"
  >
    <div>
      <span class="text-white p-2"
        >{{ active + 1 }} / {{ num }} -- {{ name }}</span
      >
      <swiper
        ref="list"
        @slide-change="() => (active = $refs.list.swiper.realIndex)"
      >
        <swiper-slide v-for="item in items" :key="item._id">
          <img class="w-100" :src="item.pic" alt="" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      active: 0,
      show: false
    }
  },
  computed: {
    num() {
      return this.items.length
    },
    name() {
      return this.items[this.active].name
    }
  },
  methods: {
    onClose() {
      this.show = false
    },
    open() {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.priview-pic {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: none;
  transition: all 0.3s;
  background: rgba(0, 0, 0, 0.6);
  &.active {
    opacity: 1;
    display: flex;
    z-index: 9999;
  }
  .w-100 {
    width: 100%;
  }
}
</style>
