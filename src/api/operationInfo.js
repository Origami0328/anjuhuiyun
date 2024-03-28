import request from '@/utils/request'
// 新增资讯
export function addAd(data) {
  return request({
    url: '/managerPC/ad/addAd',
    method: 'post',
    data,
  })
}
// 编辑资讯
export function editAd(data) {
  return request({
    url: '/managerPC/ad/editAd',
    method: 'post',
    data,
  })
}
// 删除资讯
export function deleteAd(data) {
  return request({
    url: '/managerPC/ad/deleteAd',
    method: 'post',
    data,
  })
}
// 分页查询广告资讯
export function getAdByPage(data) {
  return request({
    url: '/managerPC/ad/getAdByPage',
    method: 'post',
    data,
  })
}
// 获取资讯详情
export function getAdInfo(data) {
  return request({
    url: '/managerPC/ad/getAdInfo',
    method: 'post',
    data,
  })
}
//获取小区
export function getVillage(data) {
  return request({
    url: '/managerPC/village/getVillage',
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
