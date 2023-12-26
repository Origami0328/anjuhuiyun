import { computed, reactive, ref } from 'vue'

export function useTableInit(opt = {}) {
  const dataSource = ref([])
  const tableLoading = ref(true) // 表格loading
  let resetTableObj = null
  let requestObj = reactive({})
  const paginationInfo = reactive({
    total: 20,
    pageSize: 10,
    current: 1,
    showQuickJumper: true,
    showSizeChanger: true,
  })

  if (opt.tableObj) {
    for (let tableObjKey in opt.tableObj) {
      requestObj[tableObjKey] = opt.tableObj[tableObjKey]
    }
    resetTableObj = () => {
      for (let tableObjKey in requestObj) {
        if (Array.isArray(requestObj[tableObjKey])) {
          requestObj[tableObjKey] = []
        } else {
          requestObj[tableObjKey] = undefined
        }
      }
    }
  }

  function getData(tableObj) {
    // console.log(requestObj)
    tableLoading.value = true
    //针对系统用户列表的特殊情况

    if (opt.getTableList && typeof opt.getTableList == 'function') {
      opt
        .getTableList(tableObj)
        .then((res) => {
          dataSource.value = res.result.list
            ? res.result.list.map((item, index) => ({
                key: item.id,
                No: index + 1, //序号字段
                ...item,
                delLoading: false,
                changeLoading: false,
                operation: '',
              }))
            : res.result.map((item, index) => ({
                key: item.id || index + 1,
                ...item,
              }))
        })
        .finally(() => {
          tableLoading.value = false
        })
    }
  }
  getData(requestObj) //初始化

  //分页的改变
  function handleTableChange(pagination) {
    paginationInfo.pageSize = pagination.pageSize
    paginationInfo.current = pagination.current
    if ('pageNum' in requestObj) {
      requestObj.pageNum = pagination.current
    }
    if ('pageSize' in requestObj) {
      requestObj.pageSize = pagination.pageSize
    }
    getData(requestObj)
  }
  // 搜索
  function searchTableItem() {
    getData({
      ...requestObj,
    })
  }
  //删除
  async function delTableItem(record) {
    console.log(record)
    record.delLoading = true
    const itemId = record.id
    await opt.delTableEle({ id: itemId })
    await getData(requestObj)
    record.delLoading = false
  }

  // 多选
  const state = reactive({
    selectedRowKeys: [],
    ids: [],
  })
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRows changed: ', selectedRows)
    state.selectedRowKeys = selectedRowKeys
    state.ids = selectedRows.map((item) => {
      return item.id
    })
  }
  return {
    getData,
    requestObj,
    dataSource,
    searchTableItem,
    resetTableObj,
    state,
    onSelectChange,
    paginationInfo,
    handleTableChange,
    tableLoading,
    delTableItem,
  }
}

export function useInitFrom(opt = {}) {
  const editId = ref(0)
  const titleValue = computed(() => (editId.value ? '修改' : '新增'))
  let formState = reactive({})
  const formRef = ref()
  const defaultForm = opt.form
  const modalRef = ref()
  //重置表单
  function resetForm(row = false) {
    if (formRef.value) formRef.value.clearValidate()
    for (const key in defaultForm) {
      if (Array.isArray(defaultForm[key])) {
        formState[key] = row[key]
      }
      formState[key] = row[key]
    }
  }
  //新增
  function handleCreate() {
    editId.value = 0
    resetForm(defaultForm)
    modalRef.value.open()
  }
  // 修改
  function handleChange(item) {
    editId.value = item.id
    resetForm(item)
    console.log(formState.houseType)
    item.changeLoading = false
    modalRef.value.open()
  }
  //使表单居中显示
  const formItemLayout = computed(() => {
    const layout = 'horizontal'
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

  return {
    titleValue,
    handleCreate,
    handleChange,
    modalRef,
    editId,
    formState,
    formItemLayout,
  }
}
