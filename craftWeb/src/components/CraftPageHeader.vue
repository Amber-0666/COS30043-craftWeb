<template>
  <div class="craft-header" :style="{ '--craft-color': craft.color }">
    <div class="header-bg"></div>
    <div class="container">
      <div class="header-content">
        <span class="craft-emoji">{{ craft.emoji }}</span>
        <div>
          <h1 class="craft-title">{{ craft.name }}</h1>
          <p class="craft-tagline">{{ craft.tagline }}</p>
        </div>
      </div>
      <!-- Sub-navigation tabs via dropdown only — no tabs shown here -->
    </div>
  </div>
</template>

<script setup>
defineProps({ craft: Object })
</script>

<style scoped>
.craft-header {
  position: relative;
  padding: 64px 0 48px;
  overflow: hidden;
}

.header-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--craft-color) 0%, color-mix(in srgb, var(--craft-color) 40%, white) 100%);
  opacity: 0.15;
}

.craft-header::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: var(--craft-color);
  opacity: 0.4;
}

.header-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
}

.craft-emoji {
  font-size: 64px;
  line-height: 1;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
}

.craft-title {
  font-size: clamp(32px, 5vw, 52px);
  color: var(--text-dark);
  margin-bottom: 8px;
}

.craft-tagline {
  font-size: 18px;
  color: var(--text-mid);
  font-style: italic;
}
</style>
