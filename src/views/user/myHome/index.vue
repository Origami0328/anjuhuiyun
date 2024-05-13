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
                v-model:value="requestObj.type"
                placeholder="请选择类型"
                show-search
                :filter-option="filterOption"
                :options="typeOptions"
                style="width: 150px"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.isAuthenticate"
                placeholder="请选择审核状态"
                show-search
                :filter-option="filterOption"
                :options="authenticateOptions"
                style="width: 150px"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.isReal"
                placeholder="请选择账号状态"
                show-search
                :filter-option="filterOption"
                :options="statusOptions"
                style="width: 150px"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.isReal"
                placeholder="身份认证"
                show-search
                :filter-option="filterOption"
                :options="realOptions"
                style="width: 150px"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.isRegitFace"
                placeholder="人脸录入"
                show-search
                :filter-option="filterOption"
                :options="RegitFaceOptions"
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
      </a-space>
    </a-space>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="paginationInfo"
      bordered
      style="margin-top: 10px"
      :loading="tableLoading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'isReal'">
          {{ record.isReal == '1' ? '已认证' : '未认证' }}
        </template>
        <template v-else-if="column.dataIndex == 'status'">
          {{ record.status == '1' ? '正常' : '异常' }}
        </template>
        <template v-else-if="column.dataIndex == 'addType'">
          {{ typeContent(record.addType) }}
        </template>
        <template v-else-if="column.dataIndex == 'type'">
          {{ uvTypeContent(record.type) }}
        </template>
        <template v-else-if="column.dataIndex == 'isAuthenticate'">
          <span v-if="record.isAuthenticate == '0'">待认证</span>
          <span v-else-if="record.isAuthenticate == '1'">通过</span>
          <span v-else>不通过</span>
        </template>
        <template v-else-if="column.dataIndex == 'operation'">
          <a-button
            type="link"
            @click="changeItem(record)"
            :loading="record.changeLoading"
          >
            编辑
          </a-button>
          <a-button type="link" @click="changeDoorModal(record)">
            分配门
          </a-button>
          <a-button type="link" @click="changeFace(record)">人脸录入</a-button>
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
          :rules="editId == 0 ? rules : editRules"
        >
          <a-row :gutter="[48, 8]">
            <a-divider orientation="left">位置信息</a-divider>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="小区" name="villageId">
                <a-select
                  :options="formVillageList"
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
              <a-form-item label="姓名" name="name">
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
                  placeholder="输入6-12位密码"
                  style="width: 150px"
                  :disabled="editId != 0"
                  v-model:value="formState.password"
                ></a-input-password>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="手机号" name="mobile">
                <a-input
                  placeholder="手机号"
                  :disabled="editId != 0"
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
                <a-upload
                  v-model:file-list="fileList"
                  list-type="picture-card"
                  @preview="handlePreview"
                  accept="image/png, image/jpeg,image/jpg"
                  :beforeUpload="beforeUpload"
                  :showUploadList="{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                  }"
                >
                  <div v-if="fileList.length < 1">
                    <plus-outlined />
                    <div style="margin-top: 8px">Upload</div>
                  </div>
                  <a-modal
                    :open="previewVisible"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <a-watermark content="安居慧云">
                      <img
                        alt="example"
                        style="width: 100%"
                        :src="previewImage"
                      />
                    </a-watermark>
                  </a-modal>
                </a-upload>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </Modal>
    <a-modal
      title="分配门"
      :maskClosable="false"
      v-model:open="doorVisible"
      width="70%"
      :confirm-loading="state.loading"
      :bodyStyle="{
        height: '65vh',
      }"
      @ok="doorSubmit"
    >
      <div style="overflow: auto; overflow-x: hidden; height: 100%">
        <a-table
          :data-source="disLandlordTable"
          :columns="disUserColumns"
          :row-selection="{
            selectedRowKeys: state.selectedRowKeys,
            onChange: onSelectChange,
          }"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'doorType'">
              {{ doorTypeName(record.doorType) }}{{ record.doorType }}
            </template>
          </template>
        </a-table>
      </div>
    </a-modal>
    <a-modal
      title="增加人脸头像"
      :maskClosable="false"
      v-model:open="faceVisible"
      :confirm-loading="faceLoading"
      @ok="submitFace"
      @cancel="cancelFace"
      width="70%"
    >
      <a-form
        :model="faceFormState"
        v-bind="{
          labelCol: {
            span: 16,
          },
          wrapperCol: {
            span: 16,
          },
        }"
      >
        <a-row :gutter="[48, 8]">
          <a-col :md="12" :sm="2" :offset="3">
            <a-form-item label="图片(jpg/jpeg)">
              <a-upload
                v-model:file-list="faceFileList"
                list-type="picture-card"
                @preview="handlePreview"
                accept="image/png, image/jpeg,image/jpg"
                :beforeUpload="faceBeforeUpload"
                :showUploadList="{
                  showPreviewIcon: true,
                  showRemoveIcon: true,
                }"
              >
                <div v-if="faceFileList.length < 1">
                  <plus-outlined />
                  <div style="margin-top: 8px">Upload</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-modal :open="previewVisible" :footer="null" @cancel="handleCancel">
            <a-watermark content="安居慧云">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-watermark>
          </a-modal>
          <a-col :md="12" :sm="2" :offset="3">
            <a-form-item label="操作">
              <a-button type="primary" danger @click="delFace">
                删除人脸
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  export default {
    name: 'myHome',
  }
