<template>
  <div class="about">
    <h2>{{ id ? '编辑' : '新建' }}管理员</h2>
    <el-form @submit.native.prevent="save" label-position="right" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model.trim="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model.trim="model.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async save() {
      let res
      // 未输入名称
      if (!this.model.username) {
        this.$message({
          type: 'warning',
          message: '请输入用户名'
        })
        return
      }
      // 是否是编辑
      if (this.id) {
        res = await this.$http.put(`rest/admin_user/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/admin_user', this.model)
      }
      console.log(res)
      this.$router.push('/admin_user/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      let res = await this.$http.get(`rest/admin_user/${this.id}`)
      this.model = res.data
    }
  },
  // 处理菜单点击渲染未正常显示bug
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.model = { username: '', password: '' }

      vm.id && vm.fetch()
    })
  }
}
</script>
