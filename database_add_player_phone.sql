-- Migration: Add player_phone column to high_scores
-- Run this in Supabase SQL Editor if you already have high_scores table
ALTER TABLE high_scores ADD COLUMN IF NOT EXISTS player_phone VARCHAR(20);
