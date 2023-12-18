<template>
  <div class="">
    <a-space direction="vertical">
      <ProvinceToStreet ref="provinceToStreetRef"></ProvinceToStreet>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :row-selection="{
          selectedRowKeys: state.selectedRowKeys,
          onChange: onSelectChange,
        }"
        bordered
        :loading="tableLoading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex == 'operation'">
            <div>
              <a-button type="link" @click="openModal('修改', record)">
                修改
              </a-button>
              <a-button type="link" @click="delTableItem(record)">
                删除
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-space>
  </div>
</template>

<script setup>
  import ProvinceToStreet from '@/components/provinceToStreet'
  import { useTableInit } from '@/hooks/useTableComponent'
  import { reactive } from 'vue'
  import { getHouseList } from '@/api/community'
  // const tableLoading = ref(false)
  // const dataSource = ref([])
  const columns = [
    {
      title: '编号',
      dataIndex: 'numId',
      align: 'center',
      width: '10%',
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: '400px',
    },
    {
      title: '小区名',
      dataIndex: 'villageName',
      align: 'center',
      width: '400px',
    },
    {
      title: '楼号',
      dataIndex: 'buildingName',
      align: 'center',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '300px',
      align: 'center',
    },
  ]
  const openModal = (value, record) => {
    console.log(value, record)
  }
  const delTableItem = (item) => {
    console.log(item)
  }
  const state = reactive({
    selectedRowKeys: [],
    ids: [],
  })
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRows changed: ', selectedRows)
    state.selectedRowKeys = selectedRowKeys
    state.ids = selectedRows.map((item) => {
      return item.id
    })
  }
  // const getUnitTable = (unitObj) => {
  //   getUnitList(unitObj).then((res) => {
  //     console.log(res)
  //     dataSource.value = res.result.list
  //   })
  // }
  const unitObj = reactive({
    pageNum: 1,
    pageSize: 2,
    searchName: '',
    provieceCode: '',
    cityCode: '',
    districtCode: '',
    streetCode: '',
    villageId: 'bc1146e292d24b6f8d30486039be2f1f',
    buildingId: '',
    poProvieceCode: '',
    poCityCode: '',
    poDistrictCode: '',
    poStreetCode: '',
  })
  const {
    dataSource,
    // searchTableItem,
    // resetTableObj,
    provinceToStreetRef,
    // paginationInfo,
    tableLoading,
    // handleTableChange,
  } = useTableInit({
    getTableList: getHouseList,
    tableObj: unitObj,
  })
  // getUnitTable(unitObj)
</script>

<style scoped lang=""></style>
