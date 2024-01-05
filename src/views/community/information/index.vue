<template>
  <div class="">
    <a-space direction="vertical">
      <a-space>
        <a-input
          placeholder="输入关键词"
          v-model:value="requestObj.searchName"
          style="width: 150px"
        >
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
          style="width: 150px"
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
          style="width: 150px"
        ></a-select>
        <a-date-picker
          v-model:value="requestObj.startTime"
          placeholder="开始日期"
          style="width: 150px"
          :value-format="dateFormat"
        />
        <a-date-picker
          v-model:value="requestObj.endTime"
          placeholder="结束日期"
          style="width: 150px"
          :value-format="dateFormat"
        />
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
        <template v-if="column.dataIndex == 'operation'">
          <span style="display: flex; justify-content: space-between">
            <a-tooltip>
              <template #title>编辑</template>
              <a-button
                type="link"
                :loading="record.changeLoading"
                @click="changeItem(record)"
                style="cursor: pointer"
              >
                <EditOutlined />
              </a-button>
            </a-tooltip>
            <a-tooltip>
              <template #title>基本信息配置</template>
              <SettingOutlined @click="showVisitorInfo(record)" />
            </a-tooltip>
            <a-tooltip>
              <template #title>保障房房屋预警配置</template>
              <SettingOutlined @click="showGuaranteeInfo(record)" />
            </a-tooltip>
            <a-tooltip>
              <template #title>其他配置</template>
              <SettingOutlined @click="showOtherInfo(record)" />
            </a-tooltip>
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
          </span>
        </template>
        <template v-else-if="column.dataIndex == 'city'">
          <span>{{ `${record.city}${record.district}` }}</span>
        </template>
        <template v-else-if="column.dataIndex == 'isReal'">
          <span v-if="record.isReal === '1'">是</span>
          <span v-else>否</span>
        </template>
        <template v-else-if="column.dataIndex == 'villageType'">
          <span v-if="record.villageType === '1'">小区/大厦</span>
          <span v-else-if="record.villageType === '2'">独栋自建楼房</span>
          <span v-else-if="record.villageType === '3'">公司</span>
          <span v-else>保障房</span>
        </template>
      </template>
    </a-table>
    <Modal
      ref="modalRef"
      :title="titleValue"
      width="100%"
      @handleOk="formSubmit"
      @closeModal="close"
    >
      <a-form
        ref="formRef"
        v-bind="formItemLayout"
        :model="formState"
        :rules="rules"
        layout="inline"
      >
        <a-divider>小区基本信息</a-divider>
        <a-form-item label="小区名称" name="name">
          <a-input
            v-model:value="formState.name"
            style="width: 180px"
            placeholder="小区名称"
          />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number
            v-model:value="formState.weight"
            style="width: 180px"
            placeholder="排序"
            :min="1"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model:value="formState.status"
            style="width: 180px"
            :options="statusOptions"
          />
        </a-form-item>
        <a-form-item label="小区类型">
          <a-select
            v-model:value="formState.villageType"
            style="width: 180px"
            :options="villageTypeOptions"
          />
        </a-form-item>
        <a-form-item label="小区开放类型">
          <a-select
            v-model:value="formState.type"
            style="width: 180px"
            :options="villageOpenTypeOptions"
          />
        </a-form-item>
        <a-form-item label="添加人" v-if="editId != 0">
          <a-input
            :disabled="true"
            style="width: 180px"
            v-model:value="addUser"
          />
        </a-form-item>
        <a-form-item
          label="是否允许用户添加我的一家"
          style="width: 400px"
          :style="{ marginLeft: editId != 0 ? '20px' : 0 }"
        >
          <a-select
            v-model:value="formState.isAddUser"
            style="width: 180px"
            :options="isAddUserOptions"
          />
        </a-form-item>

        <a-divider>小区位置</a-divider>
        <a-form-item label="省份">
          <a-select
            v-model:value="formState.provieceCode"
            style="width: 180px"
            show-search
            placeholder="请选择省份"
            :filter-option="filterOption"
            :options="formProvinceList"
            @change="
              (value, options) => cityToStreet(value, options, 'city', true)
            "
          />
        </a-form-item>
        <a-form-item label="城市" name="cityCode">
          <a-select
            v-model:value="formState.cityCode"
            style="width: 180px"
            :options="formCityList"
            show-search
            placeholder="请选择城市"
            :filter-option="filterOption"
            @change="
              (value, options) => cityToStreet(value, options, 'district', true)
            "
          />
        </a-form-item>
        <a-form-item label="区县">
          <a-select
            v-model:value="formState.districtCode"
            style="width: 180px"
            :options="formDistrictList"
            show-search
            placeholder="请选择区县"
            :filter-option="filterOption"
            @change="
              (value, options) => cityToStreet(value, options, 'street', true)
            "
          />
        </a-form-item>
        <a-form-item label="街道" name="streetCode">
          <a-select
            v-model:value="formState.streetCode"
            style="width: 180px"
            :options="formStreetList"
            show-search
            placeholder="请选择街道"
            :filter-option="filterOption"
          />
        </a-form-item>
        <a-form-item label="省厅">
          <a-select
            v-model:value="formState.poProvieceCode"
            style="width: 180px"
            show-search
            placeholder="请选择省厅"
            :filter-option="filterOption"
            :options="formPoProvinceList"
            @change="
              (value, options) => cityToStreet(value, options, 'city', true)
            "
          />
        </a-form-item>
        <a-form-item label="市局">
          <a-select
            v-model:value="formState.poCityCode"
            style="width: 180px"
            placeholder="请选择市局"
            show-search
            :options="formPoCityList"
            :filter-option="filterOption"
            @change="
              (value, options) => cityToStreet(value, options, 'district', true)
            "
          />
        </a-form-item>
        <a-form-item label="分局">
          <a-select
            v-model:value="formState.poDistrictCode"
            style="width: 180px"
            placeholder="请选择分局"
            show-search
            :options="formPoDistrictList"
            :filter-option="filterOption"
            @change="
              (value, options) => cityToStreet(value, options, 'street', true)
            "
          />
        </a-form-item>
        <a-form-item label="派出所">
          <a-select
            v-model:value="formState.poStreetCode"
            style="width: 180px"
            placeholder="请选择派出所"
            show-search
            :options="formPoStreetList"
            :filter-option="filterOption"
          />
        </a-form-item>
        <a-form-item label="地址" style="margin-left: -3px" name="address">
          <a-input
            v-model:value="formState.address"
            style="width: 180px"
            placeholder="地址"
          />
        </a-form-item>
      </a-form>
    </Modal>
    <a-modal
      width="100%"
      v-model:open="basicInfo"
      title="基本信息配置"
      :confirm-loading="modalLoading"
      :maskClosable="false"
      @ok="submitSettingInfo"
    >
      <div style="height: 450px; overflow: auto">
        <a-form :model="fromSettingInfo" layout="inline">
          <a-divider>访客信息配置</a-divider>
          <a-form-item label="小区名" style="width: 400px; padding-left: 100px">
            {{ fromSettingInfo.name }}
          </a-form-item>
          <a-form-item label="访客权限" style="width: 500px">
            <a-checkbox-group
              v-model:value="fromSettingInfo.visitorPermission"
              :options="visitorPermissionOptions"
            />
          </a-form-item>
          <a-form-item label="小程序临时访客注册是否需要审核">
            <a-select
              :options="checkOptions"
              style="width: 150px"
              v-model:value="fromSettingInfo.unCheck"
            ></a-select>
          </a-form-item>
          <a-divider>实名认证信息配置</a-divider>
          <a-form-item label="是否需要身份认证" style="margin-left: 30px">
            <a-select
              v-model:value="fromSettingInfo.isReal"
              :options="realOptions"
              style="width: 150px"
            ></a-select>
          </a-form-item>
          <a-form-item
            label="身份认证是否需要上传证件照片"
            v-if="fromSettingInfo.isReal === '1'"
            :style="{ marginLeft: '100px' }"
          >
            <a-select
              style="width: 150px"
              v-model:value="fromSettingInfo.isIdentity"
              :options="identityOptions"
            ></a-select>
          </a-form-item>
          <a-form-item
            label="是否需要身份认证是否需要人脸认证"
            :style="{ marginLeft: '100px' }"
          >
            <a-select
              v-model:value="fromSettingInfo.isNeedFace"
              :options="needFaceOptions"
              style="width: 150px"
            ></a-select>
          </a-form-item>
          <a-divider>物业信息配置</a-divider>
          <a-form-item label="物业电话" style="margin-left: 80px">
            <a-input
              placeholder="物业电话"
              style="width: 150px"
              v-model:value="fromSettingInfo.mobile"
            ></a-input>
          </a-form-item>
          <a-form-item label="物业联系人" style="margin-left: 110px">
            <a-input
              placeholder="物业联系人"
              style="width: 150px"
              v-model:value="fromSettingInfo.contacts"
            ></a-input>
          </a-form-item>
          <a-divider>用户默认有效期配置</a-divider>
          <a-form-item
            label="户主默认有效期(月)"
            style="margin-left: 20px; margin-bottom: 10px"
          >
            <a-input
              v-model:value="fromSettingInfo.validityHolder"
              style="width: 150px"
            ></a-input>
          </a-form-item>
          <a-form-item label="家人默认有效期(月)" style="margin-left: 30px">
            <a-input
              style="width: 150px"
              v-model:value="fromSettingInfo.validityFamily"
            ></a-input>
          </a-form-item>
          <a-form-item label="租客默认有效期(月)" style="margin-left: 30px">
            <a-input
              v-model:value="fromSettingInfo.validityTenant"
              style="width: 150px"
            ></a-input>
          </a-form-item>
          <a-form-item label="雇主默认有效期(月)" style="margin-left: 30px">
            <a-input
              style="width: 150px"
              v-model:value="fromSettingInfo.validityEmployer"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="雇员默认有效期(月)"
            style="margin-bottom: 10px; margin-left: 20px"
          >
            <a-input
              style="width: 150px"
              v-model:value="fromSettingInfo.validityServant"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="保障房主申请人默认有效期(月)"
            style="margin-left: 30px"
          >
            <a-input
              style="width: 150px"
              v-model:value="fromSettingInfo.validityGuaranteeMain"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="保障房共同申请人默认有效期(月)"
            style="margin-left: 30px"
          >
            <a-input
              style="width: 150px"
              v-model:value="fromSettingInfo.validityGuaranteeJointly"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="保障房临时居住人员默认有效期(月)"
            style="margin-bottom: 10px"
          >
            <a-input
              style="width: 150px"
              v-model:value="fromSettingInfo.validityGuaranteeTemporary"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="公租房主申请人默认有效期(月)"
            style="margin-left: 30px"
          >
            <a-input
              style="width: 150px"
              v-model:value="fromSettingInfo.validityPublicMain"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="公租房共同申请人默认有效期(月)"
            style="margin-left: 30px"
          >
            <a-input
              style="width: 150px"
              v-model:value="fromSettingInfo.validityPublicJointly"
            ></a-input>
          </a-form-item>
          <a-form-item label="公租房临时居住人员默认有效期(月)">
            <a-input
              style="width: 150px"
              v-model:value="fromSettingInfo.validityPublicTemporary"
            ></a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal
      width="100%"
      v-model:open="otherInfo"
      title="其他信息配置"
      :maskClosable="false"
      :confirmLoading="modalLoading"
      @ok="submitSettingInfo"
    >
      <div style="height: 450px; overflow: auto">
        <a-form :model="fromSettingInfo" layout="inline">
          <a-divider>长时间未开门配置</a-divider>
          <a-form-item
            label="小区名"
            style="width: 400px; padding-left: 100px; margin-bottom: 10px"
          >
            {{ fromSettingInfo.name }}
          </a-form-item>
          <a-form-item label="是否统计长期未开门人员">
            <a-select
              v-model:value="fromSettingInfo.countLongNoOpen"
              :options="countLongNoOpenOptions"
              style="width: 150px"
            />
          </a-form-item>
          <a-form-item
            label="长期未开门天数设置一档(天)"
            style="margin-left: 40px"
          >
            <a-input
              style="width: 150px"
              placeholder="长期未开门天数设置一档(天)"
              v-model:value="fromSettingInfo.noOpenTime1"
            ></a-input>
          </a-form-item>
          <a-form-item label="长期未开门天数设置二档(天)">
            <a-input
              style="width: 150px"
              placeholder="长期未开门天数设置二档(天)"
              v-model:value="fromSettingInfo.noOpenTime2"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="长期未开门天数设置三档(天)"
            style="margin-left: 40px"
          >
            <a-input
              style="width: 150px"
              placeholder="长期未开门天数设置三档(天)"
              v-model:value="fromSettingInfo.noOpenTime3"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="长期未开门天数设置四档(天)"
            style="margin-left: 40px"
          >
            <a-input
              style="width: 150px"
              placeholder="长期未开门天数设置四档(天)"
              v-model:value="fromSettingInfo.noOpenTime4"
            ></a-input>
          </a-form-item>
          <a-divider>智慧安防小区预警配置</a-divider>
          <a-form-item
            label="多少天未开门"
            style="margin-left: 60px; margin-bottom: 10px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="多少天未开门"
                style="width: 150px"
                v-model:value="fromSettingInfo.noOpen"
              ></a-input>
              天
            </div>
          </a-form-item>
          <a-form-item label="每日开门上限" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="每日开门上限"
                style="width: 150px"
                v-model:value="fromSettingInfo.cardDayNum"
              ></a-input>
              次
            </div>
          </a-form-item>
          <a-form-item label="每周开门上限" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="每周开门上限"
                style="width: 150px"
                v-model:value="fromSettingInfo.weekOpenNum"
              ></a-input>
              次
            </div>
          </a-form-item>
          <a-form-item label="单间周开门次数" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="单间周开门次数"
                style="width: 150px"
                v-model:value="fromSettingInfo.houseWeekOpenNum"
              ></a-input>
              次
            </div>
          </a-form-item>
          <a-form-item
            label="日访客数量"
            style="margin-left: 75px; margin-bottom: 10px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="日访客数量"
                style="width: 150px"
                v-model:value="fromSettingInfo.visitorDayNum"
              ></a-input>
              位
            </div>
          </a-form-item>
          <a-form-item label="临时访客超时时间" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="临时访客超时时间"
                style="width: 150px"
                v-model:value="fromSettingInfo.temporaryVisitorTime"
              ></a-input>
              <span style="width: 50px">小时</span>
            </div>
          </a-form-item>
          <a-form-item label="长租房用户上限" style="margin-left: 0px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="长租房用户上限"
                style="width: 150px"
                v-model:value="fromSettingInfo.longRentNum"
              ></a-input>
              人
            </div>
          </a-form-item>
          <a-form-item label="公司用户上限" style="margin-left: 10px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="公司用户上限"
                style="width: 150px"
                v-model:value="fromSettingInfo.companyNum"
              ></a-input>
              人
            </div>
          </a-form-item>
          <a-form-item
            label="单个房屋用户上限"
            style="margin-left: 30px; margin-bottom: 10px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="单个房屋用户上限"
                style="width: 150px"
                v-model:value="fromSettingInfo.cardTotalNum"
              ></a-input>
              人
            </div>
          </a-form-item>
          <a-form-item label="人脸不符次数" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="人脸不符次数"
                v-model:value="fromSettingInfo.faceUnknownNum"
                style="width: 150px"
              ></a-input>
              <span style="width: 75px">次/每周</span>
            </div>
          </a-form-item>
          <a-form-item label="异地开门距离" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="异地开门距离"
                style="width: 150px"
                v-model:value="fromSettingInfo.openRange"
              ></a-input>
              米
            </div>
          </a-form-item>
          <a-form-item label="不同门连续刷卡间隔" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="不同门连续刷卡间隔"
                v-model:value="fromSettingInfo.diffTime"
              ></a-input>
              米
            </div>
          </a-form-item>
          <a-form-item
            label="手机登录异常次数"
            style="margin-left: 30px; margin-bottom: 10px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="天"
                style="width: 150px"
                v-model:value="fromSettingInfo.changePhoneDay"
              ></a-input>
              天
              <span
                style="
                  margin-left: 20px;
                  width: 200px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                更换
                <a-input
                  v-model:value="fromSettingInfo.changePhoneNum"
                  style="width: 150px"
                ></a-input>
                次
              </span>
            </div>
          </a-form-item>
          <a-form-item label="异常开门时间段" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-time-picker
                v-model:value="fromSettingInfo.abnormalStartTime"
                style="width: 150px"
                format="HH:mm"
                valueFormat="HH:mm"
              />
              <ArrowRightOutlined />
              <a-time-picker
                v-model:value="fromSettingInfo.abnormalEndTime"
                style="width: 150px"
                format="HH:mm"
                valueFormat="HH:mm"
              />
            </div>
          </a-form-item>
          <a-form-item
            label="异常人脸"
            style="margin-left: 85px; margin-bottom: 10px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                placeholder="天"
                style="width: 150px"
                v-model:value="fromSettingInfo.faceDay"
              ></a-input>
              天
              <span
                style="
                  margin-left: 20px;
                  width: 200px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                进出
                <a-input
                  v-model:value="fromSettingInfo.faceNum"
                  style="width: 150px"
                ></a-input>
                次
              </span>
            </div>
          </a-form-item>
          <a-form-item
            label="房屋预警:网(用户每周更换手机登录app的次数，网约房判断依据)"
            style="margin-left: 30px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                style="width: 150px"
                v-model:value="fromSettingInfo.phoneWeekNum"
              ></a-input>
              台
            </div>
          </a-form-item>
          <a-form-item
            label="房屋预警:黄（每周昼伏夜出的天数,涉黄判断依据）"
            style="margin-left: 30px; margin-bottom: 10px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                v-model:value="fromSettingInfo.zfycWeekNum"
                style="width: 150px"
              ></a-input>
              天
            </div>
          </a-form-item>
          <a-form-item
            label="房屋预警:诈（满足预警的连续周数）"
            style="margin-left: 30px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                v-model:value="fromSettingInfo.cxWeekNum"
                style="width: 150px"
              ></a-input>
              周
            </div>
          </a-form-item>
          <a-form-item
            label="房屋预警:诈（满足预警的时间段）"
            style="margin-left: 30px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                style="width: 150px"
                v-model:value="fromSettingInfo.cxTime"
              ></a-input>
            </div>
          </a-form-item>
          <a-form-item
            label="房屋预警：新(如果新增的用户来自这些区域，则产生一条房屋预警消息)"
            style="margin-left: 30px; margin-bottom: 10px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                style="width: 150px"
                v-model:value="fromSettingInfo.controlArea"
              ></a-input>
            </div>
          </a-form-item>
          <a-form-item label="周 开门频繁天数" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                style="width: 150px"
                v-model:value="fromSettingInfo.lxKmpfDay"
              ></a-input>
              天
            </div>
          </a-form-item>
          <a-form-item label="访客访问频繁" style="margin-left: 30px">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                style="width: 150px"
                v-model:value="fromSettingInfo.fkfwpfNum"
              ></a-input>
              次
            </div>
          </a-form-item>
          <a-form-item
            label="房屋预警:返(如果用户在最近一次开门之前连续天数内未开门，则产生一条房屋预警，协助疫情防控)"
            style="margin-left: 30px"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <a-input
                style="width: 150px"
                v-model:value="fromSettingInfo.goBackDay"
              ></a-input>
              天
            </div>
          </a-form-item>
          <a-divider>其他配置</a-divider>
          <a-form-item label="标准地址编号" style="margin-left: 50px">
            <a-input
              placeholder="标准地址编号"
              style="width: 150px"
              v-model:value="fromSettingInfo.qrCodeId"
            ></a-input>
          </a-form-item>
          <a-form-item label="备注" style="margin-left: 70px">
            <a-input
              placeholder="备注"
              style="width: 150px"
              v-model:value="fromSettingInfo.remark"
            ></a-input>
          </a-form-item>

          <a-form-item
            label="是否强制定位"
            style="margin-left: 60px; margin-bottom: 10px"
          >
            <a-select
              v-model:value="fromSettingInfo.openPosition"
              :options="haveBuildingUserOptions"
              style="width: 150px"
            ></a-select>
          </a-form-item>
          <a-form-item label="是否有楼栋管理员" style="margin-left: 30px">
            <a-select
              v-model:value="fromSettingInfo.isHaveBuildingUser"
              style="width: 150px"
              :options="haveBuildingUserOptions"
            ></a-select>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal
      width="100%"
      v-model:open="guaranteeInfo"
      title="保障房房屋预警配置"
      :maskClosable="false"
      :confirmLoading="modalLoading"
      @ok="submitSettingBzfInfo"
    >
      <div>
        <a-form :model="formGuaranteeInfo" v-bind="formItemLayout">
          <a-form-item label="小区名">
            {{ formGuaranteeInfo.name }}
          </a-form-item>
          <a-form-item label="房屋预警:空(房屋一定天数内小于一定开门次数)">
            <div>
              <a-input
                placeholder="天"
                style="width: 150px"
                v-model:value="formGuaranteeInfo.emptyDay"
              ></a-input>
              天
              <span style="margin-left: 30px">
                开门
                <a-input
                  v-model:value="formGuaranteeInfo.emptyNum"
                  style="width: 150px"
                  placeholder="次"
                ></a-input>
                次
              </span>
            </div>
          </a-form-item>
          <a-form-item
            label="房屋预警:转(房屋主/共同申请人一定天数内小于一定开门次数)"
          >
            <div>
              <a-input
                placeholder="天"
                style="width: 150px"
                v-model:value="formGuaranteeInfo.mainDay"
              ></a-input>
              天
              <span style="margin-left: 30px">
                开门
                <a-input
                  placeholder="次"
                  v-model:value="formGuaranteeInfo.mainNum"
                  style="width: 150px"
                ></a-input>
                次
              </span>
            </div>
          </a-form-item>
          <a-form-item
            label="房屋预警:转(房屋临时申请人一定天数内大于一定开门次数)"
          >
            <div>
              <a-input
                placeholder="天"
                style="width: 150px"
                v-model:value="formGuaranteeInfo.tempDay"
              ></a-input>
              天
              <span style="margin-left: 30px">
                开门
                <a-input
                  v-model:value="formGuaranteeInfo.tempNum"
                  style="width: 150px"
                  placeholder="次"
                ></a-input>
                次
              </span>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
  import {
    SearchOutlined,
    SyncOutlined,
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
    ArrowRightOutlined,
  } from '@ant-design/icons-vue'
  import Modal from '@/components/Modal.vue'
  import {
    addVillage,
    delVillageInfoItem,
    editVillage,
    getVillageInformList,
    getProvinceToStreet,
    hasVillage,
    editTableItem,
    submitSetting,
    submitSettingBzf,
  } from '@/api/community'
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import { useSimpleRequest } from '@/hooks/useSimpleRequest'
  import { reactive, ref } from 'vue'
  import { getDictionary } from '@/api/system'
  import { messageContent } from '@/utils/message'
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
    startTime: undefined,
    endTime: undefined,
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
    requestObj,
    villageList,
    handleTableChange,
  } = useTableInit({
    getTableList: getVillageInformList,
    tableObj: buildObj,
    delTableEle: delVillageInfoItem,
  })
  const {
    modalRef,
    formRef,
    handleChange,
    formItemLayout,
    formState,
    handleCreate,
    submit,
    editId,
    titleValue,
  } = useInitFrom({
    form: {
      id: '',
      name: '',
      provieceCode: undefined,
      cityCode: undefined,
      districtCode: undefined,
      streetCode: undefined,
      poProvieceCode: undefined,
      poCityCode: undefined,
      poDistrictCode: undefined,
      poStreetCode: undefined,
      address: '',
      villageType: '1',
      type: '0',
      weight: undefined,
      status: '0',
      isAddUser: '0',
      addUser: '',
    },
    addList: addVillage,
    editList: editVillage,
    onlyName: hasVillage,
    getData,
    requestObj,
  })
  const dateFormat = 'YYYY-MM-DD'
  const columns = [
    {
      title: '小区名称',
      dataIndex: 'name',
    },
    {
      title: '城市',
      dataIndex: 'city',
    },
    {
      title: '街道',
      dataIndex: 'street',
    },
    {
      title: '物业电话',
      dataIndex: 'mobile',
    },
    {
      title: '排序',
      dataIndex: 'weight',
      width: 20,
    },
    {
      title: '是否需要实名',
      dataIndex: 'isReal',
    },
    {
      title: '类型',
      dataIndex: 'villageType',
    },
    {
      title: '时间',
      dataIndex: 'addTime',
    },

    {
      title: '操作',
      dataIndex: 'operation',
    },
  ]
  const statusOptions = [
    {
      value: '0',
      label: '正常',
    },
    {
      value: '1',
      label: '异常(开门和关门搜索不到)',
    },
  ]
  const isAddUserOptions = [
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
    address: [{ required: true, message: '请输入地址' }],
    cityCode: [{ required: true, message: '请选择城市' }],
    streetCode: [{ required: true, message: '请选择街道' }],
  }
  const villageTypeOptions = [
    {
      value: '1',
      label: '小区/大厦',
    },
    {
      value: '2',
      label: '独栋自建楼房',
    },
    {
      value: '3',
      label: '公司',
    },
    {
      value: '4',
      label: '保障房',
    },
  ]
  const villageOpenTypeOptions = [
    {
      value: '0',
      label: '开放小区',
    },
    {
      value: '1',
      label: '私密小区',
    },
    {
      value: '3',
      label: '建发小区',
    },
  ]
  const formProvinceList = ref([])
  const formPoProvinceList = ref([])
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
  getProvinceToStreet({}).then((res) => {
    formProvinceList.value = res.result.provieceList.map((item) => {
      return {
        ...item,
        value: item.dicCode,
        label: item.dicName,
      }
    })
    const poProvinceList = res.result.poProvieceList.map((item) => {
      return {
        ...item,
        value: item.dicCode,
        label: item.dicName,
      }
    })
    formPoProvinceList.value = [
      {
        value: '',
        label: '无',
        childCode: 'PO',
      },
    ].concat(poProvinceList)
  })
  const addUser = ref([])
  const changeItem = async (record) => {
    record.changeLoading = true
    editTableItem({ id: record.id }).then((res) => {
      addUser.value = res.result.pd.addUser
    })
    await cityToStreet(record.provieceCode, { childCode: 'DQ' }, 'city', true)
    await cityToStreet(record.cityCode, { childCode: 'DQ' }, 'district', true)
    await cityToStreet(record.districtCode, { childCode: 'DQ' }, 'street', true)
    await cityToStreet(record.poProvieceCode, { childCode: 'PO' }, 'city', true)
    await cityToStreet(record.poCityCode, { childCode: 'PO' }, 'district', true)
    //最后一个使用api请求是为了避免打开弹窗有一瞬间的闪烁
    getDictionary({
      dicCode: record.poDistrictCode,
      grade: 'street',
      childCode: 'PO',
    }).then(() => {
      handleChange(record)
    })
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
    if (editId.value === 0) {
      const submitState = { ...formState, weight: formState.weight?.toString() }
      submit(submitState)
    } else {
      const submitState = { ...formState, weight: formState.weight?.toString() }
      const onlyNameObj = {
        name: formState.name,
        streetCode: formState.streetCode,
        id: formState.id,
      }
      submit(submitState, onlyNameObj)
    }
  }
  const cityToStreet = (value, options, type, isForm = false) => {
    let changeList
    if (options.childCode == 'DQ') {
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
      simpleRequest({
        requestFun: getDictionary,
        requestObj: {
          dicCode: value,
          grade: type,
          childCode: options.childCode,
        },
        isForm,
        tableList: changeList,
        formList: changeList,
        labelString: 'dicName',
        valueString: 'dicCode',
      })
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
  const close = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  }
  const basicInfo = ref(false)
  const fromSettingInfo = reactive({
    name: '',
    id: '',
    visitorPermission: [],
    unCheck: undefined,
    isReal: undefined,
    isIdentity: undefined,
    isNeedFace: undefined,
    contacts: '',
    mobile: '',
    noOpen: '',
    cardDayNum: '',
    weekOpenNum: '',
    houseWeekOpenNum: '',
    visitorDayNum: '',
    temporaryVisitorTime: '',
    longRentNum: '',
    companyNum: '',
    faceUnknownNum: '',
    cardTotalNum: '',
    goBackDay: '',
    fkfwpfNum: '',
    openRange: '',
    controlArea: '',
    changePhoneDay: '',
    cxTime: '',
    changePhoneNum: '',
    abnormalStartTime: '',
    diffTime: '',
    abnormalEndTime: '',
    faceDay: '',
    lxKmpfDay: '',
    faceNum: '',
    phoneWeekNum: '',
    zfycWeekNum: '',
    cxWeekNum: '',
    noOpenTime1: '',
    noOpenTime2: '',
    noOpenTime3: '',
    noOpenTime4: '',
    countLongNoOpen: '',
    validityHolder: '',
    validityFamily: '',
    validityTenant: '',
    validityEmployer: '',
    validityServant: '',
    validityGuaranteeMain: '',
    validityGuaranteeJointly: '',
    validityGuaranteeTemporary: '',
    validityPublicTemporary: '',
    validityPublicMain: '',
    validityPublicJointly: '',
    openPosition: '',
    isHaveBuildingUser: '',
    remark: '',
    qrCodeId: '',
  })
  const realOptions = [
    {
      value: '0',
      label: '否',
    },
    {
      value: '1',
      label: '是',
    },
  ]

  const countLongNoOpenOptions = [
    {
      value: '0',
      label: '否',
    },
    {
      value: '1',
      label: '是',
    },
  ]
  const needFaceOptions = [
    {
      value: '0',
      label: '否',
    },
    {
      value: '1',
      label: '是',
    },
  ]
  const identityOptions = [
    {
      value: '0',
      label: '否',
    },
    {
      value: '1',
      label: '是',
    },
  ]
  const haveBuildingUserOptions = [
    {
      value: '0',
      label: '否',
    },
    {
      value: '1',
      label: '是',
    },
  ]

  const checkOptions = [
    {
      value: '0',
      label: '要审核',
    },
    {
      value: '1',
      label: '免审核',
    },
  ]
  const visitorPermissionOptions = [
    {
      value: '1',
      label: '手机开门',
    },
    {
      value: '2',
      label: '密码开门',
    },
    {
      value: '3',
      label: '扫码开门',
    },
    {
      value: '4',
      label: '人脸开门',
    },
  ]

  const otherInfo = ref(false)
  const showVisitorInfo = (record) => {
    basicInfo.value = true
    for (let fromVisitorInfoKey in record) {
      if (fromVisitorInfoKey == 'noOpenTime') {
        const noOpenTime = JSON.parse(record.noOpenTime)
        fromSettingInfo.noOpenTime1 = noOpenTime[1]
        fromSettingInfo.noOpenTime2 = noOpenTime[2]
        fromSettingInfo.noOpenTime3 = noOpenTime[3]
        fromSettingInfo.noOpenTime4 = noOpenTime[4]
      } else if (fromVisitorInfoKey === 'visitorPermission') {
        fromSettingInfo[fromVisitorInfoKey] =
          record[fromVisitorInfoKey].split(',')
      } else if (fromVisitorInfoKey == 'validity') {
        const validity = JSON.parse(record.validity)
        fromSettingInfo.validityHolder = validity[0].toString()
        fromSettingInfo.validityFamily = validity[1].toString()
        fromSettingInfo.validityTenant = validity[2].toString()
        fromSettingInfo.validityEmployer = validity[21].toString()
        fromSettingInfo.validityServant = validity[22].toString()
        fromSettingInfo.validityGuaranteeMain = validity[31].toString()
        fromSettingInfo.validityGuaranteeJointly = validity[32].toString()
        fromSettingInfo.validityGuaranteeTemporary = validity[33].toString()
        fromSettingInfo.validityPublicMain = validity[41].toString()
        fromSettingInfo.validityPublicJointly = validity[42].toString()
        fromSettingInfo.validityPublicTemporary = validity[43].toString()
      } else if (
        fromVisitorInfoKey == 'name' ||
        fromVisitorInfoKey == 'mobile' ||
        fromVisitorInfoKey == 'isReal' ||
        fromVisitorInfoKey == 'contacts' ||
        fromVisitorInfoKey == 'unCheck' ||
        fromVisitorInfoKey == 'isNeedFace' ||
        fromVisitorInfoKey == 'id' ||
        fromVisitorInfoKey == 'isIdentity'
      ) {
        fromSettingInfo[fromVisitorInfoKey] = record[fromVisitorInfoKey]
      } else {
        continue
      }
    }
  }
  const showOtherInfo = (record) => {
    otherInfo.value = true
    for (let fromVisitorInfoKey in record) {
      if (fromVisitorInfoKey == 'noOpenTime') {
        const noOpenTime = JSON.parse(record.noOpenTime)
        fromSettingInfo.noOpenTime1 = noOpenTime[1]
        fromSettingInfo.noOpenTime2 = noOpenTime[2]
        fromSettingInfo.noOpenTime3 = noOpenTime[3]
        fromSettingInfo.noOpenTime4 = noOpenTime[4]
      } else if (
        fromVisitorInfoKey == 'qrCodeId' ||
        fromVisitorInfoKey == 'remark' ||
        fromVisitorInfoKey == 'openPosition' ||
        fromVisitorInfoKey == 'isHaveBuildingUser' ||
        fromVisitorInfoKey == 'countLongNoOpen' ||
        fromVisitorInfoKey == 'id' ||
        fromVisitorInfoKey == 'name'
      ) {
        fromSettingInfo[fromVisitorInfoKey] = record[fromVisitorInfoKey]
      } else {
        continue
      }
    }
  }
  const modalLoading = ref(false)
  const submitSettingInfo = async () => {
    modalLoading.value = true
    await submitSetting({
      ...fromSettingInfo,
      visitorPermission: fromSettingInfo.visitorPermission.join(','),
      noOpenTime1: fromSettingInfo.noOpenTime1,
      noOpenTime2: fromSettingInfo.noOpenTime2,
      noOpenTime3: fromSettingInfo.noOpenTime3,
      noOpenTime4: fromSettingInfo.noOpenTime4,
    })
    await getData(requestObj)
    basicInfo.value = false
    otherInfo.value = false
    modalLoading.value = false
    messageContent('success', '成功修改配置信息')
  }

  const guaranteeInfo = ref(false)
  const formGuaranteeInfo = reactive({
    id: '',
    name: '',
    emptyDay: '',
    emptyNum: '',
    mainDay: '',
    mainNum: '',
    tempDay: '',
    tempNum: '',
  })
  const showGuaranteeInfo = (record) => {
    guaranteeInfo.value = true
    for (let recordKey in record) {
      if (recordKey == 'id' || recordKey == 'name') {
        formGuaranteeInfo[recordKey] = record[recordKey]
      } else if (recordKey == 'bzfWarm') {
        const bzf = JSON.parse(record.bzfWarm)
        formGuaranteeInfo.emptyNum = bzf.emptyNum
        formGuaranteeInfo.emptyDay = bzf.emptyDay
        formGuaranteeInfo.mainNum = bzf.mainNum
        formGuaranteeInfo.mainDay = bzf.mainDay
        formGuaranteeInfo.tempDay = bzf.tempDay
        formGuaranteeInfo.tempNum = bzf.tempNum
      } else {
        continue
      }
    }
  }
  const submitSettingBzfInfo = async () => {
    modalLoading.value = true
    await submitSettingBzf({
      ...formGuaranteeInfo,
    })
    await getData(requestObj)
    modalLoading.value = false
    guaranteeInfo.value = false
    messageContent('success', '成功修改保障房配置信息')
  }
</script>

<style scoped lang=""></style>
