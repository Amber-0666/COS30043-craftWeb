<template>
  <div class="auth-page">
    <div class="auth-deco">
      <div class="deco-shape deco-1"></div>
      <div class="deco-shape deco-2"></div>
      <div class="deco-crafts">
        <div v-for="c in craftCards" :key="c.id" class="deco-craft-card">
          <span>{{ c.emoji }}</span> {{ c.name }}
        </div>
      </div>
      <p class="deco-quote">Join the CraftNest<br>community today 🧡</p>
    </div>
    <div class="auth-panel">
      <div class="auth-inner">
        <RouterLink to="/" class="back-link">← Back to CraftNest</RouterLink>

        <div class="auth-logo">🌱</div>
        <h1 class="auth-title">Create your account</h1>
        <p class="auth-sub">Start saving patterns and tracking your craft journey.</p>

        <form class="auth-form" @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="craftylover42"
              :class="{ error: errors.username }"
              autocomplete="username"
            />
            <span v-if="errors.username" class="error-msg">{{ errors.username }}</span>
          </div>

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
                placeholder="At least 6 characters"
                :class="{ error: errors.password }"
                autocomplete="new-password"
              />
              <button type="button" class="pw-toggle" @click="showPw = !showPw">
                {{ showPw ? '🙈' : '👁️' }}
              </button>
            </div>
            <div v-if="form.password" class="strength-bar">
              <div class="strength-fill" :style="{ width: strengthPct + '%', background: strengthColor }"></div>
            </div>
            <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
          </div>

          <div class="form-group">
            <label for="confirm">Confirm Password</label>
            <input
              id="confirm"
              v-model="form.confirm"
              type="password"
              placeholder="Repeat your password"
              :class="{ error: errors.confirm }"
              autocomplete="new-password"
            />
            <span v-if="errors.confirm" class="error-msg">{{ errors.confirm }}</span>
          </div>

          <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
            <span v-if="loading">Creating account…</span>
            <span v-else">Create Account →</span>
          </button>
        </form>

        <p class="auth-switch">
          Already have an account?
          <RouterLink to="/login">Sign in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.js'
import { inject } from 'vue'

const router = useRouter()
const auth = useAuthStore()
const showToast = inject('showToast')

const form = reactive({ username: '', email: '', password: '', confirm: '' })
const errors = reactive({ username: '', email: '', password: '', confirm: '' })
const showPw = ref(false)
const loading = ref(false)

const craftCards = [
  { id: 1, emoji: '🌀', name: 'Pipe Cleaner' },
  { id: 2, emoji: '🧶', name: 'Crochet' },
  { id: 3, emoji: '🟣', name: 'Fuse Beads' }
]

const strengthPct = computed(() => {
  const pw = form.password
  if (!pw) return 0
  let score = 0
  if (pw.length >= 6) score += 25
  if (pw.length >= 10) score += 25
  if (/[A-Z]/.test(pw)) score += 25
  if (/[0-9!@#$%]/.test(pw)) score += 25
  return score
})

const strengthColor = computed(() => {
  const p = strengthPct.value
  if (p <= 25) return '#ED6A5A'
  if (p <= 50) return '#f4a426'
  if (p <= 75) return '#9BC1BC'
  return '#2d7a5a'
})

function validate() {
  Object.keys(errors).forEach(k => errors[k] = '')
  let ok = true
  if (!form.username || form.username.length < 3) { errors.username = 'Username must be at least 3 characters.'; ok = false }
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) { errors.email = 'Enter a valid email.'; ok = false }
  if (!form.password || form.password.length < 6) { errors.password = 'Password must be at least 6 characters.'; ok = false }
  if (form.password !== form.confirm) { errors.confirm = 'Passwords do not match.'; ok = false }
  return ok
}

async function handleRegister() {
  if (!validate()) return
  loading.value = true
  await new Promise(r => setTimeout(r, 900))
  const newUser = { id: Date.now(), username: form.username, email: form.email }
  auth.login(newUser, `fake-token-${Date.now()}`)
  showToast(`Account created! Welcome, ${form.username}! 🎉`, 'success')
  router.push('/')
  loading.value = false
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.auth-deco {
  background: linear-gradient(135deg, var(--sage-dark) 0%, var(--plum) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  position: relative;
  overflow: hidden;
  gap: 32px;
}

.deco-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.deco-1 { width: 450px; height: 450px; background: var(--cream); top: -150px; right: -100px; }
.deco-2 { width: 300px; height: 300px; background: var(--coral); bottom: -100px; left: -100px; }

.deco-crafts {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}

.deco-craft-card {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-md);
  padding: 12px 24px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.deco-quote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 28px;
  color: white;
  text-align: center;
  position: relative;
  line-height: 1.5;
}

.auth-panel {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.auth-inner { width: 100%; max-width: 400px; }

.back-link {
  font-size: 13px;
  color: var(--text-light);
  text-decoration: none;
  display: block;
  margin-bottom: 32px;
}

.back-link:hover { color: var(--plum); }

.auth-logo { font-size: 48px; margin-bottom: 16px; }
.auth-title { font-size: 32px; color: var(--text-dark); margin-bottom: 8px; }
.auth-sub { color: var(--text-light); margin-bottom: 32px; }

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
}

.password-wrap { position: relative; }
.password-wrap input { width: 100%; padding-right: 48px; }

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

.strength-bar {
  height: 4px;
  background: #e8e4f0;
  border-radius: 99px;
  margin-top: 6px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.3s ease, background 0.3s ease;
}

.btn-full { width: 100%; justify-content: center; padding: 14px; }
.btn-full:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }

.auth-switch {
  text-align: center;
  font-size: 14px;
  color: var(--text-light);
}

.auth-switch a { color: var(--coral); font-weight: 600; }

@media (max-width: 768px) {
  .auth-page { grid-template-columns: 1fr; }
  .auth-deco { display: none; }
  .auth-panel { padding: 40px 24px; }
}
</style>
