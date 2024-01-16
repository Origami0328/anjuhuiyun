<template>
  <div class="marquee"></div>
</template>

<style>
  .marquee {
    overflow: hidden;
  }

  .marquee span {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 10s linear infinite;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  /* 设置过渡动画 */
  .marquee-enter-active,
  .marquee-leave-active {
    transition: all 0.5s;
  }

  .marquee-enter,
  .marquee-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
