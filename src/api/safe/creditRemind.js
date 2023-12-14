import request from '@/router/axios'

// 查询通知设置列表
export function queryRemindSettings (query) {
  return request({
    url: '/creditRemind/queryRemindSettings',
    method: 'POST',
    data: query,
  })
}

export function setRemindPhone (query) {
  return request({
    url: '/creditRemind/setRemindPhone',
    method: 'POST',
    data: query,
  })
}
