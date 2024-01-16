import request from '@/utils/request'
import { getAccessToken } from '@/utils/accessToken'
// 获取我的一家的列表数据
export function getUserHomeList(data) {
  return request({
    url: '/managerPC/clientUserHome/list',
    method: 'post',
    data,
  })
}
// 获取主账户的列表数据
export function getMasterUserList(data) {
  return request({
    url: '/managerPC/masterUser/list',
    method: 'post',
    data,
  })
}

// 获取主账户的列表数据
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
