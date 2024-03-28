<template>
  <div>
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
          @change="(value, options) => cityToStreet(value, options, 'district')"
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
            :options="villageList"
            placeholder="选择小区"
            :filter-option="filterOption"
            @change="
              (value, options) => villageToHouse(value, options, 'building')
            "
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.buildingId"
            style="width: 150px"
            show-search
            :options="buildingList"
            placeholder="选择楼栋"
            :filter-option="filterOption"
            @change="(value, options) => villageToHouse(value, options, 'unit')"
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.unitId"
            style="width: 150px"
            show-search
            :options="unitList"
            placeholder="选择单元"
            :filter-option="filterOption"
            @change="
              (value, options) => villageToHouse(value, options, 'house')
            "
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.houseId"
            style="width: 150px"
            show-search
            :options="houseList"
            placeholder="选择房屋"
            :filter-option="filterOption"
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.poProvieceCode"
            placeholder="请选择省厅"
            :options="poProvinceList"
            style="width: 150px"
            show-search
            :filter-option="filterOption"
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
            @change="(value, options) => cityToStreet(value, options, 'street')"
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
            v-model:value="requestObj.type"
            style="width: 150px"
            show-search
            :options="typeOptions"
            placeholder="选择类型"
            :filter-option="filterOption"
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.isAuthenticate"
            style="width: 150px"
            show-search
            :options="authenticateOptions"
            placeholder="选择审核状态"
            :filter-option="filterOption"
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.status"
            style="width: 150px"
            show-search
            :options="statusOptions"
            placeholder="账号状态"
            :filter-option="filterOption"
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.isReal"
            style="width: 150px"
            show-search
            :options="realOptions"
            placeholder="身份认证"
            :filter-option="filterOption"
          ></a-select>
        </a-col>
        <a-col :md="4" :sm="2">
          <a-select
            v-model:value="requestObj.isRegitFace"
            style="width: 150px"
            show-search
            :options="RegitFaceOptions"
            placeholder="人脸录入"
            :filter-option="filterOption"
          ></a-select>
        </a-col>
      </template>
      <a-col class="gutter-row" :md="(!advanced && 4) || 4" :sm="24">
        <a-form-item>
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
                margin-left: 5px;
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
        </a-form-item>
      </a-col>
    </a-row>
    <a-space>
      <a-button type="primary" @click="addTableItem">新增</a-button>
    </a-space>
    <a-table
      :data-source="dataSource"
      :columns="columns"
      :pagination="paginationInfo"
      @change="handleTableChange"
      :loading="tableLoading"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'isReal'">
          {{ record.isReal ? '已认证' : '未认证' }}
        </template>
        <template v-else-if="column.dataIndex == 'status'">
          {{ record.status ? '正常' : '异常' }}
        </template>
        <template v-else-if="column.dataIndex == 'addType'">
          {{ typeContent(record.addType) }}
        </template>
        <template v-else-if="column.dataIndex == 'os'">
          {{ osContent(record.os) || '未知' }}
        </template>
        <template v-else-if="column.dataIndex == 'uvType'">
          {{ uvTypeContent(record.uvType) }}
        </template>
        <template v-else-if="column.dataIndex == 'isAuthenticate'">
          <span v-if="record.isAuthenticate == '0'">待认证</span>
          <span v-else-if="record.isAuthenticate == '1'">通过</span>
          <span v-else>不通过</span>
        </template>
        <template v-else-if="column.dataIndex == 'operation'">
          <a-button type="link">修改</a-button>
          <a-button type="link" @click="changeDoorModal(record)">
            分配门
          </a-button>
          <a-button type="link">人脸录入</a-button>
          <a-button type="link">身份认证</a-button>
          <a-button type="link">分配监控</a-button>
          <a-button type="link" @click="copyItem(record)">复制</a-button>
          <a-popconfirm
            title="确定要删除该表格项吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="delTableItem(record)"
          >
            <a-button type="link">删除</a-button>
          </a-popconfirm>
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
            <a-divider orientation="left">位置信息</a-divider>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="小区" name="villageId">
                <a-select
                  :options="villageList.slice(1)"
                  style="width: 150px"
                  placeholder="选择小区"
                  v-model:value="formState.villageId"
                  @change="
                    (value, options) =>
                      villageToHouse(value, options, 'building', true)
                  "
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="楼号" name="buildingId">
                <a-select
                  :options="formBuildingList"
                  style="width: 150px"
                  placeholder="选择楼号"
                  v-model:value="formState.buildingId"
                  @change="
                    (value, options) =>
                      villageToHouse(value, options, 'unit', true)
                  "
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="单元" name="unitId">
                <a-select
                  :options="formUnitList"
                  style="width: 150px"
                  placeholder="选择单元"
                  v-model:value="formState.unitId"
                  @change="
                    (value, options) =>
                      villageToHouse(value, options, 'house', true)
                  "
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" :offset="3" name="houseId">
              <a-form-item label="房号" name="houseId">
                <a-select
                  :options="formHouseList"
                  style="width: 150px"
                  placeholder="选择房号"
                  v-model:value="formState.houseId"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-divider orientation="left">其他信息</a-divider>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="姓名">
                <a-input
                  placeholder="姓名"
                  style="width: 150px"
                  v-model:value="formState.name"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="密码" name="password">
                <a-input-password
                  placeholder="密码"
                  style="width: 150px"
                  v-model:value="formState.password"
                ></a-input-password>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="手机号" name="mobile">
                <a-input
                  placeholder="手机号"
                  style="width: 150px"
                  v-model:value="formState.mobile"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="是否认证">
                <a-select
                  :options="formAuthenticateOptions"
                  style="width: 150px"
                  v-model:value="formState.isAuthenticate"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="类型" name="type">
                <a-select
                  placeholder="选择类型"
                  style="width: 150px"
                  v-model:value="formState.type"
                  :options="typeOptions.slice(1)"
                  @change="requestTime(formState.type)"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item
                label="身份证"
                name="identity"
                :has-feedback="formState.identity ? true : false"
              >
                <a-input
                  style="width: 150px"
                  placeholder="身份证号"
                  v-model:value="formState.identity"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="备注">
                <a-input
                  style="width: 150px"
                  placeholder="备注"
                  v-model:value="formState.remarks"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="有效期" name="timeOptions">
                <a-range-picker
                  v-model:value="formState.timeOptions"
                  :value-format="dateFormat"
                  :format="dateFormat"
                  show-time
                  style="width: 250px"
                  @change="distributeTime"
                />
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="2" :offset="3">
              <a-form-item label="人脸图片(jpg/jpeg)">
                <div style="display: flex">
                  <div
                    v-if="formState.imageUrl !== ''"
                    style="position: relative"
                  >
                    <a-image
                      :src="formState.imageUrl"
                      style="width: 100px; height: 100px"
                    />
                    <div class="imageDel" @click="delItemImage">
                      <DeleteOutlined />
                    </div>
                  </div>
                  <a-upload
                    v-else
                    v-model:file-list="fileList"
                    accept="image/jpg, image/jpeg"
                    list-type="picture-card"
                    :maxCount="1"
                    :beforeUpload="beforeUpload"
                    :showUploadList="{
                      showPreviewIcon: true,
                      showRemoveIcon: true,
                    }"
                    @remove="removeImage"
                  >
                    <PlusOutlined style="font-size: 22px" />
                  </a-upload>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </Modal>
    <a-modal
      v-model:open="doorModal"
      title="分配门"
      :maskClosable="false"
      :body-style="{ height: '65vh' }"
      @ok="submitDoorModal"
    >
      <div style="overflow: auto; overflow-x: hidden; height: 100%">
        <a-table
          :data-source="doorDataSource"
          :columns="doorColumns"
          :pagination="{
            pageSize: doorDataSource.length,
          }"
          :row-selection="{
            selectedRowKeys: doorState.selectedRowKeys,
            onChange: onDoorSelectChange,
          }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'doorType'">
              {{ doorType(record.doorType) }}
            </template>
          </template>
        </a-table>
      </div>
    </a-modal>
    <a-modal
      v-model:open="copyModal"
      title="新增"
      :maskClosable="false"
      width="70%"
      :confirm-loading="copyLoading"
      @ok="submitCopy"
      @cancel="closeCopyModal"
      :body-style="{
        height: '65vh',
      }"
    >
      <div style="overflow: auto; overflow-x: hidden; height: 100%">
        <a-form
          ref="formCopyRef"
          :model="formCopyState"
          v-bind="formItemLayout"
          :rules="copyRules"
        >
          <a-row :gutter="[48, 8]">
            <a-divider orientation="left">基本信息</a-divider>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="手机号">
                <a-input
                  :disabled="true"
                  placeholder="手机号"
                  style="width: 150px"
                  v-model:value="formCopyState.mobile"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="类型" name="type">
                <a-select
                  placeholder="选择类型"
                  style="width: 150px"
                  v-model:value="formCopyState.type"
                  :options="typeOptions.slice(1)"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="备注">
                <a-input
                  style="width: 150px"
                  placeholder="备注"
                  v-model:value="formCopyState.remarks"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="有效期" name="startTime">
                <a-range-picker
                  v-model:value="startTimeAndEndTime"
                  :value-format="dateFormat"
                  :format="dateFormat"
                  show-time
                  style="width: 250px"
                  @change="distributeCopyTime"
                />
              </a-form-item>
            </a-col>
            <a-divider orientation="left">位置信息</a-divider>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="小区" name="villageId">
                <a-select
                  :options="villageList.slice(1)"
                  style="width: 150px"
                  placeholder="选择小区"
                  v-model:value="formCopyState.villageId"
                  @change="
                    (value, options) =>
                      villageToHouse(value, options, 'building', true)
                  "
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="楼号" name="buildingId">
                <a-select
                  :options="formBuildingList"
                  style="width: 150px"
                  placeholder="选择楼号"
                  v-model:value="formCopyState.buildingId"
                  @change="
                    (value, options) =>
                      villageToHouse(value, options, 'unit', true)
                  "
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="单元" name="unitId">
                <a-select
                  :options="formUnitList"
                  style="width: 150px"
                  placeholder="选择单元"
                  v-model:value="formCopyState.unitId"
                  @change="
                    (value, options) =>
                      villageToHouse(value, options, 'house', true)
                  "
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" :offset="3" name="houseId">
              <a-form-item label="房号" name="houseId">
                <a-select
                  :options="formHouseList"
                  style="width: 150px"
                  placeholder="选择房号"
                  v-model:value="formCopyState.houseId"
                ></a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
  export default {
    name: 'masterAccount',
  }
