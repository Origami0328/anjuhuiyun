<template>
  <div class="platformUser">
    <a-card>
      <div style="height: 32px">
        <a-input-search
          v-model:value="value"
          placeholder="这里输入关键词"
          enter-button
          @search="onSearch"
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input-search>

        <a-button class="button" type="primary" @click="refresh">
          <template #icon><sync-outlined /></template>
        </a-button>
        <a-button class="button add" @click="openAdd">新增</a-button>
      </div>
      <div class="table">
        <a-table
          :row-selection="{
            selectedRowKeys: state.selectedRowKeys,
            onChange: onSelectChange,
            getCheckboxProps: getCheckboxProps,
          }"
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'Ad'">
              <span style="display: flex; justify-content: space-around">
                <a href="" @click.prevent="showCLick(record)">修改</a>
                <a href="" @click.prevent="showCLick(record)">删除</a>
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    <Modal title="新增" ref="ModalRef" footer="">
      <a-form
        :model="formState"
        v-bind="formItemLayout"
        :rules="rules"
        ref="formRef"
      >
        <a-form-item label="用户名:" name="username">
          <a-input
            v-model:value="formState.username"
            placeholder="请输入用户名"
          ></a-input>
        </a-form-item>
        <a-form-item label="手机号:" name="phone">
          <a-input v-model:value="formState.phone" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item label="密码:" name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item label="账号类型:" name="type">
          <a-select
            v-model:value="formState.type"
            style="width: 236px"
            placeholder="请选择账号类型"
          >
            <a-select-option
              v-for="item in type"
              :key="item.key"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="省份:"
          v-if="formState.type >= 1 && formState.type <= 4"
        >
          <a-select
            show-search
            style="width: 236px"
            placeholder="请选择省份"
            :default-active-first-option="false"
            :filter-option="filterOption"
            :show-arrow="false"
            :options="typeInfo"
            @change="handleChange"
          ></a-select>
        </a-form-item>
        <a-form-item
          label="市:"
          v-if="formState.type >= 2 && formState.type <= 4"
        >
          <a-select v-model:value="formState.city" style="width: 236px">
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="区县:"
          v-if="formState.type >= 3 && formState.type <= 4"
        >
          <a-select v-model:value="formState.district" style="width: 236px">
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="街道:"
          v-if="formState.type >= 4 && formState.type <= 4"
        >
          <a-select v-model:value="formState.stree" style="width: 236px">
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="小区:" v-if="formState.type == 5">
          <a-select
            v-model:value="formState.community"
            show-search
            mode="multiple"
            style="width: 236px"
            placeholder="请选择省份"
            :default-active-first-option="false"
            :show-arrow="false"
            :options="typeInfo"
            @change="handleChange"
          ></a-select>
        </a-form-item>
        <a-form-item label="状态:" name="status">
          <a-select v-model:value="formState.status" style="width: 236px">
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="导出Excel权限:" name="excel">
          <a-select v-model:value="formState.excel" style="width: 236px">
            <a-select-option
              :value="item.value"
              v-for="item in exportExcel"
              :key="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="导出数据权限(慎开):" name="data">
          <a-select v-model:value="formState.data" style="width: 236px">
            <a-select-option
              :value="item.value"
              v-for="item in exportExcel"
              :key="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary" @click="onSubmit">保存</a-button>
          <a-button style="margin-left: 16px" @click="cancel">取消</a-button>
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup>
  import { computed, reactive, ref, toRaw } from 'vue'
  import Modal from '@/components/Modal.vue'
  import { SyncOutlined, SearchOutlined } from '@ant-design/icons-vue'
  const formRef = ref('')
  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'change' },
      {
        min: 3,
        max: 5,
        message: '用户名长度应在3-5字符之间',
        trigger: 'blur',
      },
    ],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'change' },
      {
        pattern: /^1[3456789]\d{9}$/,
        message: '请输入正确的手机号格式',
        trigger: 'blur',
      },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'change' },
      { min: 6, message: '密码长度不能少于6位' },
      { max: 20, message: '密码长度不能超过20位' },
    ],
    type: [{ required: true, message: '请选择账号类型', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    excel: [
      {
        required: true,
        message: '请选择是否具有导出Excel权限',
        trigger: 'change',
      },
    ],
    data: [
      {
        required: true,
        message: '请选择是否具有导出数据权限',
        trigger: 'change',
      },
    ],
  }
  const value = ref('')
  const onSearch = (value) => {
    //调用搜索接口
    console.log('搜索', value.value)
  }
  const refresh = () => {
    // 调用获取数据接口
    console.log('刷新')
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'no',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '账号类型',
      dataIndex: 'type',
    },
    {
      title: '账号状态',
      dataIndex: 'status',
    },
    {
      title: '管辖区域',
      dataIndex: 'area',
      resizable: true,
      width: 200,
      minWidth: 200,
      maxWidth: 400,
    },
    {
      title: '导出excel权限',
      dataIndex: 'excel',
    },
    {
      title: '导出数据权限',
      dataIndex: 'data',
    },
    {
      title: '操作',
      dataIndex: 'Ad',
    },
  ]
  const showCLick = (e) => {
    console.log(e)
  }
  const getCheckboxProps = (record) => ({
    // Column configuration not to be checked
    name: record.name,
    // disabled: true,
  })
  const data = []
  for (let i = 0; i < 98; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    })
  }
  const pagination = {
    current: 2,
    pageSize: 10,
    showQuickJumper: true,
    showSizeChanger: true,
  }
  const state = reactive({
    selectedRowKeys: [],
    loading: false,
  })

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    state.selectedRowKeys = selectedRowKeys
  }
  const handleTableChange = (p, filters, sorter) => {
    pagination.current = p.current
    // 当分页、筛选或排序发生变化时，该方法会被调用
    console.log('pagination:', p)
    console.log('filters:', filters)
    console.log('sorter:', sorter)
  }
  const ModalRef = ref('')
  const openAdd = () => {
    ModalRef.value.open()
  }
  let formState = reactive({
    layout: 'horizontal',
    username: '',
    phone: '',
    type: '',
    password: '',
    status: '',
    data: '',
    excel: '',
    province: '', //省级
    city: '', //市级
    district: '', //区级
    stree: '', //街道
    community: [], //小区
  })
  const formItemLayout = computed(() => {
    const { layout } = formState
    return layout === 'horizontal'
      ? {
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 12,
          },
        }
      : {}
  })
  const buttonItemLayout = computed(() => {
    const { layout } = formState
    return layout === 'horizontal'
      ? {
          wrapperCol: {
            span: 20,
            offset: 8,
          },
        }
      : {}
  })

  const exportExcel = [
    {
      value: 0,
      label: '是',
    },
    {
      value: 1,
      label: '否',
    },
  ]
  const type = [
    {
      value: 1,
      key: 1,
      label: '省级',
    },
    {
      value: 2,
      key: 2,
      label: '市级',
    },
    {
      value: 3,
      key: 3,
      label: '区级',
    },
    {
      value: 4,
      key: 4,
      label: '街道',
    },
    {
      value: 5,
      key: 5,
      label: '小区',
    },
  ]
  let typeInfo = [
    {
      value: '省级',
      key: 1,
      label: '省级',
    },
    {
      value: '市级',
      key: 2,
      label: '市级',
    },
    {
      value: '区级',
      key: 3,
      label: '区级',
    },
    {
      value: '街道',
      key: 4,
      label: '街道',
    },
    {
      value: '小区',
      key: 5,
      label: '小区',
    },
  ]
  const onSubmit = () => {
    console.log(formState)
    console.log(toRaw(formState))
    formRef.value
      .validate()
      .then(() => {
        console.log('values', formState, toRaw(formState))

        // 发送新增信息请求

        //重新刷新页面

        ModalRef.value.close()
        resetFormState()
      })
      .catch((error) => {
        console.log('error', error)

        return
      })
  }
  const cancel = () => {
    ModalRef.value.close()
    formRef.value.clearValidate()
    resetFormState()
  }
  const resetFormState = () => {
    formState = reactive({
      layout: 'horizontal',
      username: '',
      phone: '',
      type: '',
      password: '',
      status: '',
      data: '',
      excel: '',
      province: '', //省级
      city: '', //市级
      district: '', //区级
      stree: '', //街道
      community: [], //小区
    })
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`)
    const province = typeInfo.filter((item) => item.value == value)
    console.log(province)
    formState.province = province[0].key
    console.log(formState.province)
  }
  const filterOption = (inputValue, option) => {
    console.log(inputValue, option)
  }
</script>

<style scoped lang="less">
  .platformUser {
    .table {
      margin-top: 3px;
    }
    .button {
      margin-left: 7px;
      width: 50px;
    }
    .add {
      width: 70px;
      background-color: #1890ff;
      color: white;
    }
  }
</style>
