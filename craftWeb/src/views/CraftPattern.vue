<template>
  <div v-if="craft">
    <CraftPageHeader :craft="craft" />

    <section class="section">
      <div class="container">
        <div class="pattern-header">
          <div>
            <h2 class="pattern-title">{{ craft.name }} Techniques</h2>
            <p class="pattern-sub">
              Step-by-step guides to every core stitch and method — your {{ craft.name.toLowerCase() }} reference library.
            </p>
          </div>
          <div class="filter-row">
            <button
              v-for="cat in categories" :key="cat"
              :class="['filter-btn', { active: activeCategory === cat }]"
              :style="activeCategory === cat ? { background: craft.color, color:'white', borderColor: craft.color } : {}"
              @click="activeCategory = cat"
            >{{ cat }}</button>
          </div>
        </div>

        <!-- Technique cards -->
        <Transition name="fade" mode="out-in">
          <div class="techniques-grid" :key="activeCategory">
            <div
              v-for="tech in filteredTechniques" :key="tech.id"
              class="tech-card"
              :class="{ expanded: expandedId === tech.id }"
              :style="{ '--c': craft.color }"
              @click="toggleExpand(tech.id)"
              role="button"
              :aria-expanded="expandedId === tech.id"
              :aria-label="`${tech.name} technique${expandedId === tech.id ? ', expanded' : ''}`"
              tabindex="0"
              @keydown.enter="toggleExpand(tech.id)"
              @keydown.space.prevent="toggleExpand(tech.id)"
            >
              <!-- Card header — always visible -->
              <div class="tech-header">
                <div class="tech-left">
                  <span v-if="tech.abbr" class="tech-abbr" :style="{ background: craft.color }">{{ tech.abbr }}</span>
                  <div>
                    <h3 class="tech-name">{{ tech.name }}</h3>
                    <div class="tech-meta">
                      <span class="tech-category">{{ tech.category }}</span>
                      <span :class="['badge', `badge-${tech.level.toLowerCase()}`]">{{ tech.level }}</span>
                    </div>
                  </div>
                </div>
                <span class="tech-toggle">{{ expandedId === tech.id ? '▲' : '▼' }}</span>
              </div>

              <p class="tech-desc">{{ tech.description }}</p>

              <!-- Expanded content -->
              <Transition name="expand">
                <div v-if="expandedId === tech.id" class="tech-expanded">
                  <div class="steps-block">
                    <h4 class="steps-label">How to do it</h4>
                    <ol class="steps-list">
                      <li v-for="(step, i) in tech.steps" :key="i" class="step-item">
                        <span class="step-num" :style="{ background: craft.color }">{{ i + 1 }}</span>
                        <span>{{ step }}</span>
                      </li>
                    </ol>
                  </div>
                  <div class="tip-block" :style="{ borderColor: craft.color }">
                    <span class="tip-icon">💡</span>
                    <p>{{ tech.tip }}</p>
                  </div>
                  <div class="proj-actions">
                  <a :href="tech.videoUrl" target="_blank" rel="noopener"
                     class="btn btn-watch" :style="{ background: craft.color }">
                    ▶ Watch Video
                  </a>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </Transition>

        <div v-if="filteredTechniques.length === 0" class="empty">
          <span>🔍</span>
          <p>No techniques in this category yet.</p>
        </div>
      </div>
    </section>

    <!-- Quick reference legend (crochet abbreviations) -->
    <section v-if="craft.techniques.some(t => t.abbr)" class="section ref-section">
      <div class="container">
        <h2 class="ref-title">Quick Reference — Abbreviations</h2>
        <div class="abbr-grid">
          <div v-for="tech in craft.techniques.filter(t => t.abbr)" :key="tech.id"
               class="abbr-chip" :style="{ '--c': craft.color }">
            <span class="abbr-code" :style="{ background: craft.color }">{{ tech.abbr }}</span>
            <span class="abbr-name">{{ tech.name }}</span>
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

const activeCategory = ref('All')
const expandedId = ref(null)

const categories = computed(() => {
  if (!craft.value?.techniques) return ['All']
  const cats = [...new Set(craft.value.techniques.map(t => t.category))]
  return ['All', ...cats]
})

const filteredTechniques = computed(() => {
  if (!craft.value?.techniques) return []
  if (activeCategory.value === 'All') return craft.value.techniques
  return craft.value.techniques.filter(t => t.category === activeCategory.value)
})

