import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type BusinessListingWithProfile, type ListingType, LISTING_TYPE_META } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { AuthModal } from '../components/AuthModal';

const TYPES: { value: ListingType | 'all'; label: string }[] = [
  { value: 'all', label: 'All opportunities' },
  { value: 'business_sale', label: 'Businesses for Sale' },
  { value: 'equity_offering', label: 'Equity Offerings' },
  { value: 'seeking_investment', label: 'Seeking Investment' },
];

export function Marketplace() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<BusinessListingWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ListingType | 'all'>('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const loadListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    let query = supabase
      .from('business_listings')
      .select('*, profiles!business_listings_user_id_fkey(id, full_name, headline, reputation_points)')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('listing_type', filter);
    const { data, error: err } = await query;
    if (err) {
      setError('Could not load listings. Please try again.');
      console.error(err);
    } else {
      setListings(data as BusinessListingWithProfile[]);
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  const handlePostClick = () => {
    if (user) setShowPostModal(true);
    else setAuthOpen(true);
  };

  return (
    <div style={{ background: '#080d1a', minHeight: '100vh', paddingTop: 88 }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: '#4f8ef7', fontFamily: 'JetBrains Mono' }}>
              Business Marketplace
            </div>
            <h1 className="leading-tight" style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(34px, 4vw, 52px)', color: '#f2f4f8', letterSpacing: '-0.02em' }}>
              Live opportunities,
              <br />
              <em style={{ color: '#c9a84c' }}>ready to transact.</em>
            </h1>
          </div>
          <button
            onClick={handlePostClick}
            className="shrink-0 px-6 py-3 rounded font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)', color: '#080d1a', fontFamily: 'Outfit' }}
          >
            + Post a listing
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === t.value ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
                border: filter === t.value ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(255,255,255,0.08)',
                color: filter === t.value ? '#c9a84c' : '#8899b4',
                fontFamily: 'Outfit',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Listings */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-6 rounded-xl animate-pulse" style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.06)', height: 220 }} />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 rounded-xl text-center" style={{ background: '#0e1628', border: '1px solid rgba(239,68,68,0.2)' }}>
            <p className="text-sm" style={{ color: '#fca5a5', fontFamily: 'Outfit' }}>{error}</p>
            <button onClick={loadListings} className="mt-3 text-sm font-medium" style={{ color: '#c9a84c', fontFamily: 'Outfit' }}>
              Try again
            </button>
          </div>
        ) : listings.length === 0 ? (
          <EmptyState onPost={handlePostClick} hasUser={!!user} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onProfileClick={(uid) => navigate(`/profile/${uid}`)} />
            ))}
          </div>
        )}
      </div>

      {showPostModal && (
        <PostListingModal
          onClose={() => setShowPostModal(false)}
          onPosted={() => { setShowPostModal(false); loadListings(); }}
          authorName={profile?.full_name || ''}
        />
      )}
      <AuthModal open={authOpen} initialMode="signup" onClose={() => setAuthOpen(false)} />
    </div>
  );
}

