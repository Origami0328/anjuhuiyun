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
            v-model:value="requestObj.provieceCode"
            placeholder="选择省份"
            show-search
            style="width: 150px"
            :filter-option="filterOption"
            :options="provinceList"
            @change="(value, options) => cityToStreet(value, options, 'city')"
          ></a-select>
          <a-select
            v-model:value="requestObj.cityCode"
            show-search
            style="width: 150px"
            placeholder="选择城市"
            :not-found-content="null"
            :options="cityList"
            :filter-option="filterOption"
            @change="
              (value, options) => cityToStreet(value, options, 'district')
            "
          ></a-select>
          <a-select
            v-model:value="requestObj.districtCode"
            show-search
            placeholder="选择区县"
            style="width: 150px"
            :options="districtList"
            :filter-option="filterOption"
            @change="(value, options) => cityToStreet(value, options, 'street')"
          ></a-select>
          <a-select
            v-model:value="requestObj.streetCode"
            show-search
            style="width: 150px"
            placeholder="选择街道"
            :options="streetList"
            :filter-option="filterOption"
            :not-found-content="null"
          ></a-select>
        </a-space>
      </a-space>
      <a-space>
        <a-select
          v-model:value="requestObj.villageId"
          style="width: 150px"
          show-search
          :filter-option="filterOption"
          placeholder="选择小区"
          :not-found-content="null"
          :options="villageList"
          @change="createBuilding"
        ></a-select>
        <a-select
          v-model:value="requestObj.buildingId"
          placeholder="请选择楼栋"
          show-search
          :filter-option="filterOption"
          :options="buildingList"
          style="width: 150px"
          @change="createUnit"
        ></a-select>
        <a-select
          v-model:value="requestObj.unitId"
          placeholder="请选择单元"
          show-search
          :filter-option="filterOption"
          style="width: 150px"
          :options="unitList"
        ></a-select>
      </a-space>
      <a-space>
        <a-select
          v-model:value="requestObj.poProvieceCode"
          placeholder="请选择省厅"
          show-search
          :filter-option="filterOption"
          style="width: 150px"
          :options="poProvinceList"
          @change="(value, options) => cityToStreet(value, options, 'city')"
        ></a-select>
        <a-select
          v-model:value="requestObj.poCityCode"
          placeholder="请选择市局"
          show-search
          :filter-option="filterOption"
          style="width: 150px"
          :options="poCityList"
          @change="(value, options) => cityToStreet(value, options, 'district')"
        ></a-select>
        <a-select
          v-model:value="requestObj.poDistrictCode"
          placeholder="请选择分局"
          show-search
          :filter-option="filterOption"
          style="width: 100%"
          :options="poDistrictList"
          @change="(value, options) => cityToStreet(value, options, 'street')"
        ></a-select>
        <a-select
          v-model:value="requestObj.poStreetCode"
          placeholder="请选择派出所"
          show-search
          :filter-option="filterOption"
          style="width: 100%"
          :options="poStreetList"
        ></a-select>
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

        <a-popconfirm
          title="确定要删除选中项吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="multipleDel"
        >
          <a-button
            style="background-color: red; width: 70px; text-align: center"
            size="middle"
          >
            <template #icon>
              <DeleteOutlined style="color: #fff" />
            </template>
          </a-button>
        </a-popconfirm>
      </a-space>
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
            <a-button type="link">分配房东(未写)</a-button>
            <a-popconfirm
              title="确定要删除选中项吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="delTableItem(record)"
            >
              <a-button type="link">删除</a-button>
            </a-popconfirm>
          </div>
        </template>
        <template v-else-if="column.dataIndex == 'houseType'">
          <span>{{ houseTypeName(record.houseType) }}</span>
        </template>
      </template>
    </a-table>
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
        <a-form-item label="房屋名称" name="name">
          <a-input
            v-model:value="formState.name"
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
          <a-input
            v-model:value="formState.qrCodeId"
            placeholder="标准地址编号"
          />
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
            v-model:value="formState.houseName"
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
    getHouseList,
    getUnit,
    getBuilding,
    onlyHouseName,
    editHouseList,
    multipleDeleteApi,
    deleteHouse,
  } from '@/api/community'
  // import { getBuilding } from '@/api/system'
  import { getDictionary } from '@/api/system'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  import { messageContent } from '@/utils/message'
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
    id: '',
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
    multipleDel,
    delTableItem,
    searchTableItem,
    resetTableObj,
    paginationInfo,
    tableLoading,
    handleTableChange,
    state,
    getData,
    requestObj,
    onSelectChange,
    villageList,
    poProvinceList,
    provinceList,
    formVillageList,
  } = useTableInit({
    getTableList: getHouseList,
    tableObj: houseObj,
    delTableEle: deleteHouse,
    allDel: multipleDeleteApi,
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

  const cityList = ref([])
  const districtList = ref([])
  const streetList = ref([])
  const poCityList = ref([])
  const poDistrictList = ref([])
  const poStreetList = ref([])
  const { simpleRequest, clearFormOrPageInput } = useSimpleRequest()

  const rules = {
    name: [{ required: true, message: '请输入房屋名称' }],
    villageId: [{ required: true, message: '请选择小区' }],
    buildingId: [{ required: true, message: '请选择楼号' }],
    unitId: [{ required: true, message: '请选择单元' }],
  }
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

  const cityToStreet = (value, options, type, isForm = false) => {
    let changeList
    if (options.childCode == 'DQ') {
      if (type == 'city') {
        changeList = cityList
        clearFormOrPageInput({
          requestObj,
          label: '3',
          childCode: 'DQ',
          isForm,
          pageList: {
            cityList,
            streetList,
            districtList,
          },
        })
      } else if (type == 'district') {
        changeList = districtList
        clearFormOrPageInput({
          requestObj,
          label: '2',
          childCode: 'DQ',
          isForm,
          pageList: {
            cityList,
            streetList,
            districtList,
          },
        })
      } else if (type == 'street') {
        changeList = streetList
        clearFormOrPageInput({
          requestObj,
          label: '1',
          childCode: 'DQ',
          isForm,
          pageList: {
            cityList,
            streetList,
            districtList,
          },
        })
        // requestObj.streetCode = undefined
      }
    } else if (options.childCode == 'PO') {
      if (type == 'city') {
        changeList = poCityList
        clearFormOrPageInput({
          requestObj,
          label: 'p3',
          childCode: 'PO',
          isForm,
          pageList: {
            poCityList,
            poStreetList,
            poDistrictList,
          },
        })
        // requestObj.poCityCode = undefined
        // requestObj.poDistrictCode = undefined
        // requestObj.poStreetCode = undefined
      } else if (type == 'district') {
        changeList = poDistrictList
        // requestObj.poDistrictCode = undefined
        // requestObj.poStreetCode = undefined
        clearFormOrPageInput({
          requestObj,
          label: 'p2',
          childCode: 'PO',
          isForm,
          pageList: {
            poCityList,
            poStreetList,
            poDistrictList,
          },
        })
      } else if (type == 'street') {
        changeList = poStreetList
        // requestObj.poStreetCode = undefined
        clearFormOrPageInput({
          requestObj,
          label: 'p1',
          childCode: 'PO',
          isForm,
          pageList: {
            poCityList,
            poStreetList,
            poDistrictList,
          },
        })
      }
    }
    if (value != '') {
      simpleRequest({
        requestFun: getDictionary,
        requestObj: {
          dicCode: value,
          grade: type,
          childCode: options.childCode,
        },
        tableList: changeList,
        labelString: 'dicName',
        valueString: 'dicCode',
      })
    }
    // else {
    //   if (options.childCode == 'DQ' && type == 'city') {
    //     requestObj.cityCode = undefined
    //     requestObj.streetCode = undefined
    //     requestObj.districtCode = undefined
    //     cityList.value = [
    //       {
    //         value: '',
    //         label: '全部',
    //         childCode: 'DQ',
    //       },
    //     ]
    //     streetList.value = [
    //       {
    //         value: '',
    //         label: '全部',
    //         childCode: 'DQ',
    //       },
    //     ]
    //     districtList.value = [
    //       {
    //         value: '',
    //         label: '全部',
    //         childCode: 'DQ',
    //       },
    //     ]
    //   } else if (options.childCode == 'PO' && type == 'city') {
    //     requestObj.poCityCode = undefined
    //     requestObj.poStreetCode = undefined
    //     requestObj.poDistrictCode = undefined
    //     poCityList.value = [
    //       {
    //         value: '',
    //         label: '全部',
    //         childCode: 'PO',
    //       },
    //     ]
    //     poStreetList.value = [
    //       {
    //         value: '',
    //         label: '全部',
    //         childCode: 'PO',
    //       },
    //     ]
    //     poDistrictList.value = [
    //       {
    //         value: '',
    //         label: '全部',
    //         childCode: 'PO',
    //       },
    //     ]
    //   }
    // }
  }
  const createBuilding = (value, options, isForm = false) => {
    if (isForm) {
      formState.buildingId = undefined
      formState.unitId = undefined
    } else {
      requestObj.buildingId = undefined
      requestObj.unitId = undefined
    }
    if (value != '') {
      getBuilding({ villageId: value }).then((res) => {
        let buildingArray = res.result.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          }
        })
        isForm
          ? (formBuildingList.value = buildingArray)
          : (buildingList.value = [
              {
                value: '',
                label: '全部',
              },
              ...buildingArray,
            ])
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
      getUnit({ buildingId: value }).then((res) => {
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

  const addOrEdit = async () => {
    let res = await onlyHouseName({
      name: formState.name,
      unitId: formState.unitId,
      onlyId: formState.id ? formState.id : undefined,
    })
    if (res.result == '0') {
      if (editId.value == '0') {
        const buildingName = formBuildingList.value.find(
          (item) => item.value === formState.buildingId
        )
        const unitName = formUnitList.value.find(
          (item) => item.value === formState.unitId
        )
        await addHouseList({
          ...formState,
          buildingName: buildingName.name,
          unitName: unitName.name,
        })
        modalRef.value.close()
        messageContent('success', '新增表单项成功')
      } else {
        await editHouseList(formState)
      }
    } else {
      messageContent('error', '房屋名称已存在')
      return
    }
    await getData(requestObj)
  }

  const submit = async () => {
    modalRef.value.showLoading()
    if (editId.value == '0') {
      formRef.value
        .validate()
        .then(async () => {
          await addOrEdit()
        })
        .finally(() => {
          modalRef.value.hideLoading()
        })
    } else {
      await addOrEdit()
      modalRef.value.close()
      modalRef.value.hideLoading()
      messageContent('success', '修改表单项成功')
    }
  }
  const edit = async (item) => {
    item.changeLoading = true
    handleChange(item)
  }
  const resetSearchObj = () => {
    if (typeof resetTableObj == 'function') {
      resetTableObj()
    }
    paginationInfo.current = 1
    getData(requestObj)
  }
  const close = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  }
</script>

<style scoped lang=""></style>
