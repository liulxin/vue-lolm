<template>
  <div class="page-article" v-if="article">
    <div class="d-flex py-3 px-2 ai-center">
      <router-link tag="i" to="/" class="sprite sprite-10"></router-link>
      <div class="flex-1 px-2 text-primary text-ellipse">
        {{ article.title }}
      </div>
      <div class="text-grey fs-xss">{{ article.createdAt | date }}</div>
    </div>
    <div v-html="article.body" class="body px-2 py-1"></div>
    <div class="text-primary px-2 pt-2">
      相关资讯
    </div>
    <div>
      <router-link
        class="px-2 mt-2"
        tag="div"
        :to="`/article/${item._id}`"
        v-for="item in article.related"
        :key="item._id"
      >
        {{ item.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      article: null
    }
  },
  props: {
    id: {
      type: String,
      require: true
    }
  },
  watch: {
    // id() {
    //   this.fetch()
    // }
    id: 'fetch'
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let res = await this.$http.get(`article/${this.id}`)
      this.article = res.data
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.page-article {
  .body {
    text-align: left;
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    line-height: 1.5;
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