function ListingCard({ listing, onProfileClick }: { listing: BusinessListingWithProfile; onProfileClick: (uid: string) => void }) {
  const meta = LISTING_TYPE_META[listing.listing_type];
  return (
    <div
      className="p-6 rounded-xl transition-all duration-300"
      style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.06)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}30`, fontFamily: 'JetBrains Mono', fontSize: '0.65rem' }}>
          {meta.badge}
        </span>
        <span className="text-xs" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>{meta.label}</span>
      </div>

      <h3 className="text-lg font-semibold mb-1" style={{ color: '#f2f4f8', fontFamily: 'Outfit', letterSpacing: '-0.01em' }}>
        {listing.title}
      </h3>
      <p className="text-sm mb-4" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
        {listing.sector}{listing.revenue ? ` · ${listing.revenue}` : ''}
      </p>

      {listing.summary && (
        <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: '#b0bed4', fontFamily: 'Outfit' }}>
          {listing.summary}
        </p>
      )}

      <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="text-xs mb-1" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
          {listing.listing_type === 'seeking_investment' ? 'Target raise' : listing.listing_type === 'equity_offering' ? 'Offering' : 'Asking price'}
        </div>
        <div className="text-xl font-semibold mb-3" style={{ color: '#c9a84c', fontFamily: 'Outfit', letterSpacing: '-0.02em' }}>
          {listing.asking}
        </div>

        {listing.profiles && (
          <button
            onClick={() => onProfileClick(listing.profiles!.id)}
            className="flex items-center gap-2 w-full text-left hover:opacity-80 transition-opacity"
          >
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-[0.65rem] font-bold" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}>
              {(listing.profiles.full_name || '?').charAt(0)}
            </span>
            <span className="text-xs truncate" style={{ color: '#b0bed4', fontFamily: 'Outfit' }}>
              {listing.profiles.full_name}
            </span>
            <span className="text-xs ml-auto shrink-0" style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}>
              {listing.profiles.reputation_points} pts
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onPost, hasUser }: { onPost: () => void; hasUser: boolean }) {
  return (
    <div className="p-12 rounded-xl text-center" style={{ background: '#0e1628', border: '1px dashed rgba(255,255,255,0.1)' }}>
      <div className="text-4xl mb-4 opacity-30">◈</div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#f2f4f8', fontFamily: 'Outfit' }}>
        No listings yet
      </h3>
      <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
        Be the first to post a business for sale, offer equity, or seek investment on Orbix Global.
      </p>
      <button
        onClick={onPost}
        className="px-6 py-3 rounded font-semibold text-sm transition-all"
        style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)', color: '#080d1a', fontFamily: 'Outfit' }}
      >
        {hasUser ? 'Post the first listing' : 'Sign up to post'}
      </button>
    </div>
  );
}

// ─── Post listing modal ─────────────────────────────────────────────────────

function PostListingModal({ onClose, onPosted, authorName }: { onClose: () => void; onPosted: () => void; authorName: string }) {
  const [listingType, setListingType] = useState<ListingType>('business_sale');
  const [title, setTitle] = useState('');
  const [sector, setSector] = useState('');
  const [revenue, setRevenue] = useState('');
  const [asking, setAsking] = useState('');
  const [summary, setSummary] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.from('business_listings').insert({
      listing_type: listingType,
      title,
      sector,
      revenue,
      asking,
      summary,
    });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    onPosted();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" style={{ background: 'rgba(8,13,26,0.85)', backdropFilter: 'blur(8px)' }} onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl p-8 max-h-[90vh] overflow-y-auto" style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={onClose} className="absolute top-5 right-5 text-lg" style={{ color: '#8899b4' }} aria-label="Close">×</button>

        <div className="mb-6">
          <div className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: '#c9a84c', fontFamily: 'JetBrains Mono' }}>
            New Listing
          </div>
          <h2 className="leading-tight" style={{ fontFamily: 'Instrument Serif', fontSize: '1.6rem', color: '#f2f4f8', letterSpacing: '-0.01em' }}>
            Post an opportunity
          </h2>
          <p className="text-xs mt-1" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>Posting as {authorName}</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          {/* Type selector */}
          <div>
            <span className="text-xs font-medium tracking-wide block mb-2" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>Listing type</span>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(LISTING_TYPE_META) as ListingType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setListingType(t)}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: listingType === t ? `${LISTING_TYPE_META[t].color}18` : 'rgba(255,255,255,0.03)',
                    border: listingType === t ? `1px solid ${LISTING_TYPE_META[t].color}40` : '1px solid rgba(255,255,255,0.08)',
                    color: listingType === t ? LISTING_TYPE_META[t].color : '#8899b4',
                    fontFamily: 'Outfit',
                  }}
                >
                  {LISTING_TYPE_META[t].badge}
                </button>
              ))}
            </div>
          </div>

          <Field label="Title" required>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. TechOps SaaS Platform" style={inputStyle} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Sector / Industry">
              <input type="text" value={sector} onChange={(e) => setSector(e.target.value)} placeholder="e.g. Software" style={inputStyle} />
            </Field>
            <Field label="Revenue">
              <input type="text" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="e.g. $2.4M ARR" style={inputStyle} />
            </Field>
          </div>

          <Field label={listingType === 'seeking_investment' ? 'Target raise' : listingType === 'equity_offering' ? 'Stake offered' : 'Asking price'} required>
            <input type="text" required value={asking} onChange={(e) => setAsking(e.target.value)} placeholder="e.g. $8.2M or 15% stake" style={inputStyle} />
          </Field>

          <Field label="Summary">
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Brief description of the opportunity…" rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </Field>

          {error && (
            <div className="text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', fontFamily: 'Outfit' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 py-3 rounded font-semibold transition-all duration-200 hover:scale-[1.01] disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)', color: '#080d1a', fontFamily: 'Outfit' }}
          >
            {busy ? 'Publishing…' : 'Publish listing'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.9rem',
  borderRadius: 8,
  background: '#080d1a',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#f2f4f8',
  fontFamily: 'Outfit',
  fontSize: '0.9rem',
  outline: 'none',
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium tracking-wide" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
        {label}{required && ' *'}
      </span>
      {children}
    </label>
  );
}
