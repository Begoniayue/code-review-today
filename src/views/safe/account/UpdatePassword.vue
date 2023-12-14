<template>
  <div>
    <el-dialog v-model="dialogFormUpdatePhoneVisible" title="修改密码">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
      >
        <el-form-item label="登录手机">
          <span>{{ userInfo.phone }}</span>
        </el-form-item>
        <el-form-item label="新密码" prop="phone">
          <el-input v-model="ruleForm.password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="确认新密码" prop="phone">
          <el-input v-model="ruleForm.newPassword" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormUpdatePhoneVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      </span>
      </template>
    </el-dialog>
    <el-button type="primary" link @click="dialogFormUpdatePhoneVisible = true">修改</el-button>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { updatePassword } from '@/api/admin/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const ruleFormRef = ref()
const ruleForm = reactive({
  password: '',
  newPassword: '',
})
const userInfo = computed(() => store.state.user.userInfo)
let dialogFormUpdatePhoneVisible = ref(false)

const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入手机号'))
  }
  if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(value))) {
    return callback(new Error('请输入正确的电话'))
  }
  callback()
}
const rules = reactive({
  // phone: [{ validator: checkPhone, trigger: 'blur' }],
})
const submitForm = async (formEl) => {
  if (!formEl) return
  try {
    await formEl.validate()
  } catch (e) {
    return
  }
  try {
    console.log(JSON.stringify(ruleForm))
    await updatePassword(ruleForm)
    dialogFormUpdatePhoneVisible.value = false
    logout()
  } catch (e) {
  }
}
const logout = () => {
  store.dispatch('LogOut').then(() => {
    router.push({ path: '/login' })
  })
}
</script>

<style scoped>

</style>
