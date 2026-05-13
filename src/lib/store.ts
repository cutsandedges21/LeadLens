// Simple in-memory store for MVP. In production, use Supabase/PostgreSQL.
export const analysisStore = new Map<string, any>();
export const leadStore = new Set<string>(); // store emails
