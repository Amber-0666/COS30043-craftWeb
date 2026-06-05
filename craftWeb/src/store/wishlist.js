import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiGetWishlist, apiAddToWishlist, apiRemoveFromWishlist } from '../services/api.js'
import { useAuthStore } from './auth.js'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])
  const count = computed(() => items.value.length)

  // Load from API on login
  async function loadFromServer() {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) return
    const data = await apiGetWishlist()
    if (Array.isArray(data)) items.value = data
  }

  function isWishlisted(patternId) {
    return items.value.some(i => i.pattern_id === patternId || i.patternId === patternId)
  }

  async function addItem(pattern, craftId, craftName) {
    if (isWishlisted(pattern.id)) return false
    await apiAddToWishlist({
      patternId:   pattern.id,
      craftId,
      craftName,
      patternName: pattern.name,
      difficulty:  pattern.difficulty,
      time:        pattern.time,
      image:       pattern.image
    })
    await loadFromServer() // refresh from DB
    return true
  }

  async function removeItem(patternId) {
    await apiRemoveFromWishlist(patternId)
    items.value = items.value.filter(
      i => i.pattern_id !== patternId && i.patternId !== patternId
    )
  }

  async function toggleItem(pattern, craftId, craftName) {
    if (isWishlisted(pattern.id)) {
      await removeItem(pattern.id)
      return false
    } else {
      await addItem(pattern, craftId, craftName)
      return true
    }
  }

  return { items, count, isWishlisted, addItem, removeItem, toggleItem, loadFromServer }
})