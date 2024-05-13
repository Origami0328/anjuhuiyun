<template>
  <div class="login-container">
    <a-row>
      <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="16"></a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6">
        <div class="login-container-form">
          <div class="login-container-hello">hello!</div>
          <div class="login-container-title">欢迎来到 {{ title }}</div>
          <a-form :model="form" @submit.prevent="handleSubmit">
            <a-form-item>
              <a-input v-model:value="form.username" placeholder="输入用户名">
                <template v-slot:prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password
                v-model:value="form.password"
                placeholder="输入密码"
              >
                <template v-slot:prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                :loading="btnLoading"
                :disabled="form.username === '' || form.password === ''"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  // import { tempLogin } from '@/api/user'
  import { mapActions, mapGetters } from 'vuex'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { encrypt } from '@/utils/loginEncrypt'
  // import { message } from 'ant-design-vue'

  export default {
    name: 'Login',
    components: {
      UserOutlined,
      LockOutlined,
    },
    data() {
      return {
        form: {
          username: '',
          password: '',
          os: 'PC',
          clientId: '111',
        },
        redirect: undefined,
        btnLoading: false,
      }
    },
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        title: 'settings/title',
      }),
    },
    watch: {
      $route: {
        handler(route) {
          console.log(route)
          this.redirect = (route.query && route.query.redirect) || '/index'
        },
        immediate: true,
      },
    },
    mounted() {
      this.form.username = 'admin'
      this.form.password = '1'
      // this.initVaptcha()
    },
    methods: {
      ...mapActions({
        login: 'user/login',
      }),
      handleRoute() {
        return this.redirect === '/404' || this.redirect === '/403'
          ? '/'
          : this.redirect
      },
      async handleSubmit(data = {}) {
        this.btnLoading = true
        const password = encrypt(this.form.password)
        await this.login({ ...this.form, password, ...data }).finally(() => {
          this.btnLoading = false
        })
        await this.$router.push(this.handleRoute())
      },
    },
  }
</script>
<style lang="less">
  .login-container {
    width: 100%;
    height: 100vh;
    background: url('~@/assets/login_images/login_background.png');
    background-size: cover;
    &-form {
      width: calc(100% - 40px);
      height: 380px;
      padding: 4vh;
      margin-top: calc((100vh - 380px) / 2);
      margin-right: 20px;
      margin-left: 20px;
      background: url('~@/assets/login_images/login_form.png');
      background-size: 100% 100%;
      border-radius: 10px;
      box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
    }
    &-hello {
      font-size: 32px;
      color: #fff;
    }
    &-title {
      margin-bottom: 30px;
      font-size: 20px;
      color: #fff;
    }
    &-tips {
      position: fixed;
      bottom: @vab-margin;
      width: 100%;
      height: 40px;
      color: rgba(255, 255, 255, 0.856);
      text-align: center;
    }
    .ant-col {
      width: 100%;
      padding: 0 10px 0 10px;
    }
    .ant-input {
      height: 35px;
    }
    .ant-btn {
      width: 100%;
      height: 45px;
      border-radius: 99px;
    }
  }
  .vaptcha-init-main {
    display: table;
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
  }
  .vaptcha-init-loading {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .vaptcha-init-loading > a {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: none;
  }
  .vaptcha-init-loading > a img {
    vertical-align: middle;
  }
  .vaptcha-init-loading .vaptcha-text {
    font-family: sans-serif;
    font-size: 12px;
    color: #cccccc;
    vertical-align: middle;
  }
</style>
