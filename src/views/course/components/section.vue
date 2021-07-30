<template>
  <el-card>
      <div slot="header">课程内容</div>
      <el-tree
      draggable
      :data="data"
      :props="defaultProps"
      :allow-drop="allowDrop"
      @node-drop="dropSuccess">
      <div slot-scope="{node, data}" class="inner">
          <span>{{node.label}}</span>
          <span v-if="data.sectionName">
              <el-button>编辑</el-button>
              <el-button>添加课时</el-button>
              <el-button>状态</el-button>
          </span>
          <span v-else>
              <el-button>编辑</el-button>
              <el-button @click="$router.push({
                  name:'course-video',
                  params:{
                      courseId:courseId
                  },
                  query: {
                      sectionId:node.parent.id,
                      lessonId: data.id
                  }
                  })">上传视频</el-button>
              <el-button>状态</el-button>
          </span>
      </div>
      </el-tree>
  </el-card>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from 'vue'
import { getSectionAndLesson, saveOrUpdateLession, saveOrUpdateSection } from '@/services/section.ts'
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
      },
      allowDrop (draggingNode: any, dropNode: any, type: any) {
          // draggingNode 拖动的节点
          // dropNode 放置的目标节点
          // type ：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
          return type !== 'inner' && draggingNode.data.sectionId === dropNode.data.sectionId
      },
      async dropSuccess (draggingNode: any, dropNode: any, type: any, event: any) {
           try {
               await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
               if (draggingNode.data.lessonDTOS) {
                   return saveOrUpdateSection({
                       id: item.data.id,
                       orderNum: index + 1
                   })
               } else {
                   return saveOrUpdateLession({
                       id: item.data.id,
                       orderNum: index + 1
                   })
               }
           }))
           this.$message.success('排序成功')
           } catch (error) {
               this.$message.success('排序失败')
           }
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
