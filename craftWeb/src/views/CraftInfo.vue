<template>
  <div v-if="craft">
    <CraftPageHeader :craft="craft" />

    <section class="section">
      <div class="container">
        <div class="info-layout">
          <!-- Description -->
          <div class="info-main">
            <div class="info-card">
              <h2 class="info-heading">About {{ craft.name }}</h2>
              <p class="info-desc">{{ craft.description }}</p>
            </div>

            <!-- Benefits -->
            <div class="info-card">
              <h2 class="info-heading">Why {{ craft.name }}?</h2>
              <ul class="benefit-list">
                <li v-for="(b, i) in craft.benefits" :key="i" class="benefit-item">
                  <span class="benefit-check">✓</span>
                  <span>{{ b }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Tools Sidebar -->
          <div class="info-sidebar">
            <div class="tools-card" :style="{ '--craft-color': craft.color }">
              <h3 class="tools-heading">🛠️ Tools You'll Need</h3>
              <div class="tools-list">
                <div v-for="tool in craft.tools" :key="tool.name" class="tool-item">
                  <div class="tool-icon">{{ tool.icon }}</div>
                  <div class="tool-info">
                    <strong>{{ tool.name }}</strong>
                    <p>{{ tool.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick links -->
            <div class="quick-links">
              <RouterLink :to="`/craft/${craft.slug}/learn`" class="quick-link" :style="{ '--c': craft.color }">
                <span class="ql-icon">🎓</span>
                <div>
                  <strong>Start Learning</strong>
                  <p>Video tutorials for every level</p>
                </div>
                <span class="ql-arrow">→</span>
              </RouterLink>
              <RouterLink :to="`/craft/${craft.slug}/pattern`" class="quick-link" :style="{ '--c': craft.color }">
                <span class="ql-icon">🖼️</span>
                <div>
                  <strong>Browse Patterns</strong>
                  <p>{{ craft.patterns.length }} patterns to try</p>
                </div>
                <span class="ql-arrow">→</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="not-found">
    <p>Craft not found.</p>
    <RouterLink to="/" class="btn btn-primary">Go Home</RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getCraft } from '../store/crafts.js'
import CraftPageHeader from '../components/CraftPageHeader.vue'

const route = useRoute()
const craft = computed(() => getCraft(route.params.slug))
</script>

<style scoped>
.info-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: start;
}

.info-main { display: flex; flex-direction: column; gap: 24px; }

.info-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-sm);
}

.info-heading {
  font-size: 26px;
  color: var(--text-dark);
  margin-bottom: 20px;
}

.info-desc {
  font-size: 16px;
  color: var(--text-mid);
  line-height: 1.85;
}

.benefit-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: var(--text-mid);
}

.benefit-check {
  width: 24px;
  height: 24px;
  background: var(--mint);
  color: var(--sage-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

/* Tools card */
.tools-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  border-top: 4px solid var(--craft-color);
  margin-bottom: 20px;
}

.tools-heading {
  font-size: 18px;
  color: var(--text-dark);
  margin-bottom: 24px;
}

.tools-list { display: flex; flex-direction: column; gap: 20px; }

.tool-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.tool-icon {
  font-size: 28px;
  line-height: 1;
  flex-shrink: 0;
  width: 40px;
  text-align: center;
}

.tool-info strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.tool-info p {
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.55;
}

/* Quick links */
.quick-links { display: flex; flex-direction: column; gap: 12px; }

.quick-link {
  display: flex;
  align-items: center;
  gap: 14px;
  background: white;
  border-radius: var(--radius-md);
  padding: 18px 20px;
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  border: 2px solid transparent;
  transition: all var(--transition);
}

.quick-link:hover {
  border-color: var(--c);
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.ql-icon { font-size: 24px; }

.quick-link > div { flex: 1; }
.quick-link strong { display: block; font-size: 15px; color: var(--text-dark); }
.quick-link p { font-size: 12px; color: var(--text-light); margin-top: 2px; }

.ql-arrow {
  color: var(--c);
  font-size: 18px;
  font-weight: 700;
  transition: transform var(--transition);
}

.quick-link:hover .ql-arrow { transform: translateX(4px); }

.not-found {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

@media (max-width: 900px) {
  .info-layout { grid-template-columns: 1fr; }
}
</style>
