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
            :loading="tableLoading"
            @resizeColumn="handleResizeColumn"
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
                    <a-popconfirm
                      title="确定删除该表格项吗?"
                      ok-text="确认"
                      cancel-text="取消"
                      @confirm="delTableItem(record)"
                    >
                      <DeleteOutlined style="color: red" />
                    </a-popconfirm>
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
          <a-form
            :model="formState"
            v-bind="formItemLayout"
            ref="formRef"
            :rules="editId == '0' ? rules : rulesEdit"
          >
            <a-form-item label="用户名" name="username" v-if="editId == '0'">
              <a-input
                placeholder="这里输入用户名"
                v-model:value="formState.username"
              ></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input-password
                placeholder="输入密码"
                v-model:value="formState.password"
              ></a-input-password>
            </a-form-item>
            <a-form-item label="确认密码" name="chkpwd">
              <a-input-password
                placeholder="确认密码"
                v-model:value="formState.chkpwd"
              ></a-input-password>
            </a-form-item>
            <a-form-item label="角色分组" name="roleGroupId">
              <a-select
                :options="formRoleGroup"
                show-search
                placeholder="请选择角色分组"
                v-model:value="formState.roleGroupId"
                :filter-option="filterOption"
                @change="
                  (value, options) => createRole(value, options, false, false)
                "
              ></a-select>
            </a-form-item>
            <a-form-item label="角色" name="roleId">
              <a-select
                :options="roleList"
                show-search
                placeholder="请选择角色"
                :filter-option="filterOption"
                v-model:value="formState.roleId"
                @change="roleChange"
              ></a-select>
            </a-form-item>
            <a-form-item
              label="省份"
              name="provieceCode"
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
              name="cityCode"
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
              name="districtCode"
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
              name="streetCode"
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
              name="poProvieceCode"
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
              name="poCityCode"
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
              name="poDistrictCode"
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
              name="poStreetCode"
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
              name="villageIds"
              v-if="['5', '6'].includes(formState.roleGroupId) && isMV == '1'"
            >
              <!--              <a-select-->
              <!--                v-if="isMV == '1'"-->
              <!--                v-model:value="formState.villageIds"-->
              <!--                mode="multiple"-->
              <!--                style="width: 100%"-->
              <!--                :filter-option="filterOption"-->
              <!--                show-search-->
              <!--                placeholder="请选择小区"-->
              <!--                :options="formVillageId"-->
              <!--                @change="changeVillageId"-->
              <!--              ></a-select>-->
              <template v-if="isMV == '1'">
                <a-tag v-for="(item, index) in transferArray" :key="index">
                  {{ item }}
                </a-tag>

                <PlusOutlined
                  style="
                    cursor: pointer;
                    border: 1px deepskyblue dashed;
                    border-radius: 50%;
                  "
                  @click="openTransfer"
                />
              </template>

              <!--              <a-select-->
              <!--                v-else-->
              <!--                v-model:value="formState.villageId"-->
              <!--                style="width: 100%"-->
              <!--                :filter-option="filterOption"-->
              <!--                show-search-->
              <!--                placeholder="请选择小区"-->
              <!--                :options="formVillageId"-->
              <!--                @change="(value) => createBuildingList(value, false)"-->
              <!--              ></a-select>-->
            </a-form-item>
            <a-form-item
              label="小区"
              name="villageId"
              v-if="['5', '6'].includes(formState.roleGroupId) && isMV != '1'"
            >
              <a-select
                v-model:value="formState.villageId"
                style="width: 100%"
                :filter-option="filterOption"
                show-search
                placeholder="请选择小区"
                :options="formVillageId"
                @change="(value) => createBuildingList(value, false)"
              ></a-select>
            </a-form-item>
            <a-form-item
              label="楼栋"
              v-if="['6'].includes(formState.roleGroupId)"
              :name="isMV == '3' ? 'buildingIds' : 'buildingId'"
            >
              <a-select
                v-if="isMV == '3'"
                placeholder="选择楼栋"
                :options="buildingList"
                mode="multiple"
                v-model:value="formState.buildingIds"
                :filter-option="filterOption"
                show-search
                @change="addBuildingId"
              ></a-select>
              <a-select
                placeholder="选择楼栋"
                v-else
                :options="buildingList"
                v-model:value="formState.buildingId"
                :filter-option="filterOption"
                show-search
                @change="addBuildingIds"
              ></a-select>
            </a-form-item>

            <a-form-item label="真实姓名" name="realName">
              <a-input
                placeholder="这里输入姓名"
                v-model:value="formState.realName"
              ></a-input>
            </a-form-item>
            <a-form-item label="手机号" name="phone">
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
            <a-form-item label="开始时间" name="startTime">
              <a-date-picker
                v-model:value="formState.startTime"
                style="width: 220px"
                :value-format="dateFormat"
                :format="dateFormat"
              />
            </a-form-item>
            <a-form-item label="结束时间" name="endTime">
              <a-date-picker
                v-model:value="formState.endTime"
                :value-format="dateFormat"
                style="width: 220px"
                :format="dateFormat"
              />
            </a-form-item>
            <a-form-item label="审核状态" name="isAuth">
              <a-select
                placeholder="请选择审核状态"
                :options="formAuthList"
                v-model:value="formState.isAuth"
              ></a-select>
            </a-form-item>
            <a-form-item label="状态" name="status">
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
    <a-modal
      v-model:open="transferVisible"
      title="选择小区"
      width="800px"
      @ok="transferSubmit"
      @cancel="closeTransfer"
    >
      <div class="transfer">
        <a-transfer
          v-model:target-keys="targetKeys"
          :data-source="transferData"
          show-search
          :operationStyle="{ height: '200px', marginTop: '50px' }"
          :filter-option="filterOption"
          :render="(item) => item.title"
        />
      </div>
    </a-modal>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
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
    edit,
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
    formRef,
    rules,
    rulesEdit,
    formRoleGroup,
  } from './data'
  import { message } from 'ant-design-vue'
  const { dataSource, tableLoading, requestObj } = useTableInit({
    tableObj: userListObj,
  })
  const { modalRef, titleValue, formItemLayout, editId } = useInitFrom()
  // 表单的省
  let formProvieceList = []
  // 表单的省厅
  let formPoProvieceList = []
  //未处理的主页面的角色组（由list接口返回）
  let role = []
  // 新增
  const openAdd = async () => {
    editId.value = 0
    modalRef.value.open()
  }
  // 页面表格数据
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
            key: item.id,
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
          childCode: 'PO',
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
          childCode: 'DQ',
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

  const formVillageId = ref([])
  // 获取小区
  getVillageList().then((res) => {
    const village = res.result.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
    villageList.value.push(...village)
    formVillageId.value = village
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
  // 用于控制小区/楼栋是多选还是单选
  const isMV = ref()
  // 清除部分formState的内容
  const clearPartFormState = () => {
    formState.provieceCode = undefined
    formState.cityCode = undefined
    formState.streetCode = undefined
    formState.poCityCode = undefined
    formState.poDistrictCode = undefined
    formState.poProvieceCode = undefined
    formState.villageId = undefined
    formState.villageIds = []
    formState.districtCode = undefined
    transferArray.value = []
  }
  // 表单中角色改变
  const roleChange = (value) => {
    clearPartFormState()
    roleList.value.forEach((item) => {
      if (item.value === value) {
        isMV.value = item.isMV
      }
    })
  }
  // 从市->区县->街道或者是市局->分局->派出所
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
  // 表单中从市->区县->街道或者是市局->分局->派出所
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

  // const changeVillageId = (value) => {
  //   formState.villageId = value[value.length - 1]
  // }
  // 创建角色 通常用于选中角色分组之后再调用
  const createRole = (value, options, controlAdd = true, form = true) => {
    if (form) {
      requestObj.roleId = undefined
    } else {
      clearPartFormState()
      formState.roleId = undefined
      formState.villageIds = []
      transferArray.value = []
    }
    if (value !== '') {
      getRole({ roleGroupId: value }).then((res) => {
        roleList.value = res.result.map((item) => {
          return {
            ...item,
            value: controlAdd ? item.id : item.id + '#' + item.isMV,
            label: item.name,
          }
        })
        console.log(roleList.value)
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
  const createBuildingList = (value, isRequest = true) => {
    if (isRequest) {
      requestObj.buildingId = undefined
    } else {
      formState.buildingId = undefined
      formState.villageIds = value
    }

    if (value != '') {
      let build = []
      getBuilding({ villageId: value }).then((res) => {
        build = res.result.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          }
        })
        buildingList.value = build
      })
    }
  }
  // 表格项的拖动表格项功能
  function handleResizeColumn(w, col) {
    col.width = w
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
    targetKeys.value = []
    transferArray.value = []
    isMV.value = undefined
  }
  const addBuildingIds = (value) => {
    formState.buildingIds = value
  }
  const addBuildingId = (value) => {
    formState.buildingId = value[value.length - 1]
  }
  //表单提交
  const submit = async () => {
    modalRef.value.showLoading()
    const changeFun = editId.value == '0' ? addU : edit
    if (editId.value == '0') {
      formRef.value.validate().then(async () => {
        let res = await hasU({ username: formState.username })
        if (res.code == '401') {
          modalRef.value.hideLoading()
          message.error(res.desc)
        } else if (res.code == '200') {
          await changeFun({
            ...formState,
            villageIds: Array.isArray(formState.villageIds)
              ? formState.villageIds.join(',')
              : formState.villageIds,
            buildingIds: Array.isArray(formState.buildingIds)
              ? formState.buildingIds.join(',')
              : formState.buildingIds,
          }).then((res) => {
            if (res.code == '200') {
              getList(requestObj)
              modalRef.value.close()
              clearFormItem()
              message.success('表格项新增成功')
            } else if (res.code == '400') {
              message.error('输入项有误，请检查输入项')
            } else if (res.code == '412') {
              message.error(res.desc)
              modalRef.value.hideLoading()
            } else {
              modalRef.value.hideLoading()
            }
          })
        }
      })
    } else {
      await changeFun({
        ...formState,
        villageIds: Array.isArray(formState.villageIds)
          ? formState.villageIds.join(',')
          : formState.villageIds,
        buildingIds: Array.isArray(formState.buildingIds)
          ? formState.buildingIds.join(',')
          : formState.buildingIds,
      }).then((res) => {
        if (res.code == '200') {
          getList(requestObj)
          modalRef.value.close()
          clearFormItem()
          message.success('表格项修改成功')
        } else if (res.code == '400') {
          message.error('输入项有误，请检查输入项')
        } else if (res.code == '412') {
          message.error(res.desc)
          modalRef.value.hideLoading()
        } else {
          modalRef.value.hideLoading()
        }
      })
    }
    await modalRef.value.hideLoading()
  }
  const close = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
    clearFormItem()
  }
  const delTableItem = async (record) => {
    await del({ id: record.id })
    await getList(requestObj)
  }
  // 修改功能
  const changeTableItem = async (record) => {
    editId.value = record.id
    await createRole(record.groupType, formState, false, false)
    await roleChange(record.roleId)
    if (record.buildingIds.length > 32) {
      const dataArray = JSON.parse(record.buildingIds)
      // 多个楼栋
      let completeArray = [],
        build = []
      //将楼栋列表清空
      buildingList.value = []
      for (const dataArrayKey in dataArray) {
        let arrayItem = dataArray[dataArrayKey].ids.split(',')
        completeArray.push(...arrayItem)
      }
      for (const dataArrayKey in dataArray) {
        // await createBuildingList(dataArray[dataArrayKey].villageId, false)
        await getBuilding({
          villageId: dataArray[dataArrayKey].villageId,
        }).then((res) => {
          build = res.result.map((item) => {
            return {
              ...item,
              value: item.id,
              label: item.name,
            }
          })
          buildingList.value.push(...build)
        })
      }
      formState.buildingIds = completeArray
    } else {
      await createBuildingList(record.villageIds, false)
      formState.buildingIds = [].push(record.buildingIds)
    }
    for (let recordKey in record) {
      if (recordKey == 'isAuth') {
        formState[recordKey] = record[recordKey].toString()
        continue
      } else if (recordKey == 'password') {
        formState[recordKey] = ''
        continue
      } else if (recordKey == 'groupType') {
        formState.roleGroupId = record[recordKey].toString()
        continue
      } else if (recordKey == 'roleId') {
        formState.roleId = record[recordKey] + '#' + record.isMV
        continue
      } else if (recordKey == 'isMV') {
        isMV.value = record[recordKey]
        continue
      } else if (recordKey == 'villageIds') {
        formState[recordKey] = record[recordKey].split(',')
        transferArray.value = formState.villageIds.map((item) => {
          const ele = villageList.value.filter((itemV) => itemV.value === item)
          return ele[0].name
        })
        continue
      } else if (recordKey == 'buildingIds' && record[recordKey] != '') {
        continue
      }
      formState[recordKey] = record[recordKey]
    }
    setTimeout(() => {
      modalRef.value.open()
    }, 100)
  }

  // 用于小区多选时弹出transfer组件，使用的是transferArray来显示多选 选中之后的名字，使用a-tags显示
  // transferArray与formstate.villageIds区别: 从本质上他们是一致的，只不过对与a-tags和a-transfer显示数据的key不同，formstate.villageIds只存储了
  // 选中项的id/value值,transferArray是根据id/value筛选出的对应name的数组。
  const transferVisible = ref(false)
  let targetKeys = ref([])
  let transferData
  const openTransfer = () => {
    transferVisible.value = true
    transferData = villageList.value.slice(1).map((item) => {
      return {
        ...item,
        title: item.name,
        key: item.value,
      }
    })
    // 将多选的选项回显到targetKey
    targetKeys.value = formState.villageIds
  }
  let transferArray = ref([])
  const transferSubmit = () => {
    formState.villageIds = targetKeys.value
    transferArray.value = formState.villageIds.map((item) => {
      const ele = villageList.value.filter((itemV) => itemV.value === item)
      return ele[0].name
    })
    targetKeys.value = []
    transferVisible.value = false
    formState.villageId = formState.villageIds[formState.villageIds.length - 1]
  }
  const closeTransfer = () => {
    targetKeys.value = []
    transferVisible.value = false
  }
</script>

<style scoped lang="less">
  .transfer {
    margin-left: 60px;
    :deep(.ant-transfer .ant-transfer-list) {
      height: 500px;
      width: 300px;
    }
    :deep(.ant-transfer .ant-transfer-operation button) {
      width: 42px;
      height: 30px;
      margin-top: 20px;
    }
  }
</style>
