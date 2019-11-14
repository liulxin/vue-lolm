<template>
  <div class="about">
    <h2>{{ id ? '编辑' : '新建' }}物品</h2>
    <el-form @submit.native.prevent="save" label-position="right" label-width="80px">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="名称">
        <el-input v-model.trim="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model.trim="model.icon"></el-input>
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
      model: {}
    }
  },
  methods: {
    async save() {
      let res
      // 未输入名称
      if (!this.model.name) {
        this.$message({
          type: 'warning',
          message: '请输入名称'
        })
        return
      }
      // 是否是编辑
      if (this.id) {
        res = await this.$http.put(`rest/goods/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/goods', this.model)
      }
      console.log(res)
      this.$router.push('/goods/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      let res = await this.$http.get(`rest/goods/${this.id}`)
      this.model = res.data
    }
  },
  // 处理菜单点击渲染未正常显示bug
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.model = {}
      vm.id && vm.fetch()
    })
  }
}
</script>
