<template>
  <div class="">
    <a-space direction="vertical">
      <a-space>
        <a-input
          v-model:value="requestObj.searchName"
          placeholder="这里输入关键词"
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
        <a-date-picker
          v-model:value="requestObj.startDate"
          placeholder="开始日期"
          :value-format="dateFormat"
        />
        <a-date-picker
          v-model:value="requestObj.endDate"
          :value-format="dateFormat"
          :format="dateFormat"
          placeholder="结束日期"
        />
        <a-select
          :options="villageList"
          v-model:value="requestObj.villageId"
          style="width: 150px"
          placeholder="请选择小区"
        ></a-select>
        <a-select
          :options="statusList"
          v-model:value="requestObj.status"
          style="width: 150px"
          placeholder="分配状态"
        ></a-select>
      </a-space>
      <a-space>
        <a-button type="primary" @click="searchTableItem">
          <SearchOutlined />
        </a-button>
        <a-button @click="handleCreate" type="primary">新增</a-button>
      </a-space>
      <a-space>
        <a-table
          :data-source="dataSource"
          :columns="column"
          @change="handleTableChange"
          :pagination="paginationInfo"
          :loading="tableLoading"
        >
          <template #bodyCell="{ column, record }">
            <template
              v-if="column.dataIndex == 'operation' && record.operation == ''"
            >
              <a-button
                type="link"
                :loading="record.delLoading"
                @click="delTableItem(record)"
              >
                删除
              </a-button>
            </template>
            <template v-else-if="column.dataIndex == 'status'">
              <span v-if="record.status == 0">未分配</span>
              <span v-else>已分配</span>
            </template>
          </template>
        </a-table>
      </a-space>
    </a-space>
    <Modal :title="titleValue" ref="modalRef" @handleOk="submit">
      <a-form :model="formState" v-bind="formItemLayout">
        <a-form-item label="小区">
          <a-select
            :options="modalVillageList"
            v-model:value="formState.villageId"
            show-search
            :filter-option="filterOption"
            placeholder="请选择小区"
          ></a-select>
        </a-form-item>
        <a-form-item label="卡号">
          <a-input
            v-model:value="formState.cardId"
            placeholder="请输入卡号"
          ></a-input>
        </a-form-item>
      </a-form>
    </Modal>
  </div>
</template>

<script setup>
  import { message } from 'ant-design-vue'
  import { reactive, ref } from 'vue'
  import { SearchOutlined } from '@ant-design/icons-vue'
  import { useTableInit, useInitFrom } from '@/hooks/useTableComponent'
  import {
    getVillageDoorCardList,
    delVillageDoorCard,
    onlyName,
    addVillageDoorCard,
  } from '@/api/community'
  import { getVillageList } from '@/api/system'
  import Modal from '@/components/Modal'
  const dateFormat = 'YYYY-MM-DD'
  const userListObj = reactive({
    searchName: '',
    startDate: '',
    endDate: '',
    villageId: undefined,
    status: undefined,
    pageNum: '1',
    pageSize: '10',
  })

  const { titleValue, handleCreate, formState, formItemLayout, modalRef } =
    useInitFrom({
      form: {
        villageId: undefined,
        cardId: '',
      },
    })
  const {
    dataSource,
    tableLoading,
    handleTableChange,
    paginationInfo,
    searchTableItem,
    requestObj,
    delTableItem,
  } = useTableInit({
    getTableList: getVillageDoorCardList,
    tableObj: userListObj,
    delTableEle: delVillageDoorCard,
  })
  const column = [
    {
      title: '编号',
      dataIndex: 'No',
      align: 'center',
    },
    {
      title: '小区',
      dataIndex: 'villageName',
      align: 'center',
      width: '150px',
    },
    {
      title: '卡号',
      dataIndex: 'cardId',
      align: 'center',
      width: '150px',
    },
    {
      title: '录入编号',
      dataIndex: 'numId',
      align: 'center',
      width: '150px',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: '100px',
    },
    {
      title: '创建时间',
      dataIndex: 'addTime',
      align: 'center',
      width: '200px',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: '200px',
    },
  ]
  const statusList = [
    { value: '', label: '全部' },
    { value: '0', label: '待分配' },
    { value: '1', label: '已分配' },
  ]
  const villageList = ref([
    {
      value: '',
      label: '全部',
    },
  ])
  const modalVillageList = ref([])
  getVillageList().then((res) => {
    const villageItem = res.result.map((item) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
    villageList.value.push(...villageItem)
    modalVillageList.value = villageItem
  })
  const filterOption = (inputValue, option) => {
    return option.label.indexOf(inputValue) > -1
  }

  const submit = async () => {
    modalRef.value.showLoading()
    const res = await onlyName(formState)
    if (res.result == '1') {
      //重名
      message.error('卡号重复,请重新输入卡号!')
      modalRef.value.hideLoading()
    } else {
      await addVillageDoorCard(formState)
      await searchTableItem(requestObj)
      modalRef.value.hideLoading()
      modalRef.value.close()
    }
  }
</script>

<style scoped lang=""></style>
