<template>
  <el-container style="height: 100vh;">
    <el-aside width=" 200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :unique-opened="true" :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>内容管理</template
          >
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/edit">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/goods/edit">新建物品</el-menu-item>
            <el-menu-item index="/goods/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heros/edit">新建英雄</el-menu-item>
            <el-menu-item index="/heros/list">英雄列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-message"></i>运营管理</template
          >
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/edit">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/edit">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-message"></i>系统管理</template
          >
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_user/edit">新建管理员</el-menu-item>
            <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="loginOut">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ name }}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  async created() {
    let res = await this.$http.get('info')
    this.name = res.data.name
  },
  methods: {
    loginOut() {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scope>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>
