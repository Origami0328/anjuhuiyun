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
              v-model:value="requestObj.type"
              placeholder="选择类型"
              show-search
              :options="typeList"
              style="width: 150px"
              :filter-option="filterOption"
              @change="changeClickType"
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.clickType"
              show-search
              style="width: 150px"
              placeholder="选择点击类型"
              :options="clickTypeList"
              :filter-option="filterOption"
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.platformSearchType"
              :options="platformSearchTypeList"
              show-search
              placeholder="选择有效平台"
              style="width: 150px"
              :filter-option="filterOption"
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.timeType"
              style="width: 150px"
              show-search
              :options="timeTypeList"
              placeholder="选择有效性"
              :filter-option="filterOption"
            ></a-select>
          </a-col>
          <template v-if="advanced">
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.isShow"
                style="width: 150px"
                show-search
                :options="isShowList"
                placeholder="选择状态"
                :filter-option="filterOption"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.villageId"
                placeholder="请选择小区"
                :options="villageList"
                style="width: 150px"
                show-search
                :filter-option="filterOption"
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                v-model:value="requestObj.isHide"
                placeholder="请选择规则类型"
                style="width: 150px"
                show-search
                :filter-option="filterOption"
                :options="isHideList"
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
      <a-space></a-space>
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
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
      }"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'operation'">
          <a-button
            type="link"
            :loading="record.changeLoading"
            @click="editTableItem(record)"
          >
            编辑
          </a-button>
          <a-button type="link" @click="showConfirm(record)" style="color: red">
            删除
          </a-button>
        </template>
        <template v-else-if="column.dataIndex == 'type'">
          <span v-if="record.type === 0">首页顶部横版banner</span>
          <span v-else-if="record.type === 8">开门成功广告</span>
          <span v-else-if="record.type === 9">启动页</span>
          <span v-else>首页顶部竖版banner</span>
        </template>
        <template v-else-if="column.dataIndex == 'valid'">
          {{ record.startTime }}至{{ record.endTime }}
        </template>
        <template v-else-if="column.dataIndex == 'isShow'">
          <span v-if="record.isShow == '0'">下线</span>
          <span v-else>上线</span>
        </template>
        <template v-else-if="column.dataIndex == 'platform'">
          <span v-if="record.platform === 0">全部</span>
          <span v-else-if="record.platform === 1">安卓</span>
          <span v-else-if="record.platform === 2">ios</span>
          <span v-else-if="record.platform === 3">小程序</span>
          <span v-else>安卓+ios</span>
        </template>
        <template v-else-if="column.dataIndex == 'clickType'">
          {{ clickTypeToName(record) }}
        </template>
      </template>
    </a-table>
    <ComponentModal
      ref="modalRef"
      :title="titleValue"
      width="70%"
      @closeModal="emitModal"
      @handleOk="modalSubmit"
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
                  style="width: 250px"
                ></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="2">
              <a-form-item label="平台" name="platform">
                <a-select
                  v-model:value="formState.platform"
                  :options="formPlatformSearchTypeList"
                  show-search
                  placeholder="选择有效平台"
                  style="width: 250px"
                  :filter-option="filterOption"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="状态" name="isShow">
                <a-select
                  v-model:value="formState.isShow"
                  :options="formIsShowList"
                  show-search
                  placeholder="选择状态"
                  style="width: 250px"
                  :filter-option="filterOption"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="排序" name="sort">
                <a-input
                  type="number"
                  v-model:value="formState.sort"
                  style="width: 250px"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="有效期" name="timeArray">
                <a-range-picker
                  v-model:value="formState.timeArray"
                  style="width: 350px"
                  show-time
                  valueFormat="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                />
              </a-form-item>
            </a-col>
            <a-divider orientation="left">广告信息</a-divider>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="广告位" name="type">
                <a-select
                  v-model:value="formState.type"
                  placeholder="选择广告位"
                  show-search
                  :options="formTypeList"
                  style="width: 250px"
                  :filter-option="filterOption"
                  @change="formChangeClickType"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2">
              <a-form-item label="广告类型" name="clickType">
                <a-select
                  v-model:value="formState.clickType"
                  show-search
                  style="width: 250px"
                  placeholder="选择广告类型"
                  :options="formClickTypeList"
                  :filter-option="filterOption"
                ></a-select>
              </a-form-item>
            </a-col>

            <a-col
              :md="6"
              :sm="2"
              v-if="
                (formState.type == 0 || formState.type == 13) &&
                (formState.clickType == 0 || formState.clickType == 1)
              "
            >
              <a-form-item label="点击地址" name="clickUrl">
                <a-input
                  v-model:value="formState.clickUrl"
                  placeholder="  请输入点击地址  "
                  style="width: 250px"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col
              :md="6"
              :sm="2"
              v-if="
                (formState.type == 0 || formState.type == 13) &&
                formState.clickType == 3
              "
            >
              <a-form-item label="小程序ID" name="xcxId">
                <a-input
                  style="width: 250px"
                  v-model:value="formState.xcxId"
                  placeholder="输入小程序ID"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col
              :md="6"
              :sm="2"
              :offset="3"
              v-if="
                (formState.type == 0 || formState.type == 13) &&
                formState.clickType == 3
              "
            >
              <a-form-item label="小程序跳转链接" name="xcxLink">
                <a-input
                  style="width: 250px"
                  v-model:value="formState.xcxLink"
                  placeholder="输入小程序跳转链接"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col
              :md="6"
              :sm="2"
              v-if="formState.clickType == 8 && formState.type == 8"
            >
              <a-form-item label="展示模式" name="showType">
                <a-select
                  v-model:value="formState.showType"
                  :options="formShowTypeList"
                  placeholder="展示模式"
                  style="width: 250px"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col
              :md="6"
              :sm="2"
              :offset="3"
              v-if="formState.clickType == 8 && formState.type == 8"
            >
              <a-form-item label="显示规则" name="showRule">
                <a-input
                  v-model:value="formState.showRule"
                  :placeholder="
                    formState.showType == '1'
                      ? '输入一个0-100的整数'
                      : '输入定额显示比例'
                  "
                  style="width: 250px"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col
              :md="6"
              :sm="2"
              :offset="
                (formState.type == 0 || formState.type == 13) &&
                (formState.clickType == 0 || formState.clickType == 1)
                  ? 3
                  : 0
              "
              v-if="
                ((formState.type == 0 || formState.type == 13) &&
                  (formState.clickType == 10 ||
                    formState.clickType == 0 ||
                    formState.clickType == 1 ||
                    formState.clickType == 3)) ||
                (formState.type == 8 && formState.clickType == 7) ||
                (formState.type == 9 && formState.clickType == 10)
              "
            >
              <a-form-item label="图片" name="fileList">
                <div style="display: flex">
                  <a-upload
                    accept="image/png, image/jpeg,image/jpg"
                    list-type="picture-card"
                    :maxCount="1"
                    @preview="handlePreview"
                    :show-upload-list="{
                      showPreviewIcon: true,
                    }"
                    :beforeUpload="beforeUpload"
                    v-model:file-list="formState.fileList"
                  >
                    <PlusOutlined
                      style="font-size: 22px"
                      v-if="formState.fileList.length < 1"
                    />
                  </a-upload>
                </div>
                <a-modal
                  :open="previewVisible"
                  title="图片"
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
              </a-form-item>
            </a-col>
            <a-divider orientation="left">位置信息</a-divider>
            <a-col :md="6" :sm="2" :offset="3">
              <a-form-item label="类型" name="codeType">
                <a-select
                  v-model:value="formState.codeType"
                  :options="formCodeTypeList"
                  show-search
                  :disabled="editId != 0"
                  placeholder="选择类型"
                  style="width: 250px"
                  :filter-option="filterOption"
                  @change="clearPoToCity"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col
              :md="6"
              :sm="2"
              v-if="
                formState.codeType && !['0', '5'].includes(formState.codeType)
              "
            >
              <a-form-item label="省份" name="provinceCode">
                <a-select
                  v-model:value="formState.provinceCode"
                  :options="formProvinceList"
                  show-search
                  placeholder="选择省份"
                  :disabled="editId != 0"
                  style="width: 250px"
                  :filter-option="filterOption"
                  @change="createCityList"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col
              :md="6"
              :sm="2"
              v-if="
                formState.codeType == 2 ||
                formState.codeType == 3 ||
                formState.codeType == 4
              "
            >
              <a-form-item label="市" name="cityCode">
                <a-select
                  v-model:value="formState.cityCode"
                  :options="formCityList"
                  show-search
                  :disabled="editId != 0"
                  placeholder="选择市"
                  style="width: 250px"
                  :filter-option="filterOption"
                  @change="createAreaList"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col
              :md="6"
              :sm="2"
              :offset="
                formState.codeType == 3 || formState.codeType == 4 ? 3 : 0
              "
              v-if="formState.codeType == 3 || formState.codeType == 4"
            >
              <a-form-item label="区/县" name="areaCode">
                <a-select
                  v-model:value="formState.areaCode"
                  :options="formAreaList"
                  show-search
                  placeholder="选择区/县"
                  style="width: 250px"
                  :disabled="editId != 0"
                  :filter-option="filterOption"
                  @change="createStreet"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="2" v-if="formState.codeType == 4">
              <a-form-item label="街道" name="streetCode">
                <a-select
                  v-model:value="formState.streetCode"
                  :options="formStreetList"
                  show-search
                  :disabled="editId != 0"
                  placeholder="选择街道"
                  style="width: 250px"
                  :filter-option="filterOption"
                ></a-select>
              </a-form-item>
            </a-col>
            <!--            <a-col :md="6" :sm="2" :offset="formState.codeType == 2 ? 3 : 0">-->
            <!--              <a-form-item-->
            <!--                :label="formState.codeType == 5 ? '生效小区' : '屏蔽小区'"-->
            <!--                name="villageTable"-->
            <!--              >-->
            <!--                <div style="display: flex; width: 500px">-->
            <!--                  <a-select-->
            <!--                    v-model:value="formState.villageTable"-->
            <!--                    :options="formVillageList"-->
            <!--                    show-search-->
            <!--                    :disabled="villageDisabled"-->
            <!--                    :placeholder="-->
            <!--                      formState.codeType != '5' ? '选择屏蔽对象' : '选择小区'-->
            <!--                    "-->
            <!--                    style="width: 200px"-->
            <!--                    :filter-option="filterOption"-->
            <!--                  ></a-select>-->
            <!--                  <a-button type="primary" @click="addVillage">添加</a-button>-->
            <!--                </div>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <a-col :md="24">
              <h3 style="text-align: center">
                {{ formState.codeType != '5' ? '屏蔽小区表' : '生效小区表' }}
              </h3>
              <a-table :data-source="villageTable">
                <a-table-column key="name" title="小区名" data-index="name" />
                <a-table-column key="operation" data-index="operation">
                  <template #title>
                    <a-button type="link" @click="showTransfer">编辑</a-button>
                  </template>
                </a-table-column>
              </a-table>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </ComponentModal>
    <a-modal
      v-model:open="transferVisible"
      title="选择小区"
      width="800px"
      :mask-closable="false"
      @ok="transferSubmit"
      @cancel="closeTransfer"
    >
      <div class="transfer">
        <a-transfer
          v-model:target-keys="targetKeys"
          :data-source="transferData"
          show-search
          pagination
          :operationStyle="{ height: '200px', marginTop: '50px' }"
          :filter-option="filterOption"
          :render="(item) => item.title"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
  export default {
    name: 'Information',
  }
