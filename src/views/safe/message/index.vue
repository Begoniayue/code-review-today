<template>
  <basic-container>
    <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{'text-align': 'center'}"
        :cell-style="{'text-align':'center'}"
    >
      <el-table-column prop="remindTypeDesc" label="提醒说明" width="180"/>
      <el-table-column prop="remindNote" label="说明"/>
      <el-table-column label="手机号">
        <template #default="scope">
          <div v-if="!scope.row.editFlag" style="display: flex;align-items: center;justify-content: center">
            <span>{{ scope.row.remindPhone }}</span>
            <el-button type="primary" link @click="enterEditMode(scope.row)" style="margin-left: 12px">
              {{ scope.row.isExistPhone ? '修改' : '设置' }}
            </el-button>
          </div>
          <div v-else style="display: flex;align-items: center;justify-content: center">
            <el-input style="width: 150px" v-model="newPhone"></el-input>
            <el-button type="primary" link style="margin-left: 12px" @click="savePhone(scope.row)">保存</el-button>
            <el-button link @click="leaveEditMode">取消</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="提醒开关" width="180">
        <template #default="scope">
          <el-switch v-model="scope.row.remindSwitch" @change="(value) => switchChange(value,scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
  </basic-container>
</template>

<script setup>
import { queryRemindSettings, setRemindPhone } from '@/api/safe/creditRemind'
import { onMounted, reactive, ref } from 'vue'

const newPhone = ref('')
const tableData = reactive([])
onMounted(() => {
  getList()
})
const getList = () => {
  return queryRemindSettings({}).then(response => {
    tableData.length = 0
    if (response?.data?.data) {
      const arr = response.data.data
      arr.forEach(i => {
        i.isExistPhone = !!(i.remindPhone)
        i.editFlag = false
        tableData.push(i)
      })
    }
  }).catch(reason => reason)
}
const enterEditMode = (record) => {
  const currentId = record.id
  tableData.forEach(i => i.editFlag = false)
  newPhone.value = ''
  const obj = tableData.find(i => i.id === currentId)
  if (obj) {
    obj.editFlag = true
  }

}
const leaveEditMode = () => {
  newPhone.value = ''
  tableData.forEach(i => i.editFlag = false)
}
const switchChange = async (val, row) => {
  try {
    await setRemindPhone({
      id: row.id,
      remindSwitch: val,
      optionType: 1,
    })
    await getList()
  } catch (e) {}
}
const savePhone = async (row) => {
  try {
    await setRemindPhone({
      id: row.id,
      phone: newPhone.value,
      optionType: 1,
    })
    await getList()
  } catch (e) {}
}
</script>

<style scoped>

</style>
