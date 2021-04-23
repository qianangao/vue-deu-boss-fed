<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
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
