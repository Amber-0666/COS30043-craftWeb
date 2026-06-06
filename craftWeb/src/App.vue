<template>
  <div id="app-wrapper">
    <a href="#main-content" class="skip-to-content">Skip to main content</a>
    <CustomCursor />
    <AppNav />
    <main id="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <Teleport to="body">
      <div v-if="toast.show" :class="['toast', `toast-${toast.type}`]"
      role="status" aria-live="polite" aria-atomic="true">
        {{ toast.message }}
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { provide, reactive } from 'vue'
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
import CustomCursor from './components/CustomCursor.vue'

const toast = reactive({ show: false, message: '', type: 'success' })
let toastTimer = null

function showToast(message, type = 'success', duration = 3000) {
  clearTimeout(toastTimer)
  toast.message = message; toast.type = type; toast.show = true
  toastTimer = setTimeout(() => { toast.show = false }, duration)
}

provide('showToast', showToast)
</script>
