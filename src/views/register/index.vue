<template>
  <div class="login-container">
    <div class="login-form">
      <div class="loginForm-rgba" />
      <el-form
        :model="formData"
        class="register-form"
      >
        <div class="title-container">
          <span class="title">注&nbsp;册</span>
        </div>
        <el-form-item prop="pb_email">
          <el-row>
            <el-col :span="24">
              <el-input
                v-model="formData.pb_email"
                placeholder="请填写您的邮箱"
                type="text"
              >
                <span slot="prefix" style="margin-left: 7px;">
                  <svg-icon icon-class="email" />
                </span>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <span style="font-size: 14px;color: #707070;margin-left:5px">这将是您账号的唯一凭证</span>
          </el-col>
        </el-row>
        <el-button
          type="primary"
          style="width: 100px;margin: 20px 0 0 calc(100% - 100px);"
          @click.native="handleNext"
        >
          下一步
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateEmail = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        pb_email: '',
        pb_name: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      select: 'admin'
    }
  },
  watch: {},
  methods: {
    handleNext() {
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

<style lang="scss" scope>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

// $bg: rgba(255,255,255,0.1);
// $light_gray:#1B1B1B;
// $cursor: #1B1B1B;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

// /* reset element-ui css */
// .login-container {
//   .el-input {
//     display: inline-block;

//     input {
//       background: transparent;
//       border: 0px;
//       border-bottom: 1px solid #1B1B1B;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 0px;
//       color: $light_gray;
//       height: 47px;
//       caret-color: $cursor;
//       &:-webkit-autofill,
//       :-webkit-autofill:hover,
//       :-webkit-autofill:focus,
//       :-webkit-autofill:active {
//         transition-delay: 99999s;
//         transition: color 99999s ease-out, background-color 99999s ease-out;
//       }
//     }
//   }

//   .el-form-item {
//     border-radius: 15px;
//     color: #fafafa;
//   }
// }
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#1B1B1B;
$light_gray:#1B1B1B;

.login-container {
  min-height: 100%;
  width: 100%;
  height: 100%;
  background: url('../../assets/background/register.jpg') no-repeat center center fixed;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 100%;
    padding: 50px 55px;
    z-index: 0;
    overflow: hidden;
    &::before {
      content: "";/* 必须包括 */
      position: absolute;/* 固定模糊层位置 */
      width:300%;
      height:300%;
      left: -100%;/* 回调模糊层位置 */
      top: -100%;/* 回调模糊层位置 */
      background: url('../../assets/background/register.jpg') no-repeat center center fixed;/* 与上面的bg中的background设置一样 */
      filter: blur(15px);/* 值越大越模糊 */
      z-index: -2;/* 模糊层在最下面 */
    }
    .loginForm-rgba{
      background-color: rgba(255, 250, 250, 0.3);/* 为文字更好显示，将背景颜色加深 */
      position: absolute;/* 固定半透明色层位置 */
      width:300%;
      height:300%;
       left: -100%;
      top: -100%;
      z-index: -1;/* 中间是rgba半透明色层 */
    }
    .register-form {
      width: 400px;
      margin: 200px auto;
      background: #fdfdfd;
      color: $dark_gray;
      box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
      padding: 44px;
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
      margin: 0px auto 40px 5px;
      text-align: left;
      font-weight: bold;
      display: inline-block;
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
