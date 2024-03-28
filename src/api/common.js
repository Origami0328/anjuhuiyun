import request from '@/utils/request'
// 获取代理商的列表
export function getAgentChild(data) {
  return request({
    url: '/managerPC/agent/getAgentChild',
    method: 'post',
    data,
  })
}
// 获取小区
export function getVillage(data) {
  return request({
    url: '/managerPC/village/getVillage',
    method: 'post',
    data,
  })
}
