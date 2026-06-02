<template>
  <div class="home">
    <WelcomePopup />
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="container hero-inner">
        <div class="hero-text">
          <span class="hero-eyebrow">✨ Handmade with heart</span>
          <h1 class="hero-title">
            Where Creativity<br>
            <em>Comes Alive</em>
          </h1>
          <p class="hero-desc">
            CraftNest is your cosy corner for discovering the joy of handicrafts.
            From pipe cleaner sculptures to crochet wonders and pixel bead art —
            find tutorials, patterns, and inspiration for every skill level.
          </p>
          <div class="hero-actions">
            <RouterLink to="/craft/pipe-cleaner/learn" class="btn btn-primary">Start Crafting →</RouterLink>
            <RouterLink to="/craft/crochet/info" class="btn btn-outline">Explore Crafts</RouterLink>
          </div>
          <div class="hero-stats">
            <div class="stat"><span class="stat-num">3</span><span class="stat-label">Craft Types</span></div>
            <div class="stat"><span class="stat-num">18+</span><span class="stat-label">Patterns</span></div>
            <div class="stat"><span class="stat-num">∞</span><span class="stat-label">Creativity</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="craft-cards-float">
            <div class="float-card float-card-1">🌀 Pipe Cleaner</div>
            <div class="float-card float-card-2">🧶 Crochet</div>
            <div class="float-card float-card-3">🟣 Fuse Beads</div>
          </div>
          <div class="hero-blob">
            <img src="@/assets/Craft.png" alt="Crafts" />
          </div>
        </div>
      </div>
    </section>

    <!-- What is Handicraft? -->
    <section class="section about-section">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">About</span>
          <h2 class="section-title">What is Handicraft?</h2>
        </div>
        <div class="about-grid">
          <div class="about-text">
            <p>
              Handicraft is the art of making things by hand — a tradition as old as humanity itself.
              Long before factories and machines, every object of daily life was crafted with patience,
              skill, and personal expression. Today, handicrafts are experiencing a beautiful renaissance
              as people rediscover the profound satisfaction of creating something tangible with their own hands.
            </p>
            <p>
              Whether you're weaving, stitching, sculpting, or beading, handicrafts offer a unique form
              of mindfulness — a moving meditation that quiets the mind and engages the hands. The result
              is not just a beautiful object, but a sense of accomplishment and personal connection that
              no digital creation can replicate.
            </p>
          </div>
          <div class="about-quote">
            <blockquote>
              "The human hand is so beautifully formed, its motions so graceful, its structure so elegant..."
              <cite>— Charles Bell</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="section benefits-section">
      <div class="container">
        <div class="section-header centered">
          <span class="section-eyebrow">Why Craft?</span>
          <h2 class="section-title">The Benefits of Handicraft</h2>
          <p class="section-sub">Science backs what crafters have always known: making things by hand is transformative.</p>
        </div>
        <div class="benefits-grid">
          <div v-for="benefit in benefits" :key="benefit.title" class="benefit-card">
            <div class="benefit-icon">{{ benefit.icon }}</div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Craft Showcase -->
    <section class="section crafts-section">
      <div class="container">
        <div class="section-header centered">
          <span class="section-eyebrow">Explore</span>
          <h2 class="section-title">Our Three Crafts</h2>
        </div>
        <div class="crafts-showcase">
          <RouterLink
            v-for="craft in crafts"
            :key="craft.id"
            :to="`/craft/${craft.slug}/info`"
            class="craft-feature-card"
            :style="{ '--c': craft.color }"
          >
            <div class="cfc-bg"></div>
            <span class="cfc-emoji">{{ craft.emoji }}</span>
            <div class="cfc-content">
              <h3>{{ craft.name }}</h3>
              <p>{{ craft.tagline }}</p>
              <span class="cfc-link">Explore → </span>
            </div>
            <div class="cfc-patterns">
              <span v-for="p in craft.patterns.slice(0,3)" :key="p.id" class="cfc-pattern-tag">
                {{ p.name }}
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-box">
          <h2>Ready to Start Your Craft Journey?</h2>
          <p>Join CraftNest, save your favourite patterns, and learn at your own pace.</p>
          <div class="cta-actions">
            <RouterLink to="/register" class="btn btn-primary">Create Free Account</RouterLink>
            <RouterLink to="/craft/crochet/learn" class="btn" style="background:white;color:var(--plum)">Browse Tutorials</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getAllCrafts } from '../store/crafts.js'
