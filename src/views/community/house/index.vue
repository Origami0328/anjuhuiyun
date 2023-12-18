<template>
  <div class="">
    <a-space direction="vertical">
      <a-space>
        <a-input
          placeholder="输入关键词"
          v-model:value="houseObj.searchName"
        ></a-input>
        <ProvinceToStreet ref="provinceToStreetRef">
          <a-select placeholder="请选择小区"></a-select>
          <a-select placeholder="请选择楼栋"></a-select>
          <a-select placeholder="请选择单元"></a-select>
        </ProvinceToStreet>
      </a-space>
      <ProvinceToPolice></ProvinceToPolice>
      <a-space>
        <a-button type="primary" @click="searchTableItem">
          <SearchOutlined />
        </a-button>
        <a-button
          class="button"
          type="primary"
          @click="resetTableObj"
          style="width: 50px"
        >
          <template #icon><sync-outlined /></template>
        </a-button>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button
          style="background-color: red; width: 70px; text-align: center"
          size="middle"
        >
          <template #icon>
            <DeleteOutlined style="color: #fff" />
          </template>
        </a-button>
      </a-space>
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
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex == 'operation'">
            <div>
              <a-button type="link">修改</a-button>
              <a-button type="link">分配房东</a-button>
              <a-button type="link">删除</a-button>
            </div>
          </template>
          <template v-else-if="column.dataIndex == 'houseType'">
            <span>{{ houseTypeName(record.houseType) }}</span>
          </template>
        </template>
      </a-table>
    </a-space>
    <Modal :title="titleValue" ref="modalRef">
      <a-form :model="formState" v-bind="formItemLayout">
        <a-form-item label="房屋名称">
          <a-input
            v-model:value="formState.name"
            style="width: 200px"
            placeholder="房屋名称"
          />
        </a-form-item>
        <a-form-item label="楼层">
          <a-input v-model:value="formState.name" placeholder="楼层" />
        </a-form-item>
        <a-form-item label="标准地址编号">
          <a-input v-model:value="formState.name" placeholder="标准地址编号" />
        </a-form-item>
        <a-form-item label="房屋类型">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="备注">
          <a-input
            v-model:value="formState.name"
            placeholder="公司型房屋填写公司名称"
          />
        </a-form-item>
        <a-form-item label="小区">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="楼号">
          <a-input v-model:value="formState.buildingName" />
        </a-form-item>
        <a-form-item label="单元">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup>
  import Modal from '@/components/Modal.vue'
  import ProvinceToStreet from '@/components/provinceToStreet.vue'
  import ProvinceToPolice from '@/components/provinceToPolice.vue'
  import {
    SearchOutlined,
    SyncOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue'
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import { reactive } from 'vue'

  import { getHouseList } from '@/api/community'
  const columns = [
    {
      title: '房屋名称',
      dataIndex: 'name',
      align: 'center',
      width: '8%',
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
      width: '8%',
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
      width: '500px',
      align: 'center',
    },
  ]
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
  const houseTypeMap = [
    {
      value: 0,
      label: '管理处',
    },
    {
      value: 1,
      label: '自主型',
    },
    {
      value: 3,
      label: '公司型',
    },
    {
      value: 4,
      label: '长租房',
    },
    {
      value: 5,
      label: '空置',
    },
    {
      value: 6,
      label: '临时访客',
    },
    {
      value: 0,
      label: '管理处',
    },
  ]
  const houseTypeName = (housetype) => {
    for (let houseTypeMapKey in houseTypeMap) {
      if (houseTypeMap[houseTypeMapKey].value == housetype)
        return houseTypeMap[houseTypeMapKey].label
    }
  }
  const houseObj = {
    searchName: '',
    provieceCode: '',
    cityCode: '',
    districtCode: '',
    streetCode: '',
    villageId: '',
    buildingId: '',
    unitId: '',
    poProvieceCode: '',
    poCityCode: '',
    poDistrictCode: '',
    poStreetCode: '',
    pageNum: 1,
    pageSize: 10,
  }
  const {
    dataSource,
    searchTableItem,
    resetTableObj,
    provinceToStreetRef,
    paginationInfo,
    tableLoading,
    handleTableChange,
  } = useTableInit({
    getTableList: getHouseList,
    tableObj: houseObj,
  })
  const { handleCreate, titleValue, modalRef, formItemLayout } = useInitFrom({
    form: houseObj,
  })

  const formState = reactive({
    buildingName: '',
    unitName: '',
    name: '',
    floor: '',
    houseType: '',
    houseName: '',
    villageType: '',
  })
</script>

<style scoped lang=""></style>
