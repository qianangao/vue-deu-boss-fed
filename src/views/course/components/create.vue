<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-steps :active="activeStep" simple>
        <el-step
        v-for="(step, index) in steps"
        :key="index"
        :title="step.title"
        :icon="step.icon"
        @click.native="activeStep=index"
        ></el-step>
</el-steps>
  </div>
  <el-form label-width="80px">
      <template v-if="activeStep==0">
          <el-form-item label="课程名称">
              <el-input v-model="course.courseName"/>
          </el-form-item>
          <el-form-item label="课程简介">
              <el-input  v-model="course.brief"/>
          </el-form-item>
          <el-form-item label="课程概述">
              <el-input v-model="course.previewFirstField" type="textarea" style="margin-bottom:10px" placeholder="概述1"/>
              <el-input v-model="course.previewSecondField" type="textarea" style="margin-bottom:10px" placeholder="概述2"/>
          </el-form-item>
          <el-form-item label="讲师姓名">
              <el-input v-model="course.teacherDTO.teacherName"/>
          </el-form-item>
          <el-form-item label="讲师简介">
              <el-input v-model="course.teacherDTO.description"/>
          </el-form-item>
          <el-form-item label="课程排序">
              <el-input-number v-model="course.sortNum"/>
          </el-form-item>
      </template>
      <div v-show="activeStep===1">
          <el-form-item label="课程封面">
             <upload-img v-model="course.courseListImg" :limit="1"/>
          </el-form-item>
          <el-form-item label="介绍封面">
             <upload-img v-model="course.courseImgUrl" :limit="1"/>
              <!-- <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> -->
          </el-form-item>
      </div>
      <div v-show="activeStep===2">
           <el-form-item label="售卖价格">
              <el-input v-model="course.discounts">
                <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
              <el-input v-model="course.price">
                <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
              <el-input v-model="course.sales">
                <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
              <el-input v-model="course.discountsTag"/>
          </el-form-item>
      </div>
      <div v-show="activeStep===3">
          <el-form-item label="限时秒杀开关" label-width="100px">
              <el-switch
                v-model="course.activityCourse"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
               <el-form-item label="开始时间">
             <el-date-picker
               v-model="course.activityCourseDTO.beginTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
             <el-date-picker
              v-model="course.activityCourseDTO.endTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="秒杀价">
              <el-input  v-model="course.activityCourseDTO.amount">
                <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="秒杀库存">
              <el-input v-model="course.activityCourseDTO.stock">
                <template slot="append">个</template>
            </el-input>
          </el-form-item>
          </template>
      </div>
      <div v-show="activeStep===4">
           <el-form-item label="是否发布" label-width="100px">
              <el-switch
                v-model="course.status"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
          </el-form-item>
          <el-form-item label="课程详情">
              <el-input type="textarea"  v-model="course.courseDescriptionMarkDown"/>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
      </div>
  </el-form>
  <el-button @click="activeStep++" v-if="activeStep>=0&&activeStep<4">下一步</el-button>
</el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import UploadImg from './UploadImg.vue'
import { saveOrUpdateCourse, uploadImg } from '@/services/course.ts'
export default Vue.extend({
  components: { UploadImg },
  name: 'courseCreate',
  data () {
      return {
          activeStep: 0,
          steps: [
              { title: '基本信息', icon: 'el-icon-edit' },
              { title: '课程封面', icon: 'el-icon-edit' },
              { title: '销售信息', icon: 'el-icon-edit' },
              { title: '秒杀活动', icon: 'el-icon-edit' },
              { title: '课程详情', icon: 'el-icon-edit' }
          ],
          imageUrl: '',
          course: {
            // id: 0,
            courseName: "",
            brief: "",
            teacherDTO: {
                // id: 0,
                // courseId: 0,
                teacherName: "",
                teacherHeadPicUrl: "",
                position: "",
                description: ""
            },
            courseDescriptionMarkDown: "",
            price: 0,
            discounts: 0,
            priceTag: "",
            discountsTag: "",
            isNew: true,
            isNewDes: "",
            courseListImg: "",
            courseImgUrl: "",
            sortNum: 0,
            previewFirstField: "",
            previewSecondField: "",
            status: 0, // 0 未发布  1 已发布
            sales: 0,
            activityCourse: true,
            activityCourseDTO: {
                // id: 0,
                // courseId: 0,
                beginTime: "",
                endTime: "",
                amount: 0,
                stock: 0
            },
            autoOnlineTime: ""
        }
            }
  },
  methods: {
      async onSubmit () {
          const { data } = await saveOrUpdateCourse(this.course)
          console.log(data);
          this.$router.push({
              name: 'course'
          })
      }
    }
})
</script>

<style lang="scss" scoped>
.el-step {
    cursor: pointer;
}
</style>