import WelcomePopup from '../components/WelcomePopup.vue'

const crafts = getAllCrafts()

const benefits = [
  { icon: '🧠', title: 'Boosts Mental Health', desc: 'Crafting triggers dopamine release and reduces cortisol, lowering stress and anxiety naturally.' },
  { icon: '🖐️', title: 'Develops Fine Motor Skills', desc: 'Intricate hand movements strengthen dexterity, coordination, and tactile sensitivity.' },
  { icon: '🎯', title: 'Builds Focus & Mindfulness', desc: 'Crafting demands present-moment attention, acting as a moving meditation for a busy mind.' },
  { icon: '💡', title: 'Sparks Creativity', desc: 'Regular making trains the creative brain, improving problem-solving across all areas of life.' },
  { icon: '🤝', title: 'Creates Community', desc: 'Craft circles and online communities offer deep social connection around shared passion.' },
  { icon: '🌱', title: 'Sustainable & Mindful', desc: 'Handmade items last longer, reduce waste, and encourage conscious consumption.' },
]
</script>

<style scoped>
/* ── Hero ── */
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 80px 0 60px;
}

.hero-bg-shapes { position: absolute; inset: 0; pointer-events: none; }

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
}

.shape-1 {
  width: 600px; height: 600px;
  background: var(--sage);
  top: -200px; right: -100px;
  animation: float1 8s ease-in-out infinite;
}

.shape-2 {
  width: 400px; height: 400px;
  background: var(--coral);
  bottom: -100px; left: -100px;
  animation: float2 10s ease-in-out infinite;
}

.shape-3 {
  width: 300px; height: 300px;
  background: var(--cream);
  top: 50%; left: 40%;
  animation: float1 12s ease-in-out infinite reverse;
}

@keyframes float1 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(20px) rotate(5deg); }
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-eyebrow {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--coral);
  margin-bottom: 16px;
  background: rgba(237,106,90,0.1);
  padding: 6px 16px;
  border-radius: 99px;
}

.hero-title {
  font-size: clamp(36px, 5vw, 64px);
  color: var(--text-dark);
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.hero-title em {
  color: var(--coral);
  font-style: italic;
}

.hero-desc {
  font-size: 17px;
  color: var(--text-mid);
  line-height: 1.75;
  margin-bottom: 32px;
  max-width: 480px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.hero-stats {
  display: flex;
  gap: 32px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 800;
  color: var(--plum);
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-light);
  font-weight: 600;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-blob {
  width: 420px;
  height: 420px;
  border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: blobMorph 8s ease-in-out infinite;
}

.hero-blob img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes blobMorph {
  0%, 100% { border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%; }
  25% { border-radius: 40% 60% 45% 55% / 55% 45% 60% 40%; }
  50% { border-radius: 50% 50% 60% 40% / 40% 60% 50% 50%; }
  75% { border-radius: 55% 45% 40% 60% / 60% 40% 55% 45%; }
}

.craft-cards-float {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.float-card {
  position: absolute;
  background: white;
  border-radius: var(--radius-md);
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--plum);
  box-shadow: var(--shadow-md);
}

.float-card-1 { top: 10%; right: -20px; animation: floatCard 4s ease-in-out infinite; }
.float-card-2 { bottom: 20%; right: -30px; animation: floatCard 5s ease-in-out infinite 1s; }
.float-card-3 { top: 40%; left: -20px; animation: floatCard 4.5s ease-in-out infinite 0.5s; }

@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* ── About Section ── */
.about-section { background: white; }

.section-header { margin-bottom: 48px; }
.section-header.centered { text-align: center; }

.section-eyebrow {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--coral);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  color: var(--text-dark);
}

.section-sub {
  font-size: 17px;
  color: var(--text-mid);
  margin-top: 12px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.about-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 64px;
  align-items: center;
}

.about-text p {
  color: var(--text-mid);
  line-height: 1.85;
  margin-bottom: 16px;
  font-size: 16px;
}

.about-quote {
  background: var(--mint);
  border-radius: var(--radius-lg);
  padding: 32px;
  position: relative;
}

.about-quote::before {
  content: '"';
  font-family: var(--font-display);
  font-size: 120px;
  color: var(--sage);
  opacity: 0.3;
  position: absolute;
  top: -20px;
  left: 20px;
  line-height: 1;
}

blockquote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 20px;
  color: var(--plum);
  line-height: 1.5;
}

