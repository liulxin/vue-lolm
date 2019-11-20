<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-1 px-1 d-flex ai-center">
      <img src="../assets/logo.jpg" alt="" height="35" />
      <div class="pl-2 d-flex flex-column jc-center ai-left flex-1">
        <div class="text-white">英雄联盟</div>
        <div class="text-grey-1 fs-xs">League of Legends</div>
      </div>
      <router-link tag="div" to="/" class="more text-primary pr-2">
        <span class="pr-2">more</span>
        <i class="sprite sprite-9"></i>
      </router-link>
    </div>
    <!-- topbar end -->
    <div class="top">
      <img class="w-100" :src="model.banner" alt="" />
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div>{{ model.title }}</div>
        <h2 class="mt-1 fs-lg">{{ model.name }}</h2>
        <div>{{ model.categories.map(v => v.name).join('/') }}</div>
        <div class="d-flex jc-between mt-1">
          <div class="scores" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary mr-2">
              {{ model.scores.difficult }}
            </span>
            <span>技能</span>
            <span class="badge bg-primary mr-2">
              {{ model.scores.skills }}
            </span>
            <span>攻击</span>
            <span class="badge bg-primary mr-2">
              {{ model.scores.attack }}
            </span>
            <span>生存</span>
            <span class="badge bg-primary mr-2">
              {{ model.scores.survive }}
            </span>
          </div>
          <div class="skin-num text-primary fs-sm" @click="previewSkins">
            <span>皮肤：</span>
            <span>{{ model.skins.length }}</span>
            <i class="sprite sprite-9"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- top end -->
    <card title="背景故事" :more="false">
      <div class="tips">{{ model.tale }}</div>
    </card>
    <!-- tale end -->
    <card title="技能介绍" :more="false">
      <div class="d-flex jc-between skill-nav">
        <div
          class="skill-nav-item"
          v-for="(skill, i) in model.skills"
          :key="skill._id"
          :class="{ active: skillAc === i }"
          @click="skillAc = i"
        >
          <img class="w-100" :src="skill.icon" alt="" />
        </div>
      </div>
      <div class="mt-2 p-1">
        <div
          class="skill-nav-cont"
          v-for="(skill, i) in model.skills"
          :key="skill._id"
          :class="{ active: skillAc === i }"
        >
          <div>
            {{ skill.name }} <span class="text-grey">{{ skill.tips }}</span>
          </div>
          <div class="bb mt-2"></div>
          <div class="mt-2" style="line-height: 1.5">
            {{ skill.description }}
          </div>
        </div>
      </div>
    </card>
    <!-- skill end -->
    <card title="峡谷出装" :more="false">
      <div class="d-flex jc-start">
        <div v-for="good in model.goods1" :key="good._id" class="good mr-2">
          <img class="w-100" :src="good.icon" alt="" />
        </div>
      </div>
    </card>
    <!-- goods1 end -->
    <card title="极地出装" :more="false">
      <div class="d-flex jc-start">
        <div v-for="good in model.goods1" :key="good._id" class="good mr-2">
          <img class="w-100" :src="good.icon" alt="" />
        </div>
      </div>
    </card>
    <!-- goods2 end -->
    <card title="使用技巧" :more="false">
      <div class="tips">{{ model.usageTips }}</div>
    </card>
    <!-- usageTips end -->
    <card title="对抗技巧" :more="false">
      <div class="tips">{{ model.battleTips }}</div>
    </card>
    <!-- battleTips end -->
    <privew-pic ref="privew" :items="model.skins"></privew-pic>
  </div>
</template>

<script>
import Card from '../components/Card'
import PrivewPic from '../components/PrivewPic'
export default {
  data() {
    return {
      model: null,
      skillAc: 0
    }
  },
  props: {
    id: {
      require: true
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heros/${this.id}`)
      this.model = res.data
    },
    previewSkins() {
      this.$refs.privew.open()
    }
  },
  created() {
    this.fetch()
  },
  components: { Card, PrivewPic }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.page-hero {
  .top {
    position: relative;
    top: 0;
    left: 0;
    .info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
      .scores {
        .badge {
          text-align: center;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          border-radius: 50%;
          margin-left: 0.3rem;
        }
      }
    }
  }
  .skill-nav-item {
    width: 4.6154rem;
    height: 4.6154rem;
    border-radius: 50%;
    overflow: hidden;
    &.active {
      border: 1px solid map-get($colors, 'primary');
      box-shadow: 0 0 2px 2px map-get($colors, 'primary');
    }
  }
  .skill-nav-cont {
    display: none;
    .bb {
      border-bottom: 1px solid map-get($colors, 'primary');
    }
    &.active {
      display: block;
    }
  }
  .good {
    width: 4.6154rem;
    height: 4.6154rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .tips {
    line-height: 1.5;
  }
}
</style>
