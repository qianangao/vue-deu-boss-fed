<template>
    <el-card class="box-card">
        <div slot="header" class="header">
            <el-form :model="form" ref="form" class="form">
              <el-row :gutter="8">
                <el-col :span="6">
                  <el-form-item label="资源名称" prop="name" label-width="80px">
                    <el-input v-model="form.name" placeholder="资源名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="资源路径" prop="url" label-width="80px">
                    <el-input v-model="form.url" placeholder="资源路径"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="资源分类" prop="categoryId" label-width="80px">
                    <el-select v-model="form.categoryId" placeholder="请选择资源分类" clearable>
                      <el-option :label="item.name" :value="item.id" v-for="item in options" :key="item.id"></el-option>
                    </el-select>
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
              <el-button type="primary" @click="add" :disabled="isLoading" class="add">添加</el-button>
        </div>
        <el-table
        v-loading="isLoading"
        :data="resourceList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)" type="text">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="form.current"
      :page-sizes="[5, 10, 20]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="isLoading">
    </el-pagination>
    <create-or-edit :dialogVisible="visible" :title="title" :parentsThis="parentsThis" ref="createorEdit" @handle="handle" :options="options"/>
      </el-card>
  </template>
  <script lang="ts">
  import Vue from 'vue'
  import { getResourceList, getResourceSelect, deleteResource } from '@/services/resource.ts'
//   import { Form } from 'element-ui'
  import CreateOrEdit from './createOrEdit.vue'
  export default Vue.extend({
    name: 'ResourceList',
    components: { CreateOrEdit },
    data () {
        return {
          resourceList: [],
          options: [],
          parentsThis: this,
          form: {
              categoryId: null,
              name: '',
              url: '',
              current: 1,
              size: 5
          },
          total: 0,
          isLoading: true,
          visible: false,
          title: ''
        }
    },
    created () {
        this.loadResourceList()
        this.getResource()
    },
    methods: {
        handle (val: any) {
          this.visible = val
        },
        async getResource () {
            const { data } = await getResourceSelect()
            if (data.code === '000000') {
                this.options = data.data
            }
        },
      onSubmit () {
          this.loadResourceList()
          this.form.current = 1
        },
        resetForm (formName: any) {
            console.log("form111", formName);
            // this.$nextTick(() => {
            this.$refs[formName].resetFields();
            // })
            this.loadResourceList()
            this.form.current = 1
        },
      async loadResourceList () {
          this.isLoading = true
          const { data } = await getResourceList(this.form)
          this.isLoading = false
          if (data.code === '000000') {
              this.resourceList = data.data.records
              this.total = data.data.total
          }
      },
      handleSizeChange (val: any) {
          this.form.size = val
          this.loadResourceList()
          this.form.current = 1
      },
      handleCurrentChange (val: any) {
          this.form.current = val
          this.loadResourceList()
      },
      handleEdit (item: any) {
        this.visible = true
        this.title = '编辑资源'
        this.$refs.createorEdit.show(item)
    },
    add () {
       this.visible = true
       this.title = '添加资源'
    },
    handleDelete (item: any) {
      this.$confirm('确定删除吗？', '删除资源', {}).then(async () => {
        const { data } = await deleteResource(item.id)
        if (data.code === '000000') {
       this.$message.success('删除成功')
       this.loadResourceList()
      }
      })
    }
    }
  })
</script>
<style lang="scss" scoped>
.header::after {
  content: '';
  height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.header {
  zoom:1;
}
.form{
  float:left;
  width:90%;
}
.add {
  float:right;
}
</style>
