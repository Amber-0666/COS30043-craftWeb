const Database = require('better-sqlite3')
const path = require('path')

// Creates craftnest.db file automatically
const db = new Database(path.join(__dirname, 'craftnest.db'))

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL')

// Create tables on first run
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    username    TEXT NOT NULL UNIQUE,
    email       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS wishlist (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    pattern_id  TEXT NOT NULL,
    craft_id    TEXT NOT NULL,
    craft_name  TEXT NOT NULL,
    pattern_name TEXT NOT NULL,
    difficulty  TEXT,
    time_est    TEXT,
    image_url   TEXT,
    added_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, pattern_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`)

module.exports = db