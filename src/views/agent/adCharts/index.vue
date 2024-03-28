<template>
  <div class="adCharts">
    <a-card style="height: 130px">
      <a-skeleton active v-if="topStatic.length == 0" />
      <a-row v-else>
        <a-col :span="8">
          <a-statistic
            title="昨日收益"
            :value="topStatic[0] + '元'"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="8">
          <a-statistic
            title="上月收益"
            :precision="2"
            :value="topStatic[1] + '元'"
          />
        </a-col>
        <a-col :span="8">
          <a-statistic
            title="本月收益"
            :precision="2"
            :value="topStatic[2] + '元'"
          />
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top: 20px">
      <h3>数据图表</h3>
      <a-space direction="vertical">
        <a-row :gutter="[48, 16]">
          <a-col class="gutter-row" :md="4" :sm="2">
            <a-select
              placeholder="请选择代理商"
              style="width: 180px"
              show-search
              :filter-option="filterOption"
              v-model:value="requestObj.agentId"
              :options="agentList"
            ></a-select>
          </a-col>

          <a-col class="gutter-row" :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.villageId"
              show-search
              style="width: 180px"
              placeholder="选择小区"
              :options="villageList"
              :filter-option="filterOption"
              :not-found-content="null"
            ></a-select>
          </a-col>
          <a-col class="gutter-row" :md="4" :sm="2">
            <a-select
              v-model:value="requestObj.timeType"
              style="width: 180px"
              :options="timeTypeList"
              :not-found-content="null"
              @change="clearTimeArray"
            ></a-select>
          </a-col>
          <a-col class="gutter-row" :md="8" :sm="2">
            <a-range-picker
              v-model:value="requestObj.timeArray"
              :picker="requestObj.timeType === 2 ? 'month' : ''"
              style="width: 350px"
              show-time
              :format="requestObj.timeType === 2 ? 'YYYY-MM' : 'YYYY-MM-DD'"
              valueFormat="YYYY-MM-DD"
              :presets="requestObj.timeType === 2 ? '' : presets"
            />
          </a-col>

          <a-col :md="4" :sm="24">
            <div style="width: 192px; display: flex">
              <a-space>
                <a-button
                  @click="searchEchart"
                  style="
                    background-color: cornflowerblue;
                    width: 60px;
                    color: white;
                  "
                >
                  搜索
                </a-button>
              </a-space>
              <a-space>
                <a-button
                  class="button"
                  @click="resetSearchObj"
                  style="
                    background-color: cornflowerblue;
                    width: 60px;
                    color: white;
                    margin-left: 10px;
                  "
                >
                  重置
                </a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-space>
      <div>
        <a-skeleton active v-show="xAxisData.length == 0" />
        <div
          v-show="xAxisData.length != 0"
          id="main"
          style="width: 1000px; height: 400px"
        ></div>
      </div>
    </a-card>

    <a-card style="margin-top: 20px">
      <h3>数据表格</h3>
      <a-row :gutter="[48, 16]">
        <a-col class="gutter-row" :md="4" :sm="2">
          <a-select
            placeholder="请选择代理商"
            style="width: 180px"
            show-search
            :filter-option="filterOption"
            v-model:value="requestTable.agentId"
            :options="agentList"
          ></a-select>
        </a-col>

        <a-col class="gutter-row" :md="4" :sm="2">
          <a-select
            v-model:value="requestTable.villageId"
            show-search
            style="width: 180px"
            placeholder="选择小区"
            :options="villageList"
            :filter-option="filterOption"
            :not-found-content="null"
          ></a-select>
        </a-col>
        <a-col class="gutter-row" :md="8" :sm="2">
          <a-range-picker
            v-model:value="requestTable.timeArray"
            style="width: 350px"
            show-time
            format="YYYY-MM-DD"
            valueFormat="YYYY-MM-DD"
            :presets="presets"
          />
        </a-col>
        <a-col :md="4" :sm="24">
          <div style="width: 192px; display: flex">
            <a-space>
              <a-button
                @click="searchTableItem"
                style="
                  background-color: cornflowerblue;
                  width: 60px;
                  color: white;
                "
              >
                搜索
              </a-button>
            </a-space>
            <a-space>
              <a-button
                class="button"
                @click="resetSearchObj2"
                style="
                  background-color: cornflowerblue;
                  width: 60px;
                  color: white;
                  margin-left: 10px;
                "
              >
                重置
              </a-button>
            </a-space>
          </div>
        </a-col>
        <a-col class="gutter-row" :md="4" :sm="2">
          <a-button @click="downLoadList">
            <DownloadOutlined />
            导出列表
          </a-button>
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="paginationInfo"
        bordered
        style="margin-top: 20px"
        @change="changeTable"
      >
        <template #bodyCell="{ record, column }">
          <template v-if="column.dataIndex == 'isRedPacket'">
            <span v-if="record.isRedPacket == '0'">否</span>
            <span v-else>是</span>
          </template>
          <template v-if="column.dataIndex == 'isVip'">
            <span v-if="record.isVip == '0'">否</span>
            <span v-else>是</span>
          </template>
          <template v-if="column.dataIndex == 'launchStatus'">
            <span v-if="record.launchStatus == '0'">无广告</span>
            <span v-else-if="record.launchStatus == '1'">待确认</span>
            <span v-else-if="record.launchStatus == '2'">显示</span>
            <span v-else-if="record.launchStatus == '3'">显示且有效</span>
            <span v-else-if="record.launchStatus == '4'">显示失败</span>
          </template>
          <template v-if="column.dataIndex == 'bannerStatus'">
            <span v-if="record.bannerStatus == '0'">无广告</span>
            <span v-else-if="record.bannerStatus == '1'">待确认</span>
            <span v-else-if="record.bannerStatus == '2'">显示</span>
            <span v-else-if="record.bannerStatus == '3'">显示且有效</span>
            <span v-else-if="record.bannerStatus == '4'">显示失败</span>
          </template>
          <template v-if="column.dataIndex == 'openStatus'">
            <span v-if="record.openStatus == '0'">无广告</span>
            <span v-else-if="record.openStatus == '1'">待确认</span>
            <span v-else-if="record.openStatus == '2'">显示</span>
            <span v-else-if="record.openStatus == '3'">显示且有效</span>
            <span v-else-if="record.openStatus == '4'">显示失败</span>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script>
  export default {
    name: 'adCharts',
  }
