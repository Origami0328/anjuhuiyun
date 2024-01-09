import { reactive, ref } from 'vue'

const columns = ref([
  {
    title: '序号',
    dataIndex: 'No',
    width: '50px',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'realName',
  },
  {
    title: '职位',
    dataIndex: 'roleName',
  },
  {
    title: '审核状态',
    dataIndex: 'isAuth',
  },
  {
    title: '账号状态',
    dataIndex: 'status',
  },
  {
    title: '审核用户',
    dataIndex: 'updateUser',
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
  recommendUser: '',
  recommendReason: '',
  startTime: undefined,
  endTime: undefined,
  isAuth: '1',
  status: '0',
  roleGroupId: undefined,
  roleId: undefined,
  provieceCode: undefined,
  villageIds: [],
  cityCode: undefined,
  streetCode: undefined,
  districtCode: undefined,
  poProvieceCode: undefined,
  poCityCode: undefined,
  poDistrictCode: undefined,
  poStreetCode: undefined,
  villageId: undefined,
  buildingIds: [],
  buildingId: undefined,
  createdTime: '',
  addUser: '',
  isShowStatis: undefined,
  identityGUrl: '',
  fileList: ref([]),
  identityPUrl: '',
  filePList: ref([]),
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
    label: '正常',
  },
  {
    value: '1',
    label: '异常',
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
const provieceList = ref([
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
const poProvieceList = ref([
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
  provieceCode: undefined,
  cityCode: undefined,
  districtCode: undefined,
  streetCode: undefined,
  villageId: undefined,
  poProvieceCode: undefined,
  poCityCode: undefined,
  poDistrictCode: undefined,
  poStreetCode: undefined,
  roleGroup: undefined,
  buildingId: undefined,
  roleId: undefined,
  isAuth: undefined,
}
const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  roleGroupId: [{ required: true, message: '请选择角色分组' }],
  roleId: [{ required: true, message: '请选择角色' }],
  provieceCode: [{ required: true, message: '请选择省份' }],
  villageId: [{ required: true, message: '请选择小区' }],
  villageIds: [{ required: true, message: '请选择小区' }],
  cityCode: [{ required: true, message: '请选择城市' }],
  poProvieceCode: [{ required: true, message: '请选择省厅' }],
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
  status: [{ required: true, message: '请选择状态' }],
  isAuth: [{ required: true, message: '请选择审核状态' }],
}
const rulesEdit = {
  roleGroupId: [{ required: true, message: '请选择角色分组' }],
  roleId: [{ required: true, message: '请选择角色' }],
  provieceCode: [{ required: true, message: '请选择省份' }],
  villageId: [{ required: true, message: '请选择小区' }],
  villageIds: [{ required: true, message: '请选择小区' }],
  cityCode: [{ required: true, message: '请选择城市' }],
  poProvieceCode: [{ required: true, message: '请选择省厅' }],
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
  status: [{ required: true, message: '请选择状态' }],
  isAuth: [{ required: true, message: '请选择审核状态' }],
}
const formRoleGroup = [
  {
    value: '0',
    label: '系统管理员',
  },
  {
    value: '1',
    label: '省份管理员',
  },
  {
    value: '2',
    label: '市级管理员',
  },
  {
    value: '3',
    label: '县级管理员',
  },
  {
    value: '4',
    label: '街道管理员',
  },
  {
    value: '5',
    label: '小区管理组',
  },
  {
    value: '6',
    label: '楼栋管理组',
  },
  {
    value: '7',
    label: '市局',
  },
  {
    value: '9',
    label: '分局',
  },
  {
    value: '8',
    label: '派出所',
  },
  {
    value: '11',
    label: '管理员',
  },
]
export {
  columns,
  formRef,
  userListObj,
  buildingList,
  poDistrictList,
  poStreetList,
  poCityList,
  formState,
  poProvieceList,
  provieceList,
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
}
