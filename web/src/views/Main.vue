<template>
  <div>
    <div class="topbar bg-black py-1 px-1 d-flex ai-center">
      <img src="../assets/logo.jpg" alt="" height="35" />
      <div class="pl-2 d-flex flex-column jc-center ai-left">
        <div class="text-white">英雄联盟</div>
        <div class="text-grey-1 fs-xs">League of Legends</div>
      </div>
    </div>
    <div class="bg-primary py-1">
      <div class="nav text-white pt-1 nav-inverse jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
