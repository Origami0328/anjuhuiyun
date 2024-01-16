import { computed, reactive, ref } from 'vue'
import { messageContent } from '@/utils/message'
export function useTableInit(opt = {}) {
  const dataSource = ref([])
  const tableLoading = ref(true) // 表格loading
  let resetTableObj = null
  let requestObj = reactive({})
  const villageList = ref([])
  const formVillageList = ref([])
  const provinceList = ref([])
  const poProvinceList = ref([])
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
        } else if (tableObjKey == 'pageSize') {
          requestObj[tableObjKey] = 10
        } else if (tableObjKey == 'pageNum' || tableObjKey == 'pageNo') {
          requestObj[tableObjKey] = 1
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
                ...item,
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
          paginationInfo.total =
            res.result.page?.totalResult || res.result.total
          if (res.result.provieceList) {
            const provinceArray = res.result.provieceList.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
            // formProvieceList = provieceList.value.slice(1)
            provinceArray.splice(0, 0, {
              value: '',
              label: '全部',
              childCode: 'DQ',
            })
            provinceList.value = provinceArray
          }
          if (res.result.villageList) {
            const villageArray = res.result.villageList.map((item) => {
              return {
                ...item,
                value: item.id,
                label: item.name,
              }
            })

            villageArray.splice(0, 0, {
              value: '',
              label: '全部',
            })
            villageList.value = villageArray
            formVillageList.value = villageArray.slice(1)
          }
          if (res.result.poProvieceList) {
            const poProvinceArray = res.result.poProvieceList.map((item) => {
              return {
                ...item,
                value: item.dicCode,
                label: item.dicName,
              }
            })
            // formProvieceList = provieceList.value.slice(1)
            poProvinceArray.splice(0, 0, {
              value: '',
              label: '全部',
              childCode: 'PO',
            })
            poProvinceList.value = poProvinceArray
          }
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
    // pageNo出现在代理商列表页面
    if ('pageNo' in requestObj) {
      requestObj.pageNo = pagination.current
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
    record.delLoading = true
    const itemId = record.id
    let res = await opt.delTableEle({ id: itemId })
    if (res.result && res.result == '0') {
      record.delLoading = false
      await getData(requestObj)
      messageContent('success', '删除表单项成功')
    } else if (res.result && res.result == '1') {
      record.delLoading = false
      messageContent('error', '删除失败，可能该小区还有楼栋/房屋/单元关联')
    } else {
      record.delLoading = false
      await getData(requestObj)
      messageContent('success', '删除表单项成功')
    }
  }

  // 多选
  const state = reactive({
    selectedRowKeys: [],
    ids: [],
  })
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    state.selectedRowKeys = selectedRowKeys
    state.ids = selectedRows.map((item) => {
      return item.id
    })
  }
  async function multipleDel() {
    if (state.ids.length > 0) {
      await opt.allDel({
        ids: state.ids.join(','),
      })
      await getData(requestObj)
      state.selectedRowKeys = []
      state.ids = []
      messageContent('success', '删除表格项成功')
    }
  }
  // 针对其他modal的提交
  async function multipleSubmit(submitFun, submitObj, content, openModal) {
    await submitFun(submitObj)
    await getData(requestObj)
    openModal.value = false
    messageContent('success', content)
  }
  return {
    getData,
    multipleSubmit,
    multipleDel,
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
    villageList,
    poProvinceList,
    provinceList,
    formVillageList,
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
        if (row[key] != undefined) {
          if (row[key].includes('[') && row[key].includes(']')) {
            formState[key] = row[key] && JSON.parse(row[key])
          } else {
            if (Array.isArray(row[key])) {
              formState[key] = row[key]
            } else {
              formState[key] = row[key].split(',')
            }
          }
        }
      } else {
        formState[key] = row[key]
      }
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
    item.changeLoading = false
    modalRef.value.open()
  }
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
  const addOrEdit = async (submitState, onlyNameObj) => {
    let res = undefined
    if (opt.onlyName && typeof opt.onlyName == 'function' && onlyNameObj) {
      res = await opt.onlyName(onlyNameObj)
    }
    if (!res || (res.result && res.result == '0')) {
      if (editId.value == '0') {
        // 新增接口
        await opt
          .addList(submitState)
          .then(() => {
            modalRef.value.hideLoading()
            modalRef.value.close()
            messageContent('success', '新增表单项成功')
          })
          .catch(() => {
            modalRef.value.hideLoading()
          })
      } else {
        // 修改接口
        await opt
          .editList(submitState)
          .then(() => {
            modalRef.value.hideLoading()
            modalRef.value.close()
            messageContent('success', '修改表单项成功')
          })
          .catch(() => {
            modalRef.value.hideLoading()
          })
      }
    } else if (res.result && res.result == '1') {
      messageContent('error', '名称已存在')
      modalRef.value.hideLoading()
      return
    } else if (opt.addList.name == 'addAgent') {
      //这个else if是一个补丁，专门针对于代理商页面的新增里面的级别不为1的情况，因为res.result不为0或1 所以有了该补丁
      if (editId.value == '0') {
        // 新增接口
        await opt
          .addList(submitState)
          .then(() => {
            modalRef.value.hideLoading()
            modalRef.value.close()
            messageContent('success', '新增表单项成功')
          })
          .catch(() => {
            modalRef.value.hideLoading()
          })
      }
    }
    await opt.getData(opt.requestObj)
  }
  async function submit(submitState, onlyNameObj) {
    modalRef.value.showLoading()
    if (editId.value == '0') {
      formRef.value
        .validate()
        .then(async () => {
          await addOrEdit(submitState, onlyNameObj)
        })
        .finally(() => {
          modalRef.value.hideLoading()
        })
    } else {
      await addOrEdit(submitState, onlyNameObj)
    }
  }
  // 针对其他modal的提交
  async function multipleSubmit(submitFun, submitObj, content, openModal) {
    await submitFun(submitObj)
    await opt.getData(opt.requestObj)
    openModal.value = false
    messageContent('success', content)
  }
  return {
    submit,
    multipleSubmit,
    titleValue,
    handleCreate,
    handleChange,
    modalRef,
    editId,
    formState,
    formRef,
    formItemLayout,
  }
}
