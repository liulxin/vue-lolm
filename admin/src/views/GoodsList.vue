<template>
  <div class="about">
    <h2>物品列表</h2>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"> </el-table-column>
      <el-table-column prop="name" label="物品名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/goods/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      let res = await this.$http.get('rest/goods')
      this.items = res.data
    },
    remove(row) {
      this.$confirm(`是否要删除分类 "${row.name}" ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await this.$http.delete(`rest/goods/${row._id}`)
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        }
      })
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>
