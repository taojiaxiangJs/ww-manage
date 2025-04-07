<template>
  {{ $route.path === '/takeout' }}
  <div class="app-container">
    <!-- 登录或注册页面不使用布局 -->
    <router-view v-if="$route.path === '/takeout' || $route.path === '/login' || $route.path === '/register'" />
    <!-- 管理后台使用 Layout -->
    <!-- <layout v-else /> -->
  </div>
</template>

<script setup>
import Layout from '@/layout/Layout.vue'
</script>

<style lang="scss" scoped>
.app-container {
  // height: 100vh;
}
</style>