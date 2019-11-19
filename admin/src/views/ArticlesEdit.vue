<template>
  <div class="about">
    <h2>{{ id ? '编辑' : '新建' }}文章</h2>
    <el-form
      @submit.native.prevent="save"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model.trim="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          v-model.trim="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: ['id'],
  data() {
    return {
      model: {
        title: '',
        body: '',
        categories: []
      },
      categories: []
    }
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      let res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },
    async save() {
      let res
      // 未输入标题
      if (!this.model.title) {
        this.$message({
          type: 'warning',
          message: '请输入标题'
        })
        return
      }
      // 是否是编辑
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/articles', this.model)
      }
      console.log(res)
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      let res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      let res = await this.$http.get('rest/categories')
      this.categories = res.data
    }
  },
  mounted() {
    this.fetchCategories()
    this.id && this.fetch()
  },
  components: {
    VueEditor
  }
}
</script>
