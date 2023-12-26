<template>
  <div class="">
    <a-space direction="vertical">
      <a-space>
        <a-input placeholder="输入关键词" v-model:value="requestObj.searchName">
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>

        <a-space>
          <a-select
            v-model:value="requestObj.province"
            placeholder="选择省份"
            show-search
            style="width: 150px"
            :filter-option="filterOption"
            :options="provinceList"
            @change="handleCityChange"
          ></a-select>
          <a-select
            v-model:value="requestObj.city"
            show-search
            style="width: 150px"
            placeholder="选择城市"
            :not-found-content="null"
            :options="cityInfo"
            :filter-option="filterOption"
            @change="handleDistrictChange"
          ></a-select>
          <a-select
            v-model:value="requestObj.district"
            show-search
            placeholder="选择区县"
            style="width: 150px"
            :options="districtInfo"
            :filter-option="filterOption"
            @change="handleStreetChange"
          ></a-select>
          <a-select
            v-model:value="requestObj.street"
            show-search
            style="width: 150px"
            placeholder="选择街道"
            :filter-option="filterOption"
            :not-found-content="null"
            :options="streetInfo"
            @change="handleChange"
          ></a-select>
        </a-space>
      </a-space>
      <a-space>
        <a-select
          v-model:value="requestObj.villageId"
          style="width: 150px"
          show-search
          placeholder="选择小区"
          :not-found-content="null"
          :options="villageList"
          @change="createBuilding"
        ></a-select>
        <a-select
          v-model:value="requestObj.buildingId"
          placeholder="请选择楼栋"
          :options="buildingList"
          style="width: 150px"
          @change="createUnit"
        ></a-select>
        <a-select
          placeholder="请选择单元"
          style="width: 150px"
          :options="unitList"
        ></a-select>
      </a-space>
      <a-space>
        <a-select placeholder="请选择省厅" style="width: 150px"></a-select>
        <a-select placeholder="请选择市局" style="width: 150px"></a-select>
        <a-select placeholder="请选择分局" style="width: 150px"></a-select>
        <a-select placeholder="请选择派出所" style="width: 150px"></a-select>
      </a-space>
      <a-space>
        <a-button type="primary" @click="searchTableItem">
          <SearchOutlined />
        </a-button>
        <a-button
          class="button"
          type="primary"
          @click="resetSearchObj"
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
              <a-button
                type="link"
                @click="edit(record)"
                :loading="record.changeLoading"
              >
                修改
              </a-button>
              <a-button type="link">分配房东</a-button>
              <a-button type="link" :loading="record.delLoading">删除</a-button>
            </div>
          </template>
          <template v-else-if="column.dataIndex == 'houseType'">
            <span>{{ houseTypeName(record.houseType) }}</span>
          </template>
        </template>
      </a-table>
    </a-space>
    <Modal
      :title="titleValue"
      ref="modalRef"
      @handleOk="submit"
      @closeModal="close"
    >
      <a-form
        :model="formState"
        :rules="editId ? {} : rules"
        v-bind="formItemLayout"
        ref="formRef"
      >
        <a-form-item label="房屋名称" name="houseName">
          <a-input
            v-model:value="formState.houseName"
            style="width: 200px"
            placeholder="房屋名称"
          />
        </a-form-item>
        <a-form-item label="楼层">
          <a-input
            v-model:value="formState.floor"
            placeholder="楼层"
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item label="标准地址编号">
          <a-input v-model:value="formState.name" placeholder="标准地址编号" />
        </a-form-item>
        <a-form-item label="房屋类型">
          <a-select
            v-model:value="formState.houseType"
            placeholder="请选择房屋类型"
            option-label-prop="children"
          >
            <a-select-option
              :value="item.value"
              :label="item.label"
              v-for="item in houseTypeMap"
              :key="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注">
          <a-input
            v-model:value="formState.name"
            placeholder="公司型房屋填写公司名称"
          />
        </a-form-item>
        <a-form-item label="小区" name="villageId" v-if="editId == '0'">
          <a-select
            v-model:value="formState.villageId"
            :filter-option="filterOption"
            placeholder="请选择小区"
            show-search
            :options="formVillageList"
            @change="(value, options) => createBuilding(value, options, true)"
          />
        </a-form-item>
        <a-form-item label="楼号" name="buildingId" v-if="editId == '0'">
          <a-select
            v-model:value="formState.buildingId"
            :options="formBuildingList"
            placeholder="请选择楼号"
            @change="(value, options) => createUnit(value, options, true)"
          />
        </a-form-item>
        <a-form-item label="单元" name="unitId" v-if="editId == '0'">
          <a-select
            v-model:value="formState.unitId"
            :options="formUnitList"
            placeholder="请选择单元"
          />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup>
  import Modal from '@/components/Modal.vue'
  import {
    SearchOutlined,
    SyncOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue'
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import { ref } from 'vue'

  import {
    addHouseList,
    getBuilding,
    getHouseList,
    getUnit,
  } from '@/api/community'
  import { getProvince, getVillageList } from '@/api/system'
  import { message } from 'ant-design-vue'
  import { useRequestProvinceToStreet } from '@/hooks/useProvinceToStreet'
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
  const form = {
    buildingName: '',
    unitName: '',
    name: '',
    floor: '',
    houseType: undefined,
    houseName: '',
    villageType: '',
    qrCodeId: '',
    villageId: undefined,
    buildingId: undefined,
    unitId: undefined,
  }
  const formRef = ref()
  const {
    dataSource,
    searchTableItem,
    resetTableObj,
    paginationInfo,
    tableLoading,
    handleTableChange,
    state,
    getData,
    requestObj,
    onSelectChange,
  } = useTableInit({
    getTableList: getHouseList,
    tableObj: houseObj,
  })
  const {
    handleCreate,
    modalRef,
    formItemLayout,
    editId,
    formState,
    titleValue,
    handleChange,
  } = useInitFrom({
    form,
  })
  const provinceList = ref([])
  const formProvinceList = ref([])
  const { getProvinceToStreetList } = useRequestProvinceToStreet()
  getProvinceToStreetList({
    requestFun: getProvince,
    tableList: provinceList,
    formList: formProvinceList,
    labelString: 'name',
    valueString: 'province_code',
  })
  const rules = {
    houseName: [{ required: true, message: '请输入房屋名称' }],
    villageId: [{ required: true, message: '请选择小区' }],
    buildingId: [{ required: true, message: '请选择楼号' }],
    unitId: [{ required: true, message: '请选择单元' }],
  }
  const columns = [
    {
      title: '房屋名称',
      dataIndex: 'name',
      align: 'center',
      width: '100px',
    },
    {
      title: '小区名',
      dataIndex: 'villageName',
      align: 'center',
      width: '150px',
    },
    {
      title: '楼层',
      dataIndex: 'floor',
      align: 'center',
      width: '100px',
    },

    {
      title: '楼号',
      dataIndex: 'buildingName',
      align: 'center',
      width: '150px',
    },
    {
      title: '单元',
      dataIndex: 'unitName',
      align: 'center',
      width: '150px',
    },
    {
      title: '设备编码',
      dataIndex: 'callId',
      align: 'center',
      width: '200px',
    },
    {
      title: '房屋类型',
      dataIndex: 'houseType',
      align: 'center',
      width: '150px',
    },
    {
      title: '备注',
      dataIndex: 'houseName',
      align: 'center',
      width: '100px',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '500px',
      align: 'center',
    },
  ]
  const villageList = ref([])
  const formVillageList = ref([])
  const buildingList = ref([])
  const formBuildingList = ref([])
  const unitList = ref([])
  const formUnitList = ref([])
  const houseTypeMap = [
    {
      value: '0',
      label: '管理处',
    },
    {
      value: '1',
      label: '自主型',
    },
    {
      value: '3',
      label: '公司型',
    },
    {
      value: '4',
      label: '长租房',
    },
    {
      value: '5',
      label: '空置',
    },
    {
      value: '6',
      label: '临时访客',
    },
  ]
  const houseTypeName = (housetype) => {
    for (let houseTypeMapKey in houseTypeMap) {
      if (houseTypeMap[houseTypeMapKey].value == housetype)
        return houseTypeMap[houseTypeMapKey].label
    }
  }
  getVillageList().then((res) => {
    const villageArray = res.result.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
    formVillageList.value = villageArray
    villageArray.unshift({
      value: '',
      label: '全部',
    })
    villageList.value = villageArray
  })
  // const handleCityChange = (value) => {
  //   const cityList = ref([])
  //   // if (value != '') {
  //   //   getProvinceToStreetList({
  //   //     requestFun,
  //   //     requestObj: {
  //   //       value,
  //   //     },
  //   //     tableList: cityList,
  //   //     labelString: '',
  //   //     valueString: '',
  //   //   })
  //   // } else {
  //   //   cityList.value = [
  //   //     {
  //   //       value: '',
  //   //       label: '全部',
  //   //     },
  //   //   ]
  //   // }
  // }
  const createBuilding = (value, options, isForm = false) => {
    if (isForm) {
      formState.buildingId = undefined
      formState.unitId = undefined
    } else {
      requestObj.buildingId = undefined
      requestObj.unitId = undefined
    }
    if (value != '') {
      getBuilding({ value }).then((res) => {
        let buildingArray = res.result.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          }
        })
        isForm
          ? (formBuildingList.value = buildingArray)
          : (buildingList.value = [...buildingArray])
      })
    } else {
      isForm
        ? (formBuildingList.value = [])
        : (buildingList.value = [
            {
              value: '',
              label: '全部',
            },
          ])
    }
  }
  const createUnit = (value, options, isForm = false) => {
    if (isForm) {
      formState.unitId = undefined
    } else {
      requestObj.unitId = undefined
    }
    if (value != '') {
      getUnit({ value }).then((res) => {
        let unitArray = res.result.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          }
        })
        isForm
          ? (formUnitList.value = unitArray)
          : (unitList.value = [{ value: '', label: '全部' }, ...unitArray])
      })
    } else {
      isForm
        ? (formUnitList.value = [])
        : (unitList.value = [
            {
              value: '',
              label: '全部',
            },
          ])
    }
  }

  const filterOption = (inputValue, option) => {
    return option.label.indexOf(inputValue) > -1
  }

  const submit = async () => {
    modalRef.value.showLoading()
    if (editId.value == '0') {
      formRef.value
        .validate()
        .then(async () => {
          await addHouseList(formState).then((res) => {
            console.log(res)
          })
          await getData(requestObj)

          modalRef.value.close()
          message.success('新增表单项成功')
        })
        .finally(() => {
          modalRef.value.hideLoading()
        })
    }
  }
  const close = () => {}
  const edit = async (item) => {
    item.changeLoading = true
    handleChange(item)
  }
  const resetSearchObj = () => {
    if (typeof resetTableObj == 'function') {
      resetTableObj()
    }

    getData(requestObj)
  }
</script>

<style scoped lang=""></style>
