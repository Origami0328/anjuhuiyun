<template>
  <div class="role">
    <a-space direction="vertical">
      <a-space>
        <a-button
          type="primary"
          style="width: 100px"
          @click="createMenuInfo"
          :loading="btnLoading"
        >
          <template #icon><PlusOutlined /></template>
          新增
        </a-button>
      </a-space>
    </a-space>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="tableLoading"
      :pagination="false"
      bordered
    >
      <template v-slot:emptyText>
        <div style="text-align: center; padding: 20px; font-size: 30px">
          正在为您加载数据
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template
          v-if="
            column.dataIndex == 'operation' &&
            record.operation == '' &&
            record.name != '超级管理员'
          "
        >
          <a-button
            type="link"
            @click="changeMenuInfo(record)"
            :loading="record.loading"
          >
            修改
          </a-button>
          <a-popconfirm
            title="确定删除该表格项吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="delRoleItem(record)"
          >
            <a-button type="link" :loading="record.delLoading">删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <Modal
      :title="titleValue"
      ref="modalRef"
      width="70%"
      @handleOk="submit"
      @closeModal="clear"
    >
      <div
        style="overflow: auto; overflow-x: hidden; height: 100%"
        id="modalScroll"
      >
        <a-form
          :model="formState"
          v-bind="formItemLayout"
          :rules="rules"
          ref="formRef"
        >
          <a-form-item label="角色名称" name="name">
            <a-input
              v-model:value="formState.name"
              placeholder="请输入角色名称"
            />
          </a-form-item>
          <a-form-item label="角色类型">
            <a-select
              v-model:value="formState.type"
              :disabled="disabled"
              :options="typeOptions"
              placeholder="请输入角色类型"
            />
          </a-form-item>
          <a-form-item label="分组" name="groupId">
            <a-select
              v-model:value="formState.groupId"
              style="width: 200px"
              :disabled="disabled"
              :options="selectOptions"
              placeholder="请选择分组"
            ></a-select>
          </a-form-item>
          <a-form-item label="排序" name="sort">
            <a-input-number
              v-model:value="formState.sort"
              placeholder="排序越小越靠前"
              :min="1"
              style="width: 200px"
            />
          </a-form-item>
          <a-form-item label="菜单权限">
            <a-tree
              show-line
              v-model:expandedKeys="expandedKeys"
              v-model:checkedKeys="formState.checkedKeys"
              checkable
              v-if="treeData.length > 0"
              :defaultExpandAll="false"
              :tree-data="treeData"
              @check="onCheck"
            />
          </a-form-item>
        </a-form>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'role',
  }
