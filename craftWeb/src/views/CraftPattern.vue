<template>
  <div v-if="craft">
    <CraftPageHeader :craft="craft" />

    <section class="section">
      <div class="container">
        <div class="pattern-header">
          <div>
            <h2 class="pattern-title">{{ craft.name }} Patterns</h2>
            <p class="pattern-sub">{{ craft.patterns.length }} patterns — from beginner to advanced</p>
          </div>
          <div class="filter-row">
            <button
              v-for="level in levels"
              :key="level"
              :class="['filter-btn', { active: activeLevel === level }]"
              :style="activeLevel === level ? { background: craft.color, color: 'white', borderColor: craft.color } : {}"
              @click="activeLevel = level"
            >
              {{ level }}
            </button>
          </div>
        </div>

        <Transition name="fade" mode="out-in">
          <div class="patterns-grid" :key="activeLevel">
            <PatternCard
              v-for="pattern in filteredPatterns"
              :key="pattern.id"
              :pattern="pattern"
              :craftId="craft.id"
              :craftName="craft.name"
            />
          </div>
        </Transition>

        <div v-if="filteredPatterns.length === 0" class="empty">
          <span>🔍</span>
          <p>No patterns at this level. Try another filter!</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getCraft } from '../store/crafts.js'
import CraftPageHeader from '../components/CraftPageHeader.vue'
import PatternCard from '../components/PatternCard.vue'

const route = useRoute()
const craft = computed(() => getCraft(route.params.slug))

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
const activeLevel = ref('All')

const filteredPatterns = computed(() => {
  if (!craft.value) return []
  if (activeLevel.value === 'All') return craft.value.patterns
  return craft.value.patterns.filter(p => p.difficulty === activeLevel.value)
})
</script>

<style scoped>
.pattern-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.pattern-title { font-size: 32px; color: var(--text-dark); margin-bottom: 8px; }
.pattern-sub { color: var(--text-light); }

.filter-row { display: flex; gap: 8px; flex-wrap: wrap; }

.filter-btn {
  padding: 8px 18px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 600;
  background: white;
  border: 2px solid #e0dce8;
  color: var(--text-mid);
  cursor: pointer;
  transition: all var(--transition);
}

.filter-btn:hover { border-color: var(--sage); color: var(--plum); }

.patterns-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.empty {
  text-align: center;
  padding: 60px;
  color: var(--text-light);
}

.empty span { font-size: 48px; display: block; margin-bottom: 16px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) { .patterns-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .patterns-grid { grid-template-columns: 1fr; } }
</style>
