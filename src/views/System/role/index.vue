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
      <a-space>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :loading="tableLoading"
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
              <a-button
                type="link"
                @click="delRoleItem(record)"
                :loading="record.delLoading"
              >
                删除
              </a-button>
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
            :disabled="disabled"
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
            :disabled="disabled"
            :min="1"
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item label="菜单权限">
          <a-tree
            show-line
            v-model:expandedKeys="expandedKeys"
            v-model:checkedKeys="formState.checkedKeys"
            :fieldNames="replaceFields"
            checkable
            v-if="treeData.length > 0"
            :defaultExpandAll="false"
            :tree-data="treeData"
            @check="onCheck"
          />
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>
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
  } from '@/api/system'
  import { reactive, ref, toRaw } from 'vue'
  import { generateUniqueValue } from '@/utils/uniqueKey'
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

  const { titleValue, modalRef, editId, formItemLayout } = useInitFrom()
  const formState = reactive({
    groupId: undefined,
    sort: '',
    name: '',
    type: undefined,
    checkedKeys: [],
  })
  const disabled = ref(false)
  const treeData = ref([])
  const expandedKeys = ref([])
  const replaceFields = {
    children: 'child',
    title: 'rightName',
    key: 'rightId',
  }
  const onCheck = (checkedKeys) => {
    let latest = checkedKeys[checkedKeys.length - 1]
    let siblings

    // 复杂度高后续优化
    for (let i = 0; i < treeData.value.length; i++) {
      for (let j = 0; j < treeData.value[i].child.length; j++) {
        for (let k = 0; k < treeData.value[i].child[j].child.length; k++) {
          if (latest == treeData.value[i].child[j].child[k].rightId) {
            // 拿到点击的权限在树形组件中的位置
            if (k == 1) {
              if (
                checkedKeys.includes(
                  treeData.value[i].child[j].child[0].rightId
                )
              ) {
                siblings = treeData.value[i].child[j].child[0].rightId
              }
            } else {
              if (
                checkedKeys.includes(
                  treeData.value[i].child[j].child[1].rightId
                )
              ) {
                siblings = treeData.value[i].child[j].child[1].rightId
              }
            }
            break
          }
        }
      }
    }

    if (siblings) {
      // 存在同级则删除之前的同级，变成但选择效果
      for (let z = 0; z < checkedKeys.length; z++) {
        if (siblings == checkedKeys[z]) {
          checkedKeys.splice(z, 1)
        }
      }
      // checkedKey.value = checkedKeys
    }
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

  const getAllmenuAndGroup = async () => {
    await getAllMenu({ roleId: store.getters['user/roleId'] }).then((res) => {
      let treeDataValue = []
      for (let k in res.result.menu) {
        // console.log('属性名为',k)
        const obj = {}
        obj.rightName = k
        obj.child = []
        obj.rightId = generateUniqueValue()
        obj.disableCheckbox = true
        for (let j in res.result.menu[k]) {
          // console.log('第二级的属性为',j)
          const secObj = {}
          secObj.rightName = j
          secObj.child = res.result.menu[k][j]
          console.log(res.result.menu[k][j])
          secObj.rightId = generateUniqueValue()
          // expandedKeys.value.push(secObj.rightId)
          secObj.disableCheckbox = true
          obj.child.push(secObj)
        }
        treeDataValue.push(obj)
      }
      treeData.value = treeDataValue
    })
    await getGroup().then((res) => {
      selectOptions.value = res.result.map((item) => ({
        label: item.groupName,
        value: item.groupId,
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
    record.loading = true
    disabled.value = true
    editId.value = 12
    await getAllmenuAndGroup()
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
      })
        .then(() => {
          getUserMenuList({})
        })
        .finally(() => {
          modalRef.value.hideLoading()
          modalRef.value.close()
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
    modalRef.value.close()
  }
</script>
<style scoped lang="less"></style>
