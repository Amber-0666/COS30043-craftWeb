const BASE = 'http://localhost:3000/api'

function getToken() {
  return localStorage.getItem('craftnest_token')
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
}

// ── Auth ──────────────────────────────────────
export async function apiRegister(username, email, password) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  return res.json()
}

export async function apiLogin(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

// ── Wishlist ──────────────────────────────────
export async function apiGetWishlist() {
  const res = await fetch(`${BASE}/wishlist`, {
    headers: authHeaders()
  })
  return res.json()
}

export async function apiAddToWishlist(item) {
  const res = await fetch(`${BASE}/wishlist`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(item)
  })
  return res.json()
}

export async function apiRemoveFromWishlist(patternId) {
  const res = await fetch(`${BASE}/wishlist/${patternId}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  return res.json()
}