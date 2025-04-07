<template>
  <div h-full w-full class="bg-[#314a43]">
    <div text-8xl text-white font-qiji>中国</div>

    <div w-400px mx-auto bg-white p-8 rounded>
      <a-form :model="form" @finish="handleLogin">
        <a-form-item>
          <a-input v-model:value="form.username" placeholder="用户名" />
        </a-form-item>
        <a-form-item>
          <a-input-password v-model:value="form.password" placeholder="密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
  
</template>

<script setup>
import { reactive } from 'vue'
import { login } from '@/api/user'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const form = reactive({
  username: '',
  password: ''
})
const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    const res = await login(form)
    userStore.setToken(res.token)
    userStore.setUserInfo(res.user)
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>