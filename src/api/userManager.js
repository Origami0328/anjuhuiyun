import request from '@/utils/request'
import { getAccessToken } from '@/utils/accessToken'

// 获取主账户的列表数据
export function getMasterUserList(data) {
  return request({
    url: '/managerPC/masterUser/list',
    method: 'post',
    data,
  })
}

// 新增
export function addMasterUserList(data) {
  return request({
    url: '/managerPC/masterUser/add',
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

export function delMasterUserItem(data) {
  return request({
    url: '/managerPC/masterUser/del',
    method: 'post',
    data,
  })
}
//分配门详情
export function distDoor(data) {
  return request({
    url: '/managerPC/masterUser/distDoor',
    method: 'post',
    data,
  })
}
// 修改分配门
export function submitDoor(data) {
  return request({
    url: '/managerPC/masterUser/submitDoor',
    method: 'post',
    data,
  })
}

// 复制
export function copyUser(data) {
  return request({
    url: '/managerPC/masterUser/copyUser',
    method: 'post',
    data,
  })
}

// 根据类型获取默认时间
export function getTime(data) {
  return request({
    url: '/managerPC/masterUser/getTime',
    method: 'post',
    data,
  })
}
// 主账号详情
export function toEditInfo(data) {
  return request({
    url: '/managerPC/masterUser/toEdit',
    method: 'post',
    data,
  })
}
// 修改
export function edit(data) {
  return request({
    url: '/managerPC/masterUser/edit',
    method: 'post',
    data,
  })
}
// 实名信息
export function toSupplyAuthNameEdit(data) {
  return request({
    url: '/managerPC/masterUser/toSupplyAuthNameEdit',
    method: 'post',
    data,
  })
}
// 图片上传
export function uploadImgaeV2(data) {
  return request({
    url: '/managerPC/masterUser/uploadImgaeV2',
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
// 修改实名状态
export function updateAuthV2(data) {
  return request({
    url: '/managerPC/masterUser/updateAuthV2',
    method: 'post',
    data,
  })
}
// 跳转人脸添加页面
export function toAddFace(data) {
  return request({
    url: '/managerPC/masterUser/toAddFace',
    method: 'post',
    data,
  })
}
//保存人脸图片
export function uploadFaceSave(data) {
  return request({
    url: '/managerPC/masterUser/uploadFaceSave',
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
//删除登录限制
export function delUserFace(data) {
  return request({
    url: '/managerPC/masterUser/delUserFace',
    method: 'post',
    data,
  })
}
// 跳转人脸添加页面
export function delLoginLimit(data) {
  return request({
    url: '/managerPC/masterUser/delLimit',
    method: 'post',
    data,
  })
}
// 跳转新增
export function toAdd(data) {
  return request({
    url: '/managerPC/masterUser/toAdd',
    method: 'post',
    data,
  })
}
// 跳转复制
export function toCopy(data) {
  return request({
    url: '/managerPC/masterUser/toCopy',
    method: 'post',
    data,
  })
}
// 查看房屋信息
export function distHouse(data) {
  return request({
    url: '/managerPC/masterUser/distHouse',
    method: 'post',
    data,
  })
}
