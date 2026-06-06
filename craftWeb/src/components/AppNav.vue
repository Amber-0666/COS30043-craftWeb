<template>
  <nav class="nav" :class="{ 'nav-scrolled': scrolled }">
    <div class="nav-inner container">
      <RouterLink to="/" class="nav-logo">
        <span class="logo-icon">🧵</span>
        <span class="logo-text">CraftNest</span>
      </RouterLink>

      <ul class="nav-links">
        <!-- Pipe Cleaner — clicking nav link goes to info; dropdown has Learn only -->
        <li class="nav-item has-dropdown" @mouseenter="openDropdown('pipe')" @mouseleave="closeDropdown">
          <RouterLink to="/craft/pipe-cleaner/info" class="nav-link" :class="{ active: route.params.slug === 'pipe-cleaner' }">
            <span>🌀</span> Pipe Cleaner
            <svg class="chevron" viewBox="0 0 24 24" width="14" height="14"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
          </RouterLink>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'pipe'" class="dropdown" style="--accent: var(--coral)">
              <RouterLink to="/craft/pipe-cleaner/learn"   class="dropdown-item" @click="closeDropdown">🎨 Projects</RouterLink>
            </div>
          </Transition>
        </li>

        <!-- Crochet -->
        <li class="nav-item has-dropdown" @mouseenter="openDropdown('crochet')" @mouseleave="closeDropdown">
          <RouterLink to="/craft/crochet/info" class="nav-link" :class="{ active: route.params.slug === 'crochet' }">
            <span>🧶</span> Crochet
            <svg class="chevron" viewBox="0 0 24 24" width="14" height="14"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
          </RouterLink>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'crochet'" class="dropdown" style="--accent: var(--sage)">
              <RouterLink to="/craft/crochet/learn"   class="dropdown-item" @click="closeDropdown">🎨 Projects</RouterLink>
              <RouterLink to="/craft/crochet/pattern" class="dropdown-item" @click="closeDropdown">📚 Techniques</RouterLink>
            </div>
          </Transition>
        </li>

        <!-- Fuse Beads -->
        <li class="nav-item has-dropdown" @mouseenter="openDropdown('fuse')" @mouseleave="closeDropdown">
          <RouterLink to="/craft/fuse-beads/info" class="nav-link" :class="{ active: route.params.slug === 'fuse-beads' }">
            <span>🟣</span> Fuse Beads
            <svg class="chevron" viewBox="0 0 24 24" width="14" height="14"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
          </RouterLink>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'fuse'" class="dropdown" style="--accent: var(--plum)">
              <RouterLink to="/craft/fuse-beads/learn"   class="dropdown-item" @click="closeDropdown">🎨 Projects</RouterLink>
            </div>
          </Transition>
        </li>

        <!-- Wishlist -->
        <li class="nav-item">
          <RouterLink to="/wishlist" class="nav-link" :class="{ active: route.name === 'Wishlist' }">
            <span>❤️</span> Wishlist
            <span v-if="wishlistCount > 0" class="wishlist-badge">{{ wishlistCount }}</span>
          </RouterLink>
        </li>

        <!-- Auth -->
        <li class="nav-item nav-auth">
          <template v-if="!auth.isLoggedIn">
            <RouterLink to="/login" class="btn btn-outline btn-sm">Login</RouterLink>
            <RouterLink to="/register" class="btn btn-primary btn-sm">Register</RouterLink>
          </template>
          <template v-else>
            <div class="user-menu has-dropdown" @mouseenter="openDropdown('user')" @mouseleave="closeDropdown">
              <button class="user-btn">
                <span class="user-avatar">{{ auth.user.username[0].toUpperCase() }}</span>
                <span>{{ auth.user.username }}</span>
                <svg class="chevron" viewBox="0 0 24 24" width="14" height="14"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
              </button>
              <Transition name="dropdown">
                <div v-if="activeDropdown === 'user'" class="dropdown dropdown-right" style="--accent: var(--plum)">
                  <RouterLink to="/wishlist" class="dropdown-item" @click="closeDropdown">❤️ My Wishlist</RouterLink>
                  <button class="dropdown-item dropdown-item-btn" @click="handleLogout">🚪 Logout</button>
                </div>
              </Transition>
            </div>
          </template>
        </li>
      </ul>

      <button class="hamburger" @click="mobileOpen = !mobileOpen" :class="{ open: mobileOpen }">
        <span /><span /><span />
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="mobile-menu">
        <div class="mobile-section">
          <p class="mobile-label">🌀 Pipe Cleaner</p>
          <RouterLink to="/craft/pipe-cleaner/info"    class="mobile-link" @click="mobileOpen=false">Info</RouterLink>
          <RouterLink to="/craft/pipe-cleaner/learn"   class="mobile-link" @click="mobileOpen=false">Projects</RouterLink>
        </div>
        <div class="mobile-section">
          <p class="mobile-label">🧶 Crochet</p>
          <RouterLink to="/craft/crochet/info"    class="mobile-link" @click="mobileOpen=false">Info</RouterLink>
          <RouterLink to="/craft/crochet/learn"   class="mobile-link" @click="mobileOpen=false">Projects</RouterLink>
          <RouterLink to="/craft/crochet/pattern" class="mobile-link" @click="mobileOpen=false">Techniques</RouterLink>
        </div>
        <div class="mobile-section">
          <p class="mobile-label">🟣 Fuse Beads</p>
          <RouterLink to="/craft/fuse-beads/info"    class="mobile-link" @click="mobileOpen=false">Info</RouterLink>
          <RouterLink to="/craft/fuse-beads/learn"   class="mobile-link" @click="mobileOpen=false">Projects</RouterLink>
        </div>
        <div class="mobile-section mobile-auth">
          <RouterLink to="/wishlist" class="mobile-link" @click="mobileOpen=false">❤️ Wishlist</RouterLink>
          <template v-if="!auth.isLoggedIn">
            <RouterLink to="/login"    class="mobile-link" @click="mobileOpen=false">Login</RouterLink>
            <RouterLink to="/register" class="mobile-link" @click="mobileOpen=false">Register</RouterLink>
          </template>
          <template v-else>
            <button class="mobile-link" style="text-align:left;background:none;border:none;font-family:inherit;font-size:inherit;color:inherit;" @click="handleLogout">Logout ({{ auth.user.username }})</button>
          </template>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.js'
