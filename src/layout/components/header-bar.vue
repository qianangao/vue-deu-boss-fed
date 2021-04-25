<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar :size="40" src="https://empty" @error="errorHandler">
          <img :src="userInfo.portrait || require('@/assets/q.png')" />
        </el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getUserInfo } from "@/services/user";

export default Vue.extend({
  name: "HeaderBar",
  data () {
    return {
      userInfo: {}
    };
  },
  created () {
    this.loadUserInfo();
    this.loadUserInfo();
    this.loadUserInfo();
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo();
      this.userInfo = data.content;
    },
    handleLogout () {
      this.$confirm('确认退出码?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
