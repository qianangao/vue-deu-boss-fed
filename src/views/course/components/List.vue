<template>
   <el-card class="box-card">
        <div slot="header" class="header">
            <el-form :model="form" ref="form" class="form">
              <el-row :gutter="16">
                <el-col :span="8">
                  <el-form-item label="课程名称" prop="courseName" label-width="80px">
                    <el-input v-model="form.courseName" placeholder="课程名称" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="状态" prop="status" label-width="80px">
                    <el-select v-model="form.status">
                        <el-option value="" label="全部"></el-option>
                        <el-option :value="1" label="上架"></el-option>
                        <el-option :value="0" label="下架"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
                    <el-button @click="resetForm('form')" :disabled="isLoading">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              </el-form>
              <el-button type="primary" @click="add" :disabled="isLoading" class="add">添加课程</el-button>
        </div>
        <el-table
        v-loading="isLoading"
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                :disabled="scope.row.isLoadingStatus"
                @change="handleChangeState(scope.row)">
                </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button size="mini" @click="$router.push({
                  name:'course-section',
                  params:{
                      courseId:scope.row.id
                  }})">内容管理</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="form.currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="isLoading">
    </el-pagination>
   </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getCourseList, changeState } from '@/services/course.ts'
export default Vue.extend({
  name: 'CourseIndex',
  created () {
      this.getCourseList()
  },
  data () {
      return {
          form: {
            currentPage: 1,
            pageSize: 10,
            courseName: "",
            status: ""
        },
        list: [],
        total: 0,
        isLoading: false
      }
  },
  methods: {
      handleEdit (courseId: any) {
          this.$router.push({
              name: "course-edit",
              params: {
                  courseId
              }
          })
      },
      async getCourseList () {
          this.isLoading = true
          const { data } = await getCourseList(this.form)
          this.isLoading = false
          data.data.records.forEach((item: any) => {
              item.isLoadingStatus = false
          })
          this.list = data.data.records
          this.total = data.data.total
      },
        handleSizeChange (val: any) {
          this.form.pageSize = val
          this.getCourseList()
          this.form.currentPage = 1
      },
      handleCurrentChange (val: any) {
          this.form.currentPage = val
          this.getCourseList()
      },
       onSubmit () {
        this.form.currentPage = 1
        this.getCourseList()
        },
        resetForm (formName: any) {
            this.$refs[formName].resetFields();
            this.form.currentPage = 1
            this.getCourseList()
        },
        async handleChangeState (course: any) {
            course.isLoadingStatus = true
            const { data } = await changeState({
                courseId: course.id,
                status: course.status
            })
            this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`)
            course.isLoadingStatus = false
        },
        add () {
            this.$router.push('/course-create')
        }
  }
})
</script>
<style lang="scss" scoped>
.form {
    float:left;
}
.add {
    float:right;
}
.header::after{
    content: '';
    display: block;
    height: 0;
    overflow: hidden;
    clear: both;
}
</style>
