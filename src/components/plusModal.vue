<template>
  <div class="modal">
    <a-modal
      v-model:open="visible"
      :title="title"
      :confirm-loading="confirmLoading"
      :okText="okText"
      @ok="handleOk"
      @cancel="closeModal"
      :footer="footer"
      width="100%"
      style="font-size: 20px"
      :maskClosable="false"
    >
      <a-form
        :rules="rules"
        :model="formState"
        ref="formRef"
        layout="inline"
        style="font-weight: bold; font-size: 20px"
      >
        <a-divider>
          {{ topTitle }}
        </a-divider>
        <slot name="topContent"></slot>
        <a-divider>{{ centerTitle }}</a-divider>
        <slot name="centerContent"></slot>
        <a-divider>{{ bottomTitle }}</a-divider>
        <slot name="bottomContent"></slot>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: 'create,refresh',
    },
    rules: {
      type: Object,
    },
    formState: {
      type: Object,
    },
    okText: {
      type: String,
      default: '确认',
    },
    footer: {
      type: String,
    },
    topTitle: {
      type: String,
    },
    bottomTitle: {
      type: String,
    },
    centerTitle: {
      type: String,
    },
  })
  import { ref } from 'vue'
  const formRef = ref()
  const visible = ref(false)
  const confirmLoading = ref(false)
  const showLoading = () => {
    confirmLoading.value = true
  }
  const hideLoading = () => {
    confirmLoading.value = false
  }
  const emit = defineEmits(['handleOk', 'closeModal'])
  const handleOk = () => {
    emit('handleOk')
  }
  const open = () => {
    visible.value = true
  }
  const close = () => {
    visible.value = false
  }
  const closeModal = () => {
    emit('closeModal')
  }
  defineExpose({
    open,
    close,
    showLoading,
    hideLoading,
    formRef,
  })
</script>

<style scoped lang="less">
  .modal {
  }
</style>
