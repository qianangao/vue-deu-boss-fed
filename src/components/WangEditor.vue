<template>
    <div ref="editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadImg } from '@/services/course.ts'
export default Vue.extend({
  name: 'CourseIndex',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initEditor()
  },
  watch: {
    value (val) {
      this.value = val
      this.editor.txt.html(this.value)
    }
  },
  methods: {
    initEditor () {
      this.editor = new E(this.$refs.editor)
      // 配置onchange回调函数
      this.editor.config.onchange = (value: any) => {
        this.$emit('input', value)
      }
      this.editor.config.uploadImgServer = '/upload-img'
      this.editor.create()
      console.log('00000');
      console.log('1111', this.value);
      this.editor.txt.html(this.value)
      this.editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
        var fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadImg(fd)
        insertImgFn(data.data.name)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
