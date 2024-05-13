<template>
  <div>
    <a-space direction="vertical">
      <a-space>
        <a-row :gutter="[48, 16]">
          <a-col :md="4" :sm="2">
            <a-input
              placeholder="输入关键词"
              v-model:value="requestObj.searchName"
              style="width: 150px"
            >
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.villageId"
              style="width: 150px"
              show-search
              :options="villageList"
              placeholder="选择小区"
              :filter-option="filterOption"
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.provinceCode"
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
              @change="
                (value, options) => cityToStreet(value, options, 'street')
              "
            ></a-select>
          </a-col>

          <template v-if="advanced">
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
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.poProvinceCode"
                placeholder="请选择省厅"
                :options="poProvinceList"
                style="width: 150px"
                show-search
                :filter-option="filterOption"
                @change="
                  (value, options) => cityToStreet(value, options, 'city')
                "
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
                show-search
                :filter-option="filterOption"
                :options="poStreetList"
                style="width: 150px"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.buildingId"
                placeholder="请选择楼栋"
                show-search
                :filter-option="filterOption"
                :options="poStreetList"
                style="width: 150px"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.unitId"
                placeholder="请选择单元"
                show-search
                :filter-option="filterOption"
                :options="poStreetList"
                style="width: 150px"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.houseId"
                placeholder="请选择房屋"
                show-search
                :filter-option="filterOption"
                :options="poStreetList"
                style="width: 150px"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.doorId"
                placeholder="请选择门"
                show-search
                :filter-option="filterOption"
                :options="doorList"
                style="width: 150px"
              ></a-select>
            </a-col>
          </template>
          <a-col :md="(!advanced && 4) || 4" :sm="24">
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
                <span
                  @click="toggleAdvanced"
                  style="width: 60px; color: #1890ff"
                >
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
      </a-space>
      <a-space style="margin-top: 10px">
        <a-button type="primary" @click="createItem" :loading="createLoading">
          新增
        </a-button>
        <a-button danger type="primary" @click="dels">批量删除</a-button>
      </a-space>
    </a-space>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      bordered
      style="margin-top: 10px"
      :loading="tableLoading"
      @change="handleTableChange"
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'status'">
          <span v-if="record.status == 0">异常</span>
          <span v-else>正常</span>
        </template>
        <template v-else-if="column.dataIndex == 'userType'">
          <span v-if="record.userType == 1">主账号</span>
          <span v-else-if="record.userType == 2">我的一家</span>
        </template>
        <template v-else-if="column.dataIndex == 'cardId'">
          <a-button type="link" @click="openCardDoor(record.id)">
            {{ record.cardId }}
          </a-button>
        </template>
      </template>
    </a-table>
    <Modal
      ref="modalRef"
      :title="titleValue"
      width="70%"
      @handleOk="modalSubmit"
      @closeModal="emitModal"
    >
      <div style="overflow: auto; overflow-x: hidden; height: 100%">
        <a-form
          ref="formRef"
          :model="formState"
          v-bind="formItemLayout"
          :rules="rules"
        >
          <a-row :gutter="[48, 8]">
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="小区">
                <a-select
                  style="width: 150px"
                  placeholder="选择小区"
                  show-search
                  :filter-option="filterOption"
                  @change="showBuilding"
                  :options="formVillageList"
                  v-model:value="formState.villageId"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="楼号">
                <a-select
                  style="width: 150px"
                  placeholder="选择楼号"
                  show-search
                  :filter-option="filterOption"
                  :options="formBuilding"
                  v-model:value="formState.buildingId"
                  @change="showCardUser"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="用户">
                <a-select
                  style="width: 150px"
                  show-search
                  :filter-option="filterOption"
                  placeholder="选择用户"
                  :options="formUser"
                  v-model:value="formState.addUserId"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="卡号">
                <a-select
                  style="width: 150px"
                  show-search
                  :filter-option="filterOption"
                  placeholder="选择卡号"
                  :options="formCard"
                  v-model:value="formState.cardId"
                ></a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </Modal>
    <Modal
      ref="modalCardRef"
      title="已分配门"
      width="70%"
      @handleOk="modalCardSubmit"
    >
      <div style="overflow: auto; overflow-x: hidden; height: 100%">
        <a-table
          :columns="cardDoorColumns"
          :data-source="cardDoorList"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'status'">
              <span v-if="record.status == 0">待添加</span>
              <span v-else>成功</span>
            </template>
            <template v-if="column.dataIndex == 'doorType'">
              <span v-if="record.doorType == 2">1403-A</span>
              <span v-else-if="record.doorType == 3">刷卡一体机</span>
              <span v-else-if="record.doorType == 4">1403-H</span>
              <span v-else-if="record.doorType == 5">1403-H-2</span>
              <span v-else-if="record.doorType == 8">EHome</span>
              <span v-else-if="record.doorType == 1">云盒</span>
            </template>
          </template>
        </a-table>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'userCard',
  }
