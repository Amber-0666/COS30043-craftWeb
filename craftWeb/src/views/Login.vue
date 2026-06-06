<template>
  <div class="auth-page">
    <div class="auth-deco">
      <div class="deco-shape deco-1"></div>
      <div class="deco-shape deco-2"></div>
      <p class="deco-quote">"Every stitch is a small act of love."</p>
    </div>
    <div class="auth-panel">
      <div class="auth-inner">
        <RouterLink to="/" class="back-link">← Back to CraftNest</RouterLink>

        <div class="auth-logo">🧵</div>
        <h1 class="auth-title">Welcome back!</h1>
        <p class="auth-sub">Sign in to access your wishlist and saved patterns.</p>

        <form class="auth-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              :class="{ error: errors.email }"
              autocomplete="email"
            />
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="password-wrap">
              <input
                id="password"
                v-model="form.password"
                :type="showPw ? 'text' : 'password'"
                placeholder="Your password"
                :class="{ error: errors.password }"
                autocomplete="current-password"
              />
              <button type="button" class="pw-toggle" @click="showPw = !showPw">
                {{ showPw ? '🙈' : '👁️' }}
              </button>
            </div>
            <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
          </div>

          <div v-if="errors.general" class="alert alert-error">{{ errors.general }}</div>

          <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
            <span v-if="loading">Signing in…</span>
            <span v-else>Sign In →</span>
          </button>
        </form>

        <p class="auth-switch">
          Don't have an account?
          <RouterLink to="/register">Create one free</RouterLink>
        </p>

        <!-- Demo hint -->
        <div class="demo-hint">
          <p>💡 <strong>New here? </strong>
            <RouterLink to="/register">Create a free account</RouterLink>
            to save patterns to your wishlist.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth.js'
import { inject } from 'vue'
import { apiLogin } from '../services/api.js'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const showToast = inject('showToast')

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '', general: '' })
const showPw = ref(false)
const loading = ref(false)

function validate() {
  errors.email = ''
  errors.password = ''
  errors.general = ''
  let ok = true
  if (!form.email) { errors.email = 'Email is required.'; ok = false }
  else if (!/\S+@\S+\.\S+/.test(form.email)) { errors.email = 'Enter a valid email.'; ok = false }
  if (!form.password || form.password.length < 4) { errors.password = 'Password must be at least 4 characters.'; ok = false }
  return ok
}

async function handleLogin() {
  if (!validate()) return
  loading.value = true

  const data = await apiLogin(form.email, form.password)

  if (data.error) {
    errors.general = data.error
    loading.value = false
    return
  }

  auth.login(data.user, data.token)
  showToast(`Welcome back, ${data.user.username}! 🎉`, 'success')
  const redirect = route.query.redirect || '/'
  router.push(redirect)
  loading.value = false
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Decorative side */
.auth-deco {
  background: linear-gradient(135deg, var(--plum) 0%, #2a2535 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  position: relative;
  overflow: hidden;
}

.deco-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
}

.deco-1 {
  width: 500px; height: 500px;
  background: var(--sage);
  top: -150px; right: -150px;
}

.deco-2 {
  width: 350px; height: 350px;
  background: var(--coral);
  bottom: -100px; left: -100px;
}

.deco-quote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 28px;
  color: white;
  text-align: center;
  position: relative;
  line-height: 1.4;
}

/* Form panel */
.auth-panel {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.auth-inner {
  width: 100%;
  max-width: 380px;
}

.back-link {
  font-size: 13px;
  color: var(--text-light);
  text-decoration: none;
  display: block;
  margin-bottom: 32px;
  transition: color var(--transition);
}

.back-link:hover { color: var(--plum); }

.auth-logo {
  font-size: 48px;
  margin-bottom: 16px;
}

.auth-title {
  font-size: 32px;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.auth-sub {
  color: var(--text-light);
  margin-bottom: 32px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.password-wrap {
  position: relative;
}

.password-wrap input {
  width: 100%;
  padding-right: 48px;
}

.pw-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  opacity: 0.6;
}

.pw-toggle:hover { opacity: 1; }

.btn-full { width: 100%; justify-content: center; padding: 14px; }
.btn-full:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }

.alert {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
}

.alert-error { background: #fce4e4; color: var(--coral-dark); }

.auth-switch {
  text-align: center;
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 24px;
}

.auth-switch a { color: var(--coral); font-weight: 600; }

.demo-hint {
  background: var(--mint);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 13px;
  color: var(--text-mid);
  text-align: center;
}

@media (max-width: 768px) {
  .auth-page { grid-template-columns: 1fr; }
  .auth-deco { display: none; }
  .auth-panel { padding: 40px 24px; }
}
</style>
