<template>
    <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in options"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave('form')">提交</el-button>
          <el-button  @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>
  <script lang="ts">
  import Vue from 'vue'
  import { saveOrUpdateResource } from '@/services/resource.ts'
  export default Vue.extend({
    name: 'ResourceIndex',
    props: ['dialogVisible', 'title', 'options', 'parentsThis'],
    data () {
        return {
            form: {
              categoryId: null,
              name: '',
              url: '',
              description: ''
          },
          rules: {
              name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
              categoryId: [{ required: true, message: '请选择资源分类', trigger: 'blur' }],
              url: [{ required: true, message: '请输入资源路径', trigger: 'blur' }]
          }
        }
    },
    methods: {
        show (item) {
            this.form = { ...item }
        },
        handleClose () {
            this.$emit('handle', false)
        },
        handleSave (formName: any) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        const { data } = await saveOrUpdateResource(this.form)
                    if (data.code === '000000') {
                        this.$message.success('操作成功')
                        this.parentsThis.loadResourceList()
                    } else {
                        this.$message.error(data.mesg)
                    }
                } catch (error) {
                    this.$message.error(error)
                    console.dir(error)
                } finally {
                    this.$emit('handle', false)
                    this.form = {
                        categoryId: null,
                        name: '',
                        url: '',
                        description: ''
                      }
                }
                }
            })
        }
    }
  })
  </script>
  <style lang="scss" scoped></style>
