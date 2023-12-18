<template>
  <div class="">
    <a-space direction="vertical">
      <a-space>
        <a-input
          v-model:value="userListObj.searchName"
          placeholder="这里输入关键词"
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
      </a-space>
      <a-space>
        <a-table :data-source="dataSource"></a-table>
      </a-space>
    </a-space>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import { SearchOutlined } from '@ant-design/icons-vue'
  import { useTableInit } from '@/hooks/useTableComponent'
  import { getVillageDoorCardList } from '@/api/community'
  const { dataSource } = useTableInit({
    getTableList: getVillageDoorCardList,
  })
  const userListObj = reactive({
    searchName: '',
    startDate: '',
    endDate: '',
    villageId: '',
    status: '',
    pageNum: '1',
    pageSize: '2',
  })
</script>

<style scoped lang=""></style>
