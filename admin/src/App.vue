<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

// upload
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      min-width: 65px;
      height: 65px;
      line-height: 65px;
      text-align: center;
    }
    .avatar {
      min-width: 65px;
      height: 65px;
      display: block;
    }
  }
}
</style>
