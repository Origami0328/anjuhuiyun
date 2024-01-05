<template>
  <div class="">
    <div>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="paginationInfo"
        :row-selection="{
          selectedRowKeys: state.selectedRowKeys,
          onChange: onSelectChange,
        }"
        bordered
        :loading="tableLoading"
        @change="handleTableChange"
      ></a-table>
    </div>
  </div>
</template>

<script setup>
  import { useTableInit } from '@/hooks/useTableComponent'

  import { getHouseList, multipleDeleteApi, deleteHouse } from '@/api/community'
  // import { getBuilding } from '@/api/system'

  const houseObj = {
    searchName: '',
    provieceCode: undefined,
    cityCode: undefined,
    districtCode: undefined,
    streetCode: undefined,
    villageId: undefined,
    buildingId: undefined,
    unitId: undefined,
    poProvieceCode: undefined,
    poCityCode: undefined,
    poDistrictCode: undefined,
    poStreetCode: undefined,
    pageNum: 1,
    pageSize: 10,
  }

  const {
    dataSource,

    paginationInfo,
    tableLoading,
    handleTableChange,
    state,

    onSelectChange,
  } = useTableInit({
    getTableList: getHouseList,
    tableObj: houseObj,
    delTableEle: deleteHouse,
    allDel: multipleDeleteApi,
  })

  const columns = [
    {
      title: '房屋名称',
      dataIndex: 'name',
      align: 'center',
      width: '10%',
    },
    {
      title: '小区名',
      dataIndex: 'villageName',
      align: 'center',
      width: '10%',
    },
    {
      title: '楼层',
      dataIndex: 'floor',
      align: 'center',
      width: '10%',
    },

    {
      title: '楼号',
      dataIndex: 'buildingName',
      align: 'center',
      width: '10%',
    },
    {
      title: '单元',
      dataIndex: 'unitName',
      align: 'center',
      width: '10%',
    },
    {
      title: '设备编码',
      dataIndex: 'callId',
      align: 'center',
      width: '10%',
    },
    {
      title: '房屋类型',
      dataIndex: 'houseType',
      align: 'center',
      width: '10%',
    },
    {
      title: '备注',
      dataIndex: 'houseName',
      align: 'center',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      align: 'center',
    },
  ]
</script>

<style scoped lang=""></style>
