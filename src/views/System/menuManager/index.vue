<template>
  <div class="role">
    <a-space direction="vertical">
      <a-space>
        <a-button type="primary" style="width: 100px" @click="createTableItem">
          <template #icon><PlusOutlined /></template>
          新增
        </a-button>
      </a-space>
      <a-space>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :loading="tableLoading"
          :pagination="false"
          empty-text="No Data"
          bordered
        >
          <template v-slot:emptyText>
            <div style="text-align: center; padding: 20px; font-size: 30px">
              正在为您加载数据
            </div>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'operation'">
              <a-popconfirm
                title="您确定要删除该菜单吗"
                ok-text="确认"
                cancel-text="取消"
                @confirm="confirm(record)"
              >
                <a-button
                  type="link"
                  :loading="record.delLoading"
                  style="color: red"
                >
                  删除
                </a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </a-space>
    </a-space>
    <Modal
      :title="titleValue"
      ref="modalRef"
      @handleOk="submit"
      @closeModal="clear"
      :bodyStyle="false"
    >
      <div style="height: 100%; overflow: auto; overflow-x: hidden">
        <a-form
          :model="formState"
          v-bind="formItemLayout"
          :rules="rules"
          ref="formRef"
        >
          <a-form-item label="菜单名称" name="name">
            <a-input
              v-model:value="formState.name"
              placeholder="请输入菜单名称"
              style="width: 200px"
            />
          </a-form-item>
          <a-form-item label="code" name="code">
            <a-input
              v-model:value="formState.code"
              placeholder="请输入code"
              style="width: 200px"
            ></a-input>
          </a-form-item>
          <a-form-item label="菜单级别" name="level">
            <a-select
              v-model:value="formState.level"
              style="width: 200px"
              :options="menuLevel"
              @select="showLevel"
            ></a-select>
          </a-form-item>
          <a-form-item
            label="顶级菜单"
            name="topLevel"
            v-if="formState.level && formState.level != 1"
          >
            <a-select
              v-model:value="formState.topLevel"
              style="width: 200px"
              :options="topLevel"
              @change="topLevelFn"
            ></a-select>
          </a-form-item>
          <a-form-item
            label="二级菜单"
            name="secondLevel"
            v-if="formState.level && formState.level == 3"
          >
            <a-select
              v-model:value="formState.secondLevel"
              style="width: 200px"
              :options="secondLevel"
              @change="secondLevelFn"
            ></a-select>
          </a-form-item>
          <a-form-item label="排序" name="sort">
            <a-input
              v-model:value="formState.sort"
              placeholder="排序越小越靠前"
              :min="1"
              style="width: 200px"
            />
          </a-form-item>
        </a-form>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'menuManager',
  }
</script>
<script setup>
  import { PlusOutlined } from '@ant-design/icons-vue'
  import Modal from '@/components/Modal.vue'
  import { useInitFrom } from '@/hooks/useTableComponent'
  import { computed, reactive, ref } from 'vue'
  import { addMenu, delMenu, getMenu, getMenuTree } from '@/api/system'
  // import { message } from 'ant-design-vue'
  import { messageContent } from '@/utils/message'

  const formRef = ref()
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: '250px',
    },
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
      width: '500px',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '500px',
      align: 'center',
      key: 'address',
    },
  ]
  const dataSource = ref([])
  const menuLevel = [
    { label: '顶级菜单', value: '1' },
    { label: '二级菜单', value: '2' },
    { label: '三级菜单', value: '3' },
  ]
  const topLevel = ref([])
  const secondLevel = ref([])
  const menuObj = {}
  const tableLoading = ref(false)
  //
  function transformArray(arr) {
    return arr.map((item) => {
      const newItem = {
        ...item,
        delLoading: false,
        key: item?.id,
      }
      if (item?.children && item.children.length > 0) {
        newItem.children = transformArray(item.children)
      }
      return newItem
    })
  }
  const getUserMenuList = (menuObj) => {
    tableLoading.value = true
    let dataSourceList = []
    getMenuTree(menuObj).then((res) => {
      dataSourceList = res.result.map((item) => {
        return {
          ...item,
          key: item.name,
          delLoading: false,
          children: item.children?.map((itemChild) => {
            return {
              operation: '',
              ...itemChild,
              key: itemChild.id,
              delLoading: false,
            }
          }),
        }
      })
      // console.log(transformArray(dataSourceList))
      dataSource.value = transformArray(dataSourceList)
    })

    tableLoading.value = false
  }
  getUserMenuList(menuObj)
  const formItemLayout = computed(() => {
    const layout = 'horizontal'
    return layout === 'horizontal'
      ? {
          labelCol: {
            span: 10,
          },
          wrapperCol: {
            span: 16,
          },
        }
      : {}
  })
  const { titleValue, modalRef } = useInitFrom({})
  const formState = reactive({
    level: '',
    topLevel: '',
    sort: '',
    name: '',
    secondLevel: '',
    code: '',
  })
  //
  const createTableItem = () => {
    modalRef.value.open()
  }
  const topLevelFn = (value) => {
    //将二级菜单置空
    formState.secondLevel = ''
    formState.parentId = value
    getMenu({ level: '2', parentId: value }).then((res) => {
      secondLevel.value = res.result.map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    })
  }
  const rules = {
    name: [{ required: true, message: '请输入角色名称' }],
    sort: [{ required: true, message: '请输入排序' }],
    level: [{ required: true, message: '请输入菜单级别' }],
    type: [{ required: true, message: '请输入菜单类型' }],
    code: [{ required: true, message: '请输入code' }],
    topLevel: [{ required: true, message: '请输入顶级菜单', trigger: 'blur' }],
    secondLevel: [
      { required: true, message: '请输入二级菜单', trigger: 'blur' },
    ],
  }
  const submit = () => {
    formRef.value
      .validate()
      .then(async () => {
        modalRef.value.showLoading()
        await addMenu({
          ...formState,
        })
        messageContent('success', '添加成功')
        await getUserMenuList(menuObj)
        clear()
      })
      .finally(() => {
        modalRef.value.hideLoading()
        modalRef.value.disabledCancelFalse()
      })
  }
  const clear = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
    for (let formStateKey in formState) {
      formState[formStateKey] = undefined
    }
    modalRef.value.close()
  }
  const secondLevelFn = (value) => {
    formState.parentId = value
  }
  const confirm = async (record) => {
    record.delLoading = true
    await delMenu({ menuId: record.id })
      .then((res) => {
        if (res.code == '401') {
          // message.error(res.desc)
          messageContent('error', res.desc)
        } else {
          getUserMenuList(menuObj)
          messageContent('success', '删除成功')
        }
      })
      .finally(() => {
        record.delLoading = false
      })
  }

  const showLevel = (value) => {
    if (value != 1) {
      // 二级菜单
      getMenu({ level: 1 }).then((res) => {
        topLevel.value = res.result.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      })
    } else {
      formState.parentId = '0'
    }
  }
</script>
<style scoped lang="less"></style>
