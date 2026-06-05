require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const authRoutes     = require('./routes/auth')
const wishlistRoutes = require('./routes/wishlist')

const app = express()

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })) // Vue dev server
app.use(express.json())

// Routes
app.use('/api/auth',     authRoutes)
app.use('/api/wishlist', wishlistRoutes)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))