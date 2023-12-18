<template>
  <div class="testAccount">
    <a-space direction="vertical">
      <a-space>
        <a-input v-model:value="searchValue" placeholder="Basic usage">
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
        <a-select
          v-model:value="rabbitTypeValue"
          show-search
          style="width: 100px"
          placeholder="选择小区"
          :not-found-content="null"
          :options="rabbitType"
          @change="handleChange"
        ></a-select>
      </a-space>
      <a-space></a-space>
    </a-space>
  </div>
</template>

<script setup>
  import { SearchOutlined } from '@ant-design/icons-vue'
  import { ref } from 'vue'
  const searchValue = ref('')
  let rabbitTypeValue = ref(undefined)
  const rabbitType = [
    {
      label: '小兔关门',
      value: 'close',
    },
    {
      label: '小兔开门',
      value: 'open',
    },
  ]
  const handleChange = () => {
    console.log(rabbitTypeValue.value)
  }
</script>

<style scoped lang=""></style>
