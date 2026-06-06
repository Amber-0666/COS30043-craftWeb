const express = require('express')
const jwt     = require('jsonwebtoken')
const db      = require('../database')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'craftnest-secret-key'

// ── Middleware: verify JWT token ──────────────
function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ error: 'No token provided.' })

  const token = header.split(' ')[1] // "Bearer <token>"
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token.' })
  }
}

// ── GET wishlist ──────────────────────────────
router.get('/', auth, (req, res) => {
  const items = db.prepare(
    'SELECT * FROM wishlist WHERE user_id = ? ORDER BY added_at DESC'
  ).all(req.user.id)

  res.json(items)
})

// ── ADD to wishlist ───────────────────────────
router.post('/', auth, (req, res) => {
  const { patternId, craftId, craftName, patternName, difficulty, time, image } = req.body

  try {
    db.prepare(`
      INSERT OR IGNORE INTO wishlist
        (user_id, pattern_id, craft_id, craft_name, pattern_name, difficulty, time_est, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(req.user.id, patternId, craftId, craftName, patternName, difficulty, time, image)

    res.status(201).json({ message: 'Added to wishlist.' })
  } catch (err) {
    res.status(500).json({ error: 'Could not add to wishlist.' })
  }
})

// ── REMOVE from wishlist ──────────────────────
router.delete('/:patternId', auth, (req, res) => {
  db.prepare(
    'DELETE FROM wishlist WHERE user_id = ? AND pattern_id = ?'
  ).run(req.user.id, req.params.patternId)

  res.json({ message: 'Removed from wishlist.' })
})

// ── CLEAR ALL items for user ──────────────────
router.delete('/', auth, (req, res) => {
  db.prepare(
    'DELETE FROM wishlist WHERE user_id = ?'
  ).run(req.user.id)
  res.json({ message: 'Wishlist cleared.' })
})

module.exports = router