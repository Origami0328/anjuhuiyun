<template>
  <div class="">
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
              v-model:value="requestObj.areaCode"
              :options="districtList"
              show-search
              placeholder="选择区县"
              style="width: 150px"
              :filter-option="filterOption"
            ></a-select>
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
          <template v-if="advanced">
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.level"
                style="width: 150px"
                show-search
                :options="levelList"
                placeholder="选择级别"
                :filter-option="filterOption"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.type"
                :options="typeList"
                show-search
                placeholder="选择类别"
                style="width: 150px"
                :filter-option="filterOption"
              ></a-select>
            </a-col>
          </template>

          <a-col :md="(!advanced && 4) || 4">
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
      <a-space>
        <a-button type="primary" @click="addTableItem">新增</a-button>
      </a-space>
    </a-space>
    <a-table
      :data-source="dataSource"
      :pagination="paginationInfo"
      :columns="columns"
      :loading="tableLoading"
      @change="handleTableChange"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'operation'">
          <a-button
            type="link"
            @click="editTableItem(record)"
            :loading="record.changeLoading"
          >
            编辑
          </a-button>
          <a-button type="link" @click="agentChild(record)">
            下级代理商
          </a-button>
          <a-button @click="showConfirm(record)" type="link" style="color: red">
            删除
          </a-button>
        </template>
        <template v-else-if="column.dataIndex == 'level'">
          {{ record.level }}级
        </template>
        <template v-else-if="column.dataIndex == 'area'">
          <span>
            {{ record.provinceName }}
          </span>
          <span v-if="record.cityName">-{{ record.cityName }}</span>
          <span v-if="record.areaName">-{{ record.areaName }}</span>
        </template>
      </template>
    </a-table>
    <ComponentModal
      ref="modalRef"
      :title="titleValue"
      width="70%"
      @handleOk="modalSubmit"
      @closeModal="emitModal"
    >
      <div
        style="overflow: auto; overflow-x: hidden; height: 100%"
        id="modalScroll"
      >
        <a-form
          ref="formRef"
          :model="formState"
          v-bind="formItemLayout"
          :rules="rules"
        >
          <a-row :gutter="[48, 8]">
            <a-divider orientation="left">基本信息</a-divider>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="名称" name="name">
                <a-input
                  v-model:value="formState.name"
                  placeholder="名称"
                  style="width: 150px"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="手机号" name="phone">
                <a-input
                  type="number"
                  style="width: 150px"
                  placeholder="请输入手机号"
                  v-model:value="formState.phone"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="关联系统用户" style="position: relative">
                <a-select
                  style="width: 200px"
                  placeholder="输入系统用户账号"
                  v-model:value="formState.linkUserId"
                  show-search
                  :not-found-content="null"
                  :open="systemUserSelectOpen"
                  :filter-option="false"
                  :options="state.data"
                  @change="chooseOptions"
                ></a-select>
                <a-input-search
                  v-model:value="formState.inputLinkUserId"
                  placeholder="输入系统用户账号"
                  :loading="state.loading"
                  style="width: 200px; position: absolute; top: 0"
                  @search="searchSystemUser"
                  @change="showSuccessSelect = false"
                >
                  <template #prefix>
                    <check-circle-two-tone
                      two-tone-color="#52c41a"
                      v-if="showSuccessSelect"
                    />
                    <CloseCircleTwoTone v-else two-tone-color="red" />
                  </template>
                </a-input-search>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="2" :offset="3" v-if="editId">
              <a-form-item label="父代理名称">
                <a-input
                  style="width: 150px"
                  placeholder="父代理名称"
                  v-model:value="formState.parentName"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" :offset="editId != 0 ? 0 : 3">
              <a-form-item label="备注">
                <a-input
                  style="width: 150px"
                  placeholder="备注"
                  v-model:value="formState.remark"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="类别">
                <a-input
                  placeholder="请输入类别"
                  style="width: 150px"
                  v-model:value="formState.type"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" :offset="editId == 0 ? 0 : 3">
              <a-form-item label="级别" name="level">
                <a-select
                  :disabled="editId ? true : false"
                  :options="formLevelList"
                  style="width: 150px"
                  placeholder="选择级别"
                  v-model:value="formState.level"
                  @change="clearParentId"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" v-if="editId">
              <a-form-item label="添加时间">
                <a-input
                  :disabled="editId != 0"
                  style="width: 150px"
                  placeholder="添加时间"
                  v-model:value="formState.addTime"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" v-if="editId">
              <a-form-item label="最后更新时间">
                <a-input
                  :disabled="editId != 0"
                  style="width: 150px"
                  placeholder="最后更新时间"
                  v-model:value="formState.updateTime"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col
              :md="6"
              :sm="2"
              :offset="3"
              v-if="formState.level != undefined && formState.level != 1"
            >
              <a-form-item
                label="上级代理商"
                name="parentId"
                style="position: relative"
              >
                <a-select
                  style="width: 200px"
                  v-model:value="formState.parentId"
                  show-search
                  :not-found-content="null"
                  :open="state.frontAgentSelectOpen"
                  :filter-option="false"
                  :options="state.frontAgentData"
                  @change="chooseFrontAgentOptions"
                ></a-select>
                <a-form-item-rest>
                  <a-input-search
                    v-model:value="formState.parentId"
                    placeholder="输入代理商名称"
                    :loading="state.frontAgentLoading"
                    :disabled="editId ? true : false"
                    style="width: 200px; position: absolute; top: 0"
                    @search="searchFrontAgent"
                    @change="frontAgentShowSuccessSelect = false"
                  >
                    <template #prefix v-if="editId == 0">
                      <check-circle-two-tone
                        two-tone-color="#52c41a"
                        v-if="frontAgentShowSuccessSelect"
                      />
                      <CloseCircleTwoTone v-else two-tone-color="red" />
                    </template>
                  </a-input-search>
                </a-form-item-rest>
              </a-form-item>
            </a-col>
            <a-divider orientation="left">位置信息</a-divider>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="省份">
                <a-select
                  :options="formProvinceList"
                  style="width: 150px"
                  placeholder="选择省份"
                  show-search
                  :filter-option="filterOption"
                  v-model:value="formState.provinceCode"
                  @change="
                    (value, options) =>
                      cityToStreet(value, options, 'city', true)
                  "
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="城市">
                <a-select
                  :options="formCityList"
                  style="width: 150px"
                  placeholder="选择城市"
                  show-search
                  :filter-option="filterOption"
                  v-model:value="formState.cityCode"
                  @change="
                    (value, options) =>
                      cityToStreet(value, options, 'district', true)
                  "
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="区县">
                <a-select
                  :options="formDistrictList"
                  style="width: 150px"
                  placeholder="选择区县"
                  show-search
                  :filter-option="filterOption"
                  v-model:value="formState.areaCode"
                ></a-select>
              </a-form-item>
            </a-col>
            <template v-if="editId">
              <a-divider orientation="left">代理小区</a-divider>
              <a-col :md="24" :offset="1">
                <a-button type="primary" @click="showVillageModal">
                  新增
                </a-button>
              </a-col>
              <a-col :md="24">
                <a-table
                  :columns="agentVillageColumns"
                  :data-source="formState.villageList || []"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex == 'operation'">
                      <a-button type="link" @click="editVillage(record)">
                        编辑
                      </a-button>
                      <a-popconfirm
                        title="确定要删除该表格项吗?"
                        ok-text="确认"
                        cancel-text="取消"
                        @confirm="delVillage(record)"
                      >
                        <a-button type="link">删除</a-button>
                      </a-popconfirm>
                    </template>
                  </template>
                </a-table>
                <a-modal
                  :title="title"
                  v-model:open="villageModal"
                  :maskClosable="false"
                  :confirm-loading="villageLoading"
                  @ok="submitVillage"
                  @cancel="clearVillageModal"
                >
                  <a-form :model="villageForm" v-bind="formVillageLayout">
                    <a-form-item label="小区名">
                      <a-select
                        v-model:value="villageForm.villageId"
                        style="width: 150px"
                        show-search
                        :options="formVillageList"
                        placeholder="选择小区"
                        :filter-option="filterOption"
                      ></a-select>
                    </a-form-item>
                    <a-form-item label="分成金额（厘）">
                      <a-input
                        type="number"
                        v-model:value="villageForm.earning"
                        placeholder="分成金额（厘）"
                        :min="0"
                        style="width: 150px"
                      ></a-input>
                    </a-form-item>
                  </a-form>
                </a-modal>
              </a-col>
            </template>
          </a-row>
        </a-form>
      </div>
    </ComponentModal>

    <a-modal
      title="下级代理商列表"
      v-model:open="agentChildModal"
      width="70%"
      :body-style="{ height: '65vh' }"
    >
      <div style="overflow: auto; overflow-x: hidden; height: 100%">
        <a-table
          :data-source="agentChildDataSource"
          :columns="agentChildColumns"
          :footer="null"
          :pagination="{
            total: agentChildDataSource.length,
          }"
        ></a-table>
      </div>
    </a-modal>
  </div>
