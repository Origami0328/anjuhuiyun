<template>
  <div class="">
    <a-space direction="vertical">
      <a-row :gutter="[48, 16]" style="width: 100%">
        <a-col :md="4" :sm="2">
          <a-input
            placeholder="输入关键词"
            style="width: 150px"
            v-model:value="requestObj.searchName"
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.provieceCode"
            placeholder="选择省份"
            show-search
            :options="provinceList"
            style="width: 150px"
            :filter-option="filterOption"
            @change="(value, options) => cityToStreet(value, options, 'city')"
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.cityCode"
            show-search
            style="width: 150px"
            placeholder="选择城市"
            :options="cityList"
            :filter-option="filterOption"
            @change="
              (value, options) => cityToStreet(value, options, 'district')
            "
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.districtCode"
            :options="districtList"
            show-search
            placeholder="选择区县"
            style="width: 150px"
            :filter-option="filterOption"
            @change="(value, options) => cityToStreet(value, options, 'street')"
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.streetCode"
            show-search
            style="width: 150px"
            placeholder="选择街道"
            :filter-option="filterOption"
            :not-found-content="null"
            :options="streetList"
          ></a-select>
        </a-col>
        <template v-if="advanced">
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.villageId"
              style="width: 150px"
              show-search
              placeholder="选择小区"
              :filter-option="filterOption"
              :options="villageList"
              :not-found-content="null"
              @change="(value, options) => createBuilding(value, options)"
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.buildingId"
              style="width: 150px"
              show-search
              :filter-option="filterOption"
              placeholder="选择楼号"
              :options="buildingList"
              :not-found-content="null"
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.poProvieceCode"
              placeholder="请选择省厅"
              :options="poProvinceList"
              show-search
              :filter-option="filterOption"
              style="width: 150px"
              @change="(value, options) => cityToStreet(value, options, 'city')"
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.poCityCode"
              placeholder="请选择市局"
              style="width: 150px"
              show-search
              :filter-option="filterOption"
              :options="poCityList"
              @change="
                (value, options) => cityToStreet(value, options, 'district')
              "
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.poDistrictCode"
              placeholder="请选择分局"
              style="width: 150px"
              show-search
              :filter-option="filterOption"
              :options="poDistrictList"
              @change="
                (value, options) => cityToStreet(value, options, 'street')
              "
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.poStreetCode"
              placeholder="请选择派出所"
              :options="poStreetList"
              style="width: 150px"
              show-search
              :filter-option="filterOption"
            ></a-select>
          </a-col>
        </template>
        <a-col class="gutter-row" :md="(!advanced && 4) || 4" :sm="24">
          <div style="width: 192px; display: flex">
            <a-space>
              <a-button
                @click="searchTableItem"
                style="
                  background-color: cornflowerblue;
                  width: 60px;
                  color: white;
                "
              >
                搜索
              </a-button>
            </a-space>
            <a-space>
              <a-button
                class="button"
                @click="resetSearchObj"
                style="
                  background-color: cornflowerblue;
                  width: 60px;
                  color: white;
                  margin-left: 10px;
                "
              >
                重置
              </a-button>
            </a-space>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                margin-left: 10px;
              "
            >
              <span @click="toggleAdvanced" style="width: 60px; color: #1890ff">
                {{ advanced ? '收起' : '展开' }}

                <span v-if="advanced">
                  <UpOutlined style="color: #1890ff" />
                </span>
                <span v-else>
                  <DownOutlined style="color: #1890ff" />
                </span>
              </span>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-space>
        <a-button type="primary" @click="addUnitItem">新增</a-button>

        <a-popconfirm
          title="确定要删除选中项吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="multipeDel"
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
              @click="changeItem(record)"
              :loading="record.changeLoading"
            >
              修改
            </a-button>
            <a-popconfirm
              title="确定要删除该表格项吗?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="delTableItem(record)"
            >
              <a-button type="link">删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
    <Modal
      ref="modalRef"
      :title="titleValue"
      @handleOk="formSubmit"
      @closeModal="close"
      :body-style="false"
    >
      <a-form
        ref="formRef"
        v-bind="formItemLayout"
        :model="formState"
        :rules="rules"
      >
        <a-form-item label="名称" name="name">
          <a-input
            v-model:value="formState.name"
            style="width: 180px"
            placeholder="名称"
          />
        </a-form-item>

        <a-form-item label="小区" name="villageId" v-if="editId == '0'">
          <a-select
            v-model:value="formState.villageId"
            placeholder="请选择小区"
            show-search
            :filter-option="filterOption"
            :options="formVillageList"
            style="width: 180px"
            @change="(value, options) => createBuilding(value, options, true)"
          />
        </a-form-item>
        <a-form-item label="楼号" name="buildingId" v-if="editId == '0'">
          <a-select
            v-model:value="formState.buildingId"
            placeholder="请选择楼号"
            show-search
            :filter-option="filterOption"
            :options="formBuildingList"
            style="width: 180px"
          />
        </a-form-item>
        <a-form-item label="标准地址">
          <a-input
            v-model:value="formState.qrCodeId"
            style="width: 180px"
            placeholder="标准地址"
          />
        </a-form-item>
        <a-form-item label="同步多度">
          <a-select
            v-if="editId == '0'"
            v-model:value="formState.ddUnitId"
            style="width: 180px"
            :options="ddUnitList"
          ></a-select>
          <span v-else>{{ formState.ddBuildingId || '否' }}</span>
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup>
  import {
    SearchOutlined,
    DeleteOutlined,
    UpOutlined,
    DownOutlined,
  } from '@ant-design/icons-vue'
  import Modal from '@/components/Modal.vue'
  import {
    addUnit,
    delAllUnitItem,
    delUnitItem,
    editUnit,
    formUnitVillage,
    formVillageBuilding,
    getBuilding,
    getUnitList,
    onlyUnitName,
  } from '@/api/community'
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  import { computed, ref } from 'vue'
  import { getDictionary } from '@/api/system'
  import { messageContent } from '@/utils/message'
  const { simpleRequest, clearFormOrPageInput } = useSimpleRequest()
  const unitObj = {
    pageNum: 1,
    pageSize: 10,
    searchName: '',
    provieceCode: undefined,
    cityCode: undefined,
    districtCode: undefined,
    streetCode: undefined,
    villageId: undefined,
    buildingId: undefined,
    poProvieceCode: undefined,
    poCityCode: undefined,
    poDistrictCode: undefined,
    poStreetCode: undefined,
  }
  const {
    dataSource,
    provinceList,
    poProvinceList,
    paginationInfo,
    searchTableItem,
    resetTableObj,
    tableLoading,
    delTableItem,
    getData,
    state,
    onSelectChange,
    requestObj,
    handleTableChange,
  } = useTableInit({
    getTableList: getUnitList,
    tableObj: unitObj,
    delTableEle: delUnitItem,
  })
  const {
    modalRef,
    formRef,
    titleValue,
    handleChange,
    formState,
    handleCreate,
    editId,
    submit,
  } = useInitFrom({
    form: {
      buildingName: '',
      name: '',
      villageId: undefined,
      buildingId: undefined,
      qrCodeId: '',
      ddUnitId: '0',
      id: undefined,
    },
    onlyName: onlyUnitName,
    addList: addUnit,
    editList: editUnit,
    getData,
    requestObj,
  })
  const formItemLayout = computed(() => {
    const layout = 'horizontal'
    return layout === 'horizontal'
      ? {
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 16,
          },
        }
      : {}
  })
  const columns = [
    {
      title: '编号',
      dataIndex: 'numId',
      align: 'center',
      width: '150px',
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: '220px',
    },
    {
      title: '小区名',
      dataIndex: 'villageName',
      align: 'center',
      width: '220px',
    },
    {
      title: '楼号',
      dataIndex: 'buildingName',
      align: 'center',
      width: '220px',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '300px',
      align: 'center',
    },
  ]
  const ddUnitList = [
    {
      value: '0',
      label: '否',
    },
    {
      value: '1',
      label: '是',
    },
  ]
  const rules = {
    name: [{ required: true, message: '请输入名称' }],
    villageId: [{ required: true, message: '请选择小区' }],
    buildingId: [{ required: true, message: '请选择楼号' }],
  }
  const formVillageList = ref([])
  const villageList = ref([])
  const formBuildingList = ref([])
  const buildingList = ref([])
  const cityList = ref([])
  const districtList = ref([])
  const streetList = ref([])
  const poCityList = ref([])
  const poDistrictList = ref([])
  const poStreetList = ref([])
  simpleRequest({
    requestObj: {},
    requestFun: formVillageBuilding,
    labelString: 'name',
    valueString: 'id',
    isForm: false,
    formList: formVillageList,
    tableList: villageList,
  })
  const changeItem = async (record) => {
    record.changeLoading = true

    for (let formStateKey in formState) {
      if (
        formStateKey != 'name' ||
        formStateKey != 'qrCodeId' ||
        formStateKey != 'ddUnitId'
      ) {
        formState[formStateKey] = undefined
      }
    }
    handleChange(record)
  }
  const advanced = ref(false)
  const toggleAdvanced = () => {
    advanced.value = !advanced.value
  }
  const resetSearchObj = () => {
    if (typeof resetTableObj == 'function') {
      resetTableObj()
    }
    paginationInfo.current = 1
    getData(requestObj)
  }
  const filterOption = (inputValue, option) => {
    return option.label.indexOf(inputValue) > -1
  }
  const formSubmit = () => {
    let submitState
    const buildName = formBuildingList.value.find(
      (item) => item.value === formState.buildingId
    )
    submitState = {
      ...formState,
      buildName: buildName?.name,
    }

    const onlyNameObj = {
      name: submitState.name,
      buildingId: submitState.buildingId,
      onlyId: submitState.id ? submitState.id : undefined,
    }
    submit(submitState, onlyNameObj)
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
      } else if (type == 'district') {
        changeList = poDistrictList
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
  }
  const createBuilding = (value, options, isForm = false) => {
    if (!isForm) {
      requestObj.buildingId = undefined
    } else {
      formState.buildingId = undefined
    }
    simpleRequest({
      requestObj: { villageId: value },
      requestFun: getBuilding,
      labelString: 'name',
      valueString: 'id',
      isForm,
      formList: formBuildingList,
      tableList: buildingList,
    })
  }
  const addUnitItem = () => {
    formUnitVillage({}).then((res) => {
      formVillageList.value = res.result.villageList.map((item) => {
        return {
          ...item,
          value: item.id,
          label: item.name,
        }
      })
    })
    handleCreate()
  }
  const multipeDel = async () => {
    if (state.ids.length > 0) {
      await delAllUnitItem({ ids: state.ids.join(',') })
      messageContent('success', '删除表单项成功')
      await getData(requestObj)
    }
  }
  const close = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  }
</script>

<style scoped lang=""></style>
