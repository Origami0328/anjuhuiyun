<template>
  <div class="capability">
    <a-space direction="vertical">
      <a-space>
        <a-input
          placeholder="输入关键词"
          v-model:value="requestObj.searchName"
        ></a-input>
        <a-button type="primary" @click="searchTableItem">
          <SearchOutlined />
        </a-button>
      </a-space>
      <a-space>
        <a-button type="primary" @click="openModal('新增')">新增</a-button>
        <a-popconfirm
          title="确定要删除选中项吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="multipleDel"
        >
          <a-button
            style="background-color: red; width: 70px; text-align: center"
            size="middle"
          >
            <template #icon>
              <DeleteOutlined style="color: #fff" />
            </template>
          </a-button>
        </a-popconfirm>
      </a-space>
    </a-space>
    <div style="margin-top: 10px">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :row-selection="{
          selectedRowKeys: state.selectedRowKeys,
          onChange: onSelectChange,
        }"
        :pagination="paginationInfo"
        bordered
        :loading="tableLoading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex == 'operation'">
            <div>
              <a-button type="link" @click="openModal('修改', record)">
                修改
              </a-button>
              <a-popconfirm
                title="确定要删除选中项吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="delTableItem(record)"
              >
                <a-button type="link">删除</a-button>
              </a-popconfirm>
            </div>
          </template>
          <template v-else-if="column.dataIndex == 'imageUrl'">
            <img
              :src="record.imageUrl"
              alt=""
              style="width: 70px; height: 70px"
            />
          </template>
        </template>
      </a-table>
    </div>
    <a-modal v-model:open="open" :title="title" :maskClosable="false">
      <a-form
        :model="formState"
        v-bind="formItemLayout"
        :rules="rules"
        ref="formRef"
      >
        <a-form-item label="名称" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="名称"
            style="width: 150px"
          />
        </a-form-item>

        <a-form-item label="编码" name="code">
          <a-input
            v-model:value="formState.code"
            placeholder="编码"
            style="width: 150px"
          />
        </a-form-item>

        <a-form-item label="图标">
          <div style="display: flex">
            <div v-if="formState.imageUrl !== ''" style="position: relative">
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
              accept="image/png, image/jpeg"
              list-type="picture-card"
              :maxCount="1"
              :beforeUpload="beforeUpload"
              :showUploadList="{
                showPreviewIcon: false,
                showRemoveIcon: true,
              }"
              v-model:file-list="formState.fileList"
            >
              <PlusOutlined style="font-size: 22px" />
            </a-upload>
          </div>
        </a-form-item>

        <a-form-item label="排序" name="sort">
          <a-input-number
            v-model:value="formState.sort"
            placeholder="排序"
            style="width: 150px"
          />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button type="primary" @click="onSubmit" :loading="btnLoading">
          确认
        </a-button>
        <a-button @click="cancel">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
  import {
    SearchOutlined,
    DeleteOutlined,
    PlusOutlined,
  } from '@ant-design/icons-vue'
  const searchObj = {
    searchName: '',
  }
  import { computed, reactive, ref, toRaw } from 'vue'
  import {
    addVillageItem,
    delAllVillageItem,
    delVillageItem,
    editVillageItem,
    getvillageFunction,
  } from '@/api/community'
  import { messageContent } from '@/utils/message'
  import { useTableInit } from '@/hooks/useTableComponent'
  const {
    tableLoading,
    dataSource,
    requestObj,
    state,
    onSelectChange,
    getData,
    delTableItem,
    searchTableItem,
    paginationInfo,
    multipleDel,
    handleTableChange,
  } = useTableInit({
    getTableList: getvillageFunction,
    tableObj: searchObj,
    delTableEle: delVillageItem,
    allDel: delAllVillageItem,
  })
  const formItemLayout = computed(() => {
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
  const columns = [
    {
      title: '编号',
      dataIndex: 'No',
      align: 'center',
      width: '10%',
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      width: '15%',
    },
    {
      title: '编码',
      dataIndex: 'code',
      align: 'center',
      width: '20%',
    },
    {
      title: '图标',
      dataIndex: 'imageUrl',
      align: 'center',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: 'center',
      sorter: (a, b) => a.sort - b.sort,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
    },
  ]
  // const delAllTaBleItem = async () => {
  //   tableLoading.value = true
  //   await delAllVillageItem({ ids: state.ids.join(',') })
  //   await getData(requestObj)
  //   state.selectedRowKeys = []
  //   state.ids = []
  //   tableLoading.value = false
  //   messageContent('success', '删除表单项成功')
  // }
  const open = ref(false)
  const formState = reactive({
    name: '',
    code: '',
    id: '',
    sort: '',
    fileList: ref([]),
    photoSrc: null,
    imageUrl: '',
  })

  const beforeUpload = (file) => {
    formState.photoSrc = file
    return false
  }
  const rules = {
    name: [{ required: true, message: '请输入用户名', trigger: 'change' }],
    sort: [{ required: true, message: '请输入排序', trigger: 'change' }],
    code: [{ required: true, message: '请输入编码', trigger: 'change' }],
  }
  const formRef = ref()
  const btnLoading = ref(false)
  const onSubmit = async () => {
    formRef.value
      .validate()
      .then(async () => {
        btnLoading.value = true
        console.log('values', toRaw(formState))

        // 发送新增或者修改请求
        if (title.value == '新增') {
          // 调用新增接口
          const formData = new FormData()
          for (let formStateKey in formState) {
            formData.append(formStateKey, formState[formStateKey])
          }
          await addVillageItem(formData)
          messageContent('success', '新增表格项成功')
        } else if (title.value == '修改') {
          // 调用修改接口
          const formData = new FormData()
          for (let formStateKey in formState) {
            formData.append(formStateKey, formState[formStateKey])
          }
          await editVillageItem(formData)
          messageContent('success', '修改表格项成功')
        }
        await getData(requestObj)
        //重新刷新页面
        cancel()
        btnLoading.value = false
      })
      .catch((error) => {
        console.log('error', error)

        return
      })
  }
  const cancel = () => {
    for (let formStateKey in formState) {
      formState[formStateKey] = ''
      if (formStateKey == 'fileList') formState[formStateKey] = []
    }
    open.value = false
  }
  const title = ref('')
  const openModal = (value, tableItem = undefined) => {
    title.value = value
    open.value = true
    if (tableItem != undefined) {
      // 点击修改而进入modal
      formState.id = tableItem.id
      formState.name = tableItem.name
      formState.code = tableItem.code
      formState.sort = tableItem.sort
      formState.imageUrl = tableItem.imageUrl
    }
  }
  const delItemImage = () => {
    formState.imageUrl = ''
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
