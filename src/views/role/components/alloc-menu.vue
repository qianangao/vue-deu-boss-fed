<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>分配菜单</span>
    </div>
    <el-tree :data="data"
     :props="defaultProps"
     node-key="id"
     ref="menu-tree"
      default-expand-all
      show-checkbox
      :default-checked-keys="checkedKeys"
       ></el-tree>
    <div style="text-align:center">
      <el-button @click="resetChecked">清空</el-button>
      <el-button @click="onSubmit" type="primary">提交</el-button>
    </div>
  </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu.ts'
export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
      return {
        data: [],
        defaultProps: {
          children: 'subMenuList',
          label: 'name'
        },
        checkedKeys: []
      };
    },
  created () {
    this.getMenuNodeList()
    this.getRoleMenus()
  },
  methods: {
    async getRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      console.log(data, '5555');
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (data: any) {
      data.forEach(menu => {
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id]
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
      console.log("this1111", this.checkedKeys);
    },
    async getMenuNodeList () {
      const { data } = await getMenuNodeList()
      this.data = data.data
    },
    async onSubmit () {
      const menuIdList = this.$refs['menu-tree'].getCheckedKeys()
      const datas = {
        menuIdList,
        roleId: this.roleId
      }
      const { data } = await allocateRoleMenus(datas)
      this.$message.success('操作成功')
      this.$router.back()
    },
    resetChecked () {
        this.$refs['menu-tree'].setCheckedKeys([]);
      }
  }
})
</script>
<style lang="scss" scoped></style>
