<template>
  <el-card>
      <div slot="header">课程内容</div>
      <el-tree
      draggable
      :data="data"
      :props="defaultProps">
      <div slot-scope="{node, data}" class="inner">
          <span>{{node.label}}</span>
          <span v-if="data.sectionName">
              <el-button>编辑</el-button>
              <el-button>添加课时</el-button>
              <el-button>状态</el-button>
          </span>
          <span v-else>
              <el-button>编辑</el-button>
              <el-button>上传视频</el-button>
              <el-button>状态</el-button>
          </span>
      </div>
      </el-tree>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionAndLesson } from '@/services/section.ts'
export default Vue.extend({
  name: 'course-section',
   props: {
      courseId: {
          type: [String, Number],
          required: true
      }
  },
  data () {
      return {
        data: [],
        defaultProps: {
          children: 'lessonDTOS',
          label (data: any) {
              return data.sectionName || data.theme
          }
        }
      };
    },
  created () {
      this.loadSectionAndLession()
  },
  methods: {
      async loadSectionAndLession () {
          const { data } = await getSectionAndLesson(this.courseId)
          this.data = data.data
          console.log(data);
      }
  }
})
</script>

<style lang="scss" scoped>
.inner {
    flex:1;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding:5px;
    border-bottom: 1px solid #eee;
}
::v-deep .el-tree-node__content {
    height: auto;
}
</style>
