<template>
  <div class="wishlist-page">
    <!-- Header -->
    <div class="wl-hero">
      <div class="container">
        <h1 class="wl-title">My Wishlist</h1>
        <p class="wl-sub">Patterns and projects you're dreaming of making.</p>
        <span v-if="wishlist.items.length > 0" class="wl-count">
          {{ wishlist.items.length }} {{ wishlist.items.length === 1 ? 'pattern' : 'patterns' }} saved
        </span>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Empty state -->
        <div v-if="wishlist.items.length === 0" class="empty-state">
          <div class="empty-icon">🤍</div>
          <h2>Your wishlist is empty</h2>
          <p>Browse patterns across our crafts and tap the heart to save them here.</p>
          <div class="empty-actions">
            <RouterLink to="/craft/pipe-cleaner/learn" class="btn btn-primary">🌀 Pipe Cleaner Patterns</RouterLink>
            <RouterLink to="/craft/crochet/learn" class="btn btn-sage">🧶 Crochet Patterns</RouterLink>
            <RouterLink to="/craft/fuse-beads/learn" class="btn btn-outline">🟣 Fuse Bead Patterns</RouterLink>
          </div>
        </div>

        <!-- Wishlist grid -->
        <div v-else>
          <!-- Group by craft -->
          <div v-for="group in groupedItems" :key="group.craftId" class="wl-group">
            <div class="group-header" :style="{ '--c': getCraftColor(group.craftId) }">
              <span class="group-emoji">{{ getCraftEmoji(group.craftId) }}</span>
              <h2 class="group-title">{{ group.craftName }}</h2>
              <span class="group-count">{{ group.items.length }}</span>
            </div>

            <div class="wl-grid">
              <div v-for="item in group.items" :key="item.patternId" class="wl-card card">
                <div class="wl-img">
                  <img :src="item.image" :alt="item.patternName" loading="lazy" />
                </div>
                <div class="wl-body">
                  <div class="wl-meta">
                    <span :class="['badge', `badge-${item.difficulty.toLowerCase()}`]">{{ item.difficulty }}</span>
                    <span class="wl-time">⏱ {{ item.time }}</span>
                  </div>
                  <h3 class="wl-item-title">{{ item.patternName }}</h3>
                  <div class="wl-actions">
                    <RouterLink :to="`/craft/${item.craftId}/learn`" class="btn btn-sage" style="font-size:13px;padding:8px 14px;">
                      View Project
                    </RouterLink>
                    <button class="btn btn-remove" @click="removeItem(item.patternId, item.patternName)" style="font-size:13px;padding:8px 14px;">
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Clear all -->
          <div class="wl-footer">
            <button class="btn btn-outline" @click="showClearConfirm = true" style="color:var(--coral);border-color:var(--coral);">
              🗑️ Clear All
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Confirm modal -->
    <Teleport to="body">
      <div v-if="showClearConfirm" class="modal-overlay" @click.self="showClearConfirm = false">
        <div class="modal">
          <h3>Clear wishlist?</h3>
          <p>This will remove all {{ wishlist.items.length }} saved patterns. This can't be undone.</p>
          <div class="modal-actions">
            <button class="btn btn-outline" @click="showClearConfirm = false">Cancel</button>
            <button class="btn btn-primary" style="background:var(--coral);" @click="clearAll">Yes, clear it</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useWishlistStore } from '../store/wishlist.js'
import { getAllCrafts } from '../store/crafts.js'

const wishlist = useWishlistStore()
const showToast = inject('showToast')
const showClearConfirm = ref(false)

const allCrafts = getAllCrafts()
const craftMap = Object.fromEntries(allCrafts.map(c => [c.id, c]))

function getCraftColor(craftId) {
  return craftMap[craftId]?.color || '#9BC1BC'
}

function getCraftEmoji(craftId) {
  return craftMap[craftId]?.emoji || '🎨'
}

const groupedItems = computed(() => {
  const groups = {}
  for (const item of wishlist.items) {
    if (!groups[item.craftId]) {
      groups[item.craftId] = { craftId: item.craftId, craftName: item.craftName, items: [] }
    }
    groups[item.craftId].items.push(item)
  }
  return Object.values(groups)
})

function removeItem(patternId, name) {
  wishlist.removeItem(patternId)
  showToast(`"${name}" removed from wishlist`, 'success')
}

function clearAll() {
  wishlist.clearAll()
  showClearConfirm.value = false
  showToast('Wishlist cleared', 'success')
}

</script>

<style scoped>
.wl-hero {
  background: linear-gradient(135deg, var(--plum) 0%, color-mix(in srgb, var(--plum) 70%, var(--sage)) 100%);
  padding: 64px 0 48px;
  color: white;
}

.wl-title {
  font-size: clamp(32px, 5vw, 52px);
  color: white;
  margin-bottom: 12px;
}

.wl-sub {
  font-size: 18px;
  color: rgba(255,255,255,0.7);
  margin-bottom: 16px;
}

.wl-count {
  background: rgba(255,255,255,0.18);
  color: white;
  padding: 6px 18px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 600;
}

/* Empty */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 24px;
  opacity: 0.4;
}

.empty-state h2 {
  font-size: 28px;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.empty-state p {
  color: var(--text-light);
  margin-bottom: 32px;
  font-size: 16px;
}

.empty-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Groups */
.wl-group { margin-bottom: 56px; }

.group-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--c);
}

.group-emoji { font-size: 32px; }

.group-title {
  font-size: 24px;
  color: var(--text-dark);
  flex: 1;
}

.group-count {
  background: var(--c);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}

/* Wishlist grid */
.wl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.wl-card { display: flex; flex-direction: column; }

.wl-img {
  aspect-ratio: 16/9;
  overflow: hidden;
}

.wl-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.wl-card:hover .wl-img img { transform: scale(1.05); }

.wl-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.wl-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wl-time {
  font-size: 12px;
  color: var(--text-light);
}

.wl-item-title {
  font-size: 17px;
  color: var(--text-dark);
  line-height: 1.3;
}

.wl-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto;
}

.btn-remove {
  background: transparent;
  border: 2px solid #eee;
  color: var(--text-light);
  transition: all var(--transition);
}

.btn-remove:hover {
  border-color: var(--coral);
  color: var(--coral);
}

/* Footer */
.wl-footer {
  text-align: center;
  padding-top: 32px;
  border-top: 1px solid var(--mint);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(45,37,53,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9000;
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: var(--radius-xl);
  padding: 40px;
  max-width: 400px;
  width: 90%;
  box-shadow: var(--shadow-lg);
}

.modal h3 {
  font-size: 22px;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.modal p {
  color: var(--text-light);
  margin-bottom: 28px;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

@media (max-width: 900px) { .wl-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) {
  .wl-grid { grid-template-columns: 1fr; }
  .empty-actions { flex-direction: column; align-items: center; }
}
</style>
