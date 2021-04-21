<template>
  <div class="layout">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Layout"
});
</script>

<style lang="scss" scoped></style>