</template>
<script>
  export default {
    name: 'agentList',
  }
</script>
<script setup>
  import {
    ExclamationCircleOutlined,
    SearchOutlined,
    CloseCircleTwoTone,
    CheckCircleTwoTone,
    UpOutlined,
    DownOutlined,
  } from '@ant-design/icons-vue'
  import { createVNode } from 'vue'
  import { Modal } from 'ant-design-vue'
  import ComponentModal from '@/components/Modal.vue'
  import {
    provinceList,
    cityList,
    districtList,
    columns,
    villageList,
    formVillageList,
    formLevelList,
    formProvinceList,
    levelList,
    formDistrictList,
    formCityList,
    agentVillageColumns,
    agentChildColumns,
  } from './data'
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  import { checkMobile, debounce } from '@/utils/validate'
  import {
    addAgent,
    addAgentVillage,
    delAgent,
    delAgentVillage,
    editAgent,
    editAgentVillage,
    findUserByUserName,
    getAgentByName,
    getAgentChild,
    getAgentDetail,
    getAgentType,
    getAgentVillage,
    getCity,
    getDistrict,
    getProvince,
    getUserHomeList,
  } from '@/api/agent'
  import { messageContent } from '@/utils/message'
  import { computed, nextTick, reactive, ref } from 'vue'
  import { getVillageList } from '@/api/system'
  // import { getUserList } from "@/api/system";
  const { simpleRequest } = useSimpleRequest()
  const {
    requestObj,
    searchTableItem,
    resetTableObj,
    getData,
    dataSource,
    paginationInfo,
    tableLoading,
    handleTableChange,
  } = useTableInit({
    tableObj: {
      areaCode: undefined,
      provinceCode: undefined,
      searchName: undefined,
      cityCode: undefined,
      villageId: undefined,
      pageNo: '1',
      pageSize: '10',
    },
    getTableList: getUserHomeList,
  })

  const {
    handleCreate,
    modalRef,
    formRef,
    formState,
    formItemLayout,
    titleValue,
    submit,
    editId,
  } = useInitFrom({
    form: {
      name: '',
      phone: '',
      level: undefined,
      cityCode: undefined,
      parentId: '',
      linkUserId: undefined,
      inputLinkUserId: '',
      areaCode: undefined,
      provinceCode: undefined,
      remark: '',
      parentName: '',
      addTime: '',
      updateTime: '',
      villageList: '',
      agentId: '',
      type: '',
    },
    getData,
    requestObj,
    addList: addAgent,
    editList: editAgent,
    // onlyName: getAgentByName,
  })
  const rules = {
    name: [{ required: true, message: '请输入名称' }],
    level: [{ required: true, message: '请选择级别' }],
    parentId: [{ required: true, message: '请输入上级代理商Id' }],
    unitId: [{ required: true, message: '请选择单元' }],
    houseId: [{ required: true, message: '请选择房号' }],
    phone: [
      {
        trigger: 'blur',
        validator: (rules, value) => {
          if (!formState.phone) {
            return Promise.resolve()
          } else {
            if (!checkMobile(value)) {
              modalRef.value.hideLoading()
              return Promise.reject('请输入正确的手机号')
            } else {
              return Promise.resolve()
            }
          }
        },
      },
    ],
    type: [{ required: true, message: '请选择类型' }],
    password: [{ required: true, message: '请输入密码' }],
    timeOptions: [{ required: true, message: '请选择有效期' }],
  }
  simpleRequest({
    requestFun: getProvince,
    requestObj: {},
    isForm: true,
    isComplete: true,
    valueString: 'province_code',
    labelString: 'name',
    tableList: provinceList,
    formList: formProvinceList,
  })
  simpleRequest({
    requestObj: {},
    requestFun: getAgentVillage,
    isForm: false,
    valueString: 'villageId',
    labelString: 'villageName',
    tableList: villageList,
  })
  simpleRequest({
    requestObj: {},
    requestFun: getVillageList,
    isForm: true,
    valueString: 'id',
    labelString: 'name',
    formList: formVillageList,
  })
  const typeList = ref([])
  const agentType = () => {
    getAgentType().then((res) => {
      typeList.value = res.result.map((item) => {
        return {
          value: item,
          label: item,
        }
      })
      typeList.value.splice(0, 0, {
        value: '',
        label: '全部',
      })
    })
  }
  agentType()
  const advanced = ref(false)
  const toggleAdvanced = () => {
    advanced.value = !advanced.value
  }
  const cityToStreet = (value, options, type, isForm = false) => {
    let changeList, requestFun, requestInputObj, valueString
    if (type == 'city') {
      requestFun = getCity
      changeList = isForm ? formCityList : cityList
      requestInputObj = {
        provinceCode: value,
      }
      valueString = 'city_code'
      const clearObj = isForm ? formState : requestObj
      clearObj.cityCode = undefined
      clearObj.areaCode = undefined
      if (isForm) {
        formCityList.value = []
        formDistrictList.value = []
      } else {
        cityList.value = [
          {
            value: '',
            label: '全部',
          },
        ]
        districtList.value = [
          {
            value: '',
            label: '全部',
          },
        ]
      }
    } else if (type == 'district') {
      requestFun = getDistrict
      changeList = isForm ? formDistrictList : districtList
      requestInputObj = {
        cityCode: value,
      }
      valueString = 'area_code'
      const clearObj = isForm ? formState : requestObj
      clearObj.areaCode = undefined
      if (isForm) {
        formDistrictList.value = []
      } else {
        districtList.value = [
          {
            value: '',
            label: '全部',
          },
        ]
      }
    }
    if (value != '') {
      simpleRequest({
        requestFun,
        requestObj: requestInputObj,
        isForm,
        tableList: changeList,
        labelString: 'name',
        valueString,
        formList: changeList,
      })
      return Promise.resolve()
    }
  }
  const filterOption = (inputValue, option) => {
    return option.label.indexOf(inputValue) > -1
  }
  const resetSearchObj = () => {
    if (typeof resetTableObj == 'function') {
      resetTableObj()
    }
    paginationInfo.current = 1
    getData(requestObj)
  }
  const addTableItem = () => {
    showSuccessSelect.value = false
    frontAgentShowSuccessSelect.value = false
    handleCreate()
  }
  const modalSubmit = () => {
    if (editId.value == 0) {
      submit({
        name: formState.name,
        phone: formState.phone,
        level: formState.level,
        cityCode: formState.cityCode,
        parentId: formState.parentId || '',
        areaCode: formState.areaCode,
        provinceCode: formState.provinceCode,
        remark: formState.remark,
        linkUserId: formState.linkUserId,
        type: formState.type,
      })
        .then(() => {
          agentType()
        })
        .finally(() => {
          modalRef.value.disabledCancelFalse()
        })
      // emitModal()
    } else {
      submit(formState)
        .then(() => {
          agentType()
        })
        .finally(() => {
          modalRef.value.disabledCancelFalse()
        })
    }
  }
  const emitModal = () => {
    formCityList.value = []
    formDistrictList.value = []
    state.data = []
    state.frontAgentData = []
    systemUserSelectOpen.value = false
    formState.linkUserId = undefined
    formState.inputLinkUserId = undefined
    if (formRef.value) {
      formRef.value.clearValidate()
      formRef.value.resetFields()
    }
    modalRef.value.close()
  }
  const editTableItem = (record) => {
    record.changeLoading = true
    editId.value = record.id
    getAgentDetail({
      agentId: record.id.toString(),
    }).then(async (res) => {
      if (record.provinceCode) {
        await cityToStreet(record.provinceCode, {}, 'city', true)
      }
      if (record.cityCode) {
        await cityToStreet(record.cityCode, {}, 'district', true)
      }
      for (let formStateKey in res.result) {
        if (formStateKey == 'id') {
          formState['agentId'] = res.result.id
        } else if (formStateKey == 'cityCode') {
          formState.cityCode = res.result[formStateKey]
        } else if (formStateKey == 'linkUserId') {
          formState.linkUserId = res.result[formStateKey]
        } else if (formStateKey == 'linkUser') {
          formState.inputLinkUserId = res.result[formStateKey]
          if (formState.inputLinkUserId) {
            showSuccessSelect.value = true
          } else {
            showSuccessSelect.value = false
          }
        } else if (formStateKey == 'villageList') {
          formState.villageList = res.result[formStateKey]
        } else {
          formState[formStateKey] = res.result[formStateKey]
        }
      }
      record.changeLoading = false
      modalRef.value.open()
      nextTick(() => {
        let modalScroll = document.getElementById('modalScroll')
        if (modalScroll) {
          modalScroll.scrollTop = 0
        }
      })
    })
  }
  const delTableItem = (record) => {
    delAgent({
      agentId: record.id.toString(),
    }).then(() => {
      messageContent('success', '删除表格项成功')
      getData(requestObj)
    })
  }
  const agentChildModal = ref(false)
  const agentChildDataSource = ref([])
  const agentChild = (record) => {
    getAgentChild({
      agentId: record.id,
    }).then((res) => {
      agentChildDataSource.value = res.result
      agentChildModal.value = true
    })
  }
  const villageForm = reactive({
    villageId: undefined,
    earning: '',
    agentId: '',
    agentVillageId: '',
  })
  const formVillageLayout = computed(() => {
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
  const villageModal = ref(false)
  const title = ref()
  const showVillageModal = () => {
    title.value = '新增代理小区'
    villageForm.agentId = formState.agentId
    villageModal.value = true
  }
  const villageLoading = ref(false)
  const submitVillage = () => {
    villageLoading.value = true
    const requestFun =
      title.value == '新增代理小区' ? addAgentVillage : editAgentVillage
    const requestObj =
      title.value == '新增代理小区'
        ? {
            ...villageForm,
          }
        : {
            earning: villageForm.earning,
            agentVillageId: villageForm.agentVillageId.toString(),
          }
    requestFun(requestObj)
      .then((res) => {
        if (res.code == '200') {
          villageLoading.value = false
          getAgentDetail({
            agentId: villageForm.agentId.toString(),
          }).then((res) => {
            formState.villageList = res.result.villageList
          })
          for (let villageFormKey in villageForm) {
            villageForm[villageFormKey] = undefined
          }
          villageModal.value = false
        }
      })
      .catch(() => {
        villageLoading.value = false
      })
  }
  const editVillage = (record) => {
    title.value = '修改代理小区'
    for (let recordKey in record) {
      if (recordKey == 'id') {
        villageForm.agentVillageId = record[recordKey]
      } else {
        villageForm[recordKey] = record[recordKey]
      }
    }

    villageModal.value = true
  }
  const delVillage = (record) => {
    delAgentVillage({
      agentVillageId: record.id,
    }).then(() => {
      getAgentDetail({
        agentId: formState.agentId.toString(),
      }).then((res) => {
        formState.villageList = res.result.villageList
      })
    })
  }
  const clearVillageModal = () => {
    for (let villageFormKey in villageForm) {
      villageForm[villageFormKey] = undefined
    }
    villageModal.value = false
  }
  const state = reactive({
    data: [],
    frontAgentData: [],
    frontAgentLoading: false,
    loading: false,
    frontAgentSelectOpen: false,
  })

  const searchSystemUser = debounce((value) => {
    state.loading = true
    systemUserSelectOpen.value = false
    formState.linkUserId = ''

    findUserByUserName({ username: value })
      .then((res) => {
        if ('id' in res.result) {
          const data = {
            ...res.result,
            value: res.result.id,
            label: res.result.username,
          }
          state.data = [data]
        } else {
          state.data = [
            {
              value: '5',
              label: '未能检索到系统用户哦.',
            },
          ]
        }
        systemUserSelectOpen.value = true
        state.loading = false
      })
      .finally(() => {
        state.loading = false
      })
  }, 300)

  const searchFrontAgent = debounce((value) => {
    state.frontAgentLoading = true
    formState.parentId = ''
    getAgentByName({ name: value })
      .then((res) => {
        const data = {
          ...res.result,
          value: res.result.name,
          label: res.result.name,
        }
        state.frontAgentData = [data]
        state.frontAgentSelectOpen = true
        state.frontAgentLoading = false
      })
      .catch(() => {
        state.frontAgentLoading = false
      })
  }, 300)
  const clearParentId = () => {
    formState.parentId = ''
  }
  const showConfirm = (record) => {
    Modal.confirm({
      title: `您确定要删除名称为${record.name}表格项吗？`,
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确定',
      content: createVNode(
        'div',
        {
          style: 'color:red;',
        },
        '一旦删除，则无法找回，请您谨慎选择。'
      ),
      onOk() {
        delTableItem(record)
      },

      onCancel() {},
      class: 'test',
    })
  }
  const systemUserSelectOpen = ref(false)
  const showSuccessSelect = ref(false)
  const chooseOptions = (value, options) => {
    systemUserSelectOpen.value = false
    if (value != '5') {
      showSuccessSelect.value = true
    }
    formState.inputLinkUserId = options.label
  }
  const frontAgentShowSuccessSelect = ref(false)
  const chooseFrontAgentOptions = () => {
    state.frontAgentSelectOpen = false
    frontAgentShowSuccessSelect.value = true
    // formState.frontAgentUserId = options.label
  }
</script>

<style scoped lang=""></style>
