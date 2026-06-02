import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('craftnest_user') || 'null'))
  const token = ref(localStorage.getItem('craftnest_token') || null)

  const isLoggedIn = computed(() => !!user.value && !!token.value)

  function login(userData, authToken) {
    user.value = userData
    token.value = authToken
    localStorage.setItem('craftnest_user', JSON.stringify(userData))
    localStorage.setItem('craftnest_token', authToken)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('craftnest_user')
    localStorage.removeItem('craftnest_token')
  }

  function updateUser(updates) {
    user.value = { ...user.value, ...updates }
    localStorage.setItem('craftnest_user', JSON.stringify(user.value))
  }

  return { user, token, isLoggedIn, login, logout, updateUser }
})
