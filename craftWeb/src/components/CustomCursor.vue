<template>
  <Teleport to="body">
    <div
      ref="cursor"
      class="cursor-craft"
      :class="{ hovering, clicking }"
    >
      ✋
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref(null)
const hovering = ref(false)
const clicking = ref(false)

function moveCursor(e) {
  if (cursor.value) {
    cursor.value.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
  }
}

function onMouseOver(e) {
  const el = e.target.closest(
    'a, button, [role="button"], .card, .filter-btn, .page-btn, .nav-link, .dropdown-item'
  )

  hovering.value = !!el
}

function onMouseDown() {
  clicking.value = true
}

function onMouseUp() {
  clicking.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', moveCursor)
  window.addEventListener('mouseover', onMouseOver)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', moveCursor)
  window.removeEventListener('mouseover', onMouseOver)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<style>
/* Hide normal cursor */
*, *::before, *::after {
  cursor: none !important;
}
</style>

<style scoped>
.cursor-craft {
  position: fixed;
  top: -18px;
  left: -18px;
  font-size: 32px;
  pointer-events: none;
  user-select: none;
  z-index: 99999;

  transition:
    transform 0.18s ease,
    filter 0.18s ease;

  will-change: transform;
}

/* Hover over buttons, links, cards */
.cursor-craft.hovering {
  filter: drop-shadow(0 0 10px rgba(237, 106, 90, 0.5));
}

/* Clicking animation */
.cursor-craft.clicking {
  filter: brightness(0.9);
}
</style>