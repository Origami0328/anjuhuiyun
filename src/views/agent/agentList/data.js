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
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: '150px',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '省份',
    dataIndex: 'provinceName',
    width: '150px',
  },
  {
    title: '城市',
    dataIndex: 'cityName',
    width: '150px',
  },
  {
    title: '区域',
    dataIndex: 'areaName',
    width: '200px',
  },
  // {
  //   title: '级别',
  //   dataIndex: 'level',
  //   width: '70px',
  // },
  {
    title: '添加时间',
    dataIndex: 'addTime',
    width: '150px',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '300px',
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
  formCityList,
}
