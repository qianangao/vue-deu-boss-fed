<template>
  <div class="login">
    <el-form
      class="login-form"
      :rules="rules"
      :model="form"
      ref="form"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="手机号" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="密码"
          v-model="form.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="isLoginLoading"
          type="primary"
          @click="onSubmit"
          class="submit-btn"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { login } from '@/services/user'
import { Form } from "element-ui";
export default Vue.extend({
  name: "LoginIndex",
  data () {
    return {
      form: {
        phone: "18201288771",
        password: "111111"
      },
      isLoginLoading: false,
      rules: {
        phone: [
          { required: true, message: "请输入手机号！", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确的手机号！",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码！", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在6到8个字符之间！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async onSubmit () {
      await (this.$refs.form as Form).validate();
      this.isLoginLoading = true;
      try {
        const { data } = await login(this.form)
        if (data.state !== 1) {
          this.$message.error(data.message);
        } else {
          this.$store.commit('setUser', data.content)
          this.$router.push(this.$route.query.redirect as string || '/')
          // this.$router.push({
          //   name: "home"
          // });
          this.$message.success("登陆成功");
        }
      } catch (error) {
        console.log("登陆失败", error);
      }
      this.isLoginLoading = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    background-color: #fff;
    width: 300px;
    padding: 20px;
    border-radius: 5px;
    .submit-btn {
      width: 100%;
    }
  }
}
</style>
