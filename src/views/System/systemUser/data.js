import { reactive, ref } from 'vue'

const columns = ref([
  {
    title: '序号',
    dataIndex: 'No',
    width: 5,
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
    resizable: true,
    width: 120,
    minWidth: 120,
    maxWidth: 200,
  },
  {
    title: '审核状态',
    dataIndex: 'isAuth',
  },
  {
    title: '推荐用户',
    dataIndex: 'recommendUser',
  },
  {
    title: '账号状态',
    dataIndex: 'status',
  },
  {
    title: '所管辖区域',
    dataIndex: 'area',
    resizable: true,
    width: 100,
    minWidth: 100,
    maxWidth: 200,
  },
  {
    title: '添加用户',
    dataIndex: 'addUser',
  },
  {
    title: '审核用户',
    dataIndex: 'updateUser',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 150,
  },
])
const formState = reactive({
  username: '',
  password: '',
  chkpwd: '',
  realName: '',
  phone: '',
  identity: '',
  email: '',
  remarks: '',
  recommendUser: '',
  recommendReason: '',
  startTime: '',
  endTime: '',
  isAuth: undefined,
  status: undefined,
  roleGroupId: undefined,
  roleId: undefined,
  provieceCode: undefined,
  villageIds: [],
  cityCode: undefined,
  poProvieceCode: undefined,
  poCityCode: undefined,
  poDistrictCode: undefined,
  poStreetCode: undefined,
  villageId: undefined,
  buildingIds: undefined,
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

export {
  columns,
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
}