</script>
<script setup>
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'
  import Modal from '@/components/Modal.vue'
  import { useInitFrom } from '@/hooks/useTableComponent'
  import {
    getUserMenu,
    getAllMenu,
    getGroup,
    addRole,
    saveRoleRight,
    getRoleRight,
    delRole,
    // getRole,
    // getRoleInfo,
  } from '@/api/system'
  import { computed, reactive, ref, toRaw } from 'vue'
  // import { generateUniqueValue } from '@/utils/uniqueKey'
  import { useStore } from 'vuex'
  const store = useStore()
  const btnLoading = ref(false)
  const columns = [
    {
      title: '分组',
      dataIndex: 'groupName',
      key: 'groupName',
      width: '200px',
      align: 'center',
    },
    {
      title: '角色',
      dataIndex: 'name',
      key: 'name',
      width: '500px',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '300px',
      key: 'address',
    },
  ]
  const dataSource = ref([])
  const selectOptions = ref([])
  const menuObj = reactive({})
  const tableLoading = ref(false)
  const formRef = ref()
  // 获取页面列表数据
  const getUserMenuList = (menuObj) => {
    tableLoading.value = true
    getUserMenu(menuObj).then((res) => {
      dataSource.value = res.result.map((item) => {
        return {
          ...item,
          key: item.groupName,
          loading: false,
          delLoading: false,
          children: item.children?.map((itemChild) => {
            return { operation: '', ...itemChild }
          }),
        }
      })
    })
    tableLoading.value = false
  }
  getUserMenuList(menuObj)

  const { titleValue, modalRef, editId } = useInitFrom()
  const formState = reactive({
    groupId: undefined,
    sort: '',
    name: '',
    type: undefined,
    checkedKeys: [],
  })
  const formItemLayout = computed(() => {
    const layout = 'horizontal'
    return layout === 'horizontal'
      ? {
          labelCol: {
            span: 6,
          },
          wrapperCol: {
            span: 16,
          },
        }
      : {}
  })
  const disabled = ref(false)
  const treeData = ref([])
  const expandedKeys = ref([])
  const onCheck = (checkedKeys, e) => {
    const push = []
    checkedKeys.forEach((item) => push.push(item))
    const node = e.node.parent.children

    node.forEach((item) => {
      let index = checkedKeys.indexOf(item.key)
      if (index > -1) {
        checkedKeys.splice(index, 1)
      }
    })
    checkedKeys.push(push[push.length - 1])
  }

  const rules = {
    name: [{ required: true, message: '请输入角色名称' }],
    sort: [{ required: true, message: '请输入排序' }],
    groupId: [{ required: true, message: '请输入分组' }],
  }

  const typeOptions = [
    {
      value: 'a',
      label: '物业',
    },
    {
      value: 'b',
      label: '房东',
    },
    {
      value: 'c',
      label: '关注人员-民警',
    },
    {
      value: 'd',
      label: '施工',
    },
    {
      value: 'e',
      label: '市场',
    },
    {
      value: 'f',
      label: '一标三实-民警',
    },
    {
      value: 'g',
      label: '智慧小区-民警',
    },
    {
      value: 'h',
      label: '智慧小区-辅警',
    },
  ]
  //存储修改角色的id
  const tableChangeItemID = ref()

  function transformArray(arr) {
    return arr.map((item) => {
      const newItem = {
        ...item,
        title: item.name,
        value: item.id,
        key: item.id,
        disableCheckbox: !item.disableCheckbox,
        children: item.children,
      }
      if (item.rights && item.rights.length > 0) {
        const readAndWrite = item.rights.map((item1) => {
          return {
            // ...item1,
            name: item1.rightName,
            id: item1.rightId,
            disableCheckbox: true,
          }
        })
        // console.log(readAndWrite)
        newItem.children?.push(...readAndWrite)
      }
      if (item?.children && item.children.length > 0) {
        newItem.children = transformArray(item.children)
      }
      return newItem
    })
  }

  const getAllmenuAndGroup = async () => {
    await getAllMenu({ roleId: store.getters['user/roleId'] }).then((res) => {
      let treeDataValue = []
      treeDataValue = transformArray(res.result)
      console.log(treeDataValue)
      treeData.value = treeDataValue
    })
    await getGroup().then((res) => {
      selectOptions.value = res.result?.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    })
  }
  //新增角色权限
  const createMenuInfo = async () => {
    //开启loading
    btnLoading.value = true
    // 清空表单内容
    for (let formStateKey in formState) {
      if (formStateKey == 'checkedKeys') {
        formState[formStateKey] = []
      } else {
        formState[formStateKey] = undefined
      }
    }
    disabled.value = false
    editId.value = 0
    await getAllmenuAndGroup()
    btnLoading.value = false
    modalRef.value.open()
  }

  //修改角色权限
  const changeMenuInfo = async (record) => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
    // await getRoleInfo({
    //   groupId: record.groupId,
    // }).then((res) => {
    //   const { result } = res
    //   formState.type = result.type
    //   formState.name = result.name
    //   formState.sort = result.sort
    //   formState.groupId = result.groupId
    // })
    record.loading = true
    disabled.value = true
    editId.value = 12
    await getAllmenuAndGroup()
    // record.groupId = Number(record.groupId)
    //填充表单的内容，菜单权限暂时清空
    for (let formStateKey in formState) {
      if (formStateKey == 'checkedKeys') {
        formState[formStateKey] = []
      } else {
        formState[formStateKey] = record[formStateKey]
      }
    }
    // 获取角色的菜单权限
    let res = await getRoleRight({ roleId: record.id })
    res.result.forEach((item) => {
      formState.checkedKeys.push(item.rightId)
    })
    tableChangeItemID.value = record.id
    record.loading = false
    modalRef.value.open()
  }
  // 删除角色
  const delRoleItem = async (record) => {
    record.delLoading = true
    let res = await delRole({
      roleId: record.id,
    })
    if (res.code == '401') {
      message.error(res.desc)
    } else {
      await getUserMenuList({})
    }
    record.delLoading = false
  }

  const submit = () => {
    modalRef.value.showLoading()
    //新增
    if (editId.value == 0) {
      formRef.value
        .validate()
        .then(() => {
          addRole(formState).then(async (res) => {
            if (formState.checkedKeys) {
              await saveRoleRight({
                roleId: res.result,
                menuRightIds: toRaw(formState.checkedKeys).join(','),
              })
            }
            await getUserMenuList({})
            clear()
            modalRef.value.close()
            expandedKeys.value = []
            message.success('表格项新增成功')
          })
        })
        .finally(() => {
          modalRef.value.hideLoading()
        })
    } else {
      // 修改
      saveRoleRight({
        roleId: tableChangeItemID.value,
        menuRightIds: toRaw(formState.checkedKeys).join(','),
        name: formState.name,
        sort: formState.sort,
      })
        .then(() => {
          getUserMenuList({})
        })
        .finally(() => {
          modalRef.value.hideLoading()
          modalRef.value.close()
          message.success('表格项修改成功')
          expandedKeys.value = []
        })
    }
  }
  const clear = () => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }

    for (let formStateKey in formState) {
      if (formStateKey == 'checkedKeys') {
        formState[formStateKey] = []
      } else {
        formState[formStateKey] = undefined
      }
    }
    expandedKeys.value = []
    modalRef.value.close()
  }
</script>
<style scoped lang="less"></style>
