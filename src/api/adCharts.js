import request from '@/utils/request'
// 获取代理商收益数统计数据
export function getEarningStatistical(data) {
  return request({
    url: '/managerPC/agentEarning/getEarningStatistical',
    method: 'post',
    data,
  })
}
//获取代理商收益账单记录
export function getBillByPage(data) {
  return request({
    url: '/managerPC/agentEarning/getBillByPage',
    method: 'post',
    data,
  })
}
//获取代理商收益账单记录
export function downloadBill(data) {
  return request({
    url: '/managerPC/agentEarning/downloadBill',
    method: 'post',
    responseType: 'blob',
    data,
  })
}
//获取管理员有权限的所有代理商
export function getAgents(data) {
  return request({
    url: '/managerPC/agent/getAgents',
    method: 'post',
    data,
  })
}
//获取代理商上月+本月+昨日收益情况
export function getCurrentSituation(data) {
  return request({
    url: '/managerPC/agentEarning/getCurrentSituation',
    method: 'post',
    data,
  })
}
