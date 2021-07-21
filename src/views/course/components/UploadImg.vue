<template>
<div>
    <el-progress
    v-if="isUpload"
    type="circle"
    :percentage="percentage"
    :width="178"
    :status="percentage===100 ? 'success' : undefined"/>
  <el-upload
   v-else
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :http-request="handleImgUpload"
    :before-upload="beforeAvatarUpload">
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadImg } from '@/services/course.ts'
export default Vue.extend({
  name: 'CourseIndex',
  props: {
      value: {
          type: String
      },
      limit: {
          type: Number,
          default: 2
      }
  },
  data () {
      return {
          isUpload: false,
          percentage: 0
      }
  },
  methods: {
       async handleImgUpload (options:any) {
           this.isUpload = true
          const fd = new FormData()
          fd.append('file', options.file)
          const { data } = await uploadImg(fd, (e: any) => {
              this.percentage = Math.floor(e.loaded / e.total * 100)
          })
          this.isUpload = false
          this.percentage = 0
          this.$emit('input', data.data.name)
      },
      beforeAvatarUpload (file: any) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < this.limit;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`);
        }
        return isJPG && isLt2M;
      }
  }
})
</script>
<style lang="scss" scoped>
::v-deep.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