</script>
<script setup>
  import { useInitFrom, useTableInit } from '@/hooks/useTableComponent'
  import { add, edit } from '@/api/myhome'
  import Modal from '@/components/Modal.vue'
  import { computed, reactive, ref } from 'vue'
  import {
    SearchOutlined,
    UpOutlined,
    DownOutlined,
  } from '@ant-design/icons-vue'
  import { getDictionary } from '@/api/system'
  const { simpleRequest, clearFormOrPageInput } = useSimpleRequest()
  import { getAddressCity, getDistrict, getStreet } from '@/api/community'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  import {
    delAll,
    getAssignDoor,
    getCard,
    getUserV2,
    list,
    toAdd,
  } from '@/api/userCard'
  import { messageContent } from '@/utils/message'
  import { getBuilding } from '@/api/common'
  const {
    dataSource,
    provinceList,
    poProvinceList,
    paginationInfo,
    searchTableItem,
    resetTableObj,
    tableLoading,
    getData,
    requestObj,
    villageList,
    responseData,
    handleTableChange,
  } = useTableInit({
    tableObj: {
      searchName: '',
      provieceCode: undefined,
      cityCode: undefined,
      districtCode: undefined,
      streetCode: undefined,
      villageId: undefined,
      buildingId: undefined,
      unitId: undefined,
      houseId: undefined,
      poProvieceCode: undefined,
      poCityCode: undefined,
      poDistrictCode: undefined,
      poStreetCode: undefined,
      doorId: undefined,
    },
    getTableList: list,
  })
  const {
    handleCreate,
    modalRef,
    formRef,
    formState,
    formItemLayout,
    titleValue,
    editId,
    // handleChange,
    submit,
    // multipleSubmit,
  } = useInitFrom({
    form: {
      addUserId: undefined,
      cardId: undefined,
      villageId: undefined,
      buildingId: undefined,
    },
    getData,
    requestObj,
    addList: add,
    editList: edit,
  })
  const rules = {
    cardId: [{ required: true, message: '请输入卡号' }],
  }
  const columns = [
    {
      title: '编号',
      dataIndex: 'No',
    },
    {
      title: '小区名',
      dataIndex: 'villageName',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },

    {
      title: '卡号',
      dataIndex: 'cardId',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
    },

    {
      title: '添加时间',
      dataIndex: 'addTime',
    },
  ]
  const advanced = ref(false)
  const toggleAdvanced = () => {
    advanced.value = !advanced.value
  }
  const formVillageList = ref([])
  const createLoading = ref(false)
  const createItem = async () => {
    editId.value = 0
    createLoading.value = true
    await toAdd({}).then((res) => {
      formVillageList.value = res.result.villageList.map((item) => {
        return {
          ...item,
          label: item.name,
          value: item.id,
        }
      })
    })
    createLoading.value = false
    handleCreate()
  }
  const cityList = ref([])
  const formCityList = ref([])
  const districtList = ref([])
  const formDistrictList = ref([])
  const streetList = ref([])
  const formStreetList = ref([])
  const poCityList = ref([])
  const poDistrictList = ref([])
  const poStreetList = ref([])
  const formPoCityList = ref([])
  const formPoDistrictList = ref([])
  const formPoStreetList = ref([])
  const formBuilding = ref([])
  const formCard = ref([])
  const formUser = ref([])
  const doorList = computed(() => {
    return responseData.result.doorList?.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
  })
  const filterOption = (inputValue, option) => {
    return option.label.indexOf(inputValue) > -1
  }
  const cityToStreet = (value, options, type, isForm = false) => {
    let changeList
    if (options.childCode == 'DQ' || !options.childCode) {
      if (type == 'city') {
        changeList = !isForm ? cityList : formCityList
        clearFormOrPageInput({
          requestObj,
          formState,
          label: '3',
          childCode: 'DQ',
          isForm,
          pageList: {
            cityList,
            streetList,
            districtList,
          },
          formList: {
            cityList: formCityList,
            streetList: formStreetList,
            districtList: formDistrictList,
          },
        })
      } else if (type == 'district') {
        changeList = !isForm ? districtList : formDistrictList
        clearFormOrPageInput({
          requestObj,
          formState,
          label: '2',
          childCode: 'DQ',
          isForm,
          pageList: {
            cityList,
            streetList,
            districtList,
          },
          formList: {
            cityList: formCityList,
            streetList: formStreetList,
            districtList: formDistrictList,
          },
        })
      } else if (type == 'street') {
        changeList = !isForm ? streetList : formStreetList
        clearFormOrPageInput({
          requestObj,
          formState,
          label: '1',
          childCode: 'DQ',
          isForm,
          pageList: {
            cityList,
            streetList,
            districtList,
          },
          formList: {
            cityList: formCityList,
            streetList: formStreetList,
            districtList: formDistrictList,
          },
        })
      }
    } else if (options.childCode == 'PO') {
      if (type == 'city') {
        changeList = !isForm ? poCityList : formPoCityList
        clearFormOrPageInput({
          requestObj,
          formState,
          label: 'p3',
          childCode: 'PO',
          isForm,
          pageList: {
            poCityList,
            poStreetList,
            poDistrictList,
          },
          formList: {
            poCityList: formPoCityList,
            poStreetList: formPoStreetList,
            poDistrictList: formPoDistrictList,
          },
        })
      } else if (type == 'district') {
        changeList = !isForm ? poDistrictList : formPoDistrictList
        clearFormOrPageInput({
          requestObj,
          formState,
          label: 'p2',
          childCode: 'PO',
          isForm,
          pageList: {
            poCityList,
            poStreetList,
            poDistrictList,
          },
          formList: {
            poCityList: formPoCityList,
            poStreetList: formPoStreetList,
            poDistrictList: formPoDistrictList,
          },
        })
      } else if (type == 'street') {
        changeList = !isForm ? poStreetList : formPoStreetList
        clearFormOrPageInput({
          requestObj,
          formState,
          label: 'p1',
          childCode: 'PO',
          isForm,
          pageList: {
            poCityList,
            poStreetList,
            poDistrictList,
          },
          formList: {
            poCityList: formPoCityList,
            poStreetList: formPoStreetList,
            poDistrictList: formPoDistrictList,
          },
        })
      }
    }
    if (value != '') {
      if (options.childCode == 'PO') {
        simpleRequest({
          requestFun: getDictionary,
          requestObj: {
            dicCode: value.toString(),
            grade: type,
            childCode: options.childCode,
          },
          isForm,
          tableList: changeList,
          formList: changeList,
          labelString: 'dicName',
          valueString: 'dicCode',
        })
      } else if (options.childCode === 'DQ' || !options.childCode) {
        if (type == 'city') {
          simpleRequest({
            requestFun: getAddressCity,
            requestObj: {
              provinceCode: value,
            },
            isForm,
            tableList: changeList,
            formList: changeList,
            labelString: 'name',
            valueString: 'city_code',
          })
        } else if (type == 'district') {
          simpleRequest({
            requestFun: getDistrict,
            requestObj: {
              cityCode: value,
            },
            isForm,
            tableList: changeList,
            formList: changeList,
            labelString: 'name',
            valueString: 'area_code',
          })
        } else if (type == 'street') {
          simpleRequest({
            requestFun: getStreet,
            requestObj: {
              areaCode: value,
            },
            isForm,
            tableList: changeList,
            formList: changeList,
            labelString: 'name',
            valueString: 'street_code',
          })
        }
      }
    } else if (options.childCode == 'PO' && type == 'city' && value == '') {
      formPoStreetList.value = [
        {
          value: '',
          label: '无',
        },
      ]
      formPoDistrictList.value = [
        {
          value: '',
          label: '无',
        },
      ]
      formPoCityList.value = [
        {
          value: '',
          label: '无',
        },
      ]
      formState.poCityCode = ''
      formState.poStreetCode = ''
      formState.poDistrictCode = ''
    }
  }
  const resetSearchObj = () => {
    if (typeof resetTableObj == 'function') {
      resetTableObj()
    }
    paginationInfo.current = 1
    getData(requestObj)
  }
  const modalSubmit = () => {
    modalRef.value.showLoading()
    formRef.value.validate().then(async () => {
      await submit(formState)
        .then((res) => {
          formRef.value.resetFields()
          clearFormItem()
          getData(requestObj)
          modalRef.value.close()
        })
        .finally(() => {
          modalRef.value.hideLoading()
          modalRef.value.disabledCancelFalse()
        })
    })
  }

  // 清除全部表单数据
  const clearFormItem = () => {
    for (let tableObjKey in formState) {
      if (Array.isArray(formState[tableObjKey])) {
        formState[tableObjKey] = []
      } else {
        formState[tableObjKey] = undefined
      }
    }
  }
  const emitModal = () => {
    if (formRef.value) formRef.value.clearValidate()
    modalRef.value.close()
    clearFormItem()
  }
  const state = reactive({
    selectedRowKeys: [],
    loading: false,
  })
  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    state.selectedRowKeys = selectedRowKeys
  }
  const dels = () => {
    delAll({
      ids: state.selectedRowKeys.toString(),
    }).then((res) => {
      messageContent('success', '删除成功')
      getData(requestObj)
    })
  }
  const showBuilding = (value) => {
    formState.buildingId = undefined
    formState.addUserId = undefined
    formState.cardId = undefined
    getBuilding({
      villageId: value,
    }).then((res) => {
      formBuilding.value = res.result?.map((item) => {
        return {
          ...item,
          value: item.id,
          label: item.name,
        }
      })
    })
    getCard({
      villageId: value,
    }).then((res) => {
      formCard.value =
        res.result.length > 0
          ? res.result.map((item) => {
              return {
                ...item,
                value: item,
              }
            })
          : [
              {
                value: ' ',
                label: '暂无卡号选择',
              },
            ]
    })
  }
  const showCardUser = (value) => {
    formState.addUserId = undefined
    formState.cardId = undefined
    getUserV2({
      buildingId: formState.buildingId,
      villageId: formState.villageId,
    }).then((res) => {
      formUser.value = res.result?.map((item) => {
        return {
          ...item,
          value: item.id,
          label: item.name,
        }
      })
    })
  }
  const modalCardRef = ref()
  const cardDoorColumns = [
    {
      title: '编号',
      dataIndex: 'No',
    },
    {
      title: '门名称',
      dataIndex: 'name',
    },
    {
      title: '门类型',
      dataIndex: 'doorType',
    },
    {
      title: '门状态',
      dataIndex: 'status',
    },
  ]
  const cardDoorList = ref([])
  const openCardDoor = (id) => {
    getAssignDoor({
      id,
    }).then((res) => {
      modalCardRef.value.open()
      cardDoorList.value = res.result.list.map((item, index) => {
        return {
          No: index + 1,
          ...item,
        }
      })
    })
  }
  const modalCardSubmit = () => {
    modalCardRef.value.disabledCancelFalse()
    modalCardRef.value.close()
  }
</script>
<style scoped lang="less"></style>
