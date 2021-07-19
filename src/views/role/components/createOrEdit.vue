<template>
    <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item prop="name" label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        <el-form-item prop="code" label="角色编码">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        <el-form-item label="角色描述" prop="description">
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
  import { saveOrUpdateRole, getRoleById } from '@/services/role.ts'
  export default Vue.extend({
    name: 'RoleIndex',
    props: ['dialogVisible', 'title', 'parentsThis', 'isEdit', 'roleId'],
    data () {
        return {
            form: {
              code: '',
              name: '',
              description: ''
          },
          rules: {
              name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
              code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
          }
        }
    },
    created () {
        if (this.isEdit) {
            this.getRoleById()
        }
    },
    methods: {
        async getRoleById () {
            const { data } = await getRoleById(this.roleId)
            console.log("data", data);
            this.form = data.data
            console.log(this.form, '111111');
        },
        handleClose () {
            this.$emit('handle', false)
        },
        handleSave (formName: any) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        const { data } = await saveOrUpdateRole(this.form)
                    if (data.code === '000000') {
                        this.$message.success('操作成功')
                        this.parentsThis.getRoleList()
                    } else {
                        this.$message.error(data.mesg)
                    }
                } catch (error) {
                    this.$message.error(error)
                } finally {
                    this.$emit('handle', false)
                    this.form = {
                            code: '',
                            name: '',
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
