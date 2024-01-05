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
            :options="provinceList"
            style="width: 150px"
            :filter-option="filterOption"
            @change="(value, options) => cityToStreet(value, options, 'city')"
          ></a-select>
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
          <a-select
            v-model:value="requestObj.districtCode"
            :options="districtList"
            show-search
            placeholder="选择区县"
            style="width: 150px"
            :filter-option="filterOption"
            @change="(value, options) => cityToStreet(value, options, 'street')"
          ></a-select>
          <a-select
            v-model:value="requestObj.streetCode"
            show-search
            style="width: 150px"
            placeholder="选择街道"
            :filter-option="filterOption"
            :not-found-content="null"
            :options="streetList"
          ></a-select>
          <a-select
            v-model:value="requestObj.villageId"
            style="width: 150px"
            show-search
            :options="villageList"
            placeholder="选择小区"
            :filter-option="filterOption"
          ></a-select>
        </a-space>
      </a-space>
      <a-space>
        <a-select
          v-model:value="requestObj.poProvieceCode"
          placeholder="请选择省厅"
          :options="poProvinceList"
          style="width: 150px"
          show-search
          :filter-option="filterOption"
          @change="(value, options) => cityToStreet(value, options, 'city')"
        ></a-select>
        <a-select
          v-model:value="requestObj.poCityCode"
          placeholder="请选择市局"
          style="width: 150px"
          show-search
          :filter-option="filterOption"
          :options="poCityList"
          @change="(value, options) => cityToStreet(value, options, 'district')"
        ></a-select>
        <a-select
          v-model:value="requestObj.poDistrictCode"
          placeholder="请选择分局"
          style="width: 100%"
          show-search
          :filter-option="filterOption"
          :options="poDistrictList"
          @change="(value, options) => cityToStreet(value, options, 'street')"
        ></a-select>
        <a-select
          v-model:value="requestObj.poStreetCode"
          placeholder="请选择派出所"
          show-search
          :filter-option="filterOption"
          :options="poStreetList"
          style="width: 100%"
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
            <a-button type="link" @click="changeItem(record)">修改</a-button>
            <a-popconfirm
              title="确定要删除选中项吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="delTableItem(record)"
            >
              <a-button type="link">删除</a-button>
            </a-popconfirm>

            <a-button type="link" @click="downXcxImage(record)">
              下载访客码
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
    <Modal
      ref="modalRef"
      :title="titleValue"
      @handleOk="formSubmit"
      @closeModal="close"
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
        <a-form-item label="标准地址编号">
          <a-input
            v-model:value="formState.qrCodeId"
            style="width: 180px"
            placeholder="标准地址编号"
          />
        </a-form-item>
        <a-form-item label="小区" name="villageId">
          <a-select
            v-model:value="formState.villageId"
            placeholder="请选择小区"
            show-search
            :filter-option="filterOption"
            :options="formVillageList"
            style="width: 180px"
          />
        </a-form-item>

        <a-form-item label="类型">
          <a-checkbox-group
            v-model:value="formState.style"
            :options="plainOptions"
          />
        </a-form-item>
        <a-form-item label="同步多度">
          <a-select
            v-if="editId == '0'"
            v-model:value="formState.ddBuildingId"
            style="width: 180px"
            :options="ddBuildingList"
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
    SyncOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue'
  import Modal from '@/components/Modal.vue'
  import {
    addBuilding,
    delAllBuildingItem,
    delBuildingItem,
    downXcxCode,
    editBuilding,
    formVillageBuilding,
    getBuildingList,
    onlyBuildingName,
  } from '@/api/community'
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  import { ref } from 'vue'
  import { getDictionary } from '@/api/system'
  const { simpleRequest, clearFormOrPageInput } = useSimpleRequest()
  const buildObj = {
    pageNum: 1,
    pageSize: 10,
    searchName: '',
    provieceCode: undefined,
    cityCode: undefined,
    districtCode: undefined,
    streetCode: undefined,
    villageId: undefined,
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
    multipleDel,
    handleTableChange,
  } = useTableInit({
    getTableList: getBuildingList,
    tableObj: buildObj,
    delTableEle: delBuildingItem,
    allDel: delAllBuildingItem,
  })
  const {
    modalRef,
    formRef,
    formItemLayout,
    titleValue,
    handleChange,
    formState,
    handleCreate,
    editId,
    submit,
  } = useInitFrom({
    form: {
      name: '',
      qrCodeId: undefined,
      villageId: undefined,
      style: [],
      id: undefined,
      ddBuildingId: '0',
    },
    onlyName: onlyBuildingName,
    addList: addBuilding,
    editList: editBuilding,
    getData,
    requestObj,
  })
  const columns = [
    {
      title: '编号',
      dataIndex: 'No',
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
      title: '操作',
      dataIndex: 'operation',
      width: '300px',
      align: 'center',
    },
  ]
  const ddBuildingList = [
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
  }
  const plainOptions = [
    {
      value: '1',
      label: 'A类',
    },
    {
      value: '2',
      label: 'B类',
    },
  ]
  const formVillageList = ref([])
  const villageList = ref([])
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
    isForm: true,
    isComplete: true,
    formList: formVillageList,
    tableList: villageList,
  })
  const changeItem = (record) => {
    handleChange(record)
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
    const submitState = { ...formState, style: formState.style?.join(',') }
    const onlyNameObj = {
      name: submitState.name,
      villageId: submitState.villageId,
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
  const downXcxImage = async (record) => {
    let res = await downXcxCode({ id: record.id })
    window.location.href = res.result
  }
  const close = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  }
</script>

<style scoped lang=""></style>