</script>
<script setup>
  import Modal from '@/components/Modal.vue'
  import { useInitFrom, useTableInit } from '@/hooks/useTableComponent'
  import {
    getMasterUserList,
    addMasterUserList,
    distDoor,
    submitDoor,
    delMasterUserItem,
    copyUser,
    getTime,
  } from '@/api/userManager'
  import { reactive, ref } from 'vue'
  import {
    UpOutlined,
    DownOutlined,
    SearchOutlined,
    DeleteOutlined,
    PlusOutlined,
  } from '@ant-design/icons-vue'
  import { getDictionary } from '@/api/system'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  import { getBuilding, getHouse, getUnit } from '@/api/community'
  import { isIdCard } from '@/utils/validate'
  import { messageContent } from '@/utils/message'
  const { simpleRequest, clearFormOrPageInput } = useSimpleRequest()
  const {
    requestObj,
    getData,
    paginationInfo,
    provinceList,
    poProvinceList,
    villageList,
    searchTableItem,
    handleTableChange,
    tableLoading,
    resetTableObj,
    delTableItem,
    dataSource,
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
      type: undefined,
      isAuthenticate: undefined,
      status: undefined,
      isReal: undefined,
      isRegitFace: undefined,
      pageSize: 10,
      pageNum: 1,
    },
    getTableList: getMasterUserList,
    delTableEle: delMasterUserItem,
  })
  const {
    handleCreate,
    modalRef,
    formRef,
    formState,
    formItemLayout,
    titleValue,
    submit,
    multipleSubmit,
  } = useInitFrom({
    form: {
      villageId: undefined,
      buildingId: undefined,
      unitId: undefined,
      houseId: undefined,
      mobile: undefined,
      name: '',
      password: '',
      type: undefined,
      photoSrc: '',
      identity: undefined,
      image: undefined,
      reason: undefined,
      isAuthenticate: '1',
      imageUrl: '',
      timeOptions: [],
    },
    addList: addMasterUserList,
    getData,
    requestObj,
  })
  const typeOptions = [
    { value: '', label: '全部' },
    { value: '0', label: '户主' },
    { value: '1', label: '家人' },
    { value: '2', label: '租客' },
    { value: '21', label: '雇主' },
    { value: '22', label: '雇员' },
    { value: '31', label: '保障房主申请人' },
    { value: '32', label: '保障房共同申请人' },
    { value: '33', label: '保障房临时居住人员' },
    { value: '41', label: '公租房申请人' },
    { value: '42', label: '公租房共同申请人' },
    { value: '43', label: '公租房临时居住人员' },
  ]
  const uvTypeContent = (value) => {
    const uvType = typeOptions.find((item) => item.value == value)
    return uvType.label
  }
  const emitModal = () => {
    if (formRef.value) formRef.value.clearValidate()
    modalRef.value.close()
  }
  const typeContent = (value) => {
    let typeContent
    if (value == '1') {
      typeContent = '小兔关门'
    } else if (value == '2') {
      typeContent = '小兔开门'
    } else if (value == '3') {
      typeContent = 'PC端'
    } else if (value == '4') {
      typeContent = '小程序'
    } else if (value == '5') {
      typeContent = '建发'
    } else if (value == 6) {
      typeContent = '联发'
    }

    return typeContent
  }
  const osContent = (value) => {
    let osContent
    switch (value) {
      case '0':
        osContent = '安卓'
        break
      case '1':
        osContent = '苹果'
        break
      case '3':
        osContent = 'wap'
        break
      case '4':
        osContent = '小程序'
    }
    return osContent
  }
  const checkIDCard = (value) => {
    const result = isIdCard(value)
    if (!result) {
      messageContent('error', '请输入正确的身份证号码')
    }
    return result
  }
  const rules = {
    name: [{ required: true, message: '请输入名称' }],
    villageId: [{ required: true, message: '请选择小区' }],
    buildingId: [{ required: true, message: '请选择楼号' }],
    unitId: [{ required: true, message: '请选择单元' }],
    houseId: [{ required: true, message: '请选择房号' }],
    mobile: [
      { required: true, message: '请输入手机号' },
      {
        trigger: 'blur',
        validator: (rules, value) => {
          if (!formState.mobile) {
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
    identity: [
      {
        trigger: 'blur',
        validator: (rules, value) => {
          if (!formState.identity) {
            return Promise.resolve()
          } else {
            if (!checkIDCard(value)) {
              modalRef.value.hideLoading()
              return Promise.reject('请输入正确的身份证号')
            } else {
              return Promise.resolve()
            }
          }
        },
      },
    ],
    password: [{ required: true, message: '请输入密码' }],
    timeOptions: [{ required: true, message: '请选择有效期' }],
  }
  const copyRules = {
    villageId: [{ required: true, message: '请选择小区' }],
    buildingId: [{ required: true, message: '请选择楼号' }],
    unitId: [{ required: true, message: '请选择单元' }],
    houseId: [{ required: true, message: '请选择房号' }],
    type: [{ required: true, message: '请选择类型' }],
  }
  const dateFormat = 'YYYY-MM-DD'
  const resetSearchObj = () => {
    if (typeof resetTableObj == 'function') {
      resetTableObj()
    }
    paginationInfo.current = 1
    getData(requestObj)
  }
  const advanced = ref(false)
  const toggleAdvanced = () => {
    advanced.value = !advanced.value
  }
  const filterOption = (inputValue, option) => {
    return option.label.indexOf(inputValue) > -1
  }

  const RegitFaceOptions = [
    { value: '', label: '全部' },
    { value: '1', label: '已录入' },
    { value: '0', label: '未录入' },
  ]
  const authenticateOptions = [
    { value: '', label: '全部' },
    { value: '0', label: '待认证' },
    { value: '1', label: '通过' },
    { value: '2', label: '不通过' },
  ]
  const formAuthenticateOptions = [
    { value: '0', label: '失败' },
    { value: '1', label: '通过' },
  ]
  const statusOptions = [
    { value: '', label: '全部' },
    { value: '1', label: '正常' },
    { value: '0', label: '异常' },
  ]
  const realOptions = [
    { value: '', label: '全部' },
    { value: '1', label: '已认证' },
    { value: '0', label: '待认证' },
  ]
  const columns = [
    {
      dataIndex: 'mobile',
      title: '手机号',
    },
    {
      dataIndex: 'name',
      title: '姓名',
    },
    {
      dataIndex: 'villageName',
      title: '小区',
    },
    {
      dataIndex: 'building',
      title: '房屋',
    },
    {
      dataIndex: 'uvType',
      title: '类型',
    },
    {
      dataIndex: 'isAuthenticate',
      title: '审核状态',
      width: '200px',
    },
    {
      dataIndex: 'isReal',
      title: '身份认证',
      width: '250px',
    },
    {
      dataIndex: 'addType',
      title: '来源',
    },
    {
      dataIndex: 'os',
      title: '系统',
    },
    {
      dataIndex: 'status',
      title: '状态',
      width: '150px',
    },
    {
      dataIndex: 'updateUser',
      title: '审核用户',
    },
    {
      dataIndex: 'addTime',
      title: '注册时间',
      width: '300px',
    },
    {
      dataIndex: 'remarks',
      title: '备注',
    },
    {
      dataIndex: 'operation',
      title: '操作',
      width: '200px',
    },
  ]
  const cityList = ref([])
  const districtList = ref([])
  const streetList = ref([])
  const poCityList = ref([])
  const poDistrictList = ref([])
  const poStreetList = ref([])
  const buildingList = ref([])
  const formBuildingList = ref([])
  const unitList = ref([])
  const formUnitList = ref([])
  const houseList = ref([])
  const formHouseList = ref([])
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
  const villageToHouse = (value, options, type, isForm = false) => {
    let requestFun, requestVillageObj, tableList
    if (type == 'building') {
      requestFun = getBuilding
      requestVillageObj = {
        villageId: value,
      }
      if (!isForm) {
        requestObj.buildingId = undefined
        requestObj.unitId = undefined
        requestObj.houseId = undefined
        buildingList.value = []
        unitList.value = []
        houseList.value = []
      } else {
        formState.buildingId = undefined
        formState.unitId = undefined
        formState.houseId = undefined
        formBuildingList.value = []
        formUnitList.value = []
        formHouseList.value = []
      }
      tableList = isForm ? formBuildingList : buildingList
    } else if (type == 'unit') {
      requestFun = getUnit
      requestVillageObj = {
        buildingId: value,
      }
      if (!isForm) {
        requestObj.houseId = undefined
        requestObj.unitId = undefined
        unitList.value = []
        houseList.value = []
      } else {
        formState.unitId = undefined
        formState.houseId = undefined
        formUnitList.value = []
        formHouseList.value = []
      }
      tableList = isForm ? formUnitList : unitList
    } else if (type == 'house') {
      requestFun = getHouse
      tableList = isForm ? formHouseList : houseList
      requestVillageObj = {
        unitId: value,
      }
      if (!isForm) {
        requestObj.houseId = undefined
        houseList.value = []
      } else {
        formState.houseId = undefined
        formHouseList.value = []
      }
    }
    if (value != '') {
      simpleRequest({
        requestFun,
        requestObj: requestVillageObj,
        isForm,
        labelString: 'name',
        valueString: 'id',
        tableList,
        formList: tableList,
      })
    }
  }
  const addTableItem = () => {
    formHouseList.value = []
    formUnitList.value = []
    formBuildingList.value = []
    if (formRef.value) formRef.value.resetFields()
    handleCreate()
  }
  const startTimeAndEndTime = ref([])
  const distributeTime = () => {
    formState.startTime = startTimeAndEndTime.value[0]
    formState.endTime = startTimeAndEndTime.value[1]
  }
  const delItemImage = () => {
    formState.imageUrl = ''
  }
  const fileList = ref([])
  const beforeUpload = (file) => {
    formState.photoSrc = file
    return false
  }
  const removeImage = () => {
    formState.photoSrc = ''
  }
  const checkMobile = (value) => {
    const reg = /^1[3-9]\d{9}$/
    const result = reg.test(value)
    return result
  }
  const requestTime = (value) => {
    getTime({ type: value, villageId: formState.villageId }).then((res) => {
      formState.timeOptions[0] = res.result.startTime
      formState.timeOptions[1] = res.result.endTime
    })
  }
  const modalSubmit = () => {
    console.log(formState)
    modalRef.value.showLoading()
    const formData = new FormData()
    for (let formStateKey in formState) {
      if (formState[formStateKey] == undefined) {
        formData.append(formStateKey, '')
      } else {
        formData.append(formStateKey, formState[formStateKey])
      }
    }
    formRef.value
      .validate()
      .then(async () => {
        await submit(formData)
        formRef.value.resetFields()
        startTimeAndEndTime.value = []
      })
      .catch(() => {
        modalRef.value.hideLoading()
      })
  }
  const doorModal = ref(false)
  const doorDataSource = ref([])
  const doorColumns = [
    {
      title: '编号',
      dataIndex: 'NO',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'doorType',
    },
  ]
  // 多选
  const doorState = reactive({
    selectedRowKeys: [],
    ids: [],
  })
  const onDoorSelectChange = (selectedRowKeys, selectedRows) => {
    doorState.selectedRowKeys = selectedRowKeys
    doorState.ids = selectedRows.map((item) => {
      return item.id
    })
  }
  const doorType = (value) => {
    let doorType
    switch (value) {
      case 1:
        doorType = '云盒'
        break
      case 2:
        doorType = '1403-A'
        break
      case 3:
        doorType = '刷卡一体机'
        break
      case 4:
        doorType = '1403-H'
        break
      case 5:
        doorType = '1403-H-2'
        break
      case 7:
        doorType = '云屏'
        break
      case 8:
        doorType = 'EHome'
        break
      case 9:
        doorType = '保障房狄耐克'
        break
      case 10:
        doorType = '保障房超脑'
        break
      case 13:
        doorType = '保障房海康门口机'
        break
    }
    return doorType
  }
  const modalId = ref()
  const changeDoorModal = (record) => {
    modalId.value = record.id
    distDoor({ id: modalId.value }).then((res) => {
      const doorData = res.result.list.map((item, index) => {
        return {
          ...item,
          NO: index + 1,
          key: index + 1,
        }
      })
      doorState.selectedRowKeys = []
      doorState.ids = []
      doorData.forEach((item) => {
        if (item.isHave == '1') {
          doorState.selectedRowKeys.push(item.key)
          doorState.ids.push(item.id)
        }
      })
      doorDataSource.value = doorData
      doorModal.value = true
    })
  }
  const submitDoorModal = () => {
    const submitObj = {
      id: modalId.value,
      ids: doorState.ids?.join(','),
    }
    multipleSubmit(submitDoor, submitObj, '分配门配置成功', doorModal)
  }
  const copyModal = ref(false)
  const formCopyState = reactive({
    villageId: undefined,
    houseId: undefined,
    unitId: undefined,
    startTime: undefined,
    endTime: undefined,
    mobile: '',
    remarks: '',
    type: '',
    name: '',
  })
  const distributeCopyTime = () => {
    formCopyState.startTime = startTimeAndEndTime.value[0]
    formCopyState.endTime = startTimeAndEndTime.value[1]
  }
  const formCopyRef = ref()
  const copyItem = (record) => {
    modalId.value = record.id
    clearCopyState()
    formCopyState.mobile = record.mobile
    formCopyState.name = record.name
    formCopyState.type = record.uvType?.toString()
    formCopyState.startTime = record.startTime
    formCopyState.endTime = record.endTime
    startTimeAndEndTime.value[0] = formCopyState.startTime
    startTimeAndEndTime.value[1] = formCopyState.endTime
    copyModal.value = true
  }
  const clearCopyState = () => {
    formBuildingList.value = []
    formUnitList.value = []
    formHouseList.value = []
    startTimeAndEndTime.value = []
    formCopyState.remarks = ''
  }
  const closeCopyModal = () => {
    formCopyRef.value?.clearValidate()
    startTimeAndEndTime.value = []
  }
  const copyLoading = ref(false)
  const submitCopy = () => {
    copyLoading.value = true
    formCopyRef.value
      .validate()
      .then(() => {
        const submitObj = {
          id: modalId.value,
          ...formCopyState,
        }
        multipleSubmit(copyUser, submitObj, '复制成功', copyModal)
        copyLoading.value = false
        startTimeAndEndTime.value = []
      })
      .catch(() => {
        copyLoading.value = false
      })
  }
</script>
<style scoped lang="less">
  .imageDel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    color: red;
    cursor: pointer;
    font-size: 20px;
    //background-color: lightsteelblue;
  }
</style>
