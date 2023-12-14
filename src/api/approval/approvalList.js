import request from '@/router/axios'
export function creditList(query){
  return request({
    url:'/creditapply/page',
    method: 'GET',
    params: query
  })
}

export function creditapplyudit(query) {
  return request({
    url: `/creditapply/audit?id=${query.id}&creditApplyStatus=${query.creditApplyStatus}&refuseNote=${query.refuseNote}`,
    method: 'POST',
  })
}
export function creditapplyDetail(query){
  return request({
    url:`/creditapply/${query.id}`,
    method: 'GET',
    // params: query
  })
}
//流转轨迹
export function creditapplytrack(query){
  return request({
    url:`/creditapply/track?creditApplyId=${query.id}`,
    method: 'GET',
    // params: query
  })
}
//持信企业
export function creditholdCompany(query){
  return request({
    url:`/creditapply/holdinfo?holdCompany=${query.id}`,
    method: 'GET',
    // params: query
  })
}
