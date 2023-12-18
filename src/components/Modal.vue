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
      :width="width"
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
      type: Number,
    },
  })
  import { ref } from 'vue'
  // import { useRouter } from 'vue-router'
  // import { useStore } from 'vuex'

  // const router = useRouter()
  const visible = ref(false)
  // const store = useStore()
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
  })
</script>

<style scoped lang="less">
  .modal {
  }
</style>
