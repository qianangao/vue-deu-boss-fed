<template>
  <role-list />
</template>
<script lang="ts">
import Vue from 'vue'
import RoleList from './components/List.vue'
export default Vue.extend({
  name: 'Index',
  components: { RoleList }
})
</script>
<style lang="scss" scoped></style>
