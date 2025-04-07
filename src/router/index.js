import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/user/Register.vue')
  },
  {
    path: '/takeout',
    name: 'Takeout',
    component: () => import('../views/takeout/index.vue')
  },
  {
    path: '/:pathMatch(.*)*', // 捕获所有未匹配的路径
    name: 'Takeout',
    component: () => import('../views/takeout/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  console.log(!token, to.path !== '/login', to.path !== '/register');
  if (!token && to.path !== '/login' && to.path !== '/register' || to.path === '/takeout') {
    console.log(to);
    if (to.path === '/takeout') {
      next()
    } else {
      next('/takeout')
    }
  } else {
    next()
  }
})

export default router