<template>
  <basic-container>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never">
          <el-row>
            <el-col :span="5">登录手机号</el-col>
            <el-col :span="17">{{ userInfo.phone }}</el-col>
            <el-col :span="2">
              <UpdatePhone/>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never">
          <el-row>
            <el-col :span="5">登录密码</el-col>
            <el-col :span="17">********</el-col>
            <el-col :span="2">
              <UpdatePassword/>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </basic-container>
</template>

<script setup>
import UpdatePhone from '@/views/safe/account/UpdatePhone.vue'
import UpdatePassword from '@/views/safe/account/UpdatePassword.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const userInfo = computed(() => store.state.user.userInfo)

</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  .el-col {
    display: flex;
    align-items: center;
  }
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-card {
  background: #E8F3FF;
}
</style>
