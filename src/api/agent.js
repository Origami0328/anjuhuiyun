import request from '@/utils/request'
// 获取代理商的列表
export function getUserHomeList(data) {
  return request({
    url: '/managerPC/agent/getAgentByPage',
    method: 'post',
    data,
  })
}

// 新增代理商
export function addAgent(data) {
  return request({
    url: '/managerPC/agent/addAgent',
    method: 'post',
    data,
  })
}

// 修改代理商
export function editAgent(data) {
  return request({
    url: '/managerPC/agent/editAgent',
    method: 'post',
    data,
  })
}

// 删除代理商
export function delAgent(data) {
  return request({
    url: '/managerPC/agent/delAgent',
    method: 'post',
    data,
  })
}

// 下级代理商
export function getAgentChild(data) {
  return request({
    url: '/managerPC/agent/getAgentChild',
    method: 'post',
    data,
  })
}
// 添加代理小区
export function addAgentVillage(data) {
  return request({
    url: '/managerPC/agent/addAgentVillage',
    method: 'post',
    data,
  })
}
// 删除代理小区
export function delAgentVillage(data) {
  return request({
    url: '/managerPC/agent/delAgentVillage',
    method: 'post',
    data,
  })
}
// 获取代理页面的小区
export function getAgentVillage(data) {
  return request({
    url: '/managerPC/agent/getAgentVillage',
    method: 'post',
    data,
  })
}
// 修改代理小区
export function editAgentVillage(data) {
  return request({
    url: '/managerPC/agent/editAgentVillage',
    method: 'post',
    data,
  })
}

// 获取代理商详情
export function getAgentDetail(data) {
  return request({
    url: '/managerPC/agent/getAgentDetail',
    method: 'post',
    data,
  })
}
// 根据代理商名称搜索代理商
export function getAgentByName(data) {
  return request({
    url: '/managerPC/agent/getAgentByName',
    method: 'post',
    data,
  })
}
// 代理商类别
export function getAgentType(data) {
  return request({
    url: '/managerPC/agent/getAgentType',
    method: 'post',
    data,
  })
}
// 查找系统用户名称
export function findUserByUserName(data) {
  return request({
    url: '/managerPC/user/findUserByUserName',
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