import { useWishlistStore } from '../store/wishlist.js'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const wishlistStore = useWishlistStore()
const wishlistCount = computed(() => wishlistStore.count)

const scrolled = ref(false)
const activeDropdown = ref(null)
const mobileOpen = ref(false)
let dropdownTimer = null

function openDropdown(name) { clearTimeout(dropdownTimer); activeDropdown.value = name }
function closeDropdown() { dropdownTimer = setTimeout(() => { activeDropdown.value = null }, 150) }

function handleLogout() {
  auth.logout(); activeDropdown.value = null; mobileOpen.value = false; router.push('/')
}

function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--nav-height); z-index: 1000;
  background: rgba(230,235,224,0.92);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: all var(--transition);
}
.nav-scrolled {
  background: rgba(255,255,255,0.95);
  border-bottom-color: rgba(155,193,188,0.3);
  box-shadow: var(--shadow-sm);
}
.nav-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; }
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo-icon { font-size: 24px; line-height: 1; }
.logo-text { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--plum); letter-spacing: -0.02em; }
.nav-links { display: flex; align-items: center; gap: 4px; list-style: none; }
.nav-item { position: relative; }
.nav-link {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 14px; border-radius: var(--radius-md);
  font-size: 15px; font-weight: 500; color: var(--text-mid);
  text-decoration: none; transition: all var(--transition); white-space: nowrap;
}
.nav-link:hover, .nav-link.active { color: var(--plum); background: rgba(93,87,107,0.08); }
.nav-link.router-link-active { color: var(--coral); font-weight: 600; }
.chevron { transition: transform var(--transition); opacity: 0.5; }
.has-dropdown:hover .chevron { transform: rotate(180deg); opacity: 1; }
.dropdown {
  position: absolute; top: calc(100% + 8px); left: 0;
  min-width: 160px; background: white;
  border-radius: var(--radius-md); box-shadow: var(--shadow-lg);
  padding: 8px; border-top: 3px solid var(--accent, var(--coral)); z-index: 100;
}
.dropdown-right { left: auto; right: 0; }
.dropdown-item {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; border-radius: var(--radius-sm);
  font-size: 14px; font-weight: 500; color: var(--text-dark);
  text-decoration: none; transition: all var(--transition); width: 100%; text-align: left;
}
.dropdown-item:hover { background: var(--mint); color: var(--plum); padding-left: 18px; }
.dropdown-item-btn { background: none; border: none; font-family: var(--font-body); font-size: 14px; cursor: none; }
.nav-auth { display: flex; align-items: center; gap: 8px; }
.btn-sm { padding: 8px 18px; font-size: 14px; }
.user-menu { position: relative; }
.user-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 14px 6px 6px; border-radius: 99px;
  background: var(--mint); border: 2px solid rgba(155,193,188,0.4);
  font-size: 14px; font-weight: 500; color: var(--plum);
  cursor: none; transition: all var(--transition);
}
.user-btn:hover { border-color: var(--sage); background: #d4e6e4; }
.user-avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--plum); color: white;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px;
}
.wishlist-badge {
  background: var(--coral); color: white; font-size: 11px; font-weight: 700;
  width: 18px; height: 18px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center; margin-left: 2px;
}
.hamburger { display: none; flex-direction: column; gap: 5px; padding: 8px; background: none; cursor: none; }
.hamburger span { display: block; width: 24px; height: 2px; background: var(--plum); border-radius: 2px; transition: all var(--transition); }
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.mobile-menu {
  position: absolute; top: var(--nav-height); left: 0; right: 0;
  background: white; border-bottom: 2px solid var(--mint);
  padding: 16px 24px 24px;
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
  box-shadow: var(--shadow-md);
}
.mobile-label { font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-light); margin-bottom: 8px; }
.mobile-link { display: block; padding: 8px 0; font-size: 15px; color: var(--text-dark); text-decoration: none; border-bottom: 1px solid var(--mint); transition: color var(--transition); }
.mobile-link:hover { color: var(--coral); }
.mobile-auth { grid-column: 1 / -1; display: flex; gap: 16px; flex-wrap: wrap; }
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.2s ease; transform-origin: top center; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: scaleY(0.9) translateY(-8px); }
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: all 0.3s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-16px); }
@media (max-width: 900px) { .nav-links { display: none; } .hamburger { display: flex; } }
</style>
