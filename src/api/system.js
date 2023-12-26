import request from '@/utils/request'
// 获取角色管理的列表数据
export function getUserMenu(data) {
  return request({
    url: '/managerPC/systemRole/groupAndRoleList',
    method: 'post',
    data,
  })
}
// 获取角色管理下的菜单列表
export function getAllMenu(data) {
  return request({
    url: '/managerPC/systemMenu/getAllMenuRight',
    method: 'post',
    data,
  })
}
// 获取角色管理的新增角色的分组
export function getGroup(data) {
  return request({
    url: '/managerPC/systemRole/getGroup',
    method: 'post',
    data,
  })
}
// 角色管理的新增角色
export function addRole(data) {
  return request({
    url: '/managerPC/systemRole/addRole',
    method: 'post',
    data,
  })
}
// 角色管理的获取角色权限
export function getRoleRight(data) {
  return request({
    url: '/managerPC/systemRole/getRoleRight',
    method: 'post',
    data,
  })
}
// 角色管理的删除角色
export function delRole(data) {
  return request({
    url: '/managerPC/systemRole/delRole',
    method: 'post',
    data,
  })
}
// 角色管理的新增角色
export function saveRoleRight(data) {
  return request({
    url: '/managerPC/systemRole/saveRoleRight',
    method: 'post',
    data,
  })
}

//菜单管理列表
export function getMenuTree(data) {
  return request({
    url: '/managerPC/systemMenu/getMenuTree',
    method: 'post',
    data,
  })
}
//菜单管理的删除
export function delMenu(data) {
  return request({
    url: '/managerPC/systemMenu/delMenu',
    method: 'post',
    data,
  })
}
//菜单管理的添加
export function addMenu(data) {
  return request({
    url: '/managerPC/systemMenu/addMenu',
    method: 'post',
    data,
  })
}
//菜单管理的新增时查询的菜单
export function getMenu(data) {
  return request({
    url: '/managerPC/systemMenu/getMenu',
    method: 'post',
    data,
  })
}

//api管理的列表数据
export function getApi(data) {
  return request({
    url: '/managerPC/systemApi/getApi',
    method: 'post',
    data,
  })
}

//api管理的新增api接口
export function addApi(data) {
  return request({
    url: '/managerPC/systemApi/addApi',
    method: 'post',
    data,
  })
}
//api管理的删除api接口
export function delApi(data) {
  return request({
    url: '/managerPC/systemApi/delApi',
    method: 'post',
    data,
  })
}

//系统用户的获取角色权限组
export function getRoleGroup(data) {
  return request({
    url: '/managerPC/user/toAdd',
    method: 'post',
    data,
  })
}
//系统用户的获取角色
export function getRole(data) {
  return request({
    url: '/managerPC/user/getRole',
    method: 'post',
    data,
  })
}
//获取省份
export function getProvince(data) {
  return request({
    url: '/managerPC/address/getProvince',
    method: 'post',
    data,
  })
}
//获取省份下面的城市
export function getCity(data) {
  return request({
    url: '/managerPC/address/getCity',
    method: 'post',
    data,
  })
}
//获取城市下面的区县
export function getDistrict(data) {
  return request({
    url: '/managerPC/address/getDistrict',
    method: 'post',
    data,
  })
}
//获取城市下面的街道
export function getStreet(data) {
  return request({
    url: '/managerPC/address/getStreet',
    method: 'post',
    data,
  })
}

//系统用户的用户列表接口
export function getUserList(data) {
  return request({
    url: '/managerPC/user/list',
    method: 'post',
    data,
  })
}
//系统用户的小区列表接口
export function getVillageList(data) {
  return request({
    url: '/managerPC/user/getVillage',
    method: 'post',
    data,
  })
}
//系统用户的获取省厅派出所
export function getCityDic(data) {
  return request({
    url: '/managerPC/dic/getCity',
    method: 'post',
    data,
  })
}
//系统用户的获取地区/省厅等
export function getDictionary(data) {
  return request({
    url: '/managerPC/dic/getCity',
    method: 'post',
    data,
  })
}
//系统用户的获取楼栋
export function getBuilding(data) {
  return request({
    url: '/managerPC/user/getBuilding',
    method: 'post',
    data,
  })
}

//系统用户的删除表格项
export function del(data) {
  return request({
    url: '/managerPC/user/del',
    method: 'post',
    data,
  })
}

//系统用户的修改表格项
export function edit(data) {
  return request({
    url: '/managerPC/user/edit',
    method: 'post',
    data,
  })
}
//系统用户的form表单 验证用户名是否存在
export function hasU(data) {
  return request({
    url: '/managerPC/user/hasU',
    method: 'post',
    data,
  })
}
//系统用户的form表单 添加用户
export function addU(data) {
  return request({
    url: '/managerPC/user/add',
    method: 'post',
    data,
  })
}
