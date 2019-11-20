<template>
  <div class="home">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="ad in adsList" :key="ad._id">
        <a class="ads-a" :href="ad.url">
          <img class="w-100" :src="ad.image" alt="" />
        </a>
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-1"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1 fs-xs">
      <div class="d-flex flex-wrap icons" :class="{ collapse: !collapse }">
        <div class="nav-item mb-3">
          <i class="sprite sprite-1"></i>
          <div>秩序殿堂</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-2"></i>
          <div>游戏资料</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-3"></i>
          <div>峡谷之巅</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-4"></i>
          <div>云顶之弈</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-5"></i>
          <div>攻略中心</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-6"></i>
          <div>LOL宇宙</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-7"></i>
          <div>微信绑定</div>
        </div>
      </div>
      <div
        class="bg-light py-2 fs-sm text-center text-primary"
        @click="collapse = !collapse"
      >
        <i
          class="sprite sprite-9"
          :class="{ 'rotate--90': collapse, 'rotate-90': !collapse }"
        ></i>
        {{ collapse ? '收起' : '展开' }}
      </div>
    </div>
    <!-- end of icons -->
    <list-card title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/article/${news._id}`"
          class="py-2 d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-primary">[{{ news.categoryName }}]</span>
          <span class="px-1"></span>
          <span class="flex-1 text-ellipse text-dark-1">{{ news.title }}</span>
          <span class="text-grey fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </list-card>
    <!-- end of news -->
    <list-card title="英雄列表" :categories="herosList">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/hero/${hero._id}`"
            class="text-center p-2 fs-xss"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img class="w-100" :src="hero.avatar" alt="" />
            <div>{{ hero.title.slice(0, 4) }}</div>
          </router-link>
        </div>
      </template>
    </list-card>
    <!-- end of heros -->
    <list-card title="精彩视频"></list-card>
    <list-card title="热门专辑"></list-card>
  </div>
</template>

<script>
import ListCard from '../components/ListCard'
import dayjs from 'dayjs'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM-DD')
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      },
      collapse: true,
      newsCats: [],
      adsList: [],
      herosList: []
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchAdsList()
    this.fetchHerosList()
  },
  methods: {
    async fetchNewsCats() {
      let res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchAdsList() {
      let res = await this.$http.get('ads/list')
      this.adsList = res.data
    },
    async fetchHerosList() {
      let res = await this.$http.get('heros/list')
      this.herosList = res.data
    }
  },
  components: {
    ListCard
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.ads-a {
  display: inline-block;
}
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  transition: all 0.3s;
  .icons {
    &.collapse {
      height: 3.8462rem;
      overflow: hidden;
    }
  }
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