function toggleExpand(id) {
  expandedId.value = expandedId.value === id ? null : id
}
</script>

<style scoped>
.pattern-header {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 40px; flex-wrap: wrap; gap: 20px;
}
.pattern-title { font-size: 32px; color: var(--text-dark); margin-bottom: 8px; }
.pattern-sub { color: var(--text-light); max-width: 500px; line-height: 1.6; }

.filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn {
  padding: 8px 18px; border-radius: 99px; font-size: 13px; font-weight: 600;
  background: white; border: 2px solid #e0dce8; color: var(--text-mid);
  cursor: none; transition: all var(--transition);
}
.filter-btn:hover { border-color: var(--sage); color: var(--plum); }

/* Techniques grid */
.techniques-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.tech-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid transparent;
  transition: all var(--transition);
  cursor: none;
  border-left-color: color-mix(in srgb, var(--c) 30%, transparent);
}

.tech-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-left-color: var(--c);
}

.tech-card.expanded {
  border-left-color: var(--c);
  box-shadow: var(--shadow-md);
}

.tech-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 12px; margin-bottom: 10px;
}

.tech-left {
  display: flex; align-items: flex-start; gap: 14px; flex: 1;
}

.tech-abbr {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 44px; height: 44px; border-radius: var(--radius-md);
  color: white; font-weight: 800; font-size: 14px;
  letter-spacing: -0.02em; flex-shrink: 0; padding: 0 8px;
}

.tech-name {
  font-size: 17px; font-weight: 700; color: var(--text-dark);
  margin-bottom: 6px; line-height: 1.2;
}

.tech-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

.tech-category {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.08em; color: var(--text-light);
}

.tech-toggle {
  font-size: 11px; color: var(--text-light);
  flex-shrink: 0; margin-top: 2px; transition: color var(--transition);
}
.tech-card:hover .tech-toggle { color: var(--c); }

.tech-desc {
  font-size: 14px; color: var(--text-mid); line-height: 1.65;
}

/* Expanded area */
.tech-expanded {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--mint);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.steps-label {
  font-size: 13px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; color: var(--text-light); margin-bottom: 12px;
}

.steps-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }

.step-item {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 14px; color: var(--text-mid); line-height: 1.6;
}

.step-num {
  width: 24px; height: 24px; border-radius: 50%;
  color: white; font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}

.tip-block {
  display: flex; align-items: flex-start; gap: 10px;
  background: var(--mint); border-radius: var(--radius-md);
  padding: 14px 16px; border-left: 3px solid;
}
.tip-icon { font-size: 18px; flex-shrink: 0; }
.tip-block p { font-size: 13px; color: var(--text-mid); line-height: 1.65; font-style: italic; }

.btn-watch {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 20px; border-radius: var(--radius-md);
  font-size: 13px; font-weight: 600; color: white; border: none;
  text-decoration: none; transition: all var(--transition); filter: brightness(1);
}
.btn-watch:hover { filter: brightness(0.88); transform: translateY(-1px); }

.empty {
  text-align: center; padding: 60px; color: var(--text-light);
}
.empty span { font-size: 48px; display: block; margin-bottom: 16px; }

/* Fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Expand transition */
.expand-enter-active { transition: all 0.3s ease; overflow: hidden; }
.expand-leave-active { transition: all 0.2s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; margin-top: 0; padding-top: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 600px; }

/* Quick reference */
.ref-section { background: var(--mint); }
.ref-title { font-size: 24px; color: var(--text-dark); margin-bottom: 24px; text-align: center; }

.abbr-grid {
  display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
}

.abbr-chip {
  display: flex; align-items: center; gap: 8px;
  background: white; border-radius: 99px;
  padding: 6px 16px 6px 6px;
  box-shadow: var(--shadow-sm);
  border: 1.5px solid color-mix(in srgb, var(--c) 20%, white);
  transition: all var(--transition);
}
.abbr-chip:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

.abbr-code {
  color: white; font-weight: 800; font-size: 12px;
  padding: 3px 10px; border-radius: 99px; letter-spacing: 0.02em;
}
.abbr-name { font-size: 13px; font-weight: 500; color: var(--text-mid); }

@media (max-width: 900px) {
  .techniques-grid { grid-template-columns: 1fr; }
  .pattern-header { flex-direction: column; align-items: flex-start; }
}
</style>
