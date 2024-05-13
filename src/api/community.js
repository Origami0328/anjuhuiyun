import request from '@/utils/request'
import { getAccessToken } from '@/utils/accessToken'
//小区信息管理的列表接口
export function getVillageInformList(data) {
  return request({
    url: '/managerPC/village/list',
    method: 'post',
    data,
  })
}

//小区信息管理的新增获取省份接口
// export function getProvinceToStreet(data) {
//   return request({
//     url: '/managerPC/village/toAdd',
//     method: 'post',
//     data,
//   })
// }
//小区信息管理的新增获取省份接口
export function getProvince(data) {
  return request({
    url: '/managerPC/address/getProvince',
    method: 'post',
    data,
  })
}
//小区信息管理的新增获取城市接口
export function getAddressCity(data) {
  return request({
    url: '/managerPC/address/getCity',
    method: 'post',
    data,
  })
}
//小区信息管理的新增获取城市接口
export function getDistrict(data) {
  return request({
    url: '/managerPC/address/getDistrict',
    method: 'post',
    data,
  })
}
//小区信息管理的获取街道接口
export function getStreet(data) {
  return request({
    url: '/managerPC/address/getStreet',
    method: 'post',
    data,
  })
}
//小区信息管理的新增获取省厅等接口
export function getCity(data) {
  return request({
    url: '/managerPC/dic/getCity',
    method: 'post',
    data,
  })
}
//小区信息管理的修改接口
export function getVillageInfo(data) {
  return request({
    url: '/managerPC/village/getVillageInfo',
    method: 'post',
    data,
  })
}
//小区信息管理的删除接口
export function delVillageInfoItem(data) {
  return request({
    url: '/managerPC/village/del',
    method: 'post',
    data,
  })
}

//小区信息管理的配置提交
export function submitSetting(data) {
  return request({
    url: '/managerPC/village/submitSetting',
    method: 'post',
    data,
  })
}

//小区信息管理的保障房配置提交
export function submitSettingBzf(data) {
  return request({
    url: '/managerPC/village/submitSettingBzf',
    method: 'post',
    data,
  })
}
//小区信息管理的检测是否存在小区
export function hasVillage(data) {
  return request({
    url: '/managerPC/village/hasVillage',
    method: 'post',
    data,
  })
}
//小区信息管理的新增接口
export function addVillage(data) {
  return request({
    url: '/managerPC/village/add',
    method: 'post',
    data,
  })
}

//小区信息管理的编辑接口
export function editVillage(data) {
  return request({
    url: '/managerPC/village/edit',
    method: 'post',
    data,
  })
}
//小区信息管理的获取表格项详情接口
export function getSetting(data) {
  return request({
    url: '/managerPC/village/getSetting',
    method: 'post',
    data,
  })
}
//小区功能管理的列表接口
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

// 楼栋删除
export function delBuildingItem(data) {
  return request({
    url: '/managerPC/villageBuilding/del',
    method: 'post',
    data,
  })
}

// 楼栋删除
export function delAllBuildingItem(data) {
  return request({
    url: '/managerPC/villageBuilding/delAll',
    method: 'post',
    data,
  })
}
// 楼栋新增
export function addBuilding(data) {
  return request({
    url: '/managerPC/villageBuilding/add',
    method: 'post',
    data,
  })
}
// 楼栋修改
export function editBuilding(data) {
  return request({
    url: '/managerPC/villageBuilding/edit',
    method: 'post',
    data,
  })
}

// 楼栋表单小区
export function formVillageBuilding(data) {
  return request({
    url: '/managerPC/villageBuilding/toAdd',
    method: 'post',
    data,
  })
}

// 楼栋验证名称唯一
export function onlyBuildingName(data) {
  return request({
    url: '/managerPC/villageBuilding/onlyName',
    method: 'post',
    data,
  })
}

// 楼栋验证名称唯一
export function downXcxCode(data) {
  return request({
    url: '/managerPC/villageBuilding/getVisitorXcxCode',
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
// 单元的删除
export function delUnitItem(data) {
  return request({
    url: '/managerPC/villageUnit/del',
    method: 'post',
    data,
  })
}
// 多个单元的删除
export function delAllUnitItem(data) {
  return request({
    url: '/managerPC/villageUnit/delAll',
    method: 'post',
    data,
  })
}
// 单元的有权限小区
export function formUnitVillage(data) {
  return request({
    url: '/managerPC/villageUnit/toAdd',
    method: 'post',
    data,
  })
}

// 单元的新增
export function addUnit(data) {
  return request({
    url: '/managerPC/villageUnit/add',
    method: 'post',
    data,
  })
}

// 单元的修改
export function editUnit(data) {
  return request({
    url: '/managerPC/villageUnit/edit',
    method: 'post',
    data,
  })
}
// 单元的验证名称唯一
export function onlyUnitName(data) {
  return request({
    url: '/managerPC/villageUnit/onlyName',
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
// 获取房号
export function getHouse(data) {
  return request({
    url: '/managerPC/villageUnit/getHouse',
    method: 'post',
    data,
  })
}

// 房屋下的验证房屋名唯一
export function onlyHouseName(data) {
  return request({
    url: '/managerPC/villageHouse/onlyName',
    method: 'post',
    data,
  })
}
// 房屋下的新增
export function addHouseList(data) {
  return request({
    url: '/managerPC/villageHouse/add',
    method: 'post',
    data,
  })
}

// 房屋下的修改
export function editHouseList(data) {
  return request({
    url: '/managerPC/villageHouse/edit',
    method: 'post',
    data,
  })
}
// 房屋下的批量删除
export function multipleDeleteApi(data) {
  return request({
    url: '/managerPC/villageHouse/delAll',
    method: 'post',
    data,
  })
}

// 房屋下的删除
export function deleteHouse(data) {
  return request({
    url: '/managerPC/villageHouse/del',
    method: 'post',
    data,
  })
}
// 房屋下的分配房东数据
export function getDisUser(data) {
  return request({
    url: '/managerPC/villageHouse/getDisUser',
    method: 'post',
    data,
  })
}
// 房屋下的分配房东
export function disMaster(data) {
  return request({
    url: '/managerPC/villageHouse/disUser',
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

// 小区单元
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
