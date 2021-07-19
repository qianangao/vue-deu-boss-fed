<template>
    <el-card class="box-card">
        <div slot="header" class="header">
            <el-form :inline="true" :model="form" ref="form" class="form">
                <el-form-item label="角色名称" prop="name">
                  <el-input v-model="form.name" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
                  <el-button @click="resetForm('form')" :disabled="isLoading">重置</el-button>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="addRole" :disabled="isLoading" class="add">添加角色</el-button>
        </div>
    <el-table
    v-loading="isLoading"
    :data="list"
    style="width: 100%">
    <el-table-column
      type="index"
      label="编号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="角色描述">
    </el-table-column>
    <el-table-column
      prop="createdTime"
      label="创建时间">
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAlloc(scope.row)" type="text">分配菜单</el-button>
          <el-button size="mini" @click="handleResource(scope.row)" type="text">分配资源</el-button>
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
    :disabled="isLoading" />
    <create-or-edit v-if="visible" :dialogVisible="visible" :title="title" :parentsThis="parentsThis" :is-edit="isEdit" :role-id="roleId" @handle="handle"/>
  </el-card>
  </template>
  <script lang="ts">
  import Vue from 'vue'
  import { getRole, deleteRole } from '@/services/role.ts'
  import CreateOrEdit from './createOrEdit.vue'
  export default Vue.extend({
    name: 'Role',
    components: { CreateOrEdit },
    data () {
        return {
            form: {
                name: '',
                size: 5,
                current: 1
            },
            total: 0,
            list: [],
            isLoading: true,
            parentsThis: this,
            title: '',
            visible: false,
            isEdit: false,
            roleId: ''
        }
    },
    created () {
        this.getRoleList()
    },
    methods: {
      onSubmit () {
          this.getRoleList()
          this.form.current = 1
        },
        resetForm (formName: any) {
            this.$refs[formName].resetFields();
            this.getRoleList()
            this.form.current = 1
        },
      handleAlloc (item) {
        this.$router.push({
          name: 'alloc-menu',
          params: {
            roleId: item.id
          }
        })
      },
      handleResource (item) {
        this.$router.push({
          name: 'alloc-resource',
          params: {
            roleId: item.id
          }
        })
      },
        async getRoleList () {
            this.isLoading = true
            const { data } = await getRole(this.form)
            this.isLoading = false
            this.list = data.data.records
            this.total = data.data.total
        },
        handleSizeChange (val: any) {
          this.form.size = val
          this.getRoleList()
          this.form.current = 1
      },
      handleCurrentChange (val: any) {
          this.form.current = val
          this.getRoleList()
      },
      addRole () {
            this.title = '添加角色'
            this.visible = true
            this.isEdit = false
        },
        handleEdit (item: any) {
          this.title = '编辑角色'
          this.visible = true
          this.isEdit = true
          this.roleId = item.id
        },
        handleDelete (item: any) {
      this.$confirm('确定删除吗？', '删除角色', {}).then(async () => {
        const { data } = await deleteRole(item.id)
        if (data.code === '000000') {
       this.$message.success('删除成功')
       this.getRoleList()
      }
      })
    },
        handle (val: any) {
          this.visible = val
        }
    }
  })
  </script>
  <style lang="scss" scoped>
.header {
 overflow: hidden;
}
.form{
  float:left;
}
.add {
  float:right;
}</style>
