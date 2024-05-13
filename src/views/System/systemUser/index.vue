<template>
  <div class="systemUser">
    <div>
      <a-space direction="vertical">
        <a-row :gutter="[48, 16]">
          <a-col class="gutter-row" :md="4" :sm="2">
            <a-input
              v-model:value="requestObj.searchName"
              style="width: 180px"
              placeholder="这里输入关键词"
            >
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
          </a-col>
          <a-col class="gutter-row" :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.villageId"
              show-search
              style="width: 180px"
              placeholder="选择小区"
              :options="villageList"
              :filter-option="filterOption"
              :not-found-content="null"
              @change="createBuildingList"
            ></a-select>
          </a-col>
          <a-col class="gutter-row" :md="4" :sm="2">
            <a-select
              placeholder="请选择楼栋"
              style="width: 180px"
              show-search
              :filter-option="filterOption"
              v-model:value="requestObj.buildingId"
              :options="buildingList"
            ></a-select>
          </a-col>
          <a-col class="gutter-row" :md="4" :sm="2">
            <a-select
              placeholder="请选择分组"
              style="width: 180px"
              show-search
              :filter-option="filterOption"
              v-model:value="requestObj.roleGroupId"
              :options="roleGroupList"
              @change="createRole"
            ></a-select>
          </a-col>
          <a-col :md="4" :sm="2">
            <a-select
              placeholder="请选择职位"
              style="width: 180px"
              show-search
              :filter-option="filterOption"
              v-model:value="requestObj.roleId"
              :options="roleList"
            ></a-select>
          </a-col>

          <template v-if="advanced">
            <a-col class="gutter-row" :md="4" :sm="2">
              <a-select
                placeholder="请选择省厅"
                style="width: 180px"
                v-model:value="requestObj.poProvinceCode"
                show-search
                :options="poProvinceList"
                :not-found-content="null"
                :filter-option="filterOption"
                @change="
                  (value, options) => cityToStreet(value, options, 'city')
                "
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                placeholder="请选择市局"
                style="width: 180px"
                v-model:value="requestObj.poCityCode"
                show-search
                :options="poCityList"
                :not-found-content="null"
                :filter-option="filterOption"
                @change="
                  (value, options) => cityToStreet(value, options, 'district')
                "
              ></a-select>
            </a-col>
            <a-col class="gutter-row" :md="4" :sm="2">
              <a-select
                placeholder="请选择分局"
                style="width: 180px"
                v-model:value="requestObj.poDistrictCode"
                show-search
                :options="poDistrictList"
                :not-found-content="null"
                :filter-option="filterOption"
                @change="
                  (value, options) => cityToStreet(value, options, 'street')
                "
              ></a-select>
            </a-col>
            <a-col :md="4" :sm="2">
              <a-select
                placeholder="请选择派出所"
                style="width: 180px"
                v-model:value="requestObj.poStreetCode"
                show-search
                :options="poStreetList"
                :not-found-content="null"
                :filter-option="filterOption"
              ></a-select>
            </a-col>

            <!--            <a-col :md="4" :sm="2">-->
            <!--              <a-select-->
            <!--                v-model:value="requestObj.provieceCode"-->
            <!--                placeholder="选择省份"-->
            <!--                show-search-->
            <!--                :options="provieceList"-->
            <!--                style="width: 180px"-->
            <!--                :filter-option="filterOption"-->
            <!--                @change="-->
            <!--                  (value, options) => cityToStreet(value, options, 'city')-->
            <!--                "-->
            <!--              ></a-select>-->
            <!--            </a-col>-->
            <!--            <a-col :md="4" :sm="2">-->
            <!--              <a-select-->
            <!--                v-model:value="requestObj.cityCode"-->
            <!--                show-search-->
            <!--                style="width: 180px"-->
            <!--                placeholder="选择城市"-->
            <!--                :options="cityList"-->
            <!--                :not-found-content="null"-->
            <!--                :filter-option="filterOption"-->
            <!--                @change="-->
            <!--                  (value, options) => cityToStreet(value, options, 'district')-->
            <!--                "-->
            <!--              ></a-select>-->
            <!--            </a-col>-->

            <!--            <a-col :md="4" :sm="2">-->
            <!--              <a-select-->
            <!--                v-model:value="requestObj.districtCode"-->
            <!--                show-search-->
            <!--                placeholder="选择区县"-->
            <!--                :options="districtList"-->
            <!--                style="width: 180px"-->
            <!--                :filter-option="filterOption"-->
            <!--                @change="-->
            <!--                  (value, options) => cityToStreet(value, options, 'street')-->
            <!--                "-->
            <!--              ></a-select>-->
            <!--            </a-col>-->
            <!--            <a-col :md="4" :sm="2">-->
            <!--              <a-select-->
            <!--                v-model:value="requestObj.streetCode"-->
            <!--                show-search-->
            <!--                style="width: 180px"-->
            <!--                placeholder="选择街道"-->
            <!--                :options="streetList"-->
            <!--                :filter-option="filterOption"-->
            <!--                :not-found-content="null"-->
            <!--              ></a-select>-->
            <!--            </a-col>-->
            <a-col :md="4" :sm="2">
              <a-select
                placeholder="请选择审核状态"
                v-model:value="requestObj.isAuth"
                :options="authList"
                style="width: 180px"
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
                  @click="resetTableObj"
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
                <!--                <a-button type="link">展开</a-button>-->
                <!--                &lt;!&ndash;            <DownOutlined />&ndash;&gt;-->
                <!--                <UpOutlined style="margin-left: -5px" />-->
              </div>
            </div>
          </a-col>
        </a-row>
        <a-space>
          <a-button class="button add" @click="openAdd" type="primary">
            新增
          </a-button>
        </a-space>
      </a-space>
      <a-table
        :row-selection="{
          selectedRowKeys: state.selectedRowKeys,
          onChange: onSelectChange,
          getCheckboxProps: getCheckboxProps,
        }"
        :columns="columns"
        bordered
        :data-source="dataSource"
        :loading="tableLoading"
        style="width: 100%"
        :pagination="paginationInfo"
        @resizeColumn="handleResizeColumn"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex == 'operation'">
            <span>
              <a-button
                type="link"
                @click="changeTableItem(record)"
                :loading="record.changeLoading"
              >
                编辑
              </a-button>

              <a-popconfirm
                title="确定删除该表格项吗?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="delTableItem(record)"
              >
                <a-button type="link" style="color: red">删除</a-button>
              </a-popconfirm>
            </span>
          </template>
          <template v-else-if="column.dataIndex == 'isAuth'">
            <span v-if="record.isAuth == '0'">待审核</span>
            <span v-else-if="record.isAuth == '1'">审核通过</span>
            <span v-else-if="record.isAuth == '2'">审核未通过</span>
            <span v-else-if="record.isAuth == '3'">账号异常</span>
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
      <Modal
        ref="modalRef"
        :title="titleValue"
        @handleOk="submit"
        width="70%"
        @closeModal="close"
      >
        <div
          style="height: 100%; overflow: auto; overflow-x: hidden"
          id="modalScroll"
        >
          <a-form
            layout="inline"
            :model="formState"
            ref="formRef"
            v-bind="formItemLayout"
            :rules="editId == '0' ? rules : rulesEdit"
          >
            <a-row :gutter="[48, 16]">
              <a-divider orientation="left">基本信息</a-divider>
              <a-col class="gutter-row" :md="6" :sm="2" :offset="3">
                <a-form-item label="用户名" name="username">
                  <a-input
                    placeholder="这里输入用户名"
                    style="width: 200px"
                    v-model:value="formState.username"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :md="6" :sm="2">
                <a-form-item
                  :label="editId != 0 ? '重置密码' : '密码'"
                  name="password"
                >
                  <a-input-password
                    placeholder="输入6-12位密码"
                    v-model:value="formState.password"
                    style="width: 200px"
                  ></a-input-password>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="2">
                <a-form-item label="审核状态" name="isAuth">
                  <a-select
                    placeholder="请选择审核状态"
                    :options="editId != 0 ? statusOptions : addStatusOptions"
                    style="width: 200px"
                    v-model:value="formState.isAuth"
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="2" :offset="3">
                <a-form-item label="备注">
                  <a-input
                    placeholder="这里输入备注"
                    style="width: 200px"
                    v-model:value="formState.remarks"
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :md="6" :sm="2" v-if="editId != 0">
                <a-form-item label="添加时间" name="time">
                  <a-input
                    v-model:value="formState.addTime"
                    style="width: 200px"
                    :disabled="true"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="2" v-if="editId != 0">
                <a-form-item label="审核人员" name="user">
                  <a-input
                    v-model:value="formState.addUser"
                    style="width: 200px"
                    :disabled="true"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col
                class="gutter-row"
                :md="6"
                :sm="2"
                :offset="editId != 0 ? 3 : 0"
              >
                <a-form-item label="有效期" name="startTime">
                  <a-range-picker
                    v-model:value="startTimeAndEndTime"
                    :value-format="dateFormat"
                    :format="dateFormat"
                    show-time
                    style="width: 250px"
                    @change="distributeTime"
                  />
                </a-form-item>
              </a-col>
              <!--              <a-col :md="6" :sm="2" :offset="3">-->
              <!--                <a-form-item label="统计弹框类型" v-if="editId != 0">-->
              <!--                  <a-select-->
              <!--                    placeholder="请选择统计弹框类型"-->
              <!--                    :options="showStatisOptions"-->
              <!--                    style="width: 200px"-->
              <!--                    v-model:value="formState.isShowStatis"-->
              <!--                  ></a-select>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <!--            </a-row>-->
              <a-divider orientation="left">实名信息</a-divider>

              <!--            <a-row :gutter="[48, 16]">-->
              <a-col class="gutter-row" :md="6" :sm="2" :offset="3">
                <a-form-item
                  label="真实姓名"
                  name="realName"
                  style="margin-bottom: 10px"
                >
                  <a-input
                    placeholder="这里输入姓名"
                    v-model:value="formState.realName"
                    style="width: 200px"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :md="6" :sm="2">
                <a-form-item label="手机号" name="phone">
                  <a-input
                    placeholder="这里输入手机号"
                    style="width: 200px"
                    v-model:value="formState.phone"
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col class="gutter-row" :md="6" :sm="2">
                <a-form-item label="身份证号">
                  <a-input
                    placeholder="这里输入身份证号"
                    v-model:value="formState.identity"
                    style="width: 200px"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :md="6" :offset="3" :sm="2">
                <a-form-item label="身份证人像面">
                  <a-upload
                    v-model:file-list="fileListP"
                    list-type="picture-card"
                    @preview="handlePreview"
                    accept="image/png, image/jpeg,image/jpg"
                    :customRequest="customRequest"
                    :beforeUpload="beforeUploadP"
                    :showUploadList="{
                      showPreviewIcon: true,
                      showRemoveIcon: true,
                    }"
                  >
                    <div v-if="fileListP.length < 1">
                      <plus-outlined />
                      <div style="margin-top: 8px">Upload</div>
                    </div>
                  </a-upload>
                  <!--                  <div style="display: flex" v-if="editId != 0">-->
                  <!--                    <div-->
                  <!--                      v-if="formState.identityPUrl != ''"-->
                  <!--                      style="position: relative"-->
                  <!--                    >-->
                  <!--                      <img-->
                  <!--                        :src="formState.identityPUrl"-->
                  <!--                        @click="imgPreview('2')"-->
                  <!--                        style="width: 100px; height: 100px; cursor: pointer"-->
                  <!--                      />-->
                  <!--                      <div class="imageDel" @click="delItemImage(2)">-->
                  <!--                        <DeleteOutlined />-->
                  <!--                      </div>-->
                  <!--                    </div>-->
                  <!--                  </div>-->
                  <!--                  <div v-if="formState.identityPUrl == ''">-->
                  <!--                    <a-upload-->
                  <!--                      v-model:file-list="fileListP"-->
                  <!--                      list-type="picture-card"-->
                  <!--                      @preview="handlePreview"-->
                  <!--                      accept="image/png, image/jpeg,image/jpg"-->
                  <!--                      :customRequest="customRequest"-->
                  <!--                      :beforeUpload="beforeUploadP"-->
                  <!--                      :showUploadList="{-->
                  <!--                        showPreviewIcon: true,-->
                  <!--                        showRemoveIcon: true,-->
                  <!--                      }"-->
                  <!--                    >-->
                  <!--                      <div v-if="fileListP.length < 1">-->
                  <!--                        <plus-outlined />-->
                  <!--                        <div style="margin-top: 8px">Upload</div>-->
                  <!--                      </div>-->
                  <!--                    </a-upload>-->
                  <!--                  </div>-->
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :md="6" :sm="2">
                <a-form-item label="身份证国徽面">
                  <!--                  <div style="display: flex" v-if="editId != 0">-->
                  <!--                    <div-->
                  <!--                      v-if="formState.identityGUrl != ''"-->
                  <!--                      style="position: relative"-->
                  <!--                    >-->
                  <!--                      <img-->
                  <!--                        :src="formState.identityGUrl"-->
                  <!--                        @click="imgPreview('3')"-->
                  <!--                        style="width: 100px; height: 100px; cursor: pointer"-->
                  <!--                      />-->
                  <!--                      <div class="imageDel" @click="delItemImage(3)">-->
                  <!--                        <DeleteOutlined />-->
                  <!--                      </div>-->
                  <!--                    </div>-->
                  <!--                  </div>-->
                  <a-upload
                    v-model:file-list="fileListG"
                    list-type="picture-card"
                    @preview="handlePreview"
                    accept="image/png, image/jpeg,image/jpg"
                    :beforeUpload="beforeUploadG"
                    :showUploadList="{
                      showPreviewIcon: true,
                      showRemoveIcon: true,
                    }"
                  >
                    <div v-if="fileListG.length < 1">
                      <plus-outlined />
                      <div style="margin-top: 8px">Upload</div>
                    </div>
                  </a-upload>
                  <!--                  <div v-if="formState.identityGUrl == ''">-->
                  <!--                    <a-upload-->
                  <!--                      v-model:file-list="fileListG"-->
                  <!--                      list-type="picture-card"-->
                  <!--                      @preview="handlePreview"-->
                  <!--                      accept="image/png, image/jpeg,image/jpg"-->
                  <!--                      :beforeUpload="beforeUploadG"-->
                  <!--                      :showUploadList="{-->
                  <!--                        showPreviewIcon: true,-->
                  <!--                        showRemoveIcon: true,-->
                  <!--                      }"-->
                  <!--                    >-->
                  <!--                      <div v-if="fileListG.length < 1">-->
                  <!--                        <plus-outlined />-->
                  <!--                        <div style="margin-top: 8px">Upload</div>-->
                  <!--                      </div>-->
                  <!--                    </a-upload>-->
                  <!--                  </div>-->

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
                </a-form-item>
              </a-col>

              <!--              <a-col-->
              <!--                class="gutter-row"-->
              <!--                :md="6"-->
              <!--                :sm="2"-->
              <!--                :offset="3"-->
              <!--                v-if="editId != 0"-->
              <!--              >-->
              <!--                <a-form-item label="邮箱">-->
              <!--                  <a-input-->
              <!--                    placeholder="这里输入邮箱"-->
              <!--                    style="width: 200px"-->
              <!--                    v-model:value="formState.email"-->
              <!--                  ></a-input>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <!--              <a-col :md="6" :sm="2" v-if="editId != 0">-->
              <!--                <a-form-item label="推荐用户">-->
              <!--                  <a-input-->
              <!--                    placeholder="这里输入用户"-->
              <!--                    style="width: 200px"-->
              <!--                    v-model:value="formState.recommendUser"-->
              <!--                  ></a-input>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <!--              <a-col :md="6" :sm="2" v-if="editId != 0">-->
              <!--                <a-form-item label="推荐理由">-->
              <!--                  <a-textarea-->
              <!--                    v-model:value="formState.recommendReason"-->
              <!--                    style="width: 200px"-->
              <!--                  ></a-textarea>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <!--            </a-row>-->

              <a-divider orientation="left">权限管理</a-divider>

              <a-col class="gutter-row" :md="6" :sm="2" :offset="3">
                <a-form-item label="角色分组" name="roleGroupId">
                  <a-select
                    :options="formRoleGroup"
                    show-search
                    :filter-option="filterOption"
                    placeholder="请选择角色分组"
                    style="width: 200px"
                    v-model:value="formState.roleGroupId"
                    @change="
                      (value, options) =>
                        createRole(value, options, false, false)
                    "
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :md="6" :sm="2">
                <a-form-item label="角色" name="roleId">
                  <a-select
                    :options="formRoleList"
                    show-search
                    style="width: 200px"
                    placeholder="请选择角色"
                    :filter-option="filterOption"
                    v-model:value="formState.roleId"
                    @change="roleChange"
                  ></a-select>
                </a-form-item>
              </a-col>
              <!--              <a-col-->
              <!--                class="gutter-row"-->
              <!--                :md="6"-->
              <!--                :sm="2"-->
              <!--                v-if="-->
              <!--                  ['1', '2', '3', '4', '7', '8', '9'].includes(-->
              <!--                    formState.roleGroupId-->
              <!--                  )-->
              <!--                "-->
              <!--              >-->
              <!--                <a-form-item label="省份" name="provieceCode">-->
              <!--                  <a-select-->
              <!--                    :options="formProvieceList"-->
              <!--                    show-search-->
              <!--                    style="width: 200px"-->
              <!--                    placeholder="请选择省份"-->
              <!--                    :filter-option="filterOption"-->
              <!--                    v-model:value="formState.provieceCode"-->
              <!--                    @change="-->
              <!--                      (value, options) =>-->
              <!--                        formCityToStreet(value, options, 'city')-->
              <!--                    "-->
              <!--                  ></a-select>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <!--              <a-col-->
              <!--                class="gutter-row"-->
              <!--                :md="6"-->
              <!--                :sm="2"-->
              <!--                :offset="3"-->
              <!--                v-if="-->
              <!--                  ['2', '3', '4', '7', '8', '9'].includes(formState.roleGroupId)-->
              <!--                "-->
              <!--              >-->
              <!--                <a-form-item label="市" name="cityCode">-->
              <!--                  <a-select-->
              <!--                    placeholder="选择市"-->
              <!--                    v-model:value="formState.cityCode"-->
              <!--                    :options="formCityList"-->
              <!--                    style="width: 200px"-->
              <!--                    :filter-option="filterOption"-->
              <!--                    show-search-->
              <!--                    @change="-->
              <!--                      (value, options) =>-->
              <!--                        formCityToStreet(value, options, 'district')-->
              <!--                    "-->
              <!--                  ></a-select>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <!--              <a-col-->
              <!--                :md="6"-->
              <!--                :sm="2"-->
              <!--                v-if="['3', '4', '8', '9'].includes(formState.roleGroupId)"-->
              <!--              >-->
              <!--                <a-form-item label="区县" name="districtCode">-->
              <!--                  <a-select-->
              <!--                    placeholder="选择区县"-->
              <!--                    v-model:value="formState.districtCode"-->
              <!--                    :options="formDistrictList"-->
              <!--                    :filter-option="filterOption"-->
              <!--                    show-search-->
              <!--                    style="width: 200px"-->
              <!--                    @change="-->
              <!--                      (value, options) =>-->
              <!--                        formCityToStreet(value, options, 'street')-->
              <!--                    "-->
              <!--                  ></a-select>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <!--              <a-col-->
              <!--                :md="6"-->
              <!--                :sm="2"-->
              <!--                v-if="['4', '8'].includes(formState.roleGroupId)"-->
              <!--              >-->
              <!--                <a-form-item label="街道" name="streetCode">-->
              <!--                  <a-select-->
              <!--                    placeholder="选择街道"-->
              <!--                    :filter-option="filterOption"-->
              <!--                    :options="formStreetList"-->
              <!--                    style="width: 200px"-->
              <!--                    show-search-->
              <!--                    v-model:value="formState.streetCode"-->
              <!--                  ></a-select>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <a-col
                :md="6"
                :sm="2"
                v-if="[7, 8, 9].includes(formState.roleGroupType)"
              >
                <a-form-item label="省厅" name="poProvinceCode">
                  <a-select
                    :options="formPoProvinceList"
                    show-search
                    placeholder="请选择省厅"
                    :filter-option="filterOption"
                    style="width: 200px"
                    v-model:value="formState.poProvinceCode"
                    @change="
                      (value, options) =>
                        formCityToStreet(value, options, 'city')
                    "
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col
                :md="6"
                :sm="2"
                :offset="3"
                v-if="[7, 8, 9].includes(formState.roleGroupType)"
              >
                <a-form-item label="市局" name="poCityCode">
                  <a-select
                    placeholder="请选择市局"
                    :filter-option="filterOption"
                    show-search
                    v-model:value="formState.poCityCode"
                    :options="formPoCityList"
                    style="width: 200px"
                    @change="
                      (value, options) =>
                        formCityToStreet(value, options, 'district')
                    "
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col
                :md="6"
                :sm="2"
                v-if="[8, 9].includes(formState.roleGroupType)"
              >
                <a-form-item label="分局" name="poDistrictCode">
                  <a-select
                    placeholder="选择分局"
                    v-model:value="formState.poDistrictCode"
                    :filter-option="filterOption"
                    show-search
                    style="width: 200px"
                    :options="formPoDistrictList"
                    @change="
                      (value, options) =>
                        formCityToStreet(value, options, 'street')
                    "
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col
                :md="6"
                :sm="2"
                v-if="[8].includes(formState.roleGroupType)"
              >
                <a-form-item label="派出所" name="poStreetCode">
                  <a-select
                    placeholder="选择派出所"
                    v-model:value="formState.poStreetCode"
                    :filter-option="filterOption"
                    show-search
                    :options="formPoStreetList"
                    style="width: 200px"
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col
                :md="6"
                :sm="2"
                v-if="[6].includes(formState.roleGroupType)"
              >
                <a-form-item label="小区" name="villageId">
                  <a-select
                    v-model:value="formState.villageId"
                    :filter-option="filterOption"
                    show-search
                    placeholder="请选择小区"
                    style="width: 200px"
                    :options="formVillageId"
                    @change="(value) => createBuildingList(value, false)"
                  ></a-select>
                </a-form-item>
              </a-col>
              <!--              <a-col-->
              <!--                :md="6"-->
              <!--                :sm="2"-->
              <!--                :offset="3"-->
              <!--                v-if="[6].includes(formState.roleGroupType)"-->
              <!--              >-->
              <!--                <a-form-item-->
              <!--                  label="楼栋"-->
              <!--                  style="position: relative"-->
              <!--                  name="buildingIds"-->
              <!--                >-->
              <!--                  <a-select-->
              <!--                    placeholder="选择楼栋"-->
              <!--                    style="width: 200px"-->
              <!--                    :options="formBuildingList"-->
              <!--                    v-model:value="formState.buildingId"-->
              <!--                    :filter-option="filterOption"-->
              <!--                    show-search-->
              <!--                    @change="addBuildingIds"-->
              <!--                  ></a-select>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <a-col
                :md="24"
                :sm="2"
                :offset="3"
                v-if="[5].includes(formState.roleGroupType)"
              >
                <a-form-item style="position: relative">
                  <a-button
                    type="link"
                    @click="openTransfer"
                    style="
                      position: absolute;
                      z-index: 100;
                      left: 424px;
                      top: 11px;
                      font-weight: 600;
                    "
                  >
                    编辑
                  </a-button>
                  <a-table
                    :columns="transferVillage"
                    :data-source="transferTable"
                  ></a-table>
                </a-form-item>
              </a-col>
              <a-col
                :md="24"
                :sm="2"
                :offset="3"
                v-if="[6].includes(formState.roleGroupType)"
              >
                <a-form-item style="position: relative">
                  <a-button
                    type="link"
                    @click="openBuildingTransfer"
                    style="
                      position: absolute;
                      z-index: 100;
                      left: 530px;
                      top: 11px;
                      font-weight: 600;
                    "
                  >
                    编辑
                  </a-button>
                  <a-table
                    :columns="transferBuilding"
                    :data-source="transferBuildingTable"
                  ></a-table>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </Modal>
    </div>
    <a-modal
      v-model:open="transferVisible"
      title="选择小区"
      width="800px"
      :mask-closable="false"
      @ok="transferSubmit"
      :confirm-loading="villageLoading"
      @cancel="closeTransfer"
      :cancel-button-props="{ disabled: disabledCancelButton }"
    >
      <div class="transfer">
        <a-transfer
          v-model:target-keys="targetKeys"
          :data-source="transferData"
          show-search
          :operationStyle="{ height: '200px', marginTop: '50px' }"
          :filter-option="filterOption"
          :render="(item) => item.title"
          pagination
          @change="handleChange"
        />
      </div>
    </a-modal>
    <a-modal
      v-model:open="transferBuildingVisible"
      title="选择楼栋"
      width="800px"
      @ok="transferBuildingSubmit"
      @cancel="closeBuildingTransfer"
    >
      <div class="transfer">
        <a-transfer
          v-model:target-keys="targetBuildingKeys"
          :data-source="transferBuildingData"
          show-search
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
    name: 'systemUser',
  }
