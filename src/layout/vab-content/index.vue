<template>
  <div>
    <a-layout-content class="vab-content">
      <a-watermark :content="$store.state.user.username" :gap="[50, 50]">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform">
            <keep-alive :include="returnList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </a-watermark>
    </a-layout-content>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'VabContent',
    watch: {
      $route: {
        handler() {
          if ('mobile' === this.device) {
            this.$store.dispatch('settings/foldSideBar')
          }
        },
        immediate: true,
      },
    },
    computed: {
      ...mapGetters({
        returnList: 'keepComponent/returnList',
      }),
    },
  }
</script>

<style lang="less">
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.2s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .vab-content {
    min-height: calc(
      100vh - @vab-header-height - @vab-padding - @vab-padding - @vab-padding -
        @vab-padding
    ) !important;
    padding: @vab-padding;
    margin: @vab-margin;
    background: #fff;
    .error-container {
      height: calc(
        100vh - @vab-header-height - @vab-padding - @vab-padding - @vab-padding -
          @vab-padding - @vab-padding - @vab-margin
      ) !important;
    }
  }
</style>
