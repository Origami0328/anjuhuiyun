<template>
  <div class="">
    <a-space>
      <a-select placeholder="请选择省厅" style="width: 150px"></a-select>
      <a-select placeholder="请选择市局" style="width: 150px"></a-select>
      <a-select placeholder="请选择分局" style="width: 150px"></a-select>
      <a-select placeholder="请选择派出所" style="width: 150px"></a-select>
    </a-space>
  </div>
</template>

<script setup>
  import { watch } from 'vue'

  const props = defineProps({
    propsPoliceList: Array,
  })
  watch(
    () => props.propsPoliceList,
    (val) => {
      console.log(val)
    }
  )
</script>

<style scoped lang=""></style>
