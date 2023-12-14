<template>
  <basic-container>
    <div class="custom-list">报价设置</div>
    <div class="search-content-examine">
      <div class="examine-area">
        <span class="time-query">企业搜索</span>
        <el-input class="enterprise-query" v-model="enterpriseName" placeholder="请输入企业名称/手机号"/>
      </div>
      <div class="examine-area">
        <el-button class="query-button-examine" @click="queryQuoteList">
          <el-icon>
            <Search style="margin-right: 2px"/>
          </el-icon>
          查询
        </el-button>
      </div>
    </div>
  </basic-container>
  <basic-container>
    <el-row>
      <el-col :span="24">
        <div class="grid-content"/>
        <el-button class="down-button" @click="addFlag = true;isAdd = true;">
          <el-icon style="padding-right: 5px;padding-left: 5px">
            <Plus/>
          </el-icon>
          新增分类
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" class="custom-table" :row-class-name="custom-row">
      <el-table-column prop="categoryName" label="分类名称" width="180"/>
      <el-table-column prop="categoryCode" label="分类编号" width="180"/>
      <el-table-column label="折扣率">
        <template #default="scope">
          <span>{{ scope.row.financeRate }}%</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间"/>
      <el-table-column label="企业数">
        <template #default="scope">
          <span> {{ scope.row.enterpriseNum || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button size="small" @click="ViewBindedList(scope.row)" class="opeation-button">查看企业</el-button>
          <el-button size="small" @click="ListBindEnterprise(scope.row)" class="opeation-button">绑定企业</el-button>
          <el-button size="small" @click="EditEnterprise(scope.row)" class="opeation-button">编辑</el-button>
          <el-button size="small" @click="toDelete(scope.row)" class="opeation-button">删除</el-button>
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
          :page-sizes="[10, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalList
          @size-change="handleListChange"
          @current-change="handleListChange"
      />
    </div>
  </basic-container>
  <!-- 查看企业弹窗 -->
  <el-dialog
      v-model="checkFlag"
      width="760px"
  >
    <div slot="title" class="bind-title">
      <span style="font-weight: 500"></span>
      <span class="title">分类名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span class="title">{{ categoryName }}</span>
      <el-divider direction="vertical"/>
      <span class="title">融资利率&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span class="title">{{ financeRate }}%</span>
    </div>
    <div style="padding: 12px 0;">
      <span>企业名称</span>
      <el-input v-model="enterpriseNameQuery" placeholder="请输入企业关键字搜索" style="width: 300px;margin-left: 8px;"/>
      <el-button class="query-button" @click="queryBindedList(BindedListParams)">
        <el-icon>
          <Search style="margin-right: 2px"/>
        </el-icon>
        查询
      </el-button>
      <el-table :data=enterpriseBindList style="width: 100%;margin-top: 8px;" class="custom-table">
        <el-table-column
            prop="enterpriseName"
            label="已绑定企业"
            align="center"
        />
        <el-table-column
            prop="phone"
            label="手机号"
            align="center"
        />
        <el-table-column
            prop="createdAt"
            label="绑定时间"
            align="center"
        />
      </el-table>
      <el-pagination
          style="margin: 20px auto;display: flex;justify-content: center;"
          :current-page="currentPageBind"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalBind
          @size-change="handleBindChange"
          @current-change="handleBindChange"
      />
    </div>
  </el-dialog>
  <!--  新增分类-->
  <!-- 新增分类 -->
  <el-dialog
      v-model="addFlag"
      :title="isAdd ? '新增分类' : '编辑分类'"
      width="547px"
      :before-close="handleCloseAdd"
  >
    <div style="margin: 24px auto;width: 400px">
      <el-form label-position="left" label-width="100px">
        <el-form-item label="分类名称：">
          <el-input v-model="categoryName" placeholder="请输入自定义价格分类名称"/>
        </el-form-item>
        <el-form-item label="融资利率：">
          <el-input
              :formatter="(value) => `${value}`.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/(\.\d{1}).+/g, '$1')"
              :controls="false"
              v-model="financeRate"
              class="enterprise-query"
              controls-position="right"
              placeholder="请输入融资利率，最多一位小数"
              style="text-align: left"
          />
          <template #append>%</template>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCloseAdd">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="nextAdd">下一步</el-button>
        <el-button v-else type="primary" @click="modifyAdd">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 绑定企业 -->
  <el-dialog
      v-model="bindFlag"
      width="760px"
      title="绑定企业"
      :before-close="handleEnterpriseClose"
  >
    <div slot="title" class="bind-title">
      <span style="font-weight: 500"></span>
      <span class="title">分类名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span class="title">{{ categoryName }}</span>
      <el-divider direction="vertical"/>
      <span class="title">融资利率&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span class="title">{{ financeRate }}%</span>
    </div>
    <div style="text-align: center">
      <el-transfer
          v-model="bindValue"
          style="text-align: left; display: inline-block"
          :right-default-checked="[0,2]"
          filterable
          :titles="['未添加企业', '已添加企业']"
          :button-texts="['解绑', '绑定']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          :data="bindData"
          @change="handlebindDataChange"
      >
      </el-transfer>
    </div>
    <template #footer>
      <span class="dialog-footer" v-if="isCreat">
        <el-button @click="handleClose">取 消</el-button>
        <el-button v-if="isAdd" @click="bindFlag = false;addFlag = true">上一步</el-button>
        <el-button type="primary" @click="enterpriseBind">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {
  queryQuotePriceList,
  addQuotePriceFirst,
  queryBindedEnterpriseList
} from '@/api/quote/quation'
import {
  customList
} from '@/api/custom/creditenterprise'
import {bindEnterprise} from "@/api/quote/quation";
import {
  deleteById,
  getUnBindedCreditEnterprisePage,
  unbindEnterprise,
  updatePriceById
} from "@/api/quote/quation";

const router = useRouter()
// 日期选择器
// 企业搜索
let enterpriseName = ref('')
// 分页
let currentPage = ref(1)
let currentPageBind = ref(1)
let currentPageEnterprise = ref(1)
let small = ref(false)
let background = ref(false)
let disabled = ref(false)
let pageSize = ref(10)
let pageSizeBind = ref(10)
let pageSizeEnterprise = ref(10)
let totalBind = ref('')
let totalEnterprise = ref('')
let totalList = ref('')
//数据
let tableData = ref([])
// 查看企业弹窗
let checkFlag = ref(false)
// 新增
let addFlag = ref(false)
let bindFlag = ref(false)
let bindData = ref([])
let bindValue = ref([])
let isAdd = ref(false)
let enterpriseList = ref([])
// 分类主键
let classification = ref('')
// 跳转到详情
// 新增分类名称
let categoryName = ref('')
// 新增分类名称利率
let financeRate = ref(null)
// 企业绑定 左边绑定
let enterPriseLeft = ref('')
// 企业绑定 右边绑定
let enterPriseRight = ref('')
// 是否新增
let isCreat = ref(false)
// 已绑定客户列表
let enterpriseBindList = ref([])
// 已绑定客户列表查询
let enterpriseNameQuery = ref('')
// 全部企业列表
let enterpriseAllList = ref([])
// 默认选择数组
let chooseArray = ref([])
let BindedListParams = ref({})

function toDetail() {
  return router.push({
    path: '../detail/index'
  })
}

// 查询列表
function queryQuoteList() {
  queryQuotePriceList({
    pageSize: pageSize.value,
    pageNum: currentPage.value,
    queryWord: enterpriseName.value,
    queryType: '0'
  }).then(response => {
    tableData.value = response.data.data.records
    totalList.value = response.data.data.total
  }).catch(() => {
    console.error(error)
  });
}

/**
 * 关闭新增分类
 */
function handleCloseAdd() {
  isAdd.value = false
  addFlag.value = false
  categoryName.value = ''
  financeRate.value = ''
}

/**
 * 新增分类下一步
 */
function nextAdd() {
  if (((categoryName.value) ?? '') !== '' && ((financeRate.value) ?? '') !== '') {
    addFlag.value = false,
        bindFlag.value = true,
        isCreat.value = true
    isAdd.value = true,
        customListQuery()
    addQuotePriceFirst({
      categoryName: categoryName.value,
      financeRate: parseFloat(parseFloat(financeRate.value).toFixed(1))
    }).then(response => {
      classification.value = response.data.data
    }).catch(() => {
      console.error(error)
    });
  } else if (isNaN(financeRate.value)) {
    ElMessage.error('请输入正确的融资利率')
  } else {
    ElMessage.error('请输入正确的分类名称和融资利率')
  }
}

// 新增分类第二部
function handlebindDataChange(value, direction, movedKeys) {
  if (isCreat.value) {
    // 新增类目后穿梭框
    const leftArr = enterpriseList.value || []
    if (direction === 'right') {
      enterPriseLeft.value = movedKeys.map((item, index) => leftArr[item].enterpriseId)
    }
  } else {
    // 列表编辑穿梭框
    const allList = enterpriseAllList.value || []
    if (direction === 'right') {
      const arr = movedKeys.map((item, index) => allList[item].enterpriseId)
      postBindEnterprise(arr)
      handleEnterpriseClose()
    } else if (direction === 'left') {
      const arr = movedKeys.map((item, index) => allList[item].enterpriseId)
      unBindEnterprise(arr)
      handleEnterpriseClose()
    }
  }
}

// 请求绑定接口
function postBindEnterprise(params) {
  bindEnterprise({enterpriseIds: params, id: classification.value}).then(response => {
    console.log(response.data, '2131')
    if (response.data.code === 0) {
      ElMessage.success('绑定成功')
      bindFlag.value = false
      queryQuoteList()
    }
  }).catch((error) => {
    console.error(error)
  });
}

// 请求解绑接口
function unBindEnterprise(params) {
  unbindEnterprise({enterpriseIds: params, id: classification.value}).then(response => {
    if (response.data.code === 0) {
      ElMessage.success('解绑成功')
      bindFlag.value = false
      queryQuoteList()
    }
  }).catch((error) => {
    console.error(error)
  });
}

// 列表绑定企业
function ListBindEnterprise(records) {
  categoryName.value = records.categoryName
  financeRate.value = records.financeRate
  classification.value = records.id
  isCreat.value = false
  bindFlag.value = true
  initData4List(records)
}

const initData4List = async (records) => {
  try {
    // 获取unto
    const getUnBindCreditList = getUnBindedCreditEnterprisePage({
      pageSize:1000,
      pageNum:1,
      categoryId: records.id,
      sceneType: '0'
    })
    // 获取done
    const queryBindedList = queryBindedEnterpriseList({
      pageSize:1000,
      pageNum:1,
      id: records.id,
      enterpriseName: enterpriseNameQuery.value
    })

    const res_bind = await queryBindedList
    const res_unbind = await getUnBindCreditList

    const bindArr = res_bind.data?.data?.records || []
    const unBindArr = res_unbind.data?.data?.records || []

    // 1.合成大数组
    const totalArr = [...bindArr, ...unBindArr]
    totalArr.forEach((records, index) => {
      records.label = records.enterpriseName
      records.key = index
    })
    // 2、找到绑定的index
    const bindIndexArr = bindArr.map(i => totalArr.findIndex(j => i.id === j.id)) || []
    // 3、分别赋值
    bindData.value = totalArr
    bindValue.value = bindIndexArr
    chooseArray.value = bindIndexArr
    enterpriseAllList.value = totalArr
    enterpriseList.value = unBindArr
    enterpriseBindList.value = bindArr
  } catch (e) {
  }
}

// 绑定有确认按钮
function enterpriseBind() {
  bindEnterprise({enterpriseIds: enterPriseLeft.value, id: classification.value}).then(response => {
    if (response.data.code === 0) {
      bindFlag.value = false
      isCreat.value = false
      ElMessage.success('绑定成功')

      queryQuoteList()
    } else {
      bindFlag.value = false
      ElMessage.error('绑定失败')
      queryQuoteList()
    }
  })
}

// 绑定企业弹窗取消
function handleEnterpriseClose() {
  isCreat.value = false
  bindFlag.value = false
  categoryName.value = ''
  financeRate.value = ''
  enterpriseList.value = []
  enterpriseBindList.value=[]
  enterpriseAllList.value=[]
  bindValue.value = []
  bindData.value = []
}

// 删除
function toDelete(records) {
  deleteById({
    id: records.id
  }).then(response => {
    console.log(response.data.code === 0, '12234')
    if (response.data.code === 0) {
      ElMessage.success('删除成功')
      queryQuoteList()
    }
  }).catch(() => {
    console.error(error)
  });
}

// 生命周期
onMounted(() => {
  queryQuoteList()
})

// 查询客户列表
function customListQuery() {
  customList({
    pageSize: pageSize.value,
    pageNum: currentPage.value,
    auditStatus: '1',
    sceneType: '1'
  }).then(response => {
    enterpriseList.value = response.data.data.records
    totalBind.value = response.data.data.total
    getData()
  }).catch(() => {
    console.error(error)
  });
}

// 查询已绑定企业
function queryBindedList(records) {
  isCreat.value = false
  return queryBindedEnterpriseList({
    pageSize: pageSizeBind.value,
    pageNum: currentPageBind.value,
    id: records.id,
    enterpriseName: enterpriseNameQuery.value
  }).then(response => {
    enterpriseBindList.value = response.data.data.records
    totalBind.value = response.data.data.total
  }).catch((error) => {
    console.error(error)
  });
}

// 未绑定列表传值
function getData() {
  bindData.value = []
  enterpriseList.value.forEach((records, index) => {
    bindData.value.push({
      label: records.enterpriseName,
      key: index
    })
  })
}

// 已绑定列表传值
//分页事件
const handleListChange = () => {
  queryQuoteList()
}

// 查看
function ViewBindedList(records) {
  categoryName.value = records.categoryName
  financeRate.value = records.financeRate
  checkFlag.value = true
  BindedListParams.value = records
  queryBindedList(records)
}

function handleBindChange() {
  queryBindedList(BindedListParams.value)
}

// 修改分类
function modifyAdd() {
  if (((categoryName.value) ?? '') !== '' && ((financeRate.value) ?? '') !== '') {
    addFlag.value = false
    isCreat.value = true
    isAdd.value = true
    updatePriceById({
      id: classification.value,
      categoryName: categoryName.value,
      financeRate: parseFloat(parseFloat(financeRate.value).toFixed(1))
    }).then(response => {
      queryQuoteList()
    }).catch((error) => {
      console.error(error)
    });
  } else if (isNaN(financeRate.value)) {
    ElMessage.error('请输入正确的融资利率')
  } else {
    ElMessage.error('请输入正确的分类名称和融资利率')
  }
}

// 编辑企业
function EditEnterprise(records) {
  categoryName.value = records.categoryName
  financeRate.value = records.financeRate
  classification.value = records.id
  addFlag.value = true
  isAdd.value = false
  bindFlag.value = false
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
  justify-content: space-between;
}

.examine-area {
  display: flex;
  margin-top: 8px;
  align-items: center;
  margin-right: 30px;
}

.time-query {
  font-size: 14px;
  font-weight: 400;
  padding-right: 10px;
  color: rgba(0, 0, 0, 0.85);
}

.enterprise-query {
  width: 335px;
  height: 30px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.25);
  line-height: 30px;
}

::v-deep .enterprise-query .el-input__inner {
  text-align: left;
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

.query-button-examine {
  width: 82px;
  height: 32px;
  color: #FFFFFF;
  background: #4080FF;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  margin-left: 260px;
  border: 1px solid #4080FF;
}

.down-button {
  margin-left: 8px;
  width: 95px;
  height: 32px;
  color: #FFFFFF;
  background: #4080FF;
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

.bind-title {
  padding-bottom: 20px;
}

.query-button {
  margin-left: 30px;
  height: 32px;
  color: #FFFFFF;
  background: #4080FF;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  border: 1px solid #4080FF;
}
</style>
