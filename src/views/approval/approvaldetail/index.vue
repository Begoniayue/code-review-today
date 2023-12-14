<template>
  <basic-container>
    <div class="detail-title">
      <el-button size="small" @click="toBack" class="preview-button"
      >
        <el-icon class="detail-title-icon" style="vertical-align: middle" size="20">
          <Back/>
        </el-icon>
      </el-button>
      <span style="vertical-align: text-top;margin-left: -10px;">融资详情</span>
    </div>
    <!-- 详情   -->
    <div class="approval-detail">
      <el-tabs v-model="activeApproval" class="approval-tabs" @tab-click="handleClick">
        <el-tab-pane label="承信详情" name="trust">
          <div class="area-title"><span class="area-title-line"></span>承信信息</div>
          <!-- 票面组件         -->
          <Voucher :page-detail-info="pageDetailInfo"/>
          <el-divider/>
          <div class="area-title"><span class="area-title-line"></span>承信规则</div>
          <div class="approval-rule">
            <div class="rule-left">
              <div><b>融资机构</b>:{{ pageDetailInfo.creditApplyDetails?.financeOrganization || '--' }}</div>
              <div><b>收款账户</b>:{{ pageDetailInfo.creditApplyDetails?.bankAccountInfo || '--' }}</div>
            </div>
            <div class="rule-right">
              <div class="rule-left">
                <div><b>融资利率</b>:{{(pageDetailInfo.creditApplyDetails?.organizationRate ?? '') !== '' ? pageDetailInfo.creditApplyDetails?.organizationRate + '%' : '--' }}</div>
                <div><b>融资天数</b>:{{ pageDetailInfo.creditApplyDetails?.surplusDay || '--' }}</div>
              </div>
            </div>
          </div>
          <el-divider/>
          <div class="area-title"><span class="area-title-line"></span>贸易背景</div>
          <div class="faith-content" style="marginBottom:16px;">
            <table class="faith-table">
              <tr>
                <td class="title" style="width: 18%">贸易合同文件：</td>
                <td class="content" colspan="2"/>
              </tr>
              <tr>
                <td class="title" style="width: 18%;text-align: center" rowspan="2"
                    v-if="pageDetailInfo.creditApplyDetails?.contractFilePath">
                  <el-icon :size="60">
                    <Document class="pdf-icon" @click="getViewMethod(pageDetailInfo.creditApplyDetails?.contractFilePath)"/>
                  </el-icon>
                </td>
                <td class="content" style="width: 41%;" v-if="pageDetailInfo.creditApplyDetails?.contractNo"><span>合同编号：{{
                    pageDetailInfo.creditApplyDetails?.contractNo || '--'
                  }}</span></td>
                <td class="content" style="width: 41%;" v-if="pageDetailInfo.creditApplyDetails?.contractPrice"><span>合同金额：{{
                    pageDetailInfo.creditApplyDetails?.contractPrice || '--'
                  }}</span></td>
              </tr>
              <tr>
                <td class="content" colspan="2" v-if="pageDetailInfo.creditApplyDetails?.contractEffectDate"><span>合同生效时间：{{
                    pageDetailInfo?.creditApplyDetails?.contractEffectDate || '--'
                  }}</span></td>
              </tr>
            </table>
          </div>
          <div class="faith-content" v-if="pageDetailInfo.creditApplyDetails?.invoiceFilePath"
               style="marginBottom:16px;">
            <table class="faith-table">
              <tr>
                <td class="title">发票文件：</td>
                <td class="content" colspan="2"/>
              </tr>
              <tr>
                <td class="title" rowspan="3" style="width: 18%;text-align: center"
                    v-if="pageDetailInfo.creditApplyDetails?.invoiceFilePath">
                  <el-icon :size="60">
                    <Document class="pdf-icon"
                              @click="getViewMethod(pageDetailInfo.creditApplyDetails?.invoiceFilePath)"/>
                  </el-icon>
                </td>
                <td class="content" style="width: 41%;" v-if="pageDetailInfo.creditApplyDetails?.invoiceTypeInfo">
                  发票类型：{{ pageDetailInfo.creditApplyDetails?.invoiceTypeInfo || '--' }}
                </td>
                <td class="content" style="width: 41%;" v-if="pageDetailInfo.creditApplyDetails?.invoiceCode">
                  发票代码：{{ pageDetailInfo.creditApplyDetails?.invoiceCode || '--' }}
                </td>
              </tr>
              <tr>
                <td class="content" style="width: 41%;" v-if="pageDetailInfo.creditApplyDetails?.invoiceNumber">
                  发票号码：{{ pageDetailInfo.creditApplyDetails?.invoiceNumber || '--' }}
                </td>
                <td class="content" style="width: 41%;" v-if="pageDetailInfo.creditApplyDetails?.checkLastSixDigits">
                  校验码后六位：{{ pageDetailInfo.creditApplyDetails?.checkLastSixDigits || '--' }}
                </td>
              </tr>
              <tr>
                <td class="content" style="width: 41%;" v-if="pageDetailInfo.creditApplyDetails?.invoicedPrice">
                  开票金额：{{ pageDetailInfo.creditApplyDetails?.invoicedPrice || '--' }}
                </td>
                <td class="content" style="width: 41%;" v-if="pageDetailInfo.creditApplyDetails?.invoicedDate">
                  开票日期：{{ pageDetailInfo.creditApplyDetails?.invoicedDate || '--' }}
                </td>
              </tr>
            </table>
          </div>
          <div class="faith-content" v-if="creditApplyDetails?.creditApplyDetails?.filePath">
            <table class="faith-table">
              <tr>
                <td class="title">其他文件：</td>
                <td class="content" colspan="2"/>
              </tr>
              <tr>
                <td class="title" rowspan="2" style="width: 18%;text-align: center">
                  <el-icon :size="60">
                    <Document class="pdf-icon" @click="getViewMethod(pageDetailInfo.creditApplyDetails?.filePath)"/>
                  </el-icon>
                </td>
              </tr>
              <tr>
                <td class="content" colspan="2" style="width:82%;text-align: center">&nbsp;</td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="流转轨迹" name="roam">
          <FlowTrack :applyTrackData="applyTrackData"/>
        </el-tab-pane>
        <el-tab-pane label="持信企业" name="operation">
          <div class="approval-enterprise">
            <div class="rule-left">
              <div><b>企业名称</b>&nbsp;&nbsp;&nbsp;:{{ creditHoldCompany.companyName }}</div>
              <div><b>统一社会信用代码</b>&nbsp;&nbsp;&nbsp;{{ creditHoldCompany.orgNo }}</div>
              <div><b>联系人姓名</b>&nbsp;&nbsp;&nbsp;:{{ creditHoldCompany.contactName }}</div>
              <div><b>联系人方式</b>&nbsp;&nbsp;&nbsp;:{{ creditHoldCompany.contactPhoneNo }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </basic-container>
  <!--  底部按钮-->
  <basic-container>
    <div class="button-area">
      <el-button type="info" plain @click="refuseVisible = true" class="detail-back" v-if="auditStatus">驳回</el-button>
      <el-button type="primary" @click="passVisible = true" class="detail-down" v-if="auditStatus">通过</el-button>
    </div>
  </basic-container>
  <!--通过弹框 -->
  <el-dialog
      v-model="passVisible"
      title="审核通过"
      width="30%"
  >
    <span>是否确认通过</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passVisible = false">取消</el-button>
        <el-button type="primary" @click="reviewPass">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!--拒绝弹框 -->
  <el-dialog
      v-model="refuseVisible"
      title="审核通过"
      width="30%"
  >
    <div class="credit-quota">拒绝原因:：</div>
    <el-input
        v-model="refuseTextarea"
        :rows="2"
        type="textarea"
        placeholder="请填写审核拒绝原因，最多不超过200字。"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="refuseVisible = false">取消</el-button>
        <el-button type="primary" @click="reviewRefuse" class="refuse-button">
          拒绝
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!--  文件弹窗-->
  <imgDialog
      v-if="dialogVisible"
      :visible="dialogVisible"
      :img-list="viewImageList"
      @close="handleCloseView"
  />
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {onMounted, ref} from 'vue'
import {creditapplyudit} from "@/api/approval/approvalList"
import {ElMessage} from 'element-plus'
import Voucher from "@/components/Voucher/index.vue"
import FlowTrack from "@/components/FlowTrack/index.vue"
import {creditapplyDetail, creditapplytrack, creditholdCompany} from "../../../api/approval/approvalList"
import {isImage, isPDF} from '@/util'
import imgDialog from "@/components/ImgDialog/index.vue"

const router = useRouter()
const route = useRoute()
// 详情id
let propsData = ref('')
let passVisible = ref(false)
let refuseVisible = ref(false)
// tabs
const activeApproval = ref('trust')
//拒绝原因
let refuseTextarea = ref('')
let pageDetailInfo = ref({})
// 审核状态
let auditStatus = ref(false)
// 图片弹窗
let dialogVisible = ref(false)
let viewImageList = ref([])
let applyTrackData = ref({})
let creditHoldCompany = ref({})

// 返回
function toBack() {
  return router.push({
    path: '../approvalist/index'
  })
}

// 生命周期
onMounted(() => {
  propsData.value = route.query
  customDetailQuery()
  creditCompanyQuery()
  creditTrackQuery()
})

//审核通过
function reviewPass() {
  creditapplyudit({id: (propsData.value.finanalId), creditApplyStatus: 'PASS', refuseNote: refuseTextarea})
      .then(response => {
        if (response.data.code === 0) {
          ElMessage.success('审核通过')
          console.log(response.data)
          passVisible.value = false
          toBack()
        }
      })
      .catch((error) => {
        console.error(error)
      });
}

// 查询详情
function customDetailQuery() {
  creditapplyDetail({id: propsData.value.finanalId})
      .then(response => {
        pageDetailInfo.value = response.data.data
        if (pageDetailInfo.value.applyStatus === 0) {
          auditStatus.value = true
        } else {
          auditStatus.value = false
        }
        console.log(auditStatus.value)
      })
      .catch(() => {
        console.error(error)
      });
}

//审核拒绝
function reviewRefuse() {
  creditapplyudit({id: (propsData.value.finanalId), creditApplyStatus: 'REFUSE', refuseNote: refuseTextarea.value})
      .then(response => {
        if (response.data.code === 0) {
          ElMessage.success('审核已驳回')
          console.log(response.data)
          refuseVisible.value = false
          toBack()
        }
      })
}

function getViewMethod(url) { // 单个文件展示方式
  if (isImage(url)) {
    viewImageList.value.push(url)
    dialogVisible.value = true
  }
  if (isPDF(url)) {
    window.open(url, '_blank')
  }
}

function handleCloseView() {
  dialogVisible.value = false
  viewImageList.value = []
}

// 查询流转轨迹
function creditTrackQuery() {
  creditapplytrack({
    id: propsData.value.creditApplyId
  }).then(response => {
    applyTrackData.value = response.data.data
  }).catch(() => {
    console.error(error)
  });
}

// 查询持信企业
function creditCompanyQuery() {
  creditholdCompany({
    id: propsData.value.holdCompany
  }).then(response => {
    creditHoldCompany.value = response.data.data
  }).catch(() => {
    console.error(error)
  });
}
</script>

<style scoped>
.approval-detail {
  margin-top: 20px;
  padding-left: 20px;
}

.detail-title {
  color: #4080FF;
  font-size: 16px;
  font-weight: 500;
}

.detail-title-icon {
  width: 20px;
  height: 20px;
  font-weight: 500;
  padding-right: 10px;
}

.area-title {
  height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  margin-top: 10px;
  margin-bottom: 20px;
}

.area-title-line {
  width: 8px;
  height: 8px;
  background: #4080FF;
  display: inline-block;
  border-radius: 20px;
  margin-right: 10px;
}

.preview-button {
  border: none;
  font-size: 14px;
  color: #4080FF;
}

.preview-button:hover {
  border: none;
  background: none;
}

.approval-tabs {
  --el-color-primary: #4080FF;
}

.approval-rule {
  width: 942px;
  background: #E8F3FF;
  margin: 30px auto;
  padding: 40px 60px;
  display: flex;
  justify-content: space-around;
}

.approval-enterprise {
  width: 942px;
  background: #E8F3FF;
  margin: 30px auto;
  padding: 40px 60px;
  font-size: 15px;
}

.rule-left {
  line-height: 40px;
}

.button-area {
  display: flex;
  justify-content: end;
}

.detail-back {
  background: #F5F5F5;
  border-radius: 2px 2px 2px 2px;
  border: none;
  color: #001529;
}

.detail-down {
  background: #4080FF;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
  border-radius: 2px 2px 2px 2px;
  border: none;
}

.faith-content {
  width: 100%;
  background-color: #E8F3FF;
  padding: 16px 0;
}

.pdf-icon {
  color: #4080FF;
  cursor: pointer;
}

.faith-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.faith-table, .faith-table tr th, .faith-table tr td {
  padding: 10px;
}
</style>