</script>
<script setup>
  import { computed, nextTick, reactive, ref } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import Modal from '@/components/Modal.vue'
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  const { simpleRequest } = useSimpleRequest()
  import {
    SearchOutlined,
    DownOutlined,
    UpOutlined,
  } from '@ant-design/icons-vue'
  import {
    addU,
    del,
    edit,
    getBuilding,
    getDictionary,
    getRole,
    getRoleGroup,
    getUserList,
    getVillageList,
    toEdit,
  } from '@/api/system'
  const formItemLayout = computed(() => {
    const layout = 'horizontal'
    return layout === 'horizontal'
      ? {
          labelCol: {
            span: 24,
          },
          wrapperCol: {
            span: 16,
          },
        }
      : {}
  })
  import {
    columns,
    userListObj,
    buildingList,
    poDistrictList,
    poStreetList,
    poCityList,
    formState,
    poProvinceList,
    authList,
    streetList,
    dateFormat,
    villageList,
    cityList,
    roleList,
    roleGroupList,
    statusOptions,
    addStatusOptions,
    districtList,
    formRef,
    rules,
    rulesEdit,
    formRoleGroup,
  } from './data'
  import { messageContent } from '@/utils/message'
  import { getBase64 } from '@/utils'
  import { getCity } from '@/api/community'
  const { dataSource, tableLoading, requestObj } = useTableInit({
    tableObj: userListObj,
  })
  const { modalRef, titleValue, editId } = useInitFrom()
  const startTimeAndEndTime = ref([])
  // // 表单的省
  // let formProvieceList = []
  // 表单的省厅
  let formPoProvinceList = ref([])
  // const formCityList = ref([])
  // const formStreetList = ref([])
  const formPoCityList = ref([])
  const formVillageId = ref([])
  const formDistrictList = ref([])
  const formPoDistrictList = ref([])
  const formPoStreetList = ref([])
  const formBuildingList = ref([])
  // 新增
  const openAdd = async () => {
    formState.identityGUrl = ''
    formState.identityPUrl = ''
    formDistrictList.value = []
    formPoDistrictList.value = []
    formPoStreetList.value = []
    formBuildingList.value = []
    // formCityList.value = []
    // formStreetList.value = []
    formPoCityList.value = []
    editId.value = 0
    modalRef.value.open()
  }
  const paginationInfo = reactive({
    total: 20,
    pageSize: 10,
    current: 1,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条数据`,
  })
  // 页面表格数据
  const getList = (tableObj) => {
    tableLoading.value = true
    getUserList(tableObj)
      .then((res) => {
        dataSource.value = res.result.list.map((item, index) => {
          return {
            ...item,
            changeLoading: false,
            No:
              index +
              1 +
              paginationInfo.pageSize * (paginationInfo.current - 1),
            operation: '',
            key: item.id,
          }
        })
        paginationInfo.total = res.result.totalResult
      })
      .finally(() => {
        tableLoading.value = false
      })
  }
  getList(requestObj)

  getRoleGroup({}).then((res) => {
    const roleGroup = res.result.map((item) => {
      return {
        ...item,
        label: item.name,
        value: item.id,
      }
    })
    formRoleGroup.value = roleGroup
    roleGroupList.value = [
      {
        value: '',
        label: '全部',
      },
    ].concat(roleGroup)
  })
  simpleRequest({
    requestObj: { grade: 'province' },
    requestFun: getCity,
    isComplete: true,
    isForm: true,
    formList: formPoProvinceList,
    tableList: poProvinceList,
    valueString: 'dicCode',
    labelString: 'dicName',
  })
  //分页的改变
  function handleTableChange(pagination) {
    paginationInfo.pageSize = pagination.pageSize
    paginationInfo.current = pagination.current
    requestObj.pageNum = pagination.current
    requestObj.pageSize = pagination.pageSize
    getList(requestObj)
  }
  // 获取小区
  getVillageList().then((res) => {
    const village = res.result.map((item) => {
      return {
        ...item,
        value: item.id,
        label: item.name,
      }
    })
    villageList.value = [
      {
        value: '',
        label: '全部',
      },
    ].concat(village)
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
    paginationInfo.current = 1
    requestObj.pageNum = 1
    requestObj.pageSize = 10
    getList(requestObj)
  }

  const getCheckboxProps = (record) => ({
    // Column configuration not to be checked
    name: record.name,
    // disabled: true,
  })

  const onSelectChange = (selectedRowKeys) => {
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
    formState.buildingIds = []
    formState.buildingId = undefined
    formState.districtCode = undefined
    // transferArray.value = []
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
    let changeList
    if (options.childCode == 'DQ') {
      if (type == 'city') {
        changeList = cityList
        requestObj.cityCode = undefined
        requestObj.districtCode = undefined
        requestObj.streetCode = undefined
      } else if (type == 'district') {
        changeList = districtList
        requestObj.districtCode = undefined
        requestObj.streetCode = undefined
      } else if (type == 'street') {
        changeList = streetList
        requestObj.streetCode = undefined
      }
    } else if (options.childCode == 'PO') {
      if (type == 'city') {
        changeList = poCityList
        requestObj.poCityCode = undefined
        requestObj.poDistrictCode = undefined
        requestObj.poStreetCode = undefined
      } else if (type == 'district') {
        changeList = poDistrictList
        requestObj.poDistrictCode = undefined
        requestObj.poStreetCode = undefined
      } else if (type == 'street') {
        changeList = poStreetList
        requestObj.poStreetCode = undefined
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
    } else {
      if (options.childCode == 'DQ' && type == 'city') {
        requestObj.cityCode = undefined
        requestObj.streetCode = undefined
        requestObj.districtCode = undefined
        cityList.value = [
          {
            value: '',
            label: '全部',
            childCode: 'DQ',
          },
        ]
        streetList.value = [
          {
            value: '',
            label: '全部',
            childCode: 'DQ',
          },
        ]
        districtList.value = [
          {
            value: '',
            label: '全部',
            childCode: 'DQ',
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
            childCode: 'PO',
          },
        ]
        poStreetList.value = [
          {
            value: '',
            label: '全部',
            childCode: 'PO',
          },
        ]
        poDistrictList.value = [
          {
            value: '',
            label: '全部',
            childCode: 'PO',
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
            // formCityList.value = res.result.map((item) => {
            //   return {
            //     ...item,
            //     value: item.dicCode,
            //     label: item.dicName,
            //   }
            // })
          } else if (type == 'district') {
            formState.streetCode = undefined
            formState.districtCode = undefined
            formDistrictList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'street') {
            formState.streetCode = undefined
            // formStreetList.value = res.result.map((item) => {
            //   return {
            //     ...item,
            //     value: item.dicCode,
            //     label: item.dicName,
            //   }
            // })
          }
        } else if (options.childCode == 'PO') {
          if (type == 'city') {
            formState.poCityCode = undefined
            formState.poStreetCode = undefined
            formState.poDistrictCode = undefined
            formPoCityList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'district') {
            formState.poStreetCode = undefined
            formState.poDistrictCode = undefined
            formPoDistrictList.value = res.result.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
          } else if (type == 'street') {
            formState.poStreetCode = undefined

            formPoStreetList.value = res.result.map((item) => {
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
        // formCityList.value = []
        // formStreetList.value = []
        formDistrictList.value = []
      } else if (options.childCode == 'PO' && type == 'city') {
        formState.poCityCode = undefined
        formState.poStreetCode = undefined
        formState.poDistrictCode = undefined
        formPoCityList.value = []
        formPoStreetList.value = []
        formPoDistrictList.value = []
      }
    }
  }
  const formRoleList = ref([])
  // 创建角色 通常用于选中角色分组之后再调用
  const createRole = (value, options, controlAdd = true, page = true) => {
    if (page) {
      requestObj.roleId = undefined
    } else {
      clearPartFormState()
      isMV.value = 0
      formState.roleId = undefined
      formState.villageIds = []
      // transferArray.value = []
      transferTable.value = []
      formState.roleGroupType = options.type
    }

    nextTick(() => {
      let modalScroll = document.getElementById('modalScroll')
      if (modalScroll) {
        // modalScroll.scrollTop = 0
        modalScroll.scrollTop = modalScroll.scrollHeight
      }
    })
    if (value !== '') {
      getRole({ roleGroupId: value }).then((res) => {
        roleList.value = [
          {
            value: '',
            label: '全部',
          },
        ].concat(
          res.result.map((item) => {
            return {
              ...item,
              value: controlAdd ? item.id : item.id,
              label: item.name,
            }
          })
        )
        formRoleList.value = res.result.map((item) => {
          return {
            ...item,
            value: controlAdd ? item.id : item.id,
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
        if (isRequest) {
          buildingList.value = [
            {
              value: '',
              label: '全部',
            },
          ].concat(build)
        } else {
          formBuildingList.value = build
        }
      })
    } else {
      buildingList.value = [
        {
          value: '',
          label: '全部',
        },
      ]
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
      } else if (tableObjKey == 'isAuth' || tableObjKey == 'status') {
        if (tableObjKey == 'isAuth') {
          formState[tableObjKey] = '1'
        } else {
          formState[tableObjKey] = '0'
        }
      } else {
        formState[tableObjKey] = undefined
      }
    }
    targetKeys.value = []
    // transferArray.value = []
    transferTable.value = []
    targetBuildingKeys.value = []
    transferBuildingTable.value = []
    // transferBuildingArray.value = []
    isMV.value = undefined
    fileListG.value = []
    fileListP.value = []
  }
  // const addBuildingIds = (value) => {
  //   formState.buildingIds = value
  // }
  //表单提交
  const submit = async () => {
    modalRef.value.showLoading()
    setBuildingArray = []
    const changeFun = editId.value == '0' ? addU : edit
    if (editId.value == '0') {
      formRef.value
        .validate()
        .then(async () => {
          await changeFun({
            ...formState,
            buildingIds: Array.isArray(formState.buildingIds)
              ? formState.buildingIds.join(',')
              : formState.buildingIds,
            villageIds: Array.isArray(formState.villageIds)
              ? formState.villageIds.join(',')
              : formState.villageIds,
          }).then((res) => {
            if (res.code == '200') {
              getList(requestObj)
              modalRef.value.close()
              clearFormItem()
              // message.success('表格项新增成功')
              messageContent('success', '表格项新增成功')
            } else if (res.code == '400') {
              messageContent('error', '输入项有误，请检查输入项')
            } else if (res.code == '412') {
              messageContent('error', res.desc)
            }
          })
        })
        .finally(() => {
          modalRef.value.hideLoading()
          modalRef.value.disabledCancelFalse()
        })
    } else {
      // console.log(formState.photoSrc)
      // formData.append()
      await changeFun({
        ...formState,
        buildingIds: Array.isArray(formState.buildingIds)
          ? formState.buildingIds.join(',')
          : formState.buildingIds,
        villageIds: Array.isArray(formState.villageIds)
          ? formState.villageIds.join(',')
          : formState.villageIds,
        base64Img1: formState.base64Img1?.includes('http')
          ? ''
          : formState.base64Img1,
        base64Img2: formState.base64Img2?.includes('http')
          ? ''
          : formState.base64Img2,
      })
        .then((res) => {
          if (res.code == '200') {
            getList(requestObj)
            modalRef.value.close()
            clearFormItem()
            messageContent('success', '表格项修改成功')
          } else if (res.code == '400') {
            messageContent('error', '输入项有误，请检查输入项')
          } else if (res.code == '412') {
            messageContent('error', res.desc)
          }
        })
        .finally(() => {
          modalRef.value.hideLoading()
          modalRef.value.disabledCancelFalse()
        })
    }
    startTimeAndEndTime.value = []
  }
  const close = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
    clearFormItem()
    startTimeAndEndTime.value = []
    setBuildingArray = []
  }
  const delTableItem = async (record) => {
    await del({ id: record.id })
    if (dataSource.value.length == 1 && paginationInfo.current > 1) {
      requestObj.pageNum-- || requestObj.pageNo--
    }
    messageContent('success', '删除表格项成功')
    await getList(requestObj)
  }
  // 修改功能
  const changeTableItem = async (record) => {
    formState.identityGUrl = ''
    formState.identityPUrl = ''
    editId.value = record.id
    record.changeLoading = true
    // let buildingList_ = []
    // let zjImageList = []
    let res1
    await toEdit({
      id: record.id,
    })
      .then((res) => {
        // buildingList_ = res.result.buildingList_
        // zjImageList = res.result.zjImageList
        res1 = res.result
        formRoleGroup.value = res.result.roleGroupList?.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          }
        })
        const RoleList = res.result.roleList?.map((item) => {
          return {
            ...item,
            value: item.id,
            label: item.name,
          }
        })
        formRoleList.value = RoleList
        poProvinceList.value = res.result.poProvinceList?.map((item) => {
          return {
            ...item,
            label: item.dicName,
            value: item.dicCode,
          }
        })
        formPoCityList.value = res.result.poCityList?.map((item) => {
          return {
            ...item,
            label: item.dicName,
            value: item.dicCode,
          }
        })
        formDistrictList.value = res.result.poDistrictList?.map((item) => {
          return {
            ...item,
            label: item.dicName,
            value: item.dicCode,
          }
        })
      })
      .finally(() => {
        record.changeLoading = false
      })
    await roleChange(record.roleId)
    const { roleGroupList } = res1
    const resObj = res1.pd
    for (let recordKey in resObj) {
      if (recordKey == 'isAuth') {
        formState[recordKey] = resObj[recordKey].toString()
        continue
      } else if (recordKey == 'base64Img1') {
        formState[recordKey] = resObj[recordKey]
        formState.identityGUrl = resObj[recordKey]
        fileListG.value = formState.identityGUrl
          ? [
              {
                uid: '565656',
                status: 'done',
                url: formState.identityGUrl,
              },
            ]
          : []
      } else if (recordKey == 'base64Img2') {
        formState[recordKey] = resObj[recordKey]
        formState.identityPUrl = resObj[recordKey]
        fileListP.value = formState.identityPUrl
          ? [
              {
                uid: '5656562222',
                status: 'done',
                url: formState.identityPUrl,
              },
            ]
          : []
      } else if (recordKey == 'password') {
        formState[recordKey] = ''
        continue
      } else if (recordKey == 'groupId') {
        formState.roleGroupId = resObj[recordKey].toString()
        const roleGroupType = roleGroupList.filter(
          (item) => item.id === resObj[recordKey]
        )
        formState.roleGroupType = roleGroupType[0].type

        continue
      } else if (recordKey == 'roleId') {
        formState.roleId = resObj[recordKey]
        continue
      } else if (recordKey == 'isMV') {
        isMV.value = resObj[recordKey]
        continue
      } else if (recordKey == 'villageList') {
        if (formState.roleGroupType === 5) {
          transferTable.value = resObj[recordKey].map((item) => {
            return {
              ...item,
              value: item.name,
            }
          })
          formState.villageIds = resObj[recordKey].map((item) => item.villageId)
        } else if (formState.roleGroupType === 6) {
          const BuildingTable = resObj[recordKey].map((item) => {
            return {
              ...item,
              value: item.villageName,
              buildingValue: item.buildingName,
            }
          })
          transferBuildingTable.value = BuildingTable
          const setBuildingTable = BuildingTable.map((item) => {
            return {
              ...item,
              key: item.buildingId,
              id: item.buildingId,
              value: item.buildingId,
              label: item.buildingName,
              name: item.buildingName,
              title: item.buildingName,
            }
          })
          setBuildingArray.push(...setBuildingTable)
          formState.buildingIds = resObj[recordKey].map(
            (item) => item.buildingId
          )
        }

        continue
      } else if (recordKey == 'startTime') {
        startTimeAndEndTime.value[0] = resObj[recordKey]
        continue
      } else if (recordKey == 'endTime') {
        startTimeAndEndTime.value[1] = resObj[recordKey]
        continue
      }
      formState[recordKey] = resObj[recordKey]
    }
    setTimeout(() => {
      modalRef.value.open()
      nextTick(() => {
        let modalScroll = document.getElementById('modalScroll')
        if (modalScroll) {
          modalScroll.scrollTop = 0
        }
      })
    }, 100)
  }

  const transferVillage = [
    {
      dataIndex: 'value',
      title: '小区名',
    },
    {
      dataIndex: 'edit',
    },
  ]
  // 用于小区多选时弹出transfer组件，使用的是transferArray来显示多选 选中之后的名字，使用a-tags显示
  // transferArray与formstate.villageIds区别: 从本质上他们是一致的，只不过对与a-tags和a-transfer显示数据的key不同，formstate.villageIds只存储了
  // 选中项的id/value值,transferArray是根据id/value筛选出的对应name的数组。
  const transferVisible = ref(false)
  let targetKeys = ref([])
  let transferData
  const openTransfer = () => {
    transferVisible.value = true
    transferData = []
    transferData = formVillageId.value.map((item) => {
      return {
        ...item,
        title: item.name,
        key: item.value,
      }
    })
    // 将多选的选项回显到targetKey
    targetKeys.value = formState.villageIds
  }
  // let transferArray = ref([])
  let transferTable = ref([])
  const villageLoading = ref(false)
  const disabledCancelButton = ref(false)

  const transferSubmit = () => {
    villageLoading.value = true
    formState.villageIds = targetKeys.value
    //
    transferTable.value = formState.villageIds.map((item) => {
      const ele = villageList.value.filter((itemV) => itemV.value === item)
      return { value: ele[0].name }
    })
    //
    transferVisible.value = false
    formState.villageId = formState.villageIds[formState.villageIds.length - 1]
    targetKeys.value = []
    villageLoading.value = false
  }
  const closeTransfer = () => {
    targetKeys.value = []
    transferVisible.value = false
  }

  const transferBuilding = [
    {
      dataIndex: 'value',
      title: '小区名',
    },
    {
      dataIndex: 'buildingValue',
      title: '楼栋名',
    },
    {
      title: '',
      dataIndex: 'edit',
    },
  ]
  const transferBuildingVisible = ref(false)
  let setBuildingArray = []
  // 右边选中
  let targetBuildingKeys = ref([])
  let transferBuildingData
  const openBuildingTransfer = () => {
    transferBuildingVisible.value = true
    // 左边
    transferBuildingData = formBuildingList.value.map((item) => {
      return {
        ...item,
        title: item.name,
        key: item.value,
      }
    })
    // 把每次点开的transBuildingData汇聚到一个数组里面 点击确认使用
    setBuildingArray.push(...transferBuildingData)
    // 将多选的选项回显到targetKey
    targetBuildingKeys.value = formState.buildingIds
  }
  // const transferBuildingArray = ref([])
  const transferBuildingTable = ref([])
  const transferBuildingSubmit = () => {
    formState.buildingIds = targetBuildingKeys.value
    // 将targetBUildingKeys的每一项进行遍历 然后筛选，赋值给transferBuildingArray
    // let buildingAddArray = []
    // formState.buildingIds.forEach((item) => {
    //   const ele = setBuildingArray.filter((itemV) => itemV.value == item)
    //   if (ele.length != 0) {
    //     const selectVillage = villageList.value.find(
    //       (item) => item.value === ele[0].villageId
    //     )
    //     buildingAddArray.push(selectVillage.name + '-' + ele[0].name)
    //   }
    // })
    let buildingAddTable = formState.buildingIds.map((item) => {
      const ele = setBuildingArray.filter((itemV) => itemV.value == item)
      if (ele.length != 0) {
        const selectVillage = villageList.value.find(
          (item) => item.value === ele[0].villageId
        )
        return {
          value: selectVillage.name,
          buildingValue: ele[0].name,
        }
      }
    })
    // transferBuildingArray.value = buildingAddArray
    transferBuildingTable.value = buildingAddTable

    targetBuildingKeys.value = []
    transferBuildingVisible.value = false
    formState.buildingId =
      formState.buildingIds[formState.buildingIds.length - 1]
  }
  const closeBuildingTransfer = () => {
    targetBuildingKeys.value = []
    transferBuildingVisible.value = false
  }
  const advanced = ref(false)
  const toggleAdvanced = () => {
    advanced.value = !advanced.value
  }
  const distributeTime = () => {
    formState.startTime = startTimeAndEndTime.value[0]
    formState.endTime = startTimeAndEndTime.value[1]
  }
  const beforeUploadG = (file) => {
    getBase64(file).then((res) => {
      formState.base64Img1 = res
    })
    return false
  }
  const beforeUploadP = (file) => {
    getBase64(file).then((res) => {
      // console.log(res)
      formState.base64Img2 = res
    })
    return false
  }
  const previewVisible = ref(false)
  const previewImage = ref('')
  const fileListG = ref([])
  const fileListP = ref([])
  const handleCancel = () => {
    previewVisible.value = false
    // previewTitle.value = ''
  }
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    previewImage.value = file.url || file.preview
    previewVisible.value = true
  }
  const customRequest = (data) => {
    console.log(data.file)
  }
  const handleChange = (nextTargetKeys) => {
    targetKeys.value = nextTargetKeys
  }
</script>

<style scoped lang="less">
  .table-page-search-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 5px;
  }
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
  :deep(.ant-form-item-control-input) {
    //width: 1000px;
    //background-color: red;
  }
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
