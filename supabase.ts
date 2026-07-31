import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type ListingType = 'business_sale' | 'equity_offering' | 'seeking_investment';

export type Profile = {
  id: string;
  full_name: string;
  headline: string;
  bio: string;
  location: string;
  website: string;
  reputation_points: number;
  created_at: string;
  updated_at: string;
};

export type BusinessListing = {
  id: string;
  user_id: string;
  listing_type: ListingType;
  title: string;
  sector: string;
  revenue: string;
  asking: string;
  summary: string;
  status: 'active' | 'closed';
  created_at: string;
  updated_at: string;
};

export type BusinessListingWithProfile = BusinessListing & {
  profiles: Pick<Profile, 'id' | 'full_name' | 'headline' | 'reputation_points'> | null;
};

export const LISTING_TYPE_META: Record<ListingType, { label: string; badge: string; color: string }> = {
  business_sale: { label: 'Business for Sale', badge: 'For Sale', color: '#27c93f' },
  equity_offering: { label: 'Equity Offering', badge: 'Equity', color: '#4f8ef7' },
  seeking_investment: { label: 'Seeking Investment', badge: 'Raising', color: '#c9a84c' },
};

export function reputationTier(points: number) {
  if (points >= 1000) return { name: 'Elite', color: '#e0c278' };
  if (points >= 500) return { name: 'Established', color: '#c9a84c' };
  if (points >= 100) return { name: 'Trusted', color: '#4f8ef7' };
  return { name: 'Emerging', color: '#8899b4' };
}
