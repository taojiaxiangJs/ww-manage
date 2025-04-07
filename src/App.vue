<template>
  <div class="app-container">
    <!-- 登录或注册页面不使用布局 -->
    <router-view v-if="whiteList.includes($route.path)" />
    <!-- 管理后台使用 Layout -->
    <layout v-else />
  </div>
</template>

<script setup>
import Layout from '@/layout/Layout.vue'
const whiteList = ['/','/takeout', '/login', '/register']
</script>

<style lang="scss">
@use './assets/styles/style.scss';
.app-container {
  height: 100vh;
}
</style>