cite {
  display: block;
  font-size: 14px;
  font-style: normal;
  color: var(--text-light);
  margin-top: 12px;
  font-family: var(--font-body);
}

/* ── Benefits ── */
.benefits-section { background: var(--mint); }

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.benefit-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px;
  transition: all var(--transition);
  border: 2px solid transparent;
}

.benefit-card:hover {
  transform: translateY(-6px);
  border-color: var(--sage);
  box-shadow: var(--shadow-md);
}

.benefit-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.benefit-card h3 {
  font-size: 18px;
  color: var(--text-dark);
  margin-bottom: 10px;
}

.benefit-card p {
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.7;
}

/* ── Crafts Showcase ── */
.crafts-showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.craft-feature-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  padding: 40px 32px;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition);
  border: 2px solid rgba(0,0,0,0.05);
  background: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.craft-feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.cfc-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--c), color-mix(in srgb, var(--c) 20%, white));
  opacity: 0.12;
  transition: opacity var(--transition);
}

.craft-feature-card:hover .cfc-bg { opacity: 0.22; }

.cfc-emoji {
  font-size: 52px;
  line-height: 1;
  position: relative;
}

.cfc-content { position: relative; }

.cfc-content h3 {
  font-size: 24px;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.cfc-content p {
  font-size: 14px;
  color: var(--text-mid);
  line-height: 1.6;
  margin-bottom: 16px;
}

.cfc-link {
  font-size: 14px;
  font-weight: 700;
  color: var(--c);
}

.cfc-patterns {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  position: relative;
}

.cfc-pattern-tag {
  font-size: 11px;
  padding: 4px 10px;
  background: var(--mint);
  border-radius: 99px;
  color: var(--text-mid);
  font-weight: 500;
}

/* ── CTA ── */
.cta-section { padding-bottom: 0; }

.cta-box {
  background: linear-gradient(135deg, var(--plum) 0%, #3a3546 100%);
  border-radius: var(--radius-xl);
  padding: 72px 64px;
  text-align: center;
  color: white;
}

.cta-box h2 {
  font-size: clamp(28px, 4vw, 42px);
  margin-bottom: 16px;
  color: white;
}

.cta-box p {
  font-size: 18px;
  color: rgba(255,255,255,0.75);
  margin-bottom: 36px;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; text-align: center; }
  .hero-visual { display: none; }
  .hero-actions { justify-content: center; }
  .hero-stats { justify-content: center; }
  .about-grid { grid-template-columns: 1fr; }
  .benefits-grid { grid-template-columns: 1fr 1fr; }
  .crafts-showcase { grid-template-columns: 1fr; }
  .cta-box { padding: 48px 32px; }
}

@media (max-width: 600px) {
  .benefits-grid { grid-template-columns: 1fr; }
}
</style>
