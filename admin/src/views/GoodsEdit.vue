<template>
	<div class="about">
		<h2>{{ id ? "编辑" : "新建" }}物品</h2>
		<el-form
			@submit.native.prevent="save"
			label-position="right"
			label-width="80px"
		>
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
				<el-upload
					class="avatar-uploader"
					:action="`${$http.defaults.baseURL}/upload`"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
					:with-credentials="true"
					:headers="getAuthHeaders()"
				>
					<img
						v-if="model.icon"
						:src="model.icon"
						class="avatar"
					/>
					<i
						v-else
						class="el-icon-plus avatar-uploader-icon"
					></i>
				</el-upload>
			</el-form-item>

			<el-form-item>
				<el-button
					type="primary"
					native-type="submit"
				>保存</el-button>
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
				icon: ''
			}
		}
	},
	methods: {
		async save() {
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
				await this.$http.put(`rest/goods/${this.id}`, this.model)
			} else {
				await this.$http.post('rest/goods', this.model)
			}
			// console.log(res)
			this.$router.push('/goods/list')
			this.$message({
				type: 'success',
				message: '保存成功'
			})
		},
		async fetch() {
			let res = await this.$http.get(`rest/goods/${this.id}`)
			this.model = res.data
		},
		handleAvatarSuccess(res, file) {
			// this.$set(this.model, 'icon', res.url)
			this.model.icon = res.url
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
			const isLt2M = file.size / 1024 / 1024 < 2

			if (!isJPG) {
				this.$message.error('上传物品图片只能是 JPG | PNG 格式!')
			}
			if (!isLt2M) {
				this.$message.error('上传物品图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		}
	},
	mounted() {
		this.id && this.fetch()
	}
}
</script>

<style lang="scss" scoped></style>
