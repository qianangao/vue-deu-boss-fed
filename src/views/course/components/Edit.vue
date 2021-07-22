<template>
  <create-or-edit :is-edit="true" :course-id="courseId"/>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './CreateOrEdit.vue'
export default Vue.extend({
  name: 'CourseEdit',
  props: {
      courseId: {
          type: [String, Number],
          required: true
      }
  },
  components: { CreateOrEdit }
})
</script>

<style lang="scss" scoped></style>
