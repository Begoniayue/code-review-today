<template>
<!--  handleLogin-->
  <el-form
      label-width="0"
      size="large"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
  >
    <el-form-item prop="phone">
      <el-input
          v-model="ruleForm.phone"
          placeholder="请输入用户名"
          clearable
      >
        <template #prefix>
          <i class="icon-yonghu"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
          type="password"
          v-model="ruleForm.password"
          show-password
          placeholder="请输入密码"
      >
        <template #prefix>
          <i class="icon-mima"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          @click.native.prevent="submitForm(ruleFormRef)"
          class="login-submit"
      >登录
      </el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const ruleFormRef = ref()
const ruleForm = reactive({
  phone: '',
  password: '',
})
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
  phone: [{ required: true, trigger: 'blur', validator: checkPhone }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
  ],
})
const submitForm = async (formEl) => {
  if (!formEl) return
  try {
    await formEl.validate()
    store.dispatch('LoginByUsername', ruleForm).then(() => {
      router.push({ path: '/' })
    }).catch((reason) => console.log(reason))
  } catch (e) {}
}
</script>

<style></style>
