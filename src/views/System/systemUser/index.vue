<template>
  <div class="systemUser">
    <div>
      <a-space direction="vertical">
        <a-space>
          <a-select
            v-model:value="requestObj.provieceCode"
            placeholder="选择省份"
            show-search
            :options="provieceList"
            style="width: 100px"
            :filter-option="filterOption"
            @change="(value, options) => cityToStreet(value, options, 'city')"
          ></a-select>
          <a-select
            v-model:value="requestObj.cityCode"
            show-search
            style="width: 100px"
            placeholder="选择城市"
            :options="cityList"
            :not-found-content="null"
            :filter-option="filterOption"
            @change="
              (value, options) => cityToStreet(value, options, 'district')
            "
          ></a-select>
          <a-select
            v-model:value="requestObj.districtCode"
            show-search
            placeholder="选择区县"
            :options="districtList"
            style="width: 100px"
            :filter-option="filterOption"
            @change="(value, options) => cityToStreet(value, options, 'street')"
          ></a-select>
          <a-select
            v-model:value="requestObj.streetCode"
            show-search
            style="width: 130px"
            placeholder="选择街道"
            :options="streetList"
            :filter-option="filterOption"
            :not-found-content="null"
          ></a-select>
          <a-select
            v-model:value="requestObj.villageId"
            show-search
            style="width: 100px"
            placeholder="选择小区"
            :options="villageList"
            :filter-option="filterOption"
            :not-found-content="null"
            @change="createBuildingList"
          ></a-select>
        </a-space>

        <a-space>
          <a-select
            placeholder="请选择省厅"
            style="width: 150px"
            v-model:value="requestObj.poProvieceCode"
            show-search
            :options="poProvieceList"
            :not-found-content="null"
            :filter-option="filterOption"
            @change="(value, options) => cityToStreet(value, options, 'city')"
          ></a-select>
          <a-select
            placeholder="请选择市局"
            style="width: 150px"
            v-model:value="requestObj.poCityCode"
            show-search
            :options="poCityList"
            :not-found-content="null"
            :filter-option="filterOption"
            @change="
              (value, options) => cityToStreet(value, options, 'district')
            "
          ></a-select>
          <a-select
            placeholder="请选择分局"
            style="width: 150px"
            v-model:value="requestObj.poDistrictCode"
            show-search
            :options="poDistrictList"
            :not-found-content="null"
            :filter-option="filterOption"
            @change="(value, options) => cityToStreet(value, options, 'street')"
          ></a-select>
          <a-select
            placeholder="请选择派出所"
            style="width: 150px"
            v-model:value="requestObj.poStreetCode"
            show-search
            :options="poStreetList"
            :not-found-content="null"
            :filter-option="filterOption"
          ></a-select>
        </a-space>
        <a-space>
          <a-select
            placeholder="请选择分组"
            style="width: 150px"
            show-search
            :filter-option="filterOption"
            v-model:value="requestObj.roleGroup"
            :options="roleGroupList"
            @change="createRole"
          ></a-select>
          <a-select
            placeholder="请选择楼栋"
            style="width: 150px"
            show-search
            :filter-option="filterOption"
            v-model:value="requestObj.buildingId"
            :options="buildingList"
          ></a-select>
          <a-select
            placeholder="请选择职位"
            style="width: 150px"
            show-search
            :filter-option="filterOption"
            v-model:value="requestObj.roleId"
            :options="roleList"
          ></a-select>
          <a-select
            placeholder="请选择审核状态"
            v-model:value="requestObj.isAuth"
            :options="authList"
            style="width: 150px"
          ></a-select>
        </a-space>
        <a-space>
          <a-input
            v-model:value="requestObj.searchName"
            placeholder="这里输入关键词"
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
          <a-button
            style="background-color: cornflowerblue; width: 50px; color: white"
            @click="searchTableItem"
          >
            <template #icon>
              <SearchOutlined />
            </template>
          </a-button>
          <a-button
            class="button"
            @click="resetTableObj"
            style="background-color: cornflowerblue; width: 50px; color: white"
          >
            <template #icon><sync-outlined /></template>
          </a-button>
          <a-button class="button add" @click="openAdd" type="primary">
            新增
          </a-button>
        </a-space>
        <a-space>
          <a-table
            :row-selection="{
              selectedRowKeys: state.selectedRowKeys,
              onChange: onSelectChange,
              getCheckboxProps: getCheckboxProps,
            }"
            :columns="columns"
            :data-source="dataSource"
            :pagination="paginationInfo"
            :loading="tableLoading"
            @resizeColumn="handleResizeColumn"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex == 'operation'">
                <span style="display: flex; justify-content: space-around">
                  <a-tooltip>
                    <template #title>编辑</template>
                    <div
                      @click="changeTableItem(record)"
                      style="cursor: pointer"
                    >
                      <EditOutlined />
                    </div>
                  </a-tooltip>
                  <!--                  <a-tooltip>-->
                  <!--                    <template #title>分配房屋</template>-->
                  <!--                    <div @click="show" style="cursor: pointer">-->
                  <!--                      <SettingOutlined />-->
                  <!--                    </div>-->
                  <!--                  </a-tooltip>-->

                  <a-tooltip>
                    <template #title>删除</template>
                    <div @click="delTableItem(record)" style="cursor: pointer">
                      <DeleteOutlined style="color: red" />
                    </div>
                  </a-tooltip>
                  <a-tooltip>
                    <template #title>导入小区</template>
                    <div @click="show" style="cursor: pointer">
                      <CloudUploadOutlined />
                    </div>
                  </a-tooltip>
                </span>
              </template>
              <template v-else-if="column.dataIndex == 'status'">
                {{ record.status == '1' ? '冻结' : '正常' }}
              </template>
              <template v-else-if="column.dataIndex == 'isAuth'">
                <span v-if="record.isAuth == '0'">待审核</span>
                <span v-else-if="record.isAuth == '1'">审核通过</span>
                <span v-else-if="record.isAuth == '2'">审核失败</span>
              </template>
              <template v-else-if="column.dataIndex == 'area'">
                {{
                  `${record.proviece ? record.proviece : ''}${
                    record.city ? record.city : ''
                  }${record.district ? record.district : ''}${
                    record.street ? record.street : ''
                  }${record.villageName ? record.villageName : ''}${
                    record.buildingName ? record.buildingName : ''
                  }`
                }}
              </template>
            </template>
          </a-table>
        </a-space>
      </a-space>
      <Modal
        ref="modalRef"
        :title="titleValue"
        @handleOk="submit"
        @closeModal="close"
      >
        <div style="height: 500px; overflow: auto">
          <a-form :model="formState" v-bind="formItemLayout">
            <a-form-item label="用户名">
              <a-input
                placeholder="这里输入用户名"
                v-model:value="formState.username"
              ></a-input>
            </a-form-item>
            <a-form-item label="密码">
              <a-input-password
                placeholder="输入密码"
                v-model:value="formState.password"
              ></a-input-password>
            </a-form-item>
            <a-form-item label="确认密码">
              <a-input-password
                placeholder="确认密码"
                v-model:value="formState.chkpwd"
              ></a-input-password>
            </a-form-item>
            <a-form-item label="角色分组">
              <a-select
                :options="formRoleGroup"
                show-search
                placeholder="请选择角色分组"
                v-model:value="formState.roleGroupId"
                :filter-option="filterOption"
                @change="(value, options) => createRole(value, options, false)"
              ></a-select>
            </a-form-item>
            <a-form-item label="角色">
              <a-select
                :options="roleList"
                show-search
                placeholder="请选择角色"
                :filter-option="filterOption"
                v-model:value="formState.roleId"
              ></a-select>
            </a-form-item>
            <a-form-item
              label="省份"
              v-if="
                ['1', '2', '3', '4', '7', '8', '9'].includes(
                  formState.roleGroupId
                )
              "
            >
              <a-select
                :options="formProvieceList"
                show-search
                placeholder="请选择省份"
                :filter-option="filterOption"
                v-model:value="formState.provieceCode"
                @change="
                  (value, options) => formCityToStreet(value, options, 'city')
                "
              ></a-select>
            </a-form-item>
            <a-form-item
              label="市"
              v-if="
                ['2', '3', '4', '7', '8', '9'].includes(formState.roleGroupId)
              "
            >
              <a-select
                placeholder="选择市"
                v-model:value="formState.cityCode"
                :options="cityList"
                :filter-option="filterOption"
                show-search
                @change="
                  (value, options) =>
                    formCityToStreet(value, options, 'district')
                "
              ></a-select>
            </a-form-item>
            <a-form-item
              label="区县"
              v-if="['3', '4', '8', '9'].includes(formState.roleGroupId)"
            >
              <a-select
                placeholder="选择区县"
                v-model:value="formState.districtCode"
                :options="districtList"
                :filter-option="filterOption"
                show-search
                @change="
                  (value, options) => formCityToStreet(value, options, 'street')
                "
              ></a-select>
            </a-form-item>
            <a-form-item
              label="街道"
              v-if="['4', '8'].includes(formState.roleGroupId)"
            >
              <a-select
                placeholder="选择街道"
                :filter-option="filterOption"
                :options="streetList"
                show-search
                v-model:value="formState.streetCode"
              ></a-select>
            </a-form-item>
            <a-form-item
              label="省厅"
              v-if="
                ['1', '2', '3', '4', '7', '8', '9'].includes(
                  formState.roleGroupId
                )
              "
            >
              <a-select
                :options="formPoProvieceList"
                show-search
                placeholder="请选择省厅"
                :filter-option="filterOption"
                v-model:value="formState.poProvieceCode"
                @change="
                  (value, options) => formCityToStreet(value, options, 'city')
                "
              ></a-select>
            </a-form-item>
            <a-form-item
              label="市局"
              v-if="
                ['2', '3', '4', '7', '8', '9'].includes(formState.roleGroupId)
              "
            >
              <a-select
                placeholder="请选择市局"
                :filter-option="filterOption"
                show-search
                v-model:value="formState.poCityCode"
                :options="poCityList"
                @change="
                  (value, options) =>
                    formCityToStreet(value, options, 'district')
                "
              ></a-select>
            </a-form-item>
            <a-form-item
              label="分局"
              v-if="['3', '4', '8', '9'].includes(formState.roleGroupId)"
            >
              <a-select
                placeholder="选择分局"
                v-model:value="formState.poDistrictCode"
                :filter-option="filterOption"
                show-search
                :options="poDistrictList"
                @change="
                  (value, options) => formCityToStreet(value, options, 'street')
                "
              ></a-select>
            </a-form-item>
            <a-form-item
              label="派出所"
              v-if="['4', '8'].includes(formState.roleGroupId)"
            >
              <a-select
                placeholder="选择派出所"
                v-model:value="formState.poStreetCode"
                :filter-option="filterOption"
                show-search
                :options="poStreetList"
              ></a-select>
            </a-form-item>
            <a-form-item
              label="小区"
              v-if="['5', '6'].includes(formState.roleGroupId)"
            >
              <a-select
                v-if="formState.roleGroupId == '5'"
                v-model:value="formState.villageIds"
                mode="multiple"
                style="width: 100%"
                :filter-option="filterOption"
                show-search
                placeholder="请选择小区"
                :options="villageList"
              ></a-select>
              <a-select
                v-else
                v-model:value="formState.villageId"
                style="width: 100%"
                :filter-option="filterOption"
                show-search
                placeholder="请选择小区"
                :options="villageList"
                @change="createBuildingList"
              ></a-select>
            </a-form-item>

            <a-form-item
              label="楼栋"
              v-if="['6'].includes(formState.roleGroupId)"
            >
              <a-select
                placeholder="选择楼栋"
                v-model:value="formState.buildingIds"
                :filter-option="filterOption"
                show-search
              ></a-select>
            </a-form-item>

            <a-form-item label="真实姓名">
              <a-input
                placeholder="这里输入姓名"
                v-model:value="formState.realName"
              ></a-input>
            </a-form-item>
            <a-form-item label="手机号">
              <a-input
                placeholder="这里输入手机号"
                v-model:value="formState.phone"
              ></a-input>
            </a-form-item>
            <a-form-item label="身份证号">
              <a-input
                placeholder="这里输入身份证号"
                v-model:value="formState.identity"
              ></a-input>
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input
                placeholder="这里输入邮箱"
                v-model:value="formState.email"
              ></a-input>
            </a-form-item>
            <a-form-item label="备注">
              <a-input
                placeholder="这里输入备注"
                v-model:value="formState.remarks"
              ></a-input>
            </a-form-item>
            <a-form-item label="推荐用户">
              <a-input
                placeholder="这里输入用户"
                v-model:value="formState.recommendUser"
              ></a-input>
            </a-form-item>
            <a-form-item label="推荐理由">
              <a-textarea
                v-model:value="formState.recommendReason"
              ></a-textarea>
            </a-form-item>
            <a-form-item label="开始时间">
              <a-date-picker
                v-model:value="formState.startTime"
                style="width: 220px"
                :value-format="dateFormat"
                :format="dateFormat"
              />
            </a-form-item>
            <a-form-item label="结束时间">
              <a-date-picker
                v-model:value="formState.endTime"
                :value-format="dateFormat"
                style="width: 220px"
                :format="dateFormat"
              />
            </a-form-item>
            <a-form-item label="审核状态">
              <a-select
                placeholder="请选择审核状态"
                :options="formAuthList"
                v-model:value="formState.isAuth"
              ></a-select>
            </a-form-item>
            <a-form-item label="状态">
              <a-select
                placeholder="请选择状态"
                :options="statusOptions"
                v-model:value="formState.status"
              ></a-select>
            </a-form-item>
          </a-form>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import Modal from '@/components/Modal.vue'
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import {
    SearchOutlined,
    SyncOutlined,
    CloudUploadOutlined,
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue'
  import {
    addU,
    del,
    getBuilding,
    getDictionary,
    getRole,
    getUserList,
    getVillageList,
    hasU,
  } from '@/api/system'
  import {
    columns,
    userListObj,
    buildingList,
    poDistrictList,
    poStreetList,
    poCityList,
    formState,
    poProvieceList,
    provieceList,
    authList,
    streetList,
    dateFormat,
    villageList,
    formRoleGroupList,
    cityList,
    roleList,
    roleGroupList,
    statusOptions,
    districtList,
    formAuthList,
  } from './data'
  import { message } from 'ant-design-vue'
  const {
    dataSource,
    tableLoading,
    paginationInfo,
    handleTableChange,
    requestObj,
  } = useTableInit({
    tableObj: userListObj,
  })
  const { modalRef, titleValue, formItemLayout } = useInitFrom()
  let formProvieceList = []
  let formPoProvieceList = []
  let role = []
  const formRoleGroup = [
    {
      value: '0',
      label: '系统管理员',
    },
    {
      value: '1',
      label: '省份管理员',
    },
    {
      value: '2',
      label: '市级管理员',
    },
    {
      value: '3',
      label: '县级管理员',
    },
    {
      value: '4',
      label: '街道管理员',
    },
    {
      value: '5',
      label: '小区管理组',
    },
    {
      value: '6',
      label: '楼栋管理组',
    },
    {
      value: '7',
      label: '市局',
    },
    {
      value: '9',
      label: '分局',
    },
    {
      value: '8',
      label: '派出所',
    },
    {
      value: '11',
      label: '管理员',
    },
  ]
  const openAdd = async () => {
    modalRef.value.open()
  }
  const getList = (tableObj) => {
    tableLoading.value = true
    getUserList(tableObj)
      .then((res) => {
        dataSource.value = res.result.userList.map((item, index) => {
          return {
            ...item,
            delLoading: false,
            No: index + 1,
            operation: '',
          }
        })

        const poProviece = res.result.poProvieceList.map((item) => {
          return {
            ...item,
            value: item.dicCode,
            label: item.dicName,
          }
        })
        poProviece.splice(0, 0, {
          value: '',
          label: '全部',
        })
        poProvieceList.value = poProviece
        formPoProvieceList = poProvieceList.value.slice(1)
        const proviece = res.result.provieceList.map((item) => {
          return {
            ...item,
            value: item.dicCode,
            label: item.dicName,
          }
        })
        proviece.splice(0, 0, {
          value: '',
          label: '全部',
        })
        provieceList.value = proviece
        formProvieceList = provieceList.value.slice(1)
        role = res.result.roleGroupList
        const roleB = []
        role.forEach((item) => {
          let isUnique = false
          roleB.forEach((itemRole) => {
            if (item.groupName == itemRole.groupName) {
              isUnique = true
            } else {
              isUnique = false
            }
          })
          if (!isUnique) {
            roleB.push(item)
          }
        })
        const roleC = roleB.map((item) => {
          return {
            ...item,
            value: item.groupType,
            label: item.groupName,
          }
        })
        roleC.unshift({
          value: '',
          label: '全部',
        })
        roleGroupList.value = roleC
        formRoleGroupList.value = roleB.map((item) => {
          return {
            ...item,
            value: item.groupType,
            label: item.groupName,
          }
        })
      })
      .finally(() => {
        tableLoading.value = false
      })
  }
  getList(requestObj)
  getVillageList().then((res) => {
    const village = res.result.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
    villageList.value.push(...village)
  })
  const filterOption = (inputValue, option) => {
    return option.label.indexOf(inputValue) > -1
  }
  const state = reactive({
    selectedRowKeys: [],
    loading: false,
  })

  // 搜索
  const searchTableItem = () => {
    getList(requestObj)
  }
  // 重置
  const resetTableObj = () => {
    for (let tableObjKey in requestObj) {
      if (Array.isArray(requestObj[tableObjKey])) {
        requestObj[tableObjKey] = []
      } else {
        requestObj[tableObjKey] = undefined
      }
    }
    getList(requestObj)
  }

  const getCheckboxProps = (record) => ({
    // Column configuration not to be checked
    name: record.name,
    // disabled: true,
  })

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    state.selectedRowKeys = selectedRowKeys
  }
  const show = () => {
    console.log('1')
  }
  const cityToStreet = (value, options, type) => {
    if (value != '') {
      getDictionary({
        dicCode: value,
        grade: type,
        childCode: options.childCode,
      }).then((res) => {
        if (options.childCode == 'DQ') {
          if (type == 'city') {
            requestObj.cityCode = undefined
            requestObj.streetCode = undefined
            requestObj.districtCode = undefined
            cityList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'district') {
            requestObj.streetCode = undefined
            requestObj.districtCode = undefined
            districtList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'street') {
            requestObj.streetCode = undefined

            streetList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          }
        } else if (options.childCode == 'PO') {
          if (type == 'city') {
            requestObj.poCityCode = undefined
            requestObj.poStreetCode = undefined
            requestObj.poDistrictCode = undefined
            poCityList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'district') {
            requestObj.poStreetCode = undefined
            requestObj.poDistrictCode = undefined
            poDistrictList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'street') {
            requestObj.poStreetCode = undefined

            poStreetList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          }
        }
      })
    } else {
      if (options.childCode == 'DQ' && type == 'city') {
        requestObj.cityCode = undefined
        requestObj.streetCode = undefined
        requestObj.districtCode = undefined
        cityList.value = [
          {
            value: '',
            label: '全部',
          },
        ]
        streetList.value = [
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
      } else if (options.childCode == 'PO' && type == 'city') {
        requestObj.poCityCode = undefined
        requestObj.poStreetCode = undefined
        requestObj.poDistrictCode = undefined
        poCityList.value = [
          {
            value: '',
            label: '全部',
          },
        ]
        poStreetList.value = [
          {
            value: '',
            label: '全部',
          },
        ]
        poDistrictList.value = [
          {
            value: '',
            label: '全部',
          },
        ]
      }
    }
  }
  const formCityToStreet = (value, options, type) => {
    if (value != '') {
      getDictionary({
        dicCode: value,
        grade: type,
        childCode: options.childCode,
      }).then((res) => {
        if (options.childCode == 'DQ') {
          if (type == 'city') {
            formState.cityCode = undefined
            formState.streetCode = undefined
            formState.districtCode = undefined
            cityList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'district') {
            formState.streetCode = undefined
            formState.districtCode = undefined
            districtList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'street') {
            requestObj.streetCode = undefined

            streetList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          }
        } else if (options.childCode == 'PO') {
          if (type == 'city') {
            formState.poCityCode = undefined
            formState.poStreetCode = undefined
            formState.poDistrictCode = undefined
            poCityList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'district') {
            formState.poStreetCode = undefined
            formState.poDistrictCode = undefined
            poDistrictList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'street') {
            formState.poStreetCode = undefined

            poStreetList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          }
        }
      })
    } else {
      if (options.childCode == 'DQ' && type == 'city') {
        formState.cityCode = undefined
        formState.streetCode = undefined
        formState.districtCode = undefined
        cityList.value = []
        streetList.value = []
        districtList.value = []
      } else if (options.childCode == 'PO' && type == 'city') {
        formState.poCityCode = undefined
        formState.poStreetCode = undefined
        formState.poDistrictCode = undefined
        poCityList.value = []
        poStreetList.value = []
        poDistrictList.value = []
      }
    }
  }
  // 通过角色分组筛选角色列表
  const createRole = (value, options, controlAdd = true) => {
    console.log(controlAdd)
    if (value !== '') {
      getRole({ roleGroupId: value }).then((res) => {
        roleList.value = res.result.map((item) => {
          return {
            ...item,
            value: controlAdd ? item.id : item.id + '#' + item.isMV,
            label: item.name,
          }
        })
      })
    } else {
      roleList.value = [
        {
          value: '',
          label: '全部',
        },
      ]
    }
  }
  // 楼栋列表
  const createBuildingList = (value) => {
    requestObj.buildingId = undefined
    if (value != '') {
      getBuilding({ villageId: value }).then((res) => {
        buildingList.value = res.result.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          }
        })
      })
    }
  }
  function handleResizeColumn(w, col) {
    col.width = w
  }

  const clearFormItem = () => {
    for (let tableObjKey in formState) {
      if (Array.isArray(formState[tableObjKey])) {
        formState[tableObjKey] = []
      } else {
        formState[tableObjKey] = undefined
      }
    }
  }
  //表单提交
  const submit = async () => {
    modalRef.value.showLoading()
    let res = await hasU({ username: formState.username })
    if (res.code == '401') {
      modalRef.value.hideLoading()
      message.error(res.desc)
    } else {
      await addU({
        // villageIds: formState.villageIds,
        // username: formState.username,
        // password: formState.password,
        // chkpwd: formState.chkpwd,
        // roleGroupId: formState.roleGroupId,
        // roleId: formState.roleId,
        // villageId: formState.villageId,
        // realName: formState.realName,
        // phone: formState.phone,
        // identity: formState.identity,
        // isAuth: formState.isAuth,
        // status: formState.status,
        // provieceCode: '120000',
        // cityCode: '120100',
        // poProvieceCode: '350000000000',
        // poCityCode: '350300000000',
        ...formState,
      }).then((res) => {
        if (res.code == '200') {
          getList(requestObj)
          modalRef.value.close()
          clearFormItem()
        } else if (res.code == '400') {
          message.error('输入项有误，请检查输入项')
        }
        modalRef.value.hideLoading()
      })
    }
  }
  const close = () => {
    clearFormItem()
  }
  const delTableItem = async (record) => {
    await del({ id: record.id })
    await getList(requestObj)
  }
  const changeTableItem = (record) => {
    console.log(record)
    modalRef.value.open()

    for (let recordKey in record) {
      if (recordKey == 'isAuth') {
        formState[recordKey] = record[recordKey].toString()
        continue
      } else if (recordKey == 'password') {
        formState[recordKey] = ''
        continue
      } else if (recordKey == 'groupType') {
        formState.roleGroupId = record[recordKey]
        continue
      } else if (recordKey == 'roleId'){
        formState.roleId =record[recordKey]+'#'+record.isMV
      }

      formState[recordKey] = record[recordKey]
      console.log(formState)
    }
  }
</script>

<style scoped lang="less"></style>
