const express = require('express')
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const db      = require('../database')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'craftnest-secret-key'

// ── REGISTER ──────────────────────────────────
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })
  }

  try {
    // Check if email or username already exists
    const existing = db.prepare(
      'SELECT id FROM users WHERE email = ? OR username = ?'
    ).get(email, username)

    if (existing) {
      return res.status(409).json({ error: 'Email or username already taken.' })
    }

    // Hash the password — NEVER store plain text
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert into database
    const result = db.prepare(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
    ).run(username, email, hashedPassword)

    // Create JWT token
    const token = jwt.sign(
      { id: result.lastInsertRowid, username, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: { id: result.lastInsertRowid, username, email }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// ── LOGIN ─────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  try {
    // Find user by email
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    // Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful!',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

module.exports = router