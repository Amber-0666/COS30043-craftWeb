<template>
  <div v-if="craft">
    <CraftPageHeader :craft="craft" />

    <section class="section">
      <div class="container">
        <div class="learn-header">
          <div>
            <h2 class="learn-title">{{ craft.name }} Projects</h2>
            <p class="learn-sub">{{ filteredPatterns.length }} projects you can make — click Watch to follow along.</p>
          </div>
          <div class="filter-tabs">
            <button
              v-for="level in levels" :key="level"
              :class="['filter-btn', { active: activeLevel === level }]"
              :style="activeLevel === level ? { background: craft.color, color:'white', borderColor: craft.color } : {}"
              @click="setLevel(level)"
            >{{ level }}</button>
          </div>
        </div>

        <!-- Paginated project grid with slide transition -->
        <Transition :name="pageTransitionName" mode="out-in">
          <div class="projects-grid" :key="`${activeLevel}-p${currentPage}`">
            <div v-for="project in pagedProjects" :key="project.id" class="project-card card">
              <div class="proj-img">
                <img :src="project.image" :alt="project.name" loading="lazy"
                     @error="e => e.target.src='https://images.unsplash.com/photo-1558171813-5a395b42cf63?w=400&h=300&fit=crop'" />
                <span :class="['badge', `badge-${project.difficulty.toLowerCase()}`]" class="proj-badge">
                  {{ project.difficulty }}
                </span>
              </div>
              <div class="proj-body">
                <div class="proj-meta">
                  <span class="proj-time">⏱ {{ project.time }}</span>
                </div>
                <h3 class="proj-title">{{ project.name }}</h3>
                <p class="proj-desc">{{ project.description }}</p>
                <div class="proj-actions">
                  <a :href="project.videoUrl" target="_blank" rel="noopener"
                     class="btn btn-watch" :style="{ background: craft.color }">
                    ▶ Watch Video
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="filteredPatterns.length === 0" class="empty-state">
          <span>🔍</span>
          <p>No projects found for this level. Try another filter!</p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button class="page-btn page-arrow" :disabled="currentPage === 1"
                  @click="goToPage(currentPage - 1, 'prev')">←</button>

          <button
            v-for="p in totalPages" :key="p"
            :class="['page-btn', { active: p === currentPage }]"
            :style="p === currentPage ? { background: craft.color, borderColor: craft.color, color: 'white' } : {}"
            @click="goToPage(p, p > currentPage ? 'next' : 'prev')"
          >{{ p }}</button>

          <button class="page-btn page-arrow" :disabled="currentPage === totalPages"
                  @click="goToPage(currentPage + 1, 'next')">→</button>

          <span class="page-info">{{ startIdx + 1 }}–{{ endIdx }} of {{ filteredPatterns.length }}</span>
        </div>
      </div>
    </section>

    <!-- Tips -->
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

const PER_PAGE = 9
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
const activeLevel = ref('All')
const currentPage = ref(1)
const pageTransitionName = ref('slide-next')

const filteredPatterns = computed(() => {
  if (!craft.value) return []
  if (activeLevel.value === 'All') return craft.value.patterns
  return craft.value.patterns.filter(p => p.difficulty === activeLevel.value)
})

const totalPages = computed(() => Math.min(3, Math.ceil(filteredPatterns.value.length / PER_PAGE)))
const startIdx   = computed(() => (currentPage.value - 1) * PER_PAGE)
const endIdx     = computed(() => Math.min(startIdx.value + PER_PAGE, filteredPatterns.value.length))
const pagedProjects = computed(() => filteredPatterns.value.slice(startIdx.value, endIdx.value))

function setLevel(level) { activeLevel.value = level; currentPage.value = 1 }

function goToPage(p, direction) {
  pageTransitionName.value = direction === 'next' ? 'slide-next' : 'slide-prev'
  currentPage.value = p
  window.scrollTo({ top: 280, behavior: 'smooth' })
}

const tips = [
  { num: '01', title: 'Start Simple', text: 'Pick a beginner project first. Early wins build confidence and teach the fundamentals.' },
  { num: '02', title: 'Gather Tools First', text: 'Having the right tools before you start makes the experience far more enjoyable.' },
  { num: '03', title: 'Watch Before Doing', text: 'Watch the full tutorial once before starting. You\'ll anticipate challenges better.' },
  { num: '04', title: 'Embrace Mistakes', text: 'Mistakes are lessons. Most craft mistakes can be undone — perfection comes with practice.' },
]
</script>

