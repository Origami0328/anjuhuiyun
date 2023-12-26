import request from '@/utils/request'
import { getAccessToken } from '@/utils/accessToken'

export function getvillageFunction(data) {
  return request({
    url: '/managerPC/villageFunction/list',
    method: 'post',
    data,
  })
}
//小区功能管理的修改信息接口
export function editVillageItem(data) {
  return request({
    url: '/managerPC/villageFunction/edit',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      clientId: '111',
      os: 'pc',
      userId: '1',
      tokenId: getAccessToken(),
    },
  })
}
//小区功能管理的新增信息接口
export function addVillageItem(data) {
  return request({
    url: '/managerPC/villageFunction/add',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      clientId: '111',
      os: 'pc',
      userId: '1',
      tokenId: getAccessToken(),
    },
  })
}
//小区功能管理的删除信息接口
export function delVillageItem(data) {
  return request({
    url: '/managerPC/villageFunction/del',
    method: 'post',
    data,
  })
}
//小区功能管理的批量删除信息接口
export function delAllVillageItem(data) {
  return request({
    url: '/managerPC/villageFunction/delAll',
    method: 'post',
    data,
  })
}

// 楼栋列表
export function getBuildingList(data) {
  return request({
    url: '/managerPC/villageBuilding/list',
    method: 'post',
    data,
  })
}

// 单元列表
export function getUnitList(data) {
  return request({
    url: '/managerPC/villageUnit/list',
    method: 'post',
    data,
  })
}

// 房屋列表
export function getHouseList(data) {
  return request({
    url: '/managerPC/villageHouse/list',
    method: 'post',
    data,
  })
}

// 房屋列表
export function addHouseList(data) {
  return request({
    url: '/managerPC/villageHouse/add',
    method: 'post',
    data,
  })
}
// 小区楼号
export function getBuilding(data) {
  return request({
    url: '/managerPC/villageUnit/getBuilding',
    method: 'post',
    data,
  })
}

// 小区楼号
export function getUnit(data) {
  return request({
    url: '/managerPC/villageUnit/getUnit',
    method: 'post',
    data,
  })
}
// 门禁卡管理列表
export function getVillageDoorCardList(data) {
  return request({
    url: '/managerPC/villageDoorCard/list',
    method: 'post',
    data,
  })
}
// 门禁卡管理删除接口
export function delVillageDoorCard(data) {
  return request({
    url: '/managerPC/villageDoorCard/del',
    method: 'post',
    data,
  })
}

// 门禁卡管理验证卡号唯一
export function onlyName(data) {
  return request({
    url: '/managerPC/villageDoorCard/onlyName',
    method: 'post',
    data,
  })
}
// 门禁卡管理验证卡号唯一
export function addVillageDoorCard(data) {
  return request({
    url: '/managerPC/villageDoorCard/add',
    method: 'post',
    data,
  })
}
