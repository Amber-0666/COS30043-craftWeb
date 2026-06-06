<template>
  <div class="pattern-card card">
    <div class="card-img-wrap">
      <img :src="pattern.image" :alt="pattern.name" loading="lazy" />
      <div class="card-overlay">
        <a v-if="pattern.videoUrl" :href="pattern.videoUrl" target="_blank" class="overlay-btn">
          ▶ Watch Tutorial
        </a>
        <a v-if="pattern.tutorialUrl" :href="pattern.tutorialUrl" target="_blank" class="overlay-btn overlay-btn-outline">
          📖 Full Guide
        </a>
      </div>
      <button class="wishlist-btn" :class="{ active: isWished }" @click.stop="toggleWish" :title="isWished ? 'Remove from wishlist' : 'Add to wishlist'">
        {{ isWished ? '❤️' : '🤍' }}
      </button>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span :class="['badge', `badge-${pattern.difficulty.toLowerCase()}`]">{{ pattern.difficulty }}</span>
        <span class="time-tag">⏱ {{ pattern.time }}</span>
      </div>
      <h3 class="card-title">{{ pattern.name }}</h3>
      <p class="card-desc">{{ pattern.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useWishlistStore } from '../store/wishlist.js'
import { useRouter } from 'vue-router'

const props = defineProps({
  pattern: { type: Object, required: true },
  craftId: { type: String, required: true },
  craftName: { type: String, required: true }
})

const wishlist = useWishlistStore()
const router = useRouter()
const showToast = inject('showToast')

const isWished = computed(() => wishlist.isWishlisted(props.pattern.id))

async function toggleWish() {
  const result = await wishlist.toggleItem(props.pattern, props.craftId, props.craftName)
  if (result === 'not-logged-in') {
    showToast('Please log in to save to your wishlist 🔒', 'error')
    router.push({ name: 'Login' })
  } else if (result === true) {
    showToast(`"${props.pattern.name}" added to wishlist ❤️`, 'success')
  } else {
    showToast(`"${props.pattern.name}" removed from wishlist`, 'success')
  }
}
</script>

<style scoped>
.pattern-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.pattern-card:hover .card-img-wrap img {
  transform: scale(1.06);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(45,37,53,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity var(--transition);
}

.pattern-card:hover .card-overlay {
  opacity: 1;
}

.overlay-btn {
  padding: 10px 22px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  background: var(--coral);
  color: white;
  text-decoration: none;
  transition: all var(--transition);
}

.overlay-btn:hover {
  background: var(--coral-dark);
  transform: scale(1.04);
}

.overlay-btn-outline {
  background: transparent;
  border: 2px solid rgba(255,255,255,0.7);
  color: white;
}

.overlay-btn-outline:hover {
  background: white;
  color: var(--plum);
  border-color: white;
}

.wishlist-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 2;
  line-height: 1;
}

.wishlist-btn:hover {
  transform: scale(1.15);
  background: white;
}

.wishlist-btn.active {
  background: white;
}

.card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.time-tag {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 500;
}

.card-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
  line-height: 1.3;
}

.card-desc {
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.6;
  flex: 1;
}
</style>