<style scoped>
.learn-header {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 40px; flex-wrap: wrap; gap: 20px;
}
.learn-title { font-size: 32px; color: var(--text-dark); margin-bottom: 8px; }
.learn-sub { color: var(--text-light); }

.filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn {
  padding: 8px 18px; border-radius: 99px; font-size: 13px; font-weight: 600;
  background: white; border: 2px solid #e0dce8; color: var(--text-mid);
  cursor: none; transition: all var(--transition);
}
.filter-btn:hover { border-color: var(--sage); color: var(--plum); }

/* Projects grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  min-height: 200px;
}

.project-card { display: flex; flex-direction: column; }

.proj-img {
  position: relative; aspect-ratio: 4/3; overflow: hidden;
  background: var(--mint);
}
.proj-img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s ease;
}
.project-card:hover .proj-img img { transform: scale(1.06); }
.proj-badge { position: absolute; top: 12px; left: 12px; }

.proj-body {
  padding: 20px; flex: 1;
  display: flex; flex-direction: column; gap: 10px;
}
.proj-meta { display: flex; gap: 8px; align-items: center; }
.proj-time { font-size: 12px; color: var(--text-light); font-weight: 500; }
.proj-title { font-size: 18px; color: var(--text-dark); line-height: 1.3; }
.proj-desc { font-size: 13px; color: var(--text-light); line-height: 1.6; flex: 1; }

.proj-actions { margin-top: 4px; }
.btn-watch {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 20px; border-radius: var(--radius-md);
  font-size: 13px; font-weight: 600; color: white; border: none;
  text-decoration: none; transition: all var(--transition); filter: brightness(1);
}
.btn-watch:hover { filter: brightness(0.88); transform: translateY(-1px); }

.empty-state { text-align: center; padding: 60px; color: var(--text-light); }
.empty-state span { font-size: 48px; display: block; margin-bottom: 16px; }

/* Pagination */
.pagination {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; margin-top: 48px; flex-wrap: wrap;
}
.page-btn {
  width: 40px; height: 40px; border-radius: var(--radius-md);
  background: white; border: 2px solid #e0dce8;
  font-size: 14px; font-weight: 600; color: var(--text-mid);
  cursor: none; transition: all var(--transition);
  display: flex; align-items: center; justify-content: center;
}
.page-btn:hover:not(:disabled) { border-color: var(--sage); color: var(--plum); transform: translateY(-2px); }
.page-btn.active { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.page-btn:disabled { opacity: 0.3; }
.page-arrow { font-size: 16px; }
.page-info { font-size: 13px; color: var(--text-light); margin-left: 6px; }

/* Slide page transitions */
.slide-next-enter-active, .slide-next-leave-active,
.slide-prev-enter-active,  .slide-prev-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-next-enter-from { opacity: 0; transform: translateX(52px); }
.slide-next-leave-to   { opacity: 0; transform: translateX(-52px); }
.slide-prev-enter-from { opacity: 0; transform: translateX(-52px); }
.slide-prev-leave-to   { opacity: 0; transform: translateX(52px); }

/* Tips */
.tips-section { background: var(--mint); }
.tips-title { font-size: 32px; color: var(--text-dark); margin-bottom: 32px; text-align: center; }
.tips-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.tip-card {
  background: white; border-radius: var(--radius-lg); padding: 28px;
  border-bottom: 4px solid var(--c); transition: transform var(--transition);
}
.tip-card:hover { transform: translateY(-4px); }
.tip-num { font-family: var(--font-display); font-size: 48px; font-weight: 800; color: var(--c); opacity: 0.25; line-height: 1; display: block; margin-bottom: 12px; }
.tip-card h4 { font-size: 16px; color: var(--text-dark); margin-bottom: 8px; }
.tip-card p { font-size: 13px; color: var(--text-light); line-height: 1.6; }

@media (max-width: 900px) {
  .projects-grid { grid-template-columns: 1fr 1fr; }
  .tips-grid { grid-template-columns: 1fr 1fr; }
  .learn-header { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 600px) {
  .projects-grid { grid-template-columns: 1fr; }
  .tips-grid { grid-template-columns: 1fr; }
}
</style>
