<template>
  <div class="f-header">
    <span class="logo">
      <vab-logo></vab-logo>
    </span>
    <div class="vab-header">
      <menu-unfold-outlined
        class="trigger"
        v-if="collapse"
        @click="toggleCollapse"
      />
      <menu-fold-outlined class="trigger" v-else @click="toggleCollapse" />
    </div>
    <div class="vab-avatar">
      <vab-avatar></vab-avatar>
    </div>
  </div>
</template>

<script setup>
  import VabLogo from '@/layout/vab-logo'
  import VabAvatar from '@/layout/vab-avatar'
  import { useStore } from 'vuex'
  import { computed } from 'vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  let store = useStore()
  let collapse = computed(() => store.getters['settings/collapse'])
  const toggleCollapse = () => {
    store.dispatch('settings/toggleCollapse')
  }
</script>

<style scoped lang="less">
  .f-header {
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 52px;
    background-color: rgba(67, 56, 202, 1);
    z-index: 2000;
    .logo {
      width: 250px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(67, 56, 202, 1);
    }
    .vab-header {
      .trigger {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 42px;
        height: 52px;
        cursor: pointer;
        color: white;
      }
    }
    .vab-avatar {
      display: flex;
      align-items: center;
      margin-left: auto;
    }
  }
</style>
