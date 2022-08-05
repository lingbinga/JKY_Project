<template>
  <div>
    <van-nav-bar title="知识图谱-登录" />
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile" name="mobile" required label="手机号" placeholder="请输入11位手机号"
        :rules="[{ required: true, message: '请填写手机号', pattern: /^1[3-9]\d{9}$/ }]" />
      <van-field v-model="user.code" type="password" required name="code" label="密码" placeholder="请输入6位密码"
        :rules="[{ required: true, message: '请填写密码', pattern: /^\d{6}$/ }]" />
      <div style="margin: 16px;">
        <van-button 
        round 
        block 
        type="info" 
        native-type="submit"
        :loading = "isLoading"
        :disabled = "isLoading"
        loading-text="正在登录中..." 
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'
export default {
  data() {
    // 这里存放数据
    return {
      user: {
        mobile: '15236627651',//手机号
        code: '246810' //密码246810   
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      // console.log('submit', values)
      this.isLoading = true
      try {
        const res = await loginAPI(this.user)
        // console.log(res)
        setToken(res.data.data.token)
        Notify({ type: 'success', message: '登录成功' })
        this.$router.replace({
          path: '/layout'
        })
        
      } catch (err) {
        // console.log(err)
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang='less' scoped>
</style>
