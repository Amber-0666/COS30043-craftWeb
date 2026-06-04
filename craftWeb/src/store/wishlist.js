import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth.js'

export const useWishlistStore = defineStore('wishlist', () => {
  // Load from localStorage, keyed by user
  function getStorageKey() {
    const auth = useAuthStore()
    return auth.user ? `craftnest_wishlist_${auth.user.id}` : 'craftnest_wishlist_guest'
  }

  const items = ref(JSON.parse(localStorage.getItem(getStorageKey()) || '[]'))

  const count = computed(() => items.value.length)

  function save() {
    localStorage.setItem(getStorageKey(), JSON.stringify(items.value))
  }

  function isWishlisted(patternId) {
    return items.value.some(i => i.patternId === patternId)
  }

  function addItem(pattern, craftId, craftName) {
    if (!isWishlisted(pattern.id)) {
      items.value.push({
        patternId: pattern.id,
        patternName: pattern.name,
        craftId,
        craftName,
        difficulty: pattern.difficulty,
        time: pattern.time,
        image: pattern.image,
        addedAt: new Date().toISOString()
      })
      save()
      return true
    }
    return false
  }

  function removeItem(patternId) {
    items.value = items.value.filter(i => i.patternId !== patternId)
    save()
  }

  function toggleItem(pattern, craftId, craftName) {
    if (isWishlisted(pattern.id)) {
      removeItem(pattern.id)
      return false
    } else {
      addItem(pattern, craftId, craftName)
      return true
    }
  }

  // Reload when user changes
  function reload() {
    items.value = JSON.parse(localStorage.getItem(getStorageKey()) || '[]')
  }

  function clearAll() {
    items.value = []
    save()
  }

  return { items, count, isWishlisted, addItem, removeItem, toggleItem, reload, clearAll }
})
