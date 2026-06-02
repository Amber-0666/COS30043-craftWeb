import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth.js'

import Home        from '../views/Home.vue'
import CraftInfo   from '../views/CraftInfo.vue'
import CraftLearn  from '../views/CraftLearn.vue'
import CraftPattern from '../views/CraftPattern.vue'
import Login       from '../views/Login.vue'
import Register    from '../views/Register.vue'
import Wishlist    from '../views/Wishlist.vue'

const routes = [
  { path: '/',                    name: 'Home',         component: Home },
  { path: '/craft/:slug/info',    name: 'CraftInfo',    component: CraftInfo },
  { path: '/craft/:slug/learn',   name: 'CraftLearn',   component: CraftLearn },
  { path: '/craft/:slug/pattern', name: 'CraftPattern', component: CraftPattern },
  { path: '/login',               name: 'Login',        component: Login },
  { path: '/register',            name: 'Register',     component: Register },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*',     redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
