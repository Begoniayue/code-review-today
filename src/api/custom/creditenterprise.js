import request from '@/router/axios'
// 客户列表
export function customList(query){
  return request({
    url:'creditenterprise/page',
    method: 'POST',
    data: query
  })
}
export function downLoadFile(query){
  return request({
    url:'creditenterprise/downLoadFile',
    method: 'POST',
    data: query,
    responseBodyType: 'Blob',
  })
}
export function customDetail(query){
  return request({
    url:'creditenterprise/detail',
    method: 'POST',
    data: query
  })
}
export function examineOpeation(query){
  return request({
    url:'/creditenterprise/toAudit',
    method: 'POST',
    data: query
  })
}
