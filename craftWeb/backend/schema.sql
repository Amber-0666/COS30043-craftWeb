-- CraftNest Database Schema
-- Compatible with SQLite / MySQL / PostgreSQL

-- Users table
CREATE TABLE users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  username    VARCHAR(50)  NOT NULL UNIQUE,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,  -- Store bcrypt hash, never plain text
  avatar_url  VARCHAR(500),
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crafts table (matches db.json crafts array)
CREATE TABLE crafts (
  id          VARCHAR(50)  PRIMARY KEY,   -- e.g. 'pipe-cleaner'
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(100) NOT NULL UNIQUE,
  tagline     VARCHAR(255),
  description TEXT,
  color       VARCHAR(7),                 -- hex color
  emoji       VARCHAR(10),
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tools for each craft
CREATE TABLE craft_tools (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  craft_id    VARCHAR(50) NOT NULL REFERENCES crafts(id) ON DELETE CASCADE,
  name        VARCHAR(100) NOT NULL,
  description TEXT,
  icon        VARCHAR(10),
  sort_order  INTEGER DEFAULT 0
);

-- Patterns table
CREATE TABLE patterns (
  id          VARCHAR(50)  PRIMARY KEY,   -- e.g. 'pc-butterfly'
  craft_id    VARCHAR(50)  NOT NULL REFERENCES crafts(id) ON DELETE CASCADE,
  name        VARCHAR(150) NOT NULL,
  difficulty  VARCHAR(20)  CHECK(difficulty IN ('Beginner','Intermediate','Advanced')),
  time_est    VARCHAR(50),                -- e.g. '45 min'
  description TEXT,
  image_url   VARCHAR(500),
  video_url   VARCHAR(500),
  tutorial_url VARCHAR(500),
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Wishlist table
CREATE TABLE wishlist (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pattern_id  VARCHAR(50) NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
  added_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, pattern_id)             -- prevent duplicates
);

-- Sessions table (for auth)
CREATE TABLE sessions (
  id          VARCHAR(128) PRIMARY KEY,   -- session token
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at  DATETIME NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_wishlist_user    ON wishlist(user_id);
CREATE INDEX idx_wishlist_pattern ON wishlist(pattern_id);
CREATE INDEX idx_patterns_craft   ON patterns(craft_id);
CREATE INDEX idx_craft_tools      ON craft_tools(craft_id);
CREATE INDEX idx_sessions_user    ON sessions(user_id);

-- Sample seed data
INSERT INTO crafts (id, name, slug, tagline, color, emoji) VALUES
  ('pipe-cleaner', 'Pipe Cleaner', 'pipe-cleaner', 'Bend, twist, and create anything you imagine', '#ED6A5A', '🌀'),
  ('crochet',      'Crochet',      'crochet',      'Loop by loop, stitch by stitch',              '#9BC1BC', '🧶'),
  ('fuse-beads',   'Fuse Beads',   'fuse-beads',   'Pixel art you can hold in your hands',        '#5D576B', '🟣');
