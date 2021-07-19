<template>
    <create-or-edit :is-edit="false" />
  </template>
<script lang="ts">
import Vue from 'vue'
import createOrEdit from './components/createOrEdit.vue'
export default Vue.extend({
  name: 'CreateMenu',
  components: { createOrEdit },
  data () {
    return {
    }
  },
  methods: {
  }
})
</script>
<style lang="scss" scoped></style>
