<template>
  <basic-container>
    <div class="custom-list">资料审核</div>
    <div class="search-content-examine">
      <div class="examine-area">
        <span class="time-query">提交时间</span>
        <el-date-picker
            class="time-picker"
            width="240"
            value-format="YYYY-MM-DD HH:mm:ss"
            v-model="Datevalue"
            type="daterange"
            range-separator="到"
            start-placeholder="开始时间"
            end-placeholder="截止时间"
        />
      </div>
      <div class="examine-area">
        <span class="time-query">企业搜索</span>
        <el-input class="enterprise-query" v-model="enterpriseNameQuery" placeholder="请输入企业名称/社会信用代码/手机号" />
      </div>
      <div class="examine-area">
        <el-button class="query-button-examine" @click="customListQuery"><el-icon><Search style="margin-right: 2px"/></el-icon>查询</el-button>
      </div>
    </div>
  </basic-container>
  <basic-container>
    <el-row>
      <el-col :span="2" :offset="22">
        <div class="grid-content"/>
        <el-button class="down-button" @click="exportExcel">下载</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" class="custom-table" :row-class-name="custom-row">
      <el-table-column prop="enterpriseName" label="企业名称" width="180" />
      <el-table-column prop="socialCreditCode" label="社会信用代码" width="180" />
      <el-table-column prop="contactName" label="联系人姓名" />
      <el-table-column prop="contactPhoneNumber" label="联系人手机号" />
      <el-table-column prop="createdAt" label="提交时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="toDetail(scope.row.id)" class="opeation-button"
          >审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--  分页 -->
    <div class="list-pagination">
      <el-pagination
          style="display: flex;justify-content: end;"
          class="custom-pagination"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total=total
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </basic-container>
</template>
<script setup>
import { ref,onMounted,getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'
import {
  customList,
} from '@/api/custom/creditenterprise'
const router=useRouter()
const { appContext } = getCurrentInstance()
// 日期选择器
const Datevalue = ref([])
// 企业搜索
const enterpriseNameQuery = ref('')
// 会员选择
const tableData = ref([])
// 数据表
const auditStatus = ref('')
// 数据总数
const total = ref(0)
// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// 跳转到详情
function toDetail(customId) {
  return router.push({
    path: '../reviewdetail/index',
    query:{customId}
  })
}
// 查询列表
function customListQuery(){
  let startTime
  let endTime
  if ((Datevalue.value ?? '') !== '') {
    startTime = Datevalue?.value[0],
    endTime = Datevalue?.value[1]
  } else {
    startTime = '',
    endTime = ''
  }
  customList({pageSize:pageSize.value,
    pageNum:currentPage.value,
    startTime:startTime,
    endTime:endTime,
    auditStatus:'0',
    enterpriseName:enterpriseNameQuery.value,
    sceneType:'2'
  })
      .then(response => {
        tableData.value = response.data.data.records
        total.value=response.data.data.total
      })
      .catch(() => {
        console.error(error)
      });
}
const exportExcel = () => {
  const header = {
    enterpriseName: '企业名称',
    socialCreditCode: '社会信用代码',
    contactName: '联系人姓名',
    contactPhoneNumber: '联系人手机号',
    createdAt: '提交时间',
  }
  const { jsonToExcel } = appContext.config.globalProperties
  jsonToExcel({ list: tableData.value, header })
}
// 生命周期
onMounted(() => {
  customListQuery()
})
//分页事件
const handleCurrentChange = () => {
  customListQuery()
}
</script>
<style scoped>
.search-content-examine {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  margin: 5px 0;
  padding-left: 8px;
  align-items: center;
}
.examine-area {
  display: flex;
  margin-top: 8px;
  align-items: center;
  margin-right: 30px;
}
.time-query{
  font-size: 14px;
  font-weight: 400;
  padding-right: 10px;
  color: rgba(0,0,0,0.85);
}
.enterprise-query{
  width: 238px;
  height: 30px;
  font-size: 14px;
  color: rgba(0,0,0,0.25);
  line-height: 30px;
  padding: 0 10px;
}
::v-deep .time-picker{
  width: 240px;
  height: 30px;
  font-size: 14px;
  color: rgba(0,0,0,0.25);
  line-height: 30px;
}
.custom-list{
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  padding: 20px 0;
}
.query-button-examine{
  width: 82px;
  height: 32px;
  color: #FFFFFF;
  background: #4080FF;
  box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.04);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  border: 1px solid #4080FF;
}
.down-button{
  margin-left: 8px;
  width: 82px;
  height: 32px;
  color: #4080FF;
  background: #FFFFFF;
  box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.04);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  margin-bottom: 25px;
  border: 1px solid #4080FF;
}
::v-deep .custom-table tr th{
  border-bottom: 1px solid #4080FF!important;
}
::v-deep .custom-table tr th .cell{
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0,0,0,0.85);
  border-right: 1px solid #4080FF!important;
}
::v-deep .custom-table .cell{
  text-align: center;
}
::v-deep .custom-table tr th:last-child .cell{
  border-right: 1px solid #ffffff!important;
}
.custom-table .custom-row {
  --el-table-tr-bg-color: var(--el-empty-fill-color-5);
}
.opeation-button{
  border: none;
  color: #4080FF;
}
.list-pagination{
  margin-top: 30px;
}
.custom-pagination{
  justify-content: center;
}
</style>
