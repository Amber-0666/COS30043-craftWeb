<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="brand-logo">
            <span>🧵</span>
            <span class="brand-name">CraftNest</span>
          </div>
          <p class="brand-desc">Your cosy corner for all things handmade.</p>
        </div>

        <div class="footer-links">
          <div class="footer-col">
            <h4>Crafts</h4>
            <RouterLink to="/craft/pipe-cleaner/info">Pipe Cleaner</RouterLink>
            <RouterLink to="/craft/crochet/info">Crochet</RouterLink>
            <RouterLink to="/craft/fuse-beads/info">Fuse Beads</RouterLink>
          </div>
          <div class="footer-col">
            <h4>Projects</h4>
            <RouterLink to="/craft/pipe-cleaner/learn">Pipe Cleaner</RouterLink>
            <RouterLink to="/craft/crochet/learn">Crochet</RouterLink>
            <RouterLink to="/craft/fuse-beads/learn">Fuse Beads</RouterLink>
          </div>
          <div class="footer-col">
            <h4>Account</h4>
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
            <RouterLink to="/wishlist">Wishlist</RouterLink>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} CraftNest — Made with 🧡 for crafters everywhere.</p>
        <div class="footer-tags">
          <span>#HandmadeWithHeart</span>
          <span>#CraftNest</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--plum);
  color: rgba(255,255,255,0.85);
  padding: 32px 0 0;
  margin-top: 80px;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  flex-wrap: wrap;
}

.footer-brand { display: flex; flex-direction: column; gap: 6px; }

.brand-logo { display: flex; align-items: center; gap: 8px; }
.brand-logo span:first-child { font-size: 22px; }
.brand-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: white; }

.brand-desc { font-size: 13px; color: rgba(255,255,255,0.55); max-width: 220px; }

.footer-links { display: flex; gap: 48px; }

.footer-col { display: flex; flex-direction: column; gap: 8px; }

.footer-col h4 {
  font-family: var(--font-display); font-size: 13px; font-style: italic;
  color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.08em;
  margin-bottom: 2px;
}

.footer-col a {
  font-size: 13px; color: rgba(255,255,255,0.7);
  text-decoration: none; transition: color var(--transition);
}
.footer-col a:hover { color: var(--cream); }

.footer-bottom {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 0; font-size: 12px; color: rgba(255,255,255,0.35);
  flex-wrap: wrap; gap: 8px;
}

.footer-tags { display: flex; gap: 8px; }
.footer-tags span {
  background: rgba(255,255,255,0.07);
  padding: 2px 10px; border-radius: 99px; font-size: 11px;
}

@media (max-width: 700px) {
  .footer-inner { flex-direction: column; align-items: flex-start; }
  .footer-links { flex-wrap: wrap; gap: 28px; }
  .footer-bottom { flex-direction: column; text-align: center; }
}
</style>
