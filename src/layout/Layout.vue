<template>
  <a-layout class="layout">
    <!-- 侧边栏 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <h1>{{ title }}</h1>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        :items="menuItems"
        @click="handleMenuClick"
      />
    </a-layout-sider>

    <!-- 内容区域 -->
    <a-layout>
      <!-- 顶部导航 -->
      <a-layout-header class="header">
        <a-button type="primary" @click="toggleCollapsed">
          <menu-unfold-outlined v-if="collapsed" />
          <menu-fold-outlined v-else />
        </a-button>
        <div class="user-info">
          <a-dropdown>
            <span class="user-name">
              {{ userStore.userInfo?.username || 'Admin' }}
              <down-outlined />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="logout">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 主内容 -->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>

      <!-- 底部 -->
      <a-layout-footer class="footer">
        © 2025 Admin Dashboard Powered by xAI
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons-vue'

const title = ref(import.meta.env.VITE_APP_TITLE)

// 侧边栏折叠状态
const collapsed = ref(false)
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}

// 菜单选中状态
const selectedKeys = ref(['home'])
const router = useRouter()
const route = useRoute()

// 菜单项
const menuItems = [
  {
    key: 'home',
    label: '首页',
    icon: 'i-custom:home',
    path: '/'
  },
  {
    key: 'users',
    label: '用户管理',
    icon: 'i-custom:user',
    path: '/users'
  }
]

// 菜单点击跳转
const handleMenuClick = ({ key }) => {
  const menu = menuItems.find(item => item.key === key)
  if (menu?.path) {
    router.push(menu.path)
    selectedKeys.value = [key]
  }
}

// 用户状态管理
const userStore = useUserStore()
const logout = () => {
  userStore.logout()
  router.push('/login')
}

// 同步路由与菜单选中状态
watch(
  () => route.path,
  (newPath) => {
    const matchedMenu = menuItems.find(item => item.path === newPath)
    if (matchedMenu) {
      selectedKeys.value = [matchedMenu.key]
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .user-info {
    .user-name {
      cursor: pointer;
      margin-right: 16px;
    }
  }
}

.content {
  margin: 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}

.footer {
  text-align: center;
}
</style>