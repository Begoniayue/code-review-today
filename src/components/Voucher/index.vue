<template>
  <div class="content">
    <div class="title">承信</div>
    <div class="date">
      <div>融资日期：{{ pageDetailInfo?.creditApplyDetails?.createTime }}</div>
      <div>承信编号：{{ pageDetailInfo?.creditApplyDetails?.commitmentNo }}</div>
    </div>
    <img src="./static/logo.png" class="logo" alt="">
    <img v-if="pageDetailInfo?.creditApplyDetails?.enterpriseLogo" :src="pageDetailInfo?.creditApplyDetails?.enterpriseLogo" class="company-logo" alt="">
    <img v-if="pageDetailInfo?.creditApplyDetails?.enterpriseSign" :src="pageDetailInfo?.creditApplyDetails?.enterpriseSign" class="official-seal" alt="">
    <table class="table-class">
      <tbody>
      <!--   第一手收信企业和登记企业：无流转企业   -->
      <tr>
        <td style="width:150px" class="td-padding">融资企业</td>
        <td style="width:290px" class="td-padding">{{ pageDetailInfo?.creditApplyDetails?.transferEnterpriseName||'-' }}</td>
        <td colspan="4" class="td-padding">统一社会信用代码</td>
        <td colspan="8" class="td-padding">{{ pageDetailInfo?.creditApplyDetails?.transferEnterpriseTaxId||'-' }}</td>
      </tr>
      <tr>
        <td class="td-padding">登记企业</td>
        <td class="td-padding">{{ pageDetailInfo?.creditApplyDetails?.registeredEnterpriseName }}</td>
        <td colspan="4" class="td-padding">统一社会信用代码</td>
        <td colspan="8" class="td-padding">{{ pageDetailInfo?.creditApplyDetails?.registeredEnterpriseTaxId }}</td>
      </tr>
      <tr>
        <td rowspan="2" class="td-padding">人民币金额（元）</td>
        <td rowspan="2" class="td-padding">{{ pageDetailInfo?.creditApplyDetails?.commitmentChinesePrice }}</td>
        <td class="amount-td">十</td>
        <td class="amount-td">亿</td>
        <td class="amount-td">千</td>
        <td class="amount-td">百</td>
        <td class="amount-td">十</td>
        <td class="amount-td">万</td>
        <td class="amount-td">千</td>
        <td class="amount-td">百</td>
        <td class="amount-td">十</td>
        <td class="amount-td">元</td>
        <td class="amount-td">角</td>
        <td class="amount-td">分</td>
      </tr>
      <tr>
        <td class="amount-td">{{ isSplitAry[11] }}</td>
        <td class="amount-td">{{ isSplitAry[10] }}</td>
        <td class="amount-td">{{ isSplitAry[9] }}</td>
        <td class="amount-td">{{ isSplitAry[8] }}</td>
        <td class="amount-td">{{ isSplitAry[7] }}</td>
        <td class="amount-td">{{ isSplitAry[6] }}</td>
        <td class="amount-td">{{ isSplitAry[5] }}</td>
        <td class="amount-td">{{ isSplitAry[4] }}</td>
        <td class="amount-td">{{ isSplitAry[3] }}</td>
        <td class="amount-td">{{ isSplitAry[2] }}</td>
        <td class="amount-td">{{ isSplitAry[1] }}</td>
        <td class="amount-td">{{ isSplitAry[0] }}</td>
      </tr>
      <tr>
        <td class="td-padding">承诺付款日期</td>
        <td class="td-padding">{{ pageDetailInfo?.creditApplyDetails?.dueDate }}</td>
        <td colspan="4" class="td-padding">登记日期</td>
        <td colspan="8" class="td-padding">{{ pageDetailInfo?.creditApplyDetails?.registeredTime }}</td>
      </tr>
      <tr>
        <td colspan="14" class="td-padding">
          {{ pageDetailInfo?.creditApplyDetails?.eSignPromiseDesc ||'-'}}
        </td>
      </tr>
      <tr>
        <td colspan="14" class="td-padding">
         {{ pageDetailInfo?.creditApplyDetails?.remark }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { toSplitNum } from '@/util'

export default {
  props: {
    pageDetailInfo: {
      type: Object,
      default: {},
    }
  }
  ,
  computed: {
    isSplitAry() {
      return toSplitNum(this.pageDetailInfo?.creditApplyDetails?.commitmentPrice)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  margin: 0 auto;
  width: 942px;
  height: 478px;
  background: url('./static/bg.jpg');
  background-size: 942px 478px;

  .title {
    font-size: 40px;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 60px;
    width: 200px;
    height: 64px;
    border-bottom: 2px solid #4E95B5;
  }

  .date {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    position: absolute;
    top: 154px;
    width: 840px;
    left: 50px;
  }

  .logo {
    position: absolute;
    top: 38px;
    right: 52px;
    height: 55px;
  }

  .company-logo {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 70px;
    height: 70px;
  }

  .official-seal {
    width: 136px;
    height: 136px;
    position: absolute;
    bottom: 43px;
    left: 268px;
  }

  .table-class {
    width: 860px;
    position: absolute;
    bottom: 44px;
    left: 41px;

    tr td {
      font-size: 14px;
      height: 28px;
      border: 2px solid #031A79;
    }

    .td-padding {
      padding-left: 10px;
    }

    .amount-td {
      width: 30px;
      text-align: center;
    }
  }
}
</style>