</script>
<script setup>
  import { useInitFrom, useTableInit } from '@/hooks/useTableComponent'
  import {
    getUserHomeList,
    add,
    toAdd,
    del,
    toEdit,
    edit,
    editUserDevice,
    toAddFace,
    uploadFaceSave,
    delUserFace,
    submitDoor,
  } from '@/api/myhome'
  import Modal from '@/components/Modal.vue'
  import { reactive, ref } from 'vue'
  import {
    SearchOutlined,
    UpOutlined,
    DownOutlined,
    PlusOutlined,
  } from '@ant-design/icons-vue'
  import { getDictionary } from '@/api/system'
  const { simpleRequest, clearFormOrPageInput } = useSimpleRequest()
  import {
    getAddressCity,
    getBuilding,
    getDistrict,
    getHouse,
    getStreet,
    getUnit,
  } from '@/api/community'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  import { isIdCard } from '@/utils/validate'
  import { messageContent } from '@/utils/message'
  import { getBase64 } from '@/utils'
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
    requestObj,
    villageList,
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
      type: undefined,
      isAuthenticate: undefined,
      status: undefined,
      isReal: undefined,
      isRegitFace: undefined,
    },
    getTableList: getUserHomeList,
    delTableEle: del,
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
      startTime: undefined,
      endTime: undefined,
    },
    getData,
    requestObj,
    addList: add,
    editList: edit,
  })
  const columns = [
    // {
    //   title: '编号',
    //   dataIndex: 'No',
    // },
    {
      title: '小区名',
      dataIndex: 'villageName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '房屋',
      dataIndex: 'houseName',
    },
    {
      title: '审核状态',
      dataIndex: 'isAuthenticate',
    },
    {
      title: '账号状态',
      dataIndex: 'status',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '来源',
      dataIndex: 'addType',
    },
    {
      title: '审核时间',
      dataIndex: 'NO',
    },
    {
      title: '注册时间',
      dataIndex: 'addTime',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ]
  const authenticateOptions = [
    { value: '', label: '全部' },
    { value: '0', label: '待认证' },
    { value: '1', label: '通过' },
    { value: '2', label: '不通过' },
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
  const RegitFaceOptions = [
    { value: '', label: '全部' },
    { value: '1', label: '已录入' },
    { value: '0', label: '未录入' },
  ]
  const formAuthenticateOptions = [
    { value: '0', label: '失败' },
    { value: '1', label: '通过' },
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
  // const formProvinceList = ref([])
  // const formPoProvinceList = ref([])
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
  const buildingList = ref([])
  const formBuildingList = ref([])
  const unitList = ref([])
  const formUnitList = ref([])
  const houseList = ref([])
  const formHouseList = ref([])
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
  const uvTypeContent = (value) => {
    const uvType = typeOptions.find((item) => item.value == value)
    return uvType.label
  }
  const checkMobile = (value) => {
    const reg = /^1[3-9]\d{9}$/
    const result = reg.test(value)
    return result
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
  const editRules = {
    name: [{ required: true, message: '请输入名称' }],
    villageId: [{ required: true, message: '请选择小区' }],
    buildingId: [{ required: true, message: '请选择楼号' }],
    unitId: [{ required: true, message: '请选择单元' }],
    houseId: [{ required: true, message: '请选择房号' }],
    type: [{ required: true, message: '请选择类型' }],
    timeOptions: [{ required: true, message: '请选择有效期' }],
  }
  const startTimeAndEndTime = ref([])
  const distributeTime = () => {
    formState.startTime = formState.timeOptions[0]
    formState.endTime = formState.timeOptions[1]
  }
  const modalSubmit = () => {
    modalRef.value.showLoading()
    const formData = new FormData()
    for (let formStateKey in formState) {
      if (formState[formStateKey] == undefined) {
        formData.append(formStateKey, '')
      } else {
        formData.append(formStateKey, formState[formStateKey])
      }
    }
    formRef.value.validate().then(async () => {
      await submit(formData)
        .then((res) => {
          formRef.value.resetFields()
          clearFormItem()
          startTimeAndEndTime.value = []
          getData(requestObj)
        })
        .finally(() => {
          modalRef.value.hideLoading()
          modalRef.value.disabledCancelFalse()
        })
    })
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
  const fileList = ref([])
  const faceFileList = ref([])
  const faceFormState = reactive({
    photoSrc: '',
    faceUserId: '',
  })
  const beforeUpload = (file) => {
    formState.photoSrc = file
    return false
  }
  const faceBeforeUpload = (file) => {
    faceFormState.photoSrc = file
    return false
  }
  const dateFormat = 'YYYY-MM-DD'
  // 清除全部表单数据
  const clearFormItem = () => {
    for (let tableObjKey in formState) {
      if (Array.isArray(formState[tableObjKey])) {
        formState[tableObjKey] = []
      } else {
        formState[tableObjKey] = undefined
      }
    }
    fileList.value = []
  }
  const emitModal = () => {
    if (formRef.value) formRef.value.clearValidate()
    modalRef.value.close()
    clearFormItem()
  }
  const changeItem = async (record) => {
    editId.value = record.id
    record.changeLoading = true
    formState.timeOptions = []
    const res = await toEdit({
      id: record.id,
    })
    const resObj = res.result.pd
    for (const resObjKey in resObj) {
      if (resObjKey == 'image') {
        formState[resObjKey] = resObj[resObjKey]
        fileList.value = formState.image
          ? [
              {
                uid: '565656',
                status: 'done',
                url: formState.image,
              },
            ]
          : []
      } else if (resObjKey == 'startTime') {
        formState.timeOptions[0] = resObj[resObjKey]
        console.log(resObj[resObjKey])
      } else if (resObjKey == 'endTime') {
        formState.timeOptions[1] = resObj[resObjKey]
      } else {
        formState[resObjKey] = resObj[resObjKey]
      }
    }
    formVillageList.value = res.result.villageList?.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
    formBuildingList.value = res.result.buildingList?.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
    formHouseList.value = res.result.houseList?.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
    formUnitList.value = res.result.unitList?.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
    // handleChange(res.result.pd)
    record.changeLoading = false
    modalRef.value.open()
    modalRef.value.disabledCancelFalse()
  }
  const previewVisible = ref(false)
  const previewImage = ref('')
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    previewImage.value = file.url || file.preview
    previewVisible.value = true
  }
  const handleCancel = () => {
    previewVisible.value = false
  }
  const doorVisible = ref(false)
  const faceVisible = ref(false)
  const disLandlordTable = ref([])
  const state = reactive({
    selectedRowKeys: [],
    id: '',
    loading: false,
  })
  const onSelectChange = (selectedRowKeys) => {
    state.selectedRowKeys = selectedRowKeys
  }
  const disUserColumns = [
    { dataIndex: 'NO', title: '编号' },
    {
      dataIndex: 'name',
      title: '名称',
    },
    { dataIndex: 'doorType', title: '类型' },
  ]
  const changeDoorModal = async (record) => {
    state.id = record.id
    let { result } = await editUserDevice({
      id: record.id,
    })
    disLandlordTable.value = result.list?.map((item, index) => {
      if (item.isHave == '1') {
        state.selectedRowKeys.push(item.id)
      }
      return {
        NO: index + 1,
        ...item,
        key: item.id,
      }
    })
    doorVisible.value = true
  }
  const doorTypeName = (value) => {
    let doorTypeName = ''
    switch (value) {
      case 1:
        doorTypeName = '云盒'
        break
      case 2:
        doorTypeName = '1403-A'
        break
      case 3:
        doorTypeName = '刷卡一体机'
        break
      case 4:
        doorTypeName = '1403-H'
        break
      case 5:
        doorTypeName = '1403-H-2'
        break
      case 7:
        doorTypeName = '云屏'
        break
      case 8:
        doorTypeName = 'EHome'
        break
      case 9:
        doorTypeName = '保障房狄耐克'
        break
      case 10:
        doorTypeName = '保障房超脑'
        break
      case 13:
        doorTypeName = '保障房海康门口机'
        break
      default:
        doorTypeName = ''
        break
    }
    return doorTypeName
  }
  const changeFace = async (record) => {
    let { result } = await toAddFace({
      id: record.id,
    })
    faceFileList.value = result.pd?.image
      ? [
          {
            uid: result.pd?.id,
            status: 'done',
            url: result.pd?.image,
          },
        ]
      : []

    faceFormState.faceUserId = record.id
    faceVisible.value = true
  }
  const faceLoading = ref(false)
  const submitFace = async () => {
    faceLoading.value = true
    const formData = new FormData()
    for (let formStateKey in faceFormState) {
      if (faceFormState[formStateKey] == undefined) {
        formData.append(formStateKey, '')
      } else {
        formData.append(formStateKey, faceFormState[formStateKey])
      }
    }
    if (formData.get('photoSrc')) {
      await uploadFaceSave(formData)
      messageContent('success', '添加人脸图片成功')
    }

    faceFileList.value = []
    faceVisible.value = false
    faceLoading.value = false
  }
  const delFace = async () => {
    await delUserFace({
      delUserId: faceFormState.faceUserId,
    })
    messageContent('success', '删除人脸成功')
    faceFileList.value = []
    faceVisible.value = false
    faceLoading.value = false
  }
  const cancelFace = () => {
    faceFileList.value = []
    faceVisible.value = false
  }
  const doorSubmit = async () => {
    console.log(state.selectedRowKeys)
    state.loading = true
    await submitDoor({
      ids: state.selectedRowKeys?.toString(),
      id: state.id,
    })
    state.selectedRowKeys = []
    state.loading = false
    doorVisible.value = false
  }
</script>
<style scoped lang="less"></style>
