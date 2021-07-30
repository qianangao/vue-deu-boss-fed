<template>
  <div class="course-video">
    <el-card>
      <div slot="header">
        <span>课程：xxx</span>
        <br />
        <span>阶段：xxx</span>
        <br />
        <span>课时：xxx</span>
      </div>
      <el-form label-width="70px">
        <el-form-item label="视频上传">
          <input type="file" ref="video-file"/>
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" ref="image-file"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpload">开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item>
            <p v-if="isUpload">视频上传中：{{ uploadPercent }}%</p>
            <p v-if="isUploadSuccess">视频转码中：{{ isTransCodeSuccess ? '完成' : '正在处理，请稍后'}}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getAliyunImagUploadAddressAdnAuth, getAliyunVideoUploadAddressAdnAuth, aliyunTransCode, aliyunTransCodePercent } from '@/services/aliyun.ts'
export default Vue.extend({
  name: "CourseVideo",
  data () {
    return {
      uploader: null,
      imageUrl: '',
      videoId: '',
      uploadPercent: 0,
      isUpload: false,
      isUploadSuccess: false,
      isTransCodeSuccess: false
    };
  },
  created () {
    this.initUploader();
    this.isUpload = false
  },
  computed: {
      video () {
          return this.$refs['video-file']
      },
      image () {
          return this.$refs['image-file']
      }
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // userID，必填，只需有值即可。
        userId: "122",
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: "",
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
            console.log('onUploadstarted', uploadInfo);
            let uploadAddressAndAuth;
            if (uploadInfo.isImage) {
                const { data } = await getAliyunImagUploadAddressAdnAuth()
                uploadAddressAndAuth = data.data
                this.imageUrl = data.data.imageURL
            } else {
                const { data } = await getAliyunVideoUploadAddressAdnAuth({
                    fileName: uploadInfo.file.name,
                    imageUrl: this.imageUrl
                })
                uploadAddressAndAuth = data.data
                this.videoId = uploadAddressAndAuth.videoId
            }
            this.uploader.setUploadAuthAndAddress(uploadInfo, uploadAddressAndAuth.uploadAuth, uploadAddressAndAuth.uploadAddress, uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId);
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
             console.log('onUploadSucceed', uploadInfo);
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
            console.log("onUploadFailed", uploadInfo, code, message);
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
            // console.log(this.isUpload, '3333');
            console.log('onUploadProgress', uploadInfo, totalSize, loadedPercent);
            if (!uploadInfo.isImage) {
                this.uploadPercent = Math.floor(loadedPercent * 100)
            }
        },
        // 上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo: any) {
            console.log('onUploadTokenExpired', uploadInfo);
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
            this.isUploadSuccess = true
            const { data } = await aliyunTransCode({
                lessonId: this.$route.query.lessonId,
                coverImageUrl: this.imageUrl,
                fileName: this.video.files[0].name,
                fileId: this.videoId
            })
            console.log(data);
            // 轮询查询转码进度
            const timer = setInterval(async () => {
                const { data } = await aliyunTransCodePercent(this.$route.query.lessonId)
                console.log(data.data);
                if (data.data === 100) {
                    console.log('转码成功');
                    this.isTransCodeSuccess = true
                    window.clearInterval(timer)
                }
            }, 3000)
        }
      });
    },
    handleUpload () {
        this.isUpload = true
        this.isUploadSuccess = false
        this.isTransCodeSuccess = false
        this.uploadPercent = 0
        const video = this.video.files[0]
        const image = this.image.files[0]
        const uploader = this.uploader
        uploader.addFile(image, null, null, null, '{ "Vod": {} }');
        uploader.addFile(video, null, null, null, '{ "Vod": {} }');
        uploader.startUpload();
    }
  }
});
</script>

<style lang="scss" scoped></style>
