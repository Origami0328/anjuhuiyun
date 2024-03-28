import { ref } from 'vue'

const formLevelList = [
  {
    value: '1',
    label: '1级',
  },
  {
    value: '2',
    label: '2级',
  },
  {
    value: '3',
    label: '3级',
  },
  {
    value: '4',
    label: '4级',
  },
  {
    value: '5',
    label: '5级',
  },
]
const levelList = [
  {
    value: '',
    label: '全部',
  },
  {
    value: '1',
    label: '1级',
  },
  {
    value: '2',
    label: '2级',
  },
  {
    value: '3',
    label: '3级',
  },
  {
    value: '4',
    label: '4级',
  },
  {
    value: '5',
    label: '5级',
  },
]
const columns = [
  {
    title: '序号',
    dataIndex: 'No',
    width: 60,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 200,
  },
  // {
  //   title: '省份',
  //   dataIndex: 'provinceName',
  //   width: '100px',
  // },
  // {
  //   title: '城市',
  //   dataIndex: 'cityName',
  //   width: '100px',
  // },
  // {
  //   title: '区域',
  //   dataIndex: 'areaName',
  //   width: '100px',
  // },
  {
    title: '区域',
    dataIndex: 'area',
    width: 250,
  },
  {
    title: '级别',
    dataIndex: 'level',
  },
  {
    title: '类别',
    dataIndex: 'type',
    width: '70px',
  },

  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '添加时间',
    dataIndex: 'addTime',
    width: '150px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 300,
    align: 'center',
  },
]
const provinceList = ref([])
const cityList = ref([])
const districtList = ref([])
const formProvinceList = ref([])
const formCityList = ref([])
const formDistrictList = ref([])
const villageList = ref([])
const formVillageList = ref([])
// const buildingList = ref([])
// const formBuildingList = ref([])
// const unitList = ref([])
// const formUnitList = ref([])
// const houseList = ref([])
// const formHouseList = ref([])
const agentChildColumns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
]
const agentVillageColumns = [
  {
    title: '小区名',
    dataIndex: 'villageName',
  },
  {
    title: '分成金额（厘）',
    dataIndex: 'earning',
    width: '150px',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '250px',
  },
]
export {
  agentChildColumns,
  agentVillageColumns,
  columns,
  cityList,
  villageList,
  formVillageList,
  provinceList,
  districtList,
  formLevelList,
  formProvinceList,
  formDistrictList,
  levelList,
  formCityList,
}
