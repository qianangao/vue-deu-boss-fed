<template>
    <el-card class="box-card">
        <div slot="header" class="header">
            <el-form :model="form" ref="form" class="form">
              <el-row :gutter="16">
                <el-col :span="6">
                  <el-form-item label="手机号" prop="phone" label-width="80px">
                    <el-input v-model="form.phone" placeholder="手机号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="注册事件" prop="time" label-width="80px">
                    <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm:ss"
                    align="right">
                    <!--value-format="yyyy-MM-dd HH:mm:ss" -->
                  </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
                    <el-button @click="resetForm('form')" :disabled="isLoading">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              </el-form>
              <!-- <el-button type="primary" @click="add" :disabled="isLoading" class="add">添加</el-button> -->
        </div>
        <el-table
        v-loading="isLoading"
        :data="data"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="id"
          label="用户ID"
          width="180">
        </el-table-column>
        <!-- <el-table-column
          prop="url"
          label="头像"
          width="180">
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)" type="text">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column> -->
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
  import { getUserList } from '@/services/user.ts'
  export default Vue.extend({
    name: 'UserList',
    data () {
        return {
           form: {
                currentPage: 1,
                pageSize: 5,
                phone: "",
                // userId: 0,
                startCreateTime: "",
                endCreateTime: ""
            },
            data: [],
            total: 0,
            isLoading: false,
            time: ''
        }
    },
    created () {
        this.getUserList()
    },
    methods: {
        async getUserList () {
            this.isLoading = true
            const { data } = await getUserList(this.form)
            this.isLoading = false
            this.data = data.data.records
            this.total = data.data.total
        },
        handleSizeChange (val: any) {
          this.form.pageSize = val
          this.getUserList()
          this.form.currentPage = 1
      },
      handleCurrentChange (val: any) {
          this.form.currentPage = val
          this.getUserList()
      },
      onSubmit () {
          console.log("this.time", this.time);
          if (this.time) {
              this.form.startCreateTime = this.time[0]
              this.form.endCreateTime = this.time[1]
          }
        this.getUserList()
        this.form.currentPage = 1
        },
        resetForm (formName: any) {
            this.$refs[formName].resetFields();
            this.time = ''
            this.form.startCreateTime = ''
            this.form.endCreateTime = ''
            this.form.currentPage = 1
            this.getUserList()
        }
    }
  })
  </script>
  <style lang="scss" scoped></style>
