import request from '@/router/axios'
// 报价列表
export function queryQuotePriceList(query){
  return request({
    url:'/quotePrice/queryQuotePriceList',
    method: 'POST',
    data: query
  })
}
// 编辑报价
export function updatePriceById(query){
  return request({
    url:'/quotePrice/updatePriceById',
    method: 'POST',
    data: query
  })
}
// 删除报价
export function deleteById(query){
  return request({
    url:'/quotePrice/deleteById',
    method: 'POST',
    data: query
  })
}
// 新增分类第一步
export function addQuotePriceFirst(query){
  return request({
    url:'/quotePrice/addQuotePriceFirst',
    method: 'POST',
    data: query
  })
}
// 新增分类第二步
export function addQuotePriceSecond(query){
  return request({
    url:'/quotePrice/addQuotePriceSecond',
    method: 'POST',
    data: query
  })
}
// 查询已绑定企业
export function queryBindedEnterpriseList(query){
  return request({
    url:'/quotePrice/queryBindedEnterpriseList',
    method: 'POST',
    data: query
  })
}
export function bindEnterprise(query){
  return request({
    url:'/quotePrice/bindEnterprise',
    method: 'POST',
    data: query
  })
}
// 企业解绑
export function unbindEnterprise(query){
  return request({
    url:'/quotePrice/unBindEnterprise',
    method: 'POST',
    data: query
  })
}
// 查询未绑定分类的核心企业
export function getUnBindedCreditEnterprisePage(query){
  return request({
    url:'/creditenterprise/getUnBindedCreditEnterprisePage',
    method: 'POST',
    data: query
  })
}
