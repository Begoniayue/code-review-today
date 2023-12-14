<template>
  <basic-container>
    <div class="custom-list">审批中</div>
    <div class="search-content">
      <div class="filter-area">
        <el-select v-model="enterpriseStatus" class="m-2" placeholder="企业搜索" @change="selectChange">
          <el-option
              v-for="item in enterpriseStatusArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-input class="enterprise-query" v-model="enterpriseName" placeholder="请输入企业名称/社会信用代码/手机号"/>
      </div>
      <div class="filter-area">
        <span class="time-query">承信金额</span>
        <el-form
            :inline="true"
            class="demo-form-inline"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
        >
          <el-form-item prop="minAccount" class="search-label">
            <el-input-number
                :controls="false"
                v-model="ruleForm.minAccount"
                class="enterprise-query"
                :precision="2"
                placeholder="票面最小金额（元）"
            />
          </el-form-item>
          -
          <el-form-item prop="maxAccount" class="search-label">
            <el-input-number
                :controls="false"
                v-model="ruleForm.maxAccount"
                class="enterprise-query"
                :precision="2"
                placeholder="票面最大金额（元）"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="filter-area">
        <span class="time-query">审核状态</span>
        <el-select v-model="auditStatus" class="m-2" placeholder="审核状态">
          <el-option
              v-for="item in MemberArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="filter-area">
        <el-button class="query-button" @click="creditListQuery">
          <el-icon>
            <Search style="margin-right: 2px"/>
          </el-icon>
          查询
        </el-button>
      </div>
    </div>
  </basic-container>
  <basic-container>
    <el-table :data="tableData" style="width: 100%" class="custom-table" :row-class-name="custom-row">
      <el-table-column prop="recordCompanyName" label="企业名称" width="180"/>
      <el-table-column prop="holdCompanyName" label="持信企业" width="180"/>
      <el-table-column prop="creditAmount" label="承信金额（元）"/>
      <el-table-column prop="endTime" label="到期日"/>
      <el-table-column prop="rateDay" label="融资期限（天）"/>
      <el-table-column prop="createdAt" label="提交时间"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="toDetail(scope.row.id,scope.row.holdCompany,scope.row.creditApplyId )"
                     class="opeation-button"
          >{{ scope.row.applyStatus === 0 ? '审批' : '查看' }}
          </el-button>
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
          @size-change="handleApprovaListChange"
          @current-change="handleApprovaListChange"
      />
    </div>
  </basic-container>
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {creditholdCompany, creditList} from "../../../api/approval/approvalList";

const ruleFormRef = ref()
const ruleForm = reactive({
  minAccount: null,
  maxAccount: null
})
const isEmpty = (value) => {
  return value === '' || value === null || value === undefined
}
const checkNumberValue = (rule, value, callback) => {
  // 若 minAccount 大于 maxAccount 则交换两者值
  if (!isEmpty(ruleForm.maxAccount) && !isEmpty(ruleForm.minAccount) && ruleForm.minAccount > ruleForm.maxAccount) {
    ruleForm.minAccount = [ruleForm.maxAccount, ruleForm.maxAccount = ruleForm.minAccount][0]
  }
  callback()
}
const rules = reactive({
  minAccount: [{validator: checkNumberValue, trigger: 'blur'}],
  maxAccount: [{validator: checkNumberValue, trigger: 'blur'}],
})
const router = useRouter()
// 数据总数
const total = ref(0)
// 企业搜索
const enterpriseName = ref('')
// 表格数据
const tableData = ref([])
// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// 最大最小金额
const maxAccount = ref('')
const minAccount = ref('')
// 审核状态选择
const auditStatus = ref('WAIT')
const MemberArray = [
  {
    value: 'WAIT',
    label: '待审核',
  },
  {
    value: 'PASS',
    label: '审核通过',
  },
  {
    value: 'REFUSE',
    label: '审核拒绝',
  }
]
// 企业选择
const enterpriseStatus = ref('持信')
const enterpriseStatusArray = [
  {
    value: '持信',
    label: '持信企业',
  },
  {
    value: '登记',
    label: '登记企业',
  }
]
// 持信企业
let holdCompany = ref({})

// 跳转到详情
function toDetail(finanalId, holdCompany, creditApplyId) {
  this.router.push({
    path: '../approvaldetail/index',
    query: {finanalId, holdCompany, creditApplyId}
  })
}

// 查询列表
function creditListQuery() {
  return creditList({
    pageSize: pageSize.value,
    pageNum: currentPage.value,
    creditApplyStatus: auditStatus.value,
    [enterpriseStatus.value === '持信' ? 'holdCompanyName' : 'recordCompanyName']: enterpriseName.value,
    minAccount: minAccount.value,
    maxAccount: maxAccount.value
  }).then(response => {
    tableData.value = response.data.data.records
    total.value = response.data.data.total
  })
      .catch(() => {
        console.error(error)
      });
}

// 生命周期
onMounted(() => {
  console.log('mounted')
  creditListQuery()
})

function handleApprovaListChange() {
  creditListQuery()
}

const selectChange = (value) => {
  enterpriseName.value = ''
}
</script>
<style scoped>
.search-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #fff;
  margin: 5px 0;
  padding-left: 8px;
  align-items: center;
}

.filter-area {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.time-query {
  font-size: 14px;
  font-weight: 400;
  padding-right: 10px;
  color: rgba(0, 0, 0, 0.85);
}

.enterprise-query {
  width: 135px;
  height: 30px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.25);
  line-height: 30px;
  padding: 0 10px;
}

::v-deep .time-picker {
  width: 240px;
  height: 30px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.25);
  line-height: 30px;
}

.custom-list {
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  padding: 20px 0;
}

.query-button {
  width: 82px;
  height: 32px;
  color: #FFFFFF;
  background: #4080FF;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  border: 1px solid #4080FF;
}

.down-button {
  margin-left: 8px;
  width: 82px;
  height: 32px;
  color: #4080FF;
  background: #FFFFFF;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  margin-bottom: 25px;
  border: 1px solid #4080FF;
}

::v-deep .custom-table tr th {
  border-bottom: 1px solid #4080FF !important;
}

::v-deep .custom-table tr th .cell {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  border-right: 1px solid #4080FF !important;
}

::v-deep .custom-table .cell {
  text-align: center;
}

::v-deep .custom-table tr th:last-child .cell {
  border-right: 1px solid #ffffff !important;
}

.custom-table .custom-row {
  --el-table-tr-bg-color: var(--el-empty-fill-color-5);
}

.opeation-button {
  border: none;
  color: #4080FF;
}

.list-pagination {
  margin-top: 30px;
}

.custom-pagination {
  justify-content: center;
}

.search-label {
  margin: 0;
}
</style>