</script>
<script setup>
  import {
    UpOutlined,
    SearchOutlined,
    DownOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons-vue'
  import {
    getVillage,
    getAdByPage,
    deleteAd,
    getAdInfo,
    getProvince,
    getCity,
    getDistrict,
    getStreet,
    addAd,
    editAd,
  } from '@/api/operationInfo'
  import ComponentModal from '@/components/Modal.vue'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  import { Modal } from 'ant-design-vue'
  const { simpleRequest } = useSimpleRequest()
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import { createVNode, nextTick, reactive, ref } from 'vue'
  import { messageContent } from '@/utils/message'
  import { getBase64 } from '@/utils'
  const columns = [
    {
      title: '序号',
      dataIndex: 'No',
      width: 60,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '广告位',
      dataIndex: 'type',
    },
    {
      title: '广告类型',
      dataIndex: 'clickType',
    },
    {
      title: '投放平台',
      dataIndex: 'platform',
    },
    {
      title: '有效期',
      dataIndex: 'valid',
    },

    {
      title: '状态',
      dataIndex: 'isShow',
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '添加时间',
      dataIndex: 'addTime',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 200,
    },
  ]

  const {
    requestObj,
    searchTableItem,
    resetTableObj,
    getData,
    state,
    onSelectChange,
    dataSource,
    paginationInfo,
    tableLoading,
    handleTableChange,
  } = useTableInit({
    tableObj: {
      searchName: undefined,
      type: undefined,
      clickType: undefined,
      platformSearchType: undefined,
      timeType: undefined,
      isShow: undefined,
      villageId: undefined,
      isHide: undefined,
      pageNo: '1',
      pageSize: '10',
    },
    getTableList: getAdByPage,
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
      fileList: [],
      name: '',
      timeArray: [],
      platform: '0',
      type: undefined,
      clickType: undefined,
      image: undefined,
      isShow: undefined,
      codeType: undefined,
      cityCode: undefined,
      streetCode: undefined,
      showType: undefined,
      showRule: undefined,
      sort: undefined,
      villageIds: [],
      villageTable: undefined,
      areaCode: undefined,
      provinceCode: undefined,
      xcxId: '',
      xcxLink: '',
      clickUrl: undefined,
    },
    getData,
    requestObj,
    addList: addAd,
    editList: editAd,
  })
  const filterOption = (inputValue, option) => {
    return option.label.indexOf(inputValue) > -1
  }
  const villageTable = ref([])
  // const villageDisabled = ref(true)
  // const villageColumns = [
  //   {
  //     title: '小区名',
  //     dataIndex: 'name',
  //   },
  //   {
  //     title: '',
  //     dataIndex: 'operation',
  //   },
  // ]
  const rule = {
    name: [{ required: true, message: '请输入名称' }],
    platform: [{ required: true, message: '请选择平台' }],
    isShow: [{ required: true, message: '请选择状态' }],
    codeType: [{ required: true, message: '请选择类型' }],
    type: [{ required: true, message: '请选择广告位' }],
    sort: [{ required: true, message: '请输入排序值' }],
    clickType: [{ required: true, message: '请选择广告类型' }],
    timeArray: [{ required: true, message: '请选择有效期' }],
    fileList: [{ required: true, message: '请选择上传图片' }],
    clickUrl: [{ required: true, message: '请输入点击地址' }],
    xcxId: [{ required: true, message: '请输入小程序Id' }],
    xcxLink: [{ required: true, message: '请输入小程序跳转链接' }],
    showRule: [{ required: true, message: '请输入显示规则' }],
    showType: [{ required: true, message: '请输入展示模式' }],
    provinceCode: [{ required: true, message: '请选择省份' }],
    areaCode: [{ required: true, message: '请选择区县' }],
    cityCode: [{ required: true, message: '请选择城市' }],
    streetCode: [{ required: true, message: '请选择街道' }],
  }
  let rules = reactive(rule)
  const typeList = ref([
    {
      value: '',
      label: '全部',
    },
    {
      value: '0',
      label: '首页顶部横版banner',
    },
    {
      value: '8',
      label: '开门成功广告',
    },
    {
      value: '9',
      label: '启动页',
    },
    {
      value: '13',
      label: '首页顶部竖版banner',
    },
  ])
  const formTypeList = ref([
    {
      value: '0',
      label: '首页顶部横版banner',
    },
    {
      value: '8',
      label: '开门成功广告',
    },
    {
      value: '9',
      label: '启动页',
    },
    {
      value: '13',
      label: '首页顶部竖版banner',
    },
  ])
  const clickTypeList = ref([])
  const formClickTypeList = ref([])
  const platformSearchTypeList = ref([
    {
      value: '',
      label: '全部',
    },
    {
      value: '1',
      label: '安卓',
    },
    {
      value: '2',
      label: 'ios',
    },
    {
      value: '3',
      label: '小程序',
    },
    {
      value: '12',
      label: '安卓+ios',
    },
  ])
  const formPlatformSearchTypeList = ref([
    {
      value: '0',
      label: '全部',
    },
    {
      value: '1',
      label: '安卓',
    },
    {
      value: '2',
      label: 'ios',
    },
    {
      value: '3',
      label: '小程序',
    },
    {
      value: '12',
      label: '安卓+ios',
    },
  ])
  const timeTypeList = ref([
    {
      value: '',
      label: '全部',
    },
    {
      value: '1',
      label: '当前有效',
    },
    {
      value: '2',
      label: '已过期',
    },
    {
      value: '3',
      label: '未到生效时间',
    },
  ])
  const isShowList = ref([
    {
      value: '',
      label: '全部',
    },
    {
      value: '1',
      label: '上线',
    },
    {
      value: '0',
      label: '下线',
    },
  ])
  const formCodeTypeList = ref([
    {
      value: '0',
      label: '全部',
    },
    {
      value: '1',
      label: '省',
    },
    {
      value: '2',
      label: '市',
    },
    {
      value: '3',
      label: '区/县',
    },
    {
      value: '4',
      label: '街道',
    },
    {
      value: '5',
      label: '小区',
    },
  ])
  const formIsShowList = ref([
    {
      value: 1,
      label: '上线',
    },
    {
      value: 0,
      label: '下线',
    },
  ])
  const formShowTypeList = ref([
    { value: '1', label: '随机展示' },
    { value: '2', label: '定额展示（规定一个基数，在这个基数内展示几次广告）' },
  ])
  const villageList = ref([])
  const formVillageList = ref([])
  const isHideList = ref([
    {
      value: '',
      label: '全部',
    },
    {
      value: '1',
      label: '屏蔽',
    },
    {
      value: '2',
      label: '展示',
    },
  ])
  const formProvinceList = ref([])
  const formCityList = ref([])
  const formAreaList = ref([])
  const formStreetList = ref([])
  const advanced = ref(false)
  const toggleAdvanced = () => {
    advanced.value = !advanced.value
  }
  simpleRequest({
    requestFun: getVillage,
    requestObj: {},
    isForm: true,
    isComplete: true,
    tableList: villageList,
    formList: formVillageList,
    labelString: 'name',
    valueString: 'id',
  })

  simpleRequest({
    requestObj: {},
    requestFun: getProvince,
    isForm: true,
    formList: formProvinceList,
    labelString: 'name',
    valueString: 'province_code',
  })
  const changeClickType = (value) => {
    requestObj.clickType = undefined
    if (value != '') {
      if (value == '8') {
        clickTypeList.value = [
          {
            value: '',
            label: '全部',
          },
          {
            value: '7',
            label: '图片广告，不可点击',
          },
          {
            value: '8',
            label: '广告sdk广告',
          },
          {
            value: '99',
            label: '无广告(定时屏蔽广告用)',
          },
        ]
      } else if (value == '9') {
        clickTypeList.value = [
          {
            value: '',
            label: '全部',
          },
          {
            value: '10',
            label: '图片广告，不可点击',
          },
          {
            value: '11',
            label: '广告sdk广告',
          },
          {
            value: '99',
            label: '无广告(定时屏蔽广告用)',
          },
        ]
      } else if (value == '0' || value == '13') {
        clickTypeList.value = [
          {
            value: '',
            label: '全部',
          },
          {
            value: '0',
            label: '图片广告,点击跳转H5页面',
          },
          {
            value: '1',
            label: '图片广告,点击跳转外部url',
          },
          {
            value: '3',
            label: '图片广告,点击跳转小程序',
          },
          {
            value: '5',
            label: '广告sdk广告',
          },
          {
            value: '10',
            label: '图片广告，不可点击',
          },
          {
            value: '99',
            label: '屏蔽当前有效的sdk广告(定时屏蔽广告用)',
          },
        ]
      }
    } else {
      clickTypeList.value = [
        {
          value: '',
          label: '全部',
        },
      ]
    }
  }
  const formChangeClickType = (value) => {
    formState.clickType = undefined
    if (value != '') {
      if (value == '8') {
        formClickTypeList.value = [
          {
            value: '7',
            label: '图片广告，不可点击',
          },
          {
            value: '8',
            label: '广告sdk广告',
          },
          {
            value: '99',
            label: '无广告(定时屏蔽广告用)',
          },
        ]
      } else if (value == '9') {
        formClickTypeList.value = [
          {
            value: '10',
            label: '图片广告，不可点击',
          },
          {
            value: '11',
            label: '广告sdk广告',
          },
          {
            value: '99',
            label: '无广告(定时屏蔽广告用)',
          },
        ]
      } else if (value == '0' || value == '13') {
        formClickTypeList.value = [
          {
            value: '0',
            label: '图片广告,点击跳转H5页面',
          },
          {
            value: '1',
            label: '图片广告,点击跳转外部url',
          },
          {
            value: '3',
            label: '图片广告,点击跳转小程序',
          },
          {
            value: '5',
            label: '广告sdk广告',
          },
          {
            value: '10',
            label: '图片广告，不可点击',
          },
          {
            value: '99',
            label: '屏蔽当前有效的sdk广告(定时屏蔽广告用)',
          },
        ]
      }
    }
  }
  const resetSearchObj = () => {
    if (typeof resetTableObj == 'function') {
      resetTableObj()
    }
    paginationInfo.current = 1
    getData(requestObj)
  }
  const clickTypeToName = (record) => {
    let name
    if (record.type == 8) {
      if (record.clickType == 7) {
        name = '图片广告，不能点击'
      } else if (record.clickType == 8) {
        name = '广告sdk广告'
      } else if (record.clickType == 99) {
        name = '无广告(定时屏蔽广告用)'
      }
    } else if (record.type == 9) {
      if (record.clickType == 10) {
        name = '图片广告，不能点击'
      } else if (record.clickType == 11) {
        name = '广告sdk广告'
      } else if (record.clickType == 99) {
        name = '无广告(定时屏蔽广告用)'
      }
    } else if (record.type == 13 || record.type == 0) {
      if (record.clickType == 10) {
        name = '图片广告，不能点击'
      } else if (record.clickType == 5) {
        name = '广告sdk广告'
      } else if (record.clickType == 99) {
        name = '屏蔽当前有效的sdk广告(定时屏蔽广告用)'
      } else if (record.clickType == 0) {
        name = '图片广告，点击跳转H5页面'
      } else if (record.clickType == 1) {
        name = '图片广告，点击跳转外部url'
      } else if (record.clickType == 3) {
        name = '图片广告，点击跳转小程序'
      }
    }

    return name
  }
  const addTableItem = () => {
    editId.value = 0
    villageTable.value = []
    handleCreate()
    nextTick(() => {
      let modalScroll = document.getElementById('modalScroll')
      if (modalScroll) {
        modalScroll.scrollTop = 0
      }
    })
  }
  const showConfirm = (record) => {
    console.log(record)
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
        deleteAd({
          adId: record.id,
        }).then(() => {
          messageContent('success', '删除表格项成功')
          getData(requestObj)
        })
      },

      onCancel() {},
      class: 'test',
    })
  }
  const adItemId = ref()
  const editTableItem = async (record) => {
    record.changeLoading = true
    // villageDisabled.value = false
    editId.value = record.id
    adItemId.value = record.id
    villageTable.value = []
    await getAdInfo({ adId: record.id })
      .then(async (res) => {
        const res1 = res
        Promise.allSettled([
          createCityList(res.result.provinceCode || '0'),
          createStreet(res.result.areaCode || '000000'),
          createAreaList(res.result.cityCode || '0'),
        ]).then(() => {
          formState.timeArray = [res1.result.startTime, res1.result.endTime]
          formState.name = res1.result.name
          formState.type = res1.result.type.toString()
          formChangeClickType(formState.type)
          // changeRules(formState.type, '', rules)
          formState.clickType = res1.result.clickType.toString()
          formState.xcxId = res1.result.xcxId
          formState.xcxLink = res1.result.xcxLink
          formState.platform = res1.result.platform.toString()
          formState.fileList = res1.result.imageUrl
            ? [
                {
                  uid: res1.result.id,
                  status: 'done',
                  url: res1.result.imageUrl,
                },
              ]
            : []
          formState.clickUrl = res1.result.clickUrl
          formState.provinceCode = res1.result.provinceCode || undefined
          formState.areaCode = Number(res1.result.areaCode) || undefined
          formState.cityCode = Number(res1.result.cityCode) || undefined
          formState.streetCode = Number(res1.result.streetCode) || undefined
          formState.codeType = res1.result.codeType
          formState.isShow = Number(res1.result.isShow)
          formState.sort = res1.result.sort
          formState.showRule = res1.result.showRule
          formState.showType = res1.result.showType
          villageTable.value = res1.result.villageList?.map((item) => {
            return {
              id: item.villageId,
              name: item.villageName,
            }
          })
          record.changeLoading = false
        })
      })
      .finally(() => {
        record.changeLoading = false
      })
    modalRef.value.open()
    nextTick(() => {
      console.log('2222')
      let modalScroll = document.getElementById('modalScroll')
      if (modalScroll) {
        modalScroll.scrollTop = 0
      }
    })
  }
  const clearPoToCity = (value) => {
    // villageDisabled.value = false
    if (value == 1) {
      formState.streetCode = undefined
      formState.areaCode = undefined
      formState.cityCode = undefined
    } else if (value == 2) {
      formState.streetCode = undefined
      formState.areaCode = undefined
    } else if (value == 3) {
      formState.streetCode = undefined
    } else if (value == 0) {
      formState.streetCode = undefined
      formState.areaCode = undefined
      formState.cityCode = undefined
      formState.provinceCode = undefined
    }
  }
  const createCityList = (value) => {
    formState.cityCode = undefined
    formState.streetCode = undefined
    formState.areaCode = undefined
    getCity({
      provinceCode: value,
    }).then((res) => {
      formCityList.value = res.result.map((item) => {
        return {
          ...item,
          value: item.city_code,
          label: item.name,
        }
      })
    })
  }
  const createAreaList = (value) => {
    formState.streetCode = undefined
    formState.areaCode = undefined
    getDistrict({
      cityCode: value,
    }).then((res) => {
      formAreaList.value = res.result.map((item) => {
        return {
          ...item,
          value: item.area_code,
          label: item.name,
        }
      })
    })
  }
  const createStreet = (value) => {
    formState.streetCode = undefined
    getStreet({
      areaCode: value,
    }).then((res) => {
      formStreetList.value = res.result.map((item) => {
        return {
          ...item,
          value: item.street_code,
          label: item.name,
        }
      })
    })
  }
  const beforeUpload = (file) => {
    // formState.fileList=[44]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const fileResult = reader.result
      formState.image = fileResult
    }
    return false
  }
  const emitModal = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
      formRef.value.resetFields()
    }
    modalRef.value.close()
    // clearRules(rules)
  }
  const modalSubmit = () => {
    const submitObj = {
      name: formState.name,
      platform: formState.platform,
      type: Number(formState.type),
      clickType: Number(formState.clickType),
      isShow: Number(formState.isShow),
      startTime: formState.timeArray[0],
      endTime: formState.timeArray[1],
      codeType: formState.codeType,
      villageIds: villageTable.value.map((item) => item.id),
      xcxId: formState.xcxId,
      xcxLink: formState.xcxLink,
      provinceCode: formState.provinceCode,
      cityCode: formState.cityCode,
      streetCode: formState.streetCode,
      areaCode: formState.areaCode,
      showType: formState.showType,
      showRule: formState.showRule,
      sort: formState.sort,
      image: formState.image,
      clickUrl: formState.clickUrl,
    }
    const { type, clickType, codeType } = formState
    if (codeType == 5 && villageTable.value.length == 0) {
      messageContent('error', '请选择小区')
      return
    }
    if (
      (type == 8 && clickType == 7) ||
      (type == 9 && clickType == 10) ||
      ((type == 13 || type == 0) &&
        (clickType == 0 || clickType == 1 || clickType == 3 || clickType == 10))
    ) {
      if (submitObj.image == '') {
        messageContent('error', '请选择图片')
        return
      }
    }
    if (editId.value == 0) {
      submit(submitObj)
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          modalRef.value.disabledCancelFalse()
        })
      // emitModal()
    } else {
      submitObj.adId = adItemId.value
      submit(submitObj).finally(() => {
        modalRef.value.disabledCancelFalse()
      })
    }
  }

  const transferVisible = ref(false)
  const showTransfer = () => {
    transferVisible.value = true
    openTransfer()
  }
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
    targetKeys.value = villageTable.value.map((item) => item.id)
  }
  const closeTransfer = () => {
    targetKeys.value = []
    transferVisible.value = false
  }
  const transferSubmit = () => {
    villageTable.value = targetKeys.value.map((item) => {
      const ele = villageList.value.filter((itemV) => itemV.value === item)
      return { name: ele[0].name, id: item }
    })

    transferVisible.value = false

    targetKeys.value = []
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
