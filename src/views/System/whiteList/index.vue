<template>
  <div class="capability">
    <div style="margin-top: 10px">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :row-selection="{
          selectedRowKeys: state.selectedRowKeys,
          onChange: onSelectChange,
        }"
        :pagination="paginationInfo"
        @change="handleTableChange"
      ></a-table>
    </div>
  </div>
</template>

<script setup>
  const searchObj = {
    searchName: '',
  }
  import { useTableInit } from '@/hooks/useTableComponent'
  const {
    dataSource,
    state,
    onSelectChange,
    paginationInfo,
    handleTableChange,
  } = useTableInit({
    tableObj: searchObj,
  })
  const columns = [
    {
      title: '编号',
      dataIndex: 'No',
      align: 'center',
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '编码',
      dataIndex: 'code',
      align: 'center',
    },
    {
      title: '图标',
      dataIndex: 'imageUrl',
      align: 'center',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: '40%',
    },
  ]
</script>

<style scoped lang="less">
  .imageDel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    color: red;
    cursor: pointer;
    font-size: 20px;
    //background-color: lightsteelblue;
  }
</style>
