<template>
  <div class="about">
    <h2>{{ id ? '编辑' : '新建' }}英雄</h2>
    <el-form
      @submit.native.prevent="save"
      label-position="right"
      label-width="150px"
    >
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model.trim="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model.trim="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="`${$http.defaults.baseURL}/upload`"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="`${$http.defaults.baseURL}/upload`"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="handleBannerSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="职业">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 10px;"
              v-model.trim="model.scores.difficult"
              :max="10"
              :show-score="true"
            ></el-rate>
          </el-form-item>
          <el-form-item label="物理">
            <el-rate
              style="margin-top: 10px;"
              v-model.trim="model.scores.attack"
              :max="10"
              :show-score="true"
            ></el-rate>
          </el-form-item>
          <el-form-item label="魔法">
            <el-rate
              style="margin-top: 10px;"
              v-model.trim="model.scores.skills"
              :max="10"
              :show-score="true"
            ></el-rate>
          </el-form-item>
          <el-form-item label="防御">
            <el-rate
              style="margin-top: 10px;"
              v-model.trim="model.scores.survive"
              :max="10"
              :show-score="true"
            ></el-rate>
          </el-form-item>
          <el-form-item label="召唤师峡谷推荐出装">
            <el-select v-model="model.goods1" multiple>
              <el-option
                v-for="item in goods"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="极地大乱斗推荐出装">
            <el-select v-model="model.goods2" multiple>
              <el-option
                v-for="item in goods"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对敌技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="背景故事">
            <el-input type="textarea" v-model="model.tale"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus">添加技能</i>
          </el-button>
          <el-row sype="flex" style="flex-wrap: wrap">
            <el-col
              :md="10"
              v-for="(item, i) in model.skills"
              :offset="1"
              :key="i"
              style="margin-top: 10px"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :headers="getAuthHeaders()"
                  :action="`${$http.defaults.baseURL}/upload`"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="皮肤" name="skins">
          <el-button type="text" @click="model.skins.push({})">
            <i class="el-icon-plus">添加皮肤</i>
          </el-button>
          <el-row sype="flex" style="flex-wrap: wrap">
            <el-col
              :md="10"
              v-for="(item, i) in model.skins"
              :offset="1"
              :key="i"
              style="margin-top: 10px"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader skins"
                  :headers="getAuthHeaders()"
                  :action="`${$http.defaults.baseURL}/upload`"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'pic', res.url)"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="item.pic" :src="item.pic" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.skins.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 2rem">
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
      categories: [],
      goods: [],
      model: {
        name: '',
        avatar: '',
        banner: '',
        title: '',
        scores: {
          difficult: 1,
          skills: 1,
          attack: 1,
          survive: 1
        },
        skills: [],
        goods1: [],
        goods2: [],
        usageTips: '',
        battleTips: '',
        skins: [],
        tale: ''
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
        res = await this.$http.put(`rest/heros/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/heros', this.model)
      }
      console.log(res)
      this.$router.push('/heros/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      let res = await this.$http.get(`rest/heros/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories() {
      let res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async fetchGoods() {
      let res = await this.$http.get(`rest/goods`)
      this.goods = res.data
    },
    handleAvatarSuccess(res, file) {
      // this.$set(this.model, 'avatar', res.url)
      this.model.avatar = res.url
    },
    handleBannerSuccess(res, file) {
      // this.$set(this.model, 'avatar', res.url)
      this.model.banner = res.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG | PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  mounted() {
    this.fetchCategories()
    this.fetchGoods()
    this.id && this.fetch()
  }
}
</script>
