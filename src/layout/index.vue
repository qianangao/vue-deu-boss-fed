<template>
    <el-container>
  <el-aside width="200px">
    <aside-bar/>
  </el-aside>
  <el-container>
    <el-header>
      <header-bar/>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
    <!-- <router-view /> -->
</template>

<script lang="ts">
import Vue from "vue";
import AsideBar from './components/aside-bar.vue'
import HeaderBar from './components/header-bar.vue'

export default Vue.extend({
  name: "Layout",
  components: {
    AsideBar,
    HeaderBar
  }
});
</script>

<style lang="scss" scoped>
.el-container{
  min-width: 980px;
  min-height: 100vh;
}
.el-aside {
  background-color: #D3DCE6;
  height: 100vh;
}
.el-header {
  background-color: #ffffff;
}
.el-main {
  background-color: #E9EEF3;
}
</style>
