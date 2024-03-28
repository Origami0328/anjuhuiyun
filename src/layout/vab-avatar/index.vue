<template>
  <div class="vab-avatar">
    <a-dropdown placement="top" class="dropdown">
      <span class="ant-dropdown-link">
        {{ $store.state.user.username }}
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu
          class="dropdown12"
          style="position: fixed; top: 52px; width: 120px; right: 10px"
        >
          <a-menu-item @click="changePsw">
            <template #icon>
              <user-outlined />
            </template>

            修改密码
          </a-menu-item>
          <a-menu-item @click="logout">
            <template #icon>
              <poweroff-outlined />
            </template>
            退出
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <Modal ref="ModalRef" @handleOk="handleOk" title="修改密码">
      <a-form :model="formState" name="normal_login" class="login-form">
        <a-form-item
          label="旧的密码"
          name="oldPassword"
          :rules="[{ required: true, message: '请输入旧密码' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="输入旧密码"
          ></a-input-password>
        </a-form-item>

        <a-form-item
          label="新的密码"
          name="NewPassword"
          :rules="[{ required: true, message: '请输入新密码' }]"
        >
          <a-input-password
            v-model:value="formState.newPassword"
            placeholder="输入新密码"
          ></a-input-password>
        </a-form-item>
        <a-form-item
          label="确认密码"
          name="confirmPassword"
          :rules="[{ required: true, message: '请再次输入新密码' }]"
        >
          <a-input-password
            v-model:value="formState.confirmPassword"
            placeholder="确认密码"
          ></a-input-password>
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup>
  // import { recordRoute } from '@/config'
  import {
    DownOutlined,
    UserOutlined,
    PoweroffOutlined,
  } from '@ant-design/icons-vue'
  import Modal from '@/components/Modal.vue'
  import { useStore } from 'vuex'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  const store = useStore()
  const router = useRouter()
  // const route = useRoute()
  const logout = async () => {
    await store.dispatch('user/logout')
    // if (recordRoute) {
    //   const fullPath = route.fullPath
    //   router.push(`/login?redirect=${fullPath}`)
    // } else {
    //   router.push('/login')
    // }
    await store.commit('tagsBar/delAllVisitedRoutes')

    router.push('/login')
  }
  // const username = computed(() => store.getters['user/username'])
  const ModalRef = ref('')
  const changePsw = () => {
    ModalRef.value.open()
  }
  const handleOk = async () => {
    ModalRef.value.showLoading()
    // 调修改密码接口

    // 删除token等
    await store.dispatch('user/logout')
    // // 取消confirmLoading
    ModalRef.value.hideLoading()
    // //回到登录页面

    router.push('/login')
  }
  const formState = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
</script>
<style lang="less">
  .dropdown {
    cursor: pointer;
    .dropdown12 {
      font-size: small;
    }
  }
  .ant-dropdown-link {
    display: flex;
    align-items: center;
    color: white;
    margin-right: 20px;
  }
</style>
