<template>
  <div v-if="craft">
    <CraftPageHeader :craft="craft" />

    <section class="section">
      <div class="container">
        <div class="learn-header">
          <div>
            <h2 class="learn-title">Learn {{ craft.name }}</h2>
            <p class="learn-sub">Curated tutorials and guides for every skill level.</p>
          </div>
          <div class="filter-tabs">
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

        <div class="tutorials-grid">
          <div
            v-for="(tutorial, i) in filteredTutorials"
            :key="tutorial.id"
            class="tutorial-card card"
          >
            <div class="tut-img" :style="{ background: bgColors[i % bgColors.length] }">
              <img :src="tutorial.image" :alt="tutorial.name" loading="lazy" />
              <span :class="['badge', `badge-${tutorial.difficulty.toLowerCase()}`]" style="position:absolute;top:12px;left:12px;">
                {{ tutorial.difficulty }}
              </span>
            </div>
            <div class="tut-body">
              <div class="tut-meta">
                <span class="tut-time">⏱ {{ tutorial.time }}</span>
              </div>
              <h3 class="tut-title">{{ tutorial.name }}</h3>
              <p class="tut-desc">{{ tutorial.description }}</p>
              <div class="tut-actions">
                <a :href="tutorial.videoUrl" target="_blank" class="btn btn-primary" style="font-size:13px;padding:9px 18px;">
                  ▶ Watch Video
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredTutorials.length === 0" class="empty-state">
          <span>🔍</span>
          <p>No tutorials found for this level. Try another filter!</p>
        </div>
      </div>
    </section>

    <!-- Getting Started Tips -->
    <section class="section tips-section">
      <div class="container">
        <h2 class="tips-title">Tips for Getting Started</h2>
        <div class="tips-grid">
          <div v-for="tip in tips" :key="tip.title" class="tip-card" :style="{ '--c': craft.color }">
            <span class="tip-num">{{ tip.num }}</span>
            <h4>{{ tip.title }}</h4>
            <p>{{ tip.text }}</p>
          </div>
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

const route = useRoute()
const craft = computed(() => getCraft(route.params.slug))

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
const activeLevel = ref('All')
const bgColors = ['#fce8e6', '#e8f4f3', '#ede9f8', '#f4f3df']

const filteredTutorials = computed(() => {
  if (!craft.value) return []
  if (activeLevel.value === 'All') return craft.value.patterns
  return craft.value.patterns.filter(p => p.difficulty === activeLevel.value)
})

const tips = [
  { num: '01', title: 'Start Simple', text: 'Pick a beginner project first. Early wins build confidence and teach the fundamentals.' },
  { num: '02', title: 'Gather Tools First', text: 'Having the right tools before you start makes the experience far more enjoyable.' },
  { num: '03', title: 'Watch Before Doing', text: 'Watch the full tutorial once before starting. You\'ll anticipate challenges better.' },
  { num: '04', title: 'Embrace Mistakes', text: 'Mistakes are lessons. Most craft mistakes can be undone — perfection comes with practice.' },
]
</script>

<style scoped>
.learn-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.learn-title {
  font-size: 32px;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.learn-sub {
  color: var(--text-light);
}

.filter-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

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

.filter-btn:hover {
  border-color: var(--sage);
  color: var(--plum);
}

/* Tutorials grid */
.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.tutorial-card {
  display: flex;
  flex-direction: column;
}

.tut-img {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.tut-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.tutorial-card:hover .tut-img img {
  transform: scale(1.05);
}

.play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(45,37,53,0.4);
  opacity: 0;
  transition: opacity var(--transition);
  text-decoration: none;
}

.tutorial-card:hover .play-btn { opacity: 1; }

.play-icon {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--coral);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  padding-left: 4px;
}

.tut-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tut-meta { display: flex; gap: 8px; align-items: center; }

.tut-time {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 500;
}

.tut-title {
  font-size: 18px;
  color: var(--text-dark);
  line-height: 1.3;
}

.tut-desc {
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.6;
  flex: 1;
}

.tut-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.empty-state {
  text-align: center;
  padding: 60px;
  color: var(--text-light);
}

.empty-state span { font-size: 48px; display: block; margin-bottom: 16px; }

/* Tips */
.tips-section { background: var(--mint); }

.tips-title {
  font-size: 32px;
  color: var(--text-dark);
  margin-bottom: 32px;
  text-align: center;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.tip-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 28px;
  border-bottom: 4px solid var(--c);
  transition: transform var(--transition);
}

.tip-card:hover { transform: translateY(-4px); }

.tip-num {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 800;
  color: var(--c);
  opacity: 0.25;
  line-height: 1;
  display: block;
  margin-bottom: 12px;
}

.tip-card h4 {
  font-size: 16px;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.tip-card p {
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .tutorials-grid { grid-template-columns: 1fr 1fr; }
  .tips-grid { grid-template-columns: 1fr 1fr; }
  .learn-header { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 600px) {
  .tutorials-grid { grid-template-columns: 1fr; }
  .tips-grid { grid-template-columns: 1fr; }
}
</style>
