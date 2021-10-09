<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="loginForm-rgba" />
      <div class="title-container">
        <h3 class="title">登&nbsp;录</h3>
      </div>
      <el-form-item prop="username">
        <el-row>
          <el-col :span="2">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
          </el-col>
          <el-col :span="15">
            <el-input
              v-model="loginForm.username"
              placeholder="请填写登录名"
              type="text"
              tabindex="1"
            />
          </el-col>
          <el-col :span="7">
            <el-select v-model="select" class="userselect" placeholder="请选择">
              <el-option label="@管理员" value="admin" />
              <el-option label="@商家" value="publisher" />
              <el-option label="@商家成员" value="member" />
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="password">
        <el-row>
          <el-col :span="2">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
          </el-col>
          <el-col :span="17">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-col>
          <el-col :span="5">
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-col>
        </el-row>

      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin:30px 0 0;border-radius:7px;"
        @click.native.prevent="handleLogin"
      >
        登入
      </el-button>
      <div class="tips">
        <span style="margin-right:20px;" />
        <span />
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不可以少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      select: 'admin'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.loginForm.type = this.select
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: rgba(255,255,255,0.1);
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill,
      :-webkit-autofill:hover,
      :-webkit-autofill:focus,
      :-webkit-autofill:active {
        transition-delay: 99999s;
        transition: color 99999s ease-out, background-color 99999s ease-out;
      }
    }
  }

  .el-form-item {
    border-radius: 15px;
    color: #fafafa;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#fefefe;
$light_gray:#fefefe;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('../../assets/background/login.jpg') no-repeat center center fixed;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 50px 55px;
    margin: 200px auto;
    z-index: 0;
    overflow: hidden;
    border-radius: 30px;
    box-shadow: 2px 1px 6px #808589;
    &::before {
      content: "";/* 必须包括 */
      position: absolute;/* 固定模糊层位置 */
      width:300%;
      height:300%;
      left: -100%;/* 回调模糊层位置 */
      top: -100%;/* 回调模糊层位置 */
      background: url('../../assets/background/login.jpg') no-repeat center center fixed;/* 与上面的bg中的background设置一样 */
      filter: blur(2px);/* 值越大越模糊 */
      z-index: -2;/* 模糊层在最下面 */
    }
    .loginForm-rgba{
      background-color: rgba(255, 255, 255, 0.2);/* 为文字更好显示，将背景颜色加深 */
      position: absolute;/* 固定半透明色层位置 */
      width:300%;
      height:300%;
       left: -100%;
      top: -100%;
      z-index: -1;/* 中间是rgba半透明色层 */
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #fafafa;
    cursor: pointer;
    user-select: none;
  }
}
.login-form .el-form-item__error {
  left: 50px;
}
.userselect .el-input {
  width: auto;
}
</style>
