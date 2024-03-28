<template>
  <div class="">
    <a-space direction="vertical">
      <a-space>
        <a-button type="primary" style="width: 100px" @click="handleCreate">
          <template #icon><PlusOutlined /></template>
          新增
        </a-button>
      </a-space>
    </a-space>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="tableLoading"
      bordered
    >
      <template v-slot:emptyText>
        <div style="text-align: center; padding: 20px; font-size: 30px">
          正在为您加载数据
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template
          v-if="column.dataIndex == 'operation' && record.operation == ''"
        >
          <a-popconfirm
            title="确定要删除该表格项吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="delTableItem(record)"
          >
            <a-button type="link" :loading="record.delLoading">删除</a-button>
          </a-popconfirm>
        </template>
        <template v-else-if="column.dataIndex == 'rightType'">
          <a-tag color="orange" v-if="record.rightType == '1'">读写</a-tag>
          <a-tag color="green" v-if="record.rightType == '0'">只读</a-tag>
        </template>
      </template>
    </a-table>
    <Modal
      :title="titleValue"
      ref="modalRef"
      @handleOk="submit"
      @closeModal="close"
    >
      <a-form
        :model="formState"
        v-bind="formItemLayout"
        :rules="rules"
        ref="formRef"
      >
        <a-form-item label="名称" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="请输入api名称"
            style="width: 300px"
          ></a-input>
        </a-form-item>
        <a-form-item label="菜单" name="menuRightId">
          <a-cascader
            v-model:value="formState.menuRightId"
            :options="menuList"
            placeholder="请选择菜单"
            change-on-select
            style="width: 300px"
          />
        </a-form-item>
        <a-form-item label="url" name="url">
          <a-input
            v-model:value="formState.url"
            style="width: 300px"
            placeholder="请输入url"
          ></a-input>
        </a-form-item>
        <a-form-item label="排序" name="sort">
          <a-input-number
            v-model:value="formState.sort"
            style="width: 150px"
          ></a-input-number>
        </a-form-item>
        <a-form-item label="权限" name="rightType">
          <a-radio-group v-model:value="formState.rightType" name="radioGroup">
            <a-radio value="0">只读</a-radio>
            <a-radio value="1" :style="radioStyle">读写</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'apiManager',
  }
</script>
<script setup>
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { addApi, delApi, getApi } from '@/api/system'
  import { computed, reactive, ref } from 'vue'
  import Modal from '@/components/Modal.vue'
  import { useInitFrom } from '@/hooks/useTableComponent'
  import { message } from 'ant-design-vue'
  const { titleValue, modalRef } = useInitFrom()
  const formRef = ref()
  const rules = {
    name: [{ required: true, message: '请输入角色名称' }],
    url: [{ required: true, message: '请输入排序' }],
    menuRightId: [{ required: true, message: '请输入菜单级别' }],
    sort: [{ required: true, message: '请输入排序' }],
    rightType: [{ required: true, message: '请输入排序' }],
  }
  const tableLoading = ref(false)
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: '300px',
      align: 'center',
    },
    {
      title: 'api名称',
      dataIndex: 'apiName',
      width: '300px',
      align: 'center',
    },
    {
      title: '请求地址',
      dataIndex: 'url',
      width: '500px',
      align: 'center',
    },

    {
      title: '权限',
      dataIndex: 'rightType',
      width: '200px',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '200px',
      align: 'center',
    },
  ]
  const formState = reactive({
    name: '',
    url: '',
    sort: '',
    rightType: '',
    menuRightId: [],
  })
  const formItemLayout = computed(() => {
    const layout = 'horizontal'
    return layout === 'horizontal'
      ? {
          labelCol: {
            span: 6,
          },
          wrapperCol: {
            span: 12,
          },
        }
      : {}
  })
  const radioStyle = reactive({
    marginLeft: '30px',
  })
  const dataSource = ref([])
  const menuList = ref([])
  // 对服务端返回数据的部分处理
  const handleDataSourceArray = (children) => {
    const tranArray = children?.map((item) => {
      if (item.apiList) {
        // 二级菜单的处理
        return {
          ...item,
          key: item.id,
          children: item.apiList?.map((itemApi) => {
            return {
              ...itemApi,
              apiName: itemApi.name,
              name: undefined,
              operation: '',
              delLoading: false,
              key: itemApi.id,
            }
          }),
        }
      } else if (item.children) {
        //三级菜单的处理
        return {
          ...item,
          key: item.id,
          children: item.children?.map((itemApi) => {
            if (itemApi.apiList) {
              return {
                ...itemApi,
                key: itemApi.id,
                children: itemApi.apiList?.map((itemAPI) => {
                  return {
                    ...itemAPI,
                    operation: '',
                    apiName: itemAPI.name,
                    name: undefined,
                    delLoading: false,
                    key: itemAPI.id,
                  }
                }),
              }
            }
          }),
        }
      }
    })

    return tranArray
  }
  function transformArray(arr) {
    return arr.map((item) => {
      const newItem = {
        ...item,
        label: item?.name,
        value: item?.id,
        key: item?.id,
      }
      delete newItem.name
      if (item?.children && item.children.length > 0) {
        newItem.children = transformArray(item.children)
      }
      return newItem
    })
  }

  const getApiLIst = () => {
    tableLoading.value = true
    getApi().then((res) => {
      let apiList = []
      apiList = res.result.map((item) => {
        if (item.apiList) {
          // 一级菜单的处理
          return {
            ...item,
            key: item.id,
            children: item.apiList?.map((itemApi) => {
              return {
                ...itemApi,
                delLoading: false,
                apiName: itemApi.name,
                name: undefined,
                operation: '',
                key: itemApi.id,
              }
            }),
          }
        } else {
          return {
            ...item,
            key: item.id,
            children: handleDataSourceArray(item.children),
          }
        }
      })
      dataSource.value = apiList

      // 转换数组
      const transformedData = transformArray(res.result)
      menuList.value = transformedData
    })
    tableLoading.value = false
  }
  getApiLIst()
  const handleCreate = () => {
    modalRef.value.open()
  }
  const delTableItem = async (record) => {
    record.delLoading = true
    await delApi({ apiId: record.id })
    record.delLoading = false
    await getApiLIst()
  }

  const clearForm = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
    for (let formStateKey in formState) {
      if (formStateKey == 'menuRightId') {
        formState[formStateKey] = []
      } else {
        formState[formStateKey] = ''
      }
    }
  }
  const submit = () => {
    modalRef.value.showLoading()
    formRef.value
      .validate()
      .then(async () => {
        await addApi({
          ...formState,
          menuId: formState.menuRightId[formState.menuRightId.length - 1],
          sort: 1,
        })
        await getApiLIst()
        modalRef.value.close()
        clearForm()
        message.success('新增表单项成功')
      })
      .finally(() => {
        modalRef.value.hideLoading()
      })
  }
  const close = () => {
    clearForm()
    modalRef.value.close()
  }
</script>

<style scoped lang=""></style>