</script>
<script setup>
  import { DownloadOutlined } from '@ant-design/icons-vue'
  import { useTableInit } from '@/hooks/useTableComponent'
  import { onMounted, reactive, ref } from 'vue'
  import {
    getAgents,
    getBillByPage,
    getEarningStatistical,
    downloadBill,
    getCurrentSituation,
  } from '@/api/adCharts'
  import { getVillage } from '@/api/common'
  import * as echarts from 'echarts'
  import dayjs from 'dayjs'
  let chartDom, myChart
  const xAxisData = ref([])
  const seriesData = ref([0, 0, 0, 0, 0, 0])
  const tableData = ref([])
  const { requestObj } = useTableInit({
    tableObj: {
      timeArray: [],
      villageId: undefined,
      timeType: 1,
      startTime: undefined,
      endTime: undefined,
      agentId: undefined,
    },
  })
  const paginationInfo = reactive({
    total: 10,
    pageSize: 10,
    current: 1,
    showQuickJumper: true,
    showSizeChanger: true,
  })
  const charts = () => {
    let option

    option = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: xAxisData.value,
      },
      yAxis: {
        type: 'value',
        name: '预估收益(元)', // Y 轴标题，即单位
        grid: {
          top: '10%', // 设置 grid 的上边距，即 Y 轴标题的位置
        },
      },
      series: [
        {
          data: seriesData.value,
          type: 'line',
          smooth: true,
        },
      ],
    }
    option && myChart.setOption(option)
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'NO',
    },
    {
      title: '开门时间',
      dataIndex: 'openTime',
    },
    {
      title: '收益(厘)',
      dataIndex: 'earning',
    },
    {
      title: '计算规则',
      dataIndex: 'computeMode',
    },
    {
      title: '是否开启开门红包',
      dataIndex: 'isRedPacket',
      align: 'center',
    },
    {
      title: '启动页广告状态',
      dataIndex: 'launchStatus',
    },
    {
      title: 'banner广告状态',
      dataIndex: 'bannerStatus',
      align: 'center',
    },
    {
      title: '开门成功广告状态',
      dataIndex: 'openStatus',
      align: 'center',
    },
    {
      title: '是否VIP用户',
      dataIndex: 'isVip',
      align: 'center',
    },
  ]
  const topStatic = ref([])
  onMounted(async () => {
    chartDom = document.getElementById('main')
    myChart = echarts.init(chartDom)
    await getVillage({}).then((res) => {
      const requestVillageList = res.result.map((item) => {
        return {
          ...item,
          label: item.name,
          value: item.id,
        }
      })
      villageList.value = [
        {
          value: '',
          label: '当前账号',
        },
      ].concat(requestVillageList)
    })
    await getAgents({}).then((res) => {
      agentList.value = res.result?.map((item) => {
        return {
          ...item,
          label: item.name,
          value: item.id,
        }
      })
      requestObj.agentId = agentList.value[0].value
    })
    chartsData(requestObj)

    charts()
    getTime()
    getCurrentSituation({
      agentId: 48,
    }).then((res) => {
      const { result } = res
      topStatic.value = [
        result.yesterDayEarning,
        result.lastMonthEarning,
        result.currentMonthEarning,
      ]
    })
  })
  const getTime = () => {
    const time = new Date()
    const year = time.getFullYear()
    const month =
      time.getMonth() + 1 > 10
        ? time.getMonth() + 1
        : '0' + (time.getMonth() + 1)
    const day =
      time.getDate() - 1 > 10 ? time.getDate() - 1 : '0' + (time.getDate() - 1)
    requestObj.timeArray[1] = `${year}-${month}-${day}`
    // 获取当前日期的时间戳
    let currentDateTimestamp = Date.now()

    // 计算七天前的日期的时间戳
    let sevenDaysAgoTimestamp = currentDateTimestamp - 7 * 24 * 60 * 60 * 1000

    // 将时间戳转换为日期对象
    let sevenDaysAgoDate = new Date(sevenDaysAgoTimestamp)
    let sevenDaysAgoFormatted = sevenDaysAgoDate.toISOString().split('T')[0]
    requestObj.timeArray[0] = sevenDaysAgoFormatted
  }
  const agentList = ref()

  const villageList = ref()
  const presets = [
    {
      label: '过去七天',
      value: [dayjs().subtract(8, 'day'), dayjs().subtract(1, 'day')],
    },
    {
      label: '最近一个月',
      value: [dayjs().subtract(1, 'month'), dayjs().subtract(1, 'day')],
    },
  ]

  const timeTypeList = [
    {
      value: 1,
      label: '按天',
    },
    {
      value: 2,
      label: '按月',
    },
  ]

  const filterOption = (inputValue, option) => {
    return option.label.indexOf(inputValue) > -1
  }
  const chartsData = (requestObj) => {
    const newRequestObj = {
      startTime:
        requestObj.timeArray[0] ||
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      endTime:
        requestObj.timeArray[1] ||
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      villageId: requestObj.villageId || '',
      agentId: requestObj.agentId || agentList.value[0].value,
      timeType: requestObj.timeType,
    }
    getEarningStatistical(newRequestObj).then((res) => {
      xAxisData.value = res.result.map((item) => item.dayTime)
      seriesData.value = res.result.map((item) => item.earning)
      charts()
    })

    // downloadBill(requestObj)
  }

  const searchEchart = async () => {
    await chartsData(requestObj)
  }
  const clearTimeArray = () => {
    requestObj.timeArray = []
  }
  const resetSearchObj = () => {
    requestObj.timeArray = []
    requestObj.villageId = undefined
    requestObj.timeType = 1
    requestObj.startTime = undefined
    requestObj.endTime = undefined
    requestObj.agentId = undefined
  }
  const requestTable = reactive({
    timeArray: [],
    villageId: undefined,
    agentId: undefined,
  })
  const searchTableItem = () => {
    getBillByPage({
      ...requestTable,
      startTime: requestTable.timeArray[0],
      endTime: requestTable.timeArray[1],
      pageNo: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    }).then((res) => {
      tableData.value = res.result.list.map((item, index) => {
        return {
          ...item,
          NO:
            paginationInfo.pageSize * (paginationInfo.current - 1) + index + 1,
        }
      })
      paginationInfo.total = res.result.total
    })
  }
  const resetSearchObj2 = () => {
    requestTable.timeArray = []
    requestTable.villageId = undefined
    requestTable.startTime = undefined
    requestTable.endTime = undefined
    requestTable.agentId = undefined
    paginationInfo.current = 1
  }
  const downLoadList = () => {
    downloadBill({
      startTime: requestTable.timeArray[0],
      endTime: requestTable.timeArray[1],
      villageId: requestTable.villageId,
      agentId: requestTable.agentId,
    }).catch((err) => {
      let blob = new Blob([err])
      let reader = new FileReader()
      reader.readAsText(blob, 'utf-8')
      reader.onload = () => {
        try {
          let result = JSON.parse(reader.result)
          if (result.code) {
            this.$message.warning(result.msg, 1)
          } else {
            downloadXlsx(err)
          }
        } catch {
          downloadXlsx(err)
        }
      }
    })
  }
  const downloadXlsx = (data) => {
    const link = document.createElement('a')
    let blob = new Blob([data], { type: 'application/x-excel' })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.download = `代理商广告表格.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const changeTable = (pagination) => {
    paginationInfo.pageSize = pagination.pageSize
    paginationInfo.current = pagination.current
    searchTableItem()
  }
</script>

<style scoped lang="less"></style>
