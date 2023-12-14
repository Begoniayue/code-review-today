<template>
  <basic-container>
    <div class="detail-title">
      <el-button size="small" @click="toBack" class="preview-button"
      >
        <el-icon class="detail-title-icon" style="vertical-align: middle" size="20"><Back /></el-icon>
      </el-button>
      <span style="vertical-align: text-top;margin-left: -10px;">客户详情</span>
    </div>
    <!-- 企业信息 -->
    <div class="enterprise-content-area">
      <div class="area-title"><span class="area-title-line"></span>企业信息</div>
      <el-row>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />企业ID</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />{{detailData.enterpriseId }}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />企业名称</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />
          {{detailData.enterpriseName}}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />统一社会信用代码</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />{{detailData.socialCreditCode}}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />营业执照（图）</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />
          <el-button size="small" @click="toPreview(0)" class="preview-button"
          >点击预览</el-button
          >
        </el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />年销售额</el-col>
        <el-col :span="18" class="enterprise-content"><div class="grid-content" />
          {{ detailData.annualSales }}</el-col>
      </el-row>
    </div>
  </basic-container>
    <!--  产品类型-->
  <basic-container>
    <div class="enterprise-content-area">
      <div class="area-title"><span class="area-title-line"></span>产品类型</div>
      <el-row>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />审核状态</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" /><span style="padding-right: 10px">{{ detailData.auditDesc }}</span>{{ detailData.auditTime }}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />授信额度</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content"/>
          {{ detailData.creditAmount === 0 ? '-' : detailData.creditAmount }}</el-col>
      </el-row>
    </div>
  </basic-container>
    <!--  法人信息-->
  <basic-container>
    <div class="enterprise-content-area">
      <div class="area-title"><span class="area-title-line"></span>法人信息</div>
      <el-row>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />法人姓名</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />{{ detailData.legalName }}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />手机号</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />{{ detailData.legalPhoneNumber }}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />身份证号</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />{{ detailData.legalCard }}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />身份证正面（图）</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />
          <el-button size="small" @click="toPreview(1)" class="preview-button"
          >点击预览</el-button
          >
        </el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />身份证背面（图）</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />
          <el-button size="small" @click="toPreview(2)" class="preview-button"
          >点击预览</el-button
          >
        </el-col>
      </el-row>
    </div>
  </basic-container>
    <!-- 联系人信息 -->
  <basic-container>
    <div class="enterprise-content-area">
      <div class="area-title"><span class="area-title-line"></span>联系人信息</div>
      <el-row>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />法人姓名</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />{{ detailData.legalName }}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />手机号</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />{{ detailData.legalPhoneNumber }}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />身份证号</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />{{ detailData.legalCard }}</el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />身份证正面（图）</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />
          <el-button size="small" @click="toPreview(3)" class="preview-button"
          >点击预览</el-button
          >
        </el-col>
        <el-col :span="6" class="enterprise-name"><div class="grid-content" />身份证背面（图）</el-col>
        <el-col :span="6" class="enterprise-content"><div class="grid-content" />
          <el-button size="small" @click="toPreview(4)" class="preview-button"
          >点击预览</el-button
          >
        </el-col>
        <el-col :span="24" class="enterprise-content"><div class="grid-content" v-if="auditStatus" />
          资料/账户审核拒绝原因：{{ detailData.auditReason }}
        </el-col>
      </el-row>
    </div>
  </basic-container>
  <basic-container>
    <div class="button-area">
      <el-button type="info" plain @click="toBack" class="detail-back">返回</el-button>
      <el-button type="primary" class="detail-down" @click="downFileDetail">下载附件</el-button>
    </div>
  </basic-container>
    <!-- 预览弹框 -->
  <el-dialog
      v-model="previewVisible"
      title="查看详情"
      width="50%"
  >
    <span>
      <img :src="PreviewUrl" width="600" style="display: flex;margin: 0 auto">
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="previewVisible = false">取消</el-button>
        <el-button type="primary" @click="previewVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {customDetail} from "../../../api/custom/creditenterprise";
import {downFileBlob} from "../../../util";
const router=useRouter()
const route = useRoute()
// 详情数据
let detailData = ref({})
// 预览弹框
let previewVisible = ref(false)
// 详情id
let propsData = ref('')
// 预览地址
let PreviewUrl = ref('')
let auditStatus = ref(false)
// 预览点击事件
function toPreview(previewId) {
  console.log('123')
  previewVisible.value = true
  switch (previewId){
    // 营业执照
    case 0:
      PreviewUrl.value=detailData.value.enterpriseLicense
      break
    // 法人身份证正面
    case 1:
      PreviewUrl.value=detailData.value.legalCardFront
      break
    //   法人身份证背面
    case 2:
      PreviewUrl.value=detailData.value.legalIdCardBack
      break
      // 联系人身份证正面
    case 3:
      PreviewUrl.value=detailData.value.contactCardFront
      break
      // 联系人身份证正面
    case 4:
      PreviewUrl.value=detailData.value.contactCardBack
      break
    default:
      break
  }
}
// 返回
function toBack(){
  return router.push({
    path: '../customer/index'
  })
}
// 生命周期
onMounted(() => {
  propsData.value = route.query
  console.log('mounted',propsData.value)
  customDetailQuery()
})

// 查询详情
function customDetailQuery(){
  customDetail({id:propsData.value.customId})
      .then(response => {
        detailData.value = response.data.data
        if (detailData.value.auditStatus === 1) {
          auditStatus.value=true
        }else {
          auditStatus.value=false
        }
        console.log(detailData)
      })
      .catch(() => {
        console.error(error)
      });
}
function downFileDetail(){
  let creditEnterpriseExportReqDTOs=[]
  let enterpriseName
  let imageUrls
  enterpriseName=detailData.value.enterpriseName,
  imageUrls=[detailData.value.contactCardFront,detailData.value.contactCardBack,detailData.value.legalCardFront,detailData.value.legalIdCardBack,detailData.value.enterpriseLicense].filter(Boolean)
  creditEnterpriseExportReqDTOs=[{enterpriseName,imageUrls}]
  console.log(creditEnterpriseExportReqDTOs)
  downFileBlob("/creditenterprise/downLoadFile", {creditEnterpriseExportReqDTOs}, "file.zip");
}
</script>
<style scoped>
.detail-title{
  color: #4080FF;
  font-size: 16px;
  font-weight: 500;
}
.detail-title-icon{
  width: 20px;
  height: 20px;
  font-weight: 500;
  padding-right: 10px;
}
.area-title{
  height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  padding: 20px 30px;
  margin-top: 10px;
}
.area-title-line{
  width: 8px;
  height: 8px;
  background: #4080FF;
  display: inline-block;
  border-radius: 20px;
  margin-right: 10px;
}
.enterprise-name{
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0,0,0,0.85);
  padding-right: 20px;
  background: #FAFAFA;
  padding-left: 30px;
}
.enterprise-content{
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0,0,0,0.85);
  padding-right: 20px;
  padding-left: 30px;
}
.preview-button{
  border: none;
  font-size: 14px;
  color: #4080FF;
}
.preview-button:hover{
  border: none;
  background: none;
}
.button-area{
  display: flex;
  justify-content: end;
}
.detail-back{
  background: #F5F5F5;
  border-radius: 2px 2px 2px 2px;
  border: none;
  color: #333;
}
.detail-down{
  background: #4080FF;
  box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.04);
  border-radius: 2px 2px 2px 2px;
  border: none;
}
</style>
