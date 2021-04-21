<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
request({
  method: 'get',
  url: '/boss/v2/api-docs?group=edu-boss-boot'
}).then(res => {
  console.log('res', res)
})
export default Vue.extend({
  data () {
    return {}
  },
  methods: {}
})
</script>
<style lang="scss" scoped>
// @import '~@/styles/variables.scss';
.text {
  color: $danger-color;
}
</style>
