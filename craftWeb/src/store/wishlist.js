import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { apiGetWishlist, apiAddToWishlist, apiRemoveFromWishlist, apiClearWishlist } from '../services/api.js'
import { useAuthStore } from './auth.js'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])
  const count = computed(() => items.value.length)

  // Normalise: API returns snake_case, frontend uses camelCase
  function normalise(item) {
    return {
      patternId:   item.pattern_id   ?? item.patternId,
      craftId:     item.craft_id     ?? item.craftId,
      craftName:   item.craft_name   ?? item.craftName,
      patternName: item.pattern_name ?? item.patternName,
      difficulty:  item.difficulty,
      time:        item.time_est     ?? item.time,
      image:       item.image_url    ?? item.image,
      addedAt:     item.added_at     ?? item.addedAt,
    }
  }

  async function loadFromServer() {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) { items.value = []; return }
    try {
      const data = await apiGetWishlist()
      if (Array.isArray(data)) {
        items.value = data.map(normalise)
      }
    } catch (e) {
      console.error('Failed to load wishlist:', e)
    }
  }

  // Auto-load whenever user logs in or out
  // immediate: true means it also runs on page refresh if already logged in
  const auth = useAuthStore()
  watch(
    () => auth.isLoggedIn,
    (loggedIn) => {
      if (loggedIn) {
        loadFromServer()
      } else {
        items.value = []
      }
    },
    { immediate: true }
  )

  function isWishlisted(patternId) {
    return items.value.some(i => i.patternId === patternId)
  }

  async function addItem(pattern, craftId, craftName) {
    if (isWishlisted(pattern.id)) return false

    const auth = useAuthStore()
    if (!auth.isLoggedIn) {
      return 'not-logged-in'  // NEW: check login first
    }

    try {
      await apiAddToWishlist({
        patternId:   pattern.id,
        craftId,
        craftName,
        patternName: pattern.name,
        difficulty:  pattern.difficulty,
        time:        pattern.time,
        image:       pattern.image
      })
      // NEW: push immediately instead of calling loadFromServer()
      items.value.push(normalise({
        pattern_id:   pattern.id,
        craft_id:     craftId,
        craft_name:   craftName,
        pattern_name: pattern.name,
        difficulty:   pattern.difficulty,
        time_est:     pattern.time,
        image_url:    pattern.image,
        added_at:     new Date().toISOString(),
      }))
      return true
    } catch (e) {
      console.error('Failed to add to wishlist:', e)
      return false
    }
  }

  async function toggleItem(pattern, craftId, craftName) {
    if (isWishlisted(pattern.id)) {
      await removeItem(pattern.id)
      return false
    } else {
      const result = await addItem(pattern, craftId, craftName)
      return result  // FIXED: was hardcoded `return true` before
    }
  }

  async function removeItem(patternId) {
    try {
      await apiRemoveFromWishlist(patternId)
      items.value = items.value.filter(i => i.patternId !== patternId)
    } catch (e) {
      console.error('Failed to remove from wishlist:', e)
    }
  }

  async function clearAll() {
    try {
      await apiClearWishlist()
      items.value = []
    } catch (e) {
      console.error('Failed to clear wishlist:', e)
    }
  }

  return { items, count, isWishlisted, addItem, removeItem, toggleItem, loadFromServer, clearAll }
})