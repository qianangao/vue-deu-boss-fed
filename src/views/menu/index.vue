<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
   <el-button @click="$router.push({name:'menu-create'})">添加菜单</el-button>
  </div>
  <el-table
      :data="menuList"
      style="width: 100%">
      <el-table-column
      type="index"
      label="编号"
      width="50">
    </el-table-column>
      <el-table-column
        prop="name"
        label="菜单名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="菜单级数"
        width="180">
        <template slot-scope="scope">
          {{scope.row.level == '1' ? '一级':'二级'}}
          </template>
      </el-table-column>
      <el-table-column
        prop="icon"
        label="前端图标">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" type="text">编辑</el-button>
          <el-button size="mini" @click="handleDelete(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu, deleteMenu } from '@/services/menu.ts'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menuList: []

    }
  },
  created () {
    this.getAllMenus()
  },
  methods: {
    async getAllMenus () {
      const { data } = await getAllMenu()
      console.log(data);
      if (data.code === '000000') {
        this.menuList = data.data
      } else {
        this.$message.error(data.mesg)
      }
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },
    handleDelete (item: any) {
      this.$confirm('确定删除吗？', '删除菜单', {}).then(async () => {
        const { data } = await deleteMenu(item.id)
        if (data.code === '000000') {
       this.$message.success('删除成功')
       this.getAllMenus()
      }
      })
    }

  }
})
</script>

<style lang="scss" scoped></style>
