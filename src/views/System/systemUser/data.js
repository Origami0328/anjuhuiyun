import { reactive, ref } from 'vue'

const columns = ref([
  {
    title: '序号',
    dataIndex: 'No',
    width: '60px',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '职位',
    dataIndex: 'roleName',
  },
  {
    title: '账号状态',
    dataIndex: 'isAuth',
  },
  {
    title: '添加时间',
    dataIndex: 'createdTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: '200px',
  },
])
const formRef = ref()
const formState = reactive({
  username: undefined,
  password: '',
  realName: '',
  phone: '',
  identity: '',
  email: '',
  remarks: '',
  // recommendUser: '',
  // recommendReason: '',
  startTime: '',
  endTime: '',
  isAuth: '1',
  status: '0',
  roleGroupId: null,
  roleId: null,
  villageIds: undefined,
  roleGroupType: undefined,
  poProvinceCode: undefined,
  poCityCode: undefined,
  poDistrictCode: undefined,
  poStreetCode: undefined,
  villageId: undefined,
  buildingIds: undefined,
  buildingId: undefined,
  addTime: undefined,
  addUser: '',
  identityGUrl: '',
  identityPUrl: '',
  base64Img1: '',
  base64Img2: '',
})
const authList = [
  {
    value: '',
    label: '全部',
  },
  {
    value: '0',
    label: '待审核',
  },
  {
    value: '1',
    label: '审核通过',
  },
  {
    value: '2',
    label: '审核失败',
  },
]
const showStatisOptions = [
  {
    value: '0',
    label: '不展示',
  },
  {
    value: '1',
    label: '物业统计',
  },
  {
    value: '2',
    label: '民警统计',
  },
]
const statusOptions = [
  {
    value: '0',
    label: '待审核',
  },
  {
    value: '1',
    label: '审核通过',
  },
  {
    value: '2',
    label: '审核未通过',
  },
  {
    value: '3',
    label: '账号异常',
  },
]
const addStatusOptions = [
  {
    value: '0',
    label: '待审核',
  },
  {
    value: '1',
    label: '审核通过',
  },
  {
    value: '2',
    label: '审核未通过',
  },
]
const dateFormat = 'YYYY-MM-DD'

const formAuthList = authList.slice(1)
const roleGroupList = ref([
  {
    value: '',
    label: '全部',
  },
])
let formRoleGroupList = ref([])
const roleList = ref([])
//市
const cityList = ref([
  {
    value: '',
    label: '全部',
  },
])
//区
const districtList = ref([
  {
    value: '',
    label: '全部',
  },
])
//街道
const streetList = ref([
  {
    value: '',
    label: '全部',
  },
])
// 省
const provinceList = ref([
  {
    value: '',
    label: '全部',
    childCode: 'DQ',
  },
])

//小区
const villageList = ref([
  {
    value: '',
    label: '全部',
  },
])
//省厅
const poProvinceList = ref([
  {
    value: '',
    label: '全部',
    childCode: 'PO',
  },
])

//派出所
const poStreetList = ref([
  {
    value: '',
    label: '全部',
  },
])
//市局
const poCityList = ref([
  {
    value: '',
    label: '全部',
  },
])
//分局
const poDistrictList = ref([
  {
    value: '',
    label: '全部',
  },
])
//楼栋
const buildingList = ref([
  {
    value: '',
    label: '全部',
  },
])
const userListObj = {
  searchName: '',
  villageId: undefined,
  poProvinceCode: undefined,
  poCityCode: undefined,
  poDistrictCode: undefined,
  poStreetCode: undefined,
  roleGroupId: undefined,
  buildingId: undefined,
  roleId: undefined,
  isAuth: undefined,
  pageNum: '1',
  pageSize: '10',
}
const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 12,
      message: '密码长度6-12位',
      trigger: 'blur',
    },
  ],
  roleGroupId: [{ required: true, message: '请选择角色分组' }],
  roleId: [{ required: true, message: '请选择角色' }],
  poProvinceCode: [{ required: true, message: '请选择省厅' }],
  poCityCode: [{ required: true, message: '请选择市局' }],
  poDistrictCode: [{ required: true, message: '请选择分局' }],
  poStreetCode: [{ required: true, message: '请选择派出所' }],
  buildingIds: [{ required: true, message: '请选择楼栋' }],
  buildingId: [{ required: true, message: '请选择楼栋' }],
  districtCode: [{ required: true, message: '请选择区县' }],
  streetCode: [{ required: true, message: '请选择楼栋' }],
  startTime: [{ required: true, message: '请选择开始时间' }],
  phone: [{ required: true, message: '请输入手机号' }],
  endTime: [{ required: true, message: '请选择结束时间' }],
  realName: [{ required: true, message: '请输入姓名' }],
  isAuth: [{ required: true, message: '请选择审核状态' }],
}
const rulesEdit = {
  roleGroupId: [{ required: true, message: '请选择角色分组' }],
  roleId: [{ required: true, message: '请选择角色' }],
  provinceCode: [{ required: true, message: '请选择省份' }],
  villageIds: [{ required: true, message: '请选择小区' }],
  cityCode: [{ required: true, message: '请选择城市' }],
  poStreetCode: [{ required: true, message: '请选择派出所' }],
  buildingIds: [{ required: true, message: '请选择楼栋' }],
  buildingId: [{ required: true, message: '请选择楼栋' }],
  startTime: [{ required: true, message: '请选择开始时间' }],
  phone: [{ required: true, message: '请输入手机号' }],
  endTime: [{ required: true, message: '请选择结束时间' }],
  realName: [{ required: true, message: '请输入姓名' }],
  isAuth: [{ required: true, message: '请选择审核状态' }],
}
let formRoleGroup = ref([])
export {
  columns,
  formRef,
  userListObj,
  buildingList,
  poDistrictList,
  poStreetList,
  poCityList,
  formState,
  poProvinceList,
  provinceList,
  authList,
  streetList,
  dateFormat,
  villageList,
  formRoleGroupList,
  cityList,
  roleList,
  roleGroupList,
  statusOptions,
  districtList,
  formAuthList,
  rules,
  rulesEdit,
  formRoleGroup,
  showStatisOptions,
  addStatusOptions,
}
