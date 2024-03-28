<template>
  <div class="modal">
    <a-modal
      v-model:open="visible"
      :title="title"
      :closable="false"
      :confirm-loading="confirmLoading"
      :okText="okText"
      @ok="handleOk"
      @cancel="closeModal"
      :cancel-button-props="{ disabled: disabledCancelButton }"
      :footer="footer"
      :width="width"
      :maskClosable="false"
      :bodyStyle="
        bodyStyle
          ? {
              height: '65vh',
            }
          : {}
      "
      style="font-size: 20px"
    >
      <slot></slot>
    </a-modal>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: 'create,refresh',
    },
    okText: {
      type: String,
      default: '确认',
    },
    footer: {
      type: String,
    },
    width: {
      type: [Number, String],
    },
    bodyStyle: {
      type: Boolean,
      default: true,
    },
  })
  import { ref } from 'vue'
  const visible = ref(false)
  const disabledCancelButton = ref(false)
  const disabledCancelTrue = () => {
    disabledCancelButton.value = true
  }
  const disabledCancelFalse = () => {
    disabledCancelButton.value = false
  }
  const confirmLoading = ref(false)
  const showLoading = () => {
    confirmLoading.value = true
  }
  const hideLoading = () => {
    confirmLoading.value = false
  }
  const emit = defineEmits(['handleOk', 'closeModal'])
  const handleOk = () => {
    disabledCancelTrue()
    emit('handleOk')
  }
  const open = () => {
    visible.value = true
  }
  const close = () => {
    disabledCancelFalse()
    visible.value = false
  }
  const closeModal = () => {
    disabledCancelFalse()
    emit('closeModal')
  }
  defineExpose({
    open,
    close,
    showLoading,
    hideLoading,
    disabledCancelTrue,
    disabledCancelFalse,
  })
</script>

<style scoped lang="less">
  .modal {
  }
</style>
