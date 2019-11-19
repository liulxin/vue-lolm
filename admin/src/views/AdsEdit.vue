<template>
  <div class="about">
    <h2>{{ id ? '编辑' : '新建' }}广告位</h2>
    <el-form
      @submit.native.prevent="save"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="名称">
        <el-input v-model.trim="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus">添加广告</i>
        </el-button>
        <el-row sype="flex" style="flex-wrap: wrap">
          <el-col
            :md="24"
            v-for="(item, i) in model.items"
            :key="i"
            style="margin-top: 10px"
          >
            <el-form-item label="标题" style="margin-top: 15px">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="跳转（URL）" style="margin-top: 15px">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 15px">
              <el-upload
                class="avatar-uploader"
                :action="`${$http.defaults.baseURL}/upload`"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                type="danger"
                @click="model.items.splice(i, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
        name: '',
        items: []
      }
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
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/ads', this.model)
      }
      console.log(res)
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      let res = await this.$http.get(`rest/ads/${this.id}`)
      // this.model = res.data
      this.model = Object.assign({}, this.modle, res.data)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG | PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  mounted() {
    this.id && this.fetch()
  }
}
</script>
