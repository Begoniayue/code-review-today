<template>
  <div class="login-container">
    <div class="login-weaper  animated bounceInDown">
      <div class="login-left animate__animated animate__fadeInLeft">
      </div>
      <div class="login-border animate__animated animate__fadeInRight">
        <div class="login-main">
          <div class="login-title">欢迎登陆金融后台管理系统</div>
          <userLogin></userLogin>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/styles/login.scss'
import userLogin from './userlogin.vue'

export default {
  name: 'login',
  components: {
    userLogin,
  },
}
</script>
