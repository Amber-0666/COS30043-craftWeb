// crafts.js — data service that loads from db.json
// In a real app, this would be API calls. Here it imports the JSON directly.

import dbData from '../../backend/db.json'

export const crafts = dbData.crafts

export function getCraft(slug) {
  return crafts.find(c => c.slug === slug) || null
}

export function getAllCrafts() {
  return crafts
}

export function getPattern(patternId) {
  for (const craft of crafts) {
    const pattern = craft.patterns.find(p => p.id === patternId)
    if (pattern) return { pattern, craft }
  }
  return null
}
