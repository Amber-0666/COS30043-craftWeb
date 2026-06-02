<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="visible" class="popup-overlay" @click.self="dismiss">
        <div class="popup-card">
          <button class="popup-close" @click="dismiss">✕</button>

          <div class="popup-header">
            <span class="popup-icon">🧵</span>
            <h2 class="popup-title">Welcome to CraftNest!</h2>
            <p class="popup-sub">Your cosy corner for handmade creativity.</p>
          </div>

          <div class="popup-crafts">
            <div v-for="craft in crafts" :key="craft.id" class="popup-craft" :style="{ '--c': craft.color }">
              <span class="pc-emoji">{{ craft.emoji }}</span>
              <span class="pc-name">{{ craft.name }}</span>
            </div>
          </div>

          <p class="popup-body">
            Discover <strong>{{ totalPatterns }}+ patterns</strong>, step-by-step tutorials,
            and save your favourites to your personal wishlist.
          </p>

          <div class="popup-actions">
            <RouterLink to="/craft/pipe-cleaner/info" class="btn btn-primary" @click="dismiss">
              Start Exploring →
            </RouterLink>
            <button class="btn btn-outline" @click="dismiss">Browse Later</button>
          </div>

          <p class="popup-note">✓ Free to use &nbsp;·&nbsp; ✓ No signup needed to browse</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllCrafts } from '../store/crafts.js'

const crafts = getAllCrafts()
const totalPatterns = crafts.reduce((acc, c) => acc + c.patterns.length, 0)
const visible = ref(false)

onMounted(() => {
  // Show only once per session
  if (!sessionStorage.getItem('craftnest_popup_seen')) {
    setTimeout(() => { visible.value = true }, 900)
  }
})

function dismiss() {
  visible.value = false
  sessionStorage.setItem('craftnest_popup_seen', '1')
}
</script>

<style scoped>
.popup-overlay {
  position: fixed; inset: 0; z-index: 9900;
  background: rgba(45,37,53,0.55);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

.popup-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 48px 40px 36px;
  max-width: 480px; width: 100%;
  position: relative;
  box-shadow: var(--shadow-lg);
  text-align: center;
}

.popup-close {
  position: absolute; top: 16px; right: 16px;
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--mint); border: none;
  font-size: 14px; color: var(--text-light);
  display: flex; align-items: center; justify-content: center;
  transition: all var(--transition);
}
.popup-close:hover { background: var(--coral); color: white; }

.popup-header { margin-bottom: 24px; }
.popup-icon { font-size: 48px; display: block; margin-bottom: 12px; }
.popup-title { font-size: 28px; color: var(--text-dark); margin-bottom: 8px; }
.popup-sub { color: var(--text-light); font-size: 15px; }

.popup-crafts {
  display: flex; justify-content: center; gap: 12px;
  margin-bottom: 24px; flex-wrap: wrap;
}

.popup-craft {
  display: flex; align-items: center; gap: 6px;
  background: color-mix(in srgb, var(--c) 12%, white);
  border: 1.5px solid color-mix(in srgb, var(--c) 30%, white);
  border-radius: 99px; padding: 6px 14px;
  font-size: 13px; font-weight: 600; color: var(--text-dark);
}
.pc-emoji { font-size: 16px; }

.popup-body {
  font-size: 15px; color: var(--text-mid);
  line-height: 1.65; margin-bottom: 28px;
}

.popup-actions {
  display: flex; gap: 12px; justify-content: center;
  margin-bottom: 16px; flex-wrap: wrap;
}

.popup-note { font-size: 12px; color: var(--text-light); }

/* Transition */
.popup-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.popup-leave-active { transition: all 0.25s ease; }
.popup-enter-from  { opacity: 0; transform: scale(0.85) translateY(20px); }
.popup-leave-to    { opacity: 0; transform: scale(0.95); }
</style>
