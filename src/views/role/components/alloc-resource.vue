<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>分配资源</span>
    </div>
    <el-tree :data="data"
     :props="defaultProps"
     node-key="id"
     ref="resource-tree"
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
import { getResource, allocateRoleResources, getRoleResources, getResourceSelect } from '@/services/resource.ts'
export default Vue.extend({
  name: 'AllocResource',
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
          children: 'children',
          label: 'name'
        },
        checkedKeys: []
      };
    },
  created () {
    this.getResource()
    this.getRoleResources()
  },
  methods: {
    async getRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (data: any) {
      data.forEach(resource => {
        if (resource.selected) {
          this.checkedKeys = [...this.checkedKeys, resource.id]
        }
        if (resource.resourceList) {
          this.getCheckedKeys(resource.resourceList)
        }
      })
    },
    async getResource () {
      const ret = await Promise.all([getResource(), getResourceSelect()])
      const resources = ret[0].data.data
      const resourceCategories = ret[1].data.data
      console.log("resource", resources);
      console.log("resourceCategories", resourceCategories);
      resources.forEach((r: any) => {
        const category = resourceCategories.find((c: any) => c.id === r.categoryId)
        if (category) {
          category.children = category.children || []
          category.children.push(r)
        }
      })
      // 修改顶层分类 ID：因为分类 ID 和资源 ID 冲突
      resourceCategories.forEach((item: any) => {
        item.id = Math.random()
      })

      this.data = resourceCategories
      // const { data } = await getResource()
      // console.log("data111111", data);
      // this.data = data.data
    },
    async onSubmit () {
      const resourceIdList = this.$refs['resource-tree'].getCheckedKeys()
      const datas = {
        resourceIdList,
        roleId: this.roleId
      }
      const { data } = await allocateRoleResources(datas)
      this.$message.success('操作成功')
      this.$router.back()
    },
    resetChecked () {
        this.$refs['resource-tree'].setCheckedKeys([]);
      }
  }
})
</script>
<style lang="scss" scoped></style>
