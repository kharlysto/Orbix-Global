import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase, type Profile, type BusinessListing, LISTING_TYPE_META, reputationTier } from '../lib/supabase';
import { useAuth } from '../lib/auth';

export function ProfilePage() {
  const { userId } = useParams();
  const { user, profile: ownProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [viewing, setViewing] = useState<Profile | null>(null);
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const isOwn = user && (!userId || userId === user.id);
  const targetId = userId || user?.id;

  const loadProfile = useCallback(async () => {
    if (!targetId) { setLoading(false); return; }
    setLoading(true);
    const { data, error: err } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', targetId)
      .maybeSingle();
    if (err) { setError('Could not load profile.'); console.error(err); }
    else { setViewing(data); }
    setLoading(false);
  }, [targetId]);

  const loadListings = useCallback(async () => {
    if (!targetId) return;
    const { data, error: err } = await supabase
      .from('business_listings')
      .select('*')
      .eq('user_id', targetId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    if (!err) setListings(data as BusinessListing[]);
  }, [targetId]);

  useEffect(() => {
    loadProfile();
    loadListings();
  }, [loadProfile, loadListings]);

  if (!user) {
    return (
      <div style={{ background: '#080d1a', minHeight: '100vh', paddingTop: 120 }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="mb-4" style={{ fontFamily: 'Instrument Serif', fontSize: '2rem', color: '#f2f4f8' }}>
            Sign in to view profiles
          </h1>
          <p className="mb-6" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
            Create an account or sign in to connect with professionals on Orbix Global.
          </p>
          <Link to="/" className="text-sm font-medium" style={{ color: '#c9a84c', fontFamily: 'Outfit' }}>
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ background: '#080d1a', minHeight: '100vh', paddingTop: 120 }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="animate-pulse" style={{ height: 200, background: '#0e1628', borderRadius: 16 }} />
        </div>
      </div>
    );
  }

  if (error || !viewing) {
    return (
      <div style={{ background: '#080d1a', minHeight: '100vh', paddingTop: 120 }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="mb-4" style={{ fontFamily: 'Instrument Serif', fontSize: '2rem', color: '#f2f4f8' }}>
            Profile not found
          </h1>
          <Link to="/marketplace" className="text-sm font-medium" style={{ color: '#c9a84c', fontFamily: 'Outfit' }}>
            ← Browse marketplace
          </Link>
        </div>
      </div>
    );
  }

  const tier = reputationTier(viewing.reputation_points);

  return (
    <div style={{ background: '#080d1a', minHeight: '100vh', paddingTop: 88 }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back link */}
        <button onClick={() => navigate(-1)} className="text-sm mb-6" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
          ← Back
        </button>

        {/* Profile header */}
        <div className="p-8 rounded-2xl mb-8" style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
              style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', fontFamily: 'Outfit' }}
            >
              {(viewing.full_name || '?').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold" style={{ color: '#f2f4f8', fontFamily: 'Outfit', letterSpacing: '-0.01em' }}>
                  {viewing.full_name || 'Unnamed professional'}
                </h1>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${tier.color}18`, color: tier.color, border: `1px solid ${tier.color}30`, fontFamily: 'Outfit' }}>
                  {tier.name}
                </span>
              </div>
              {viewing.headline && (
                <p className="text-sm mb-3" style={{ color: '#b0bed4', fontFamily: 'Outfit' }}>{viewing.headline}</p>
              )}
              {viewing.location && (
                <p className="text-xs mb-3" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>📍 {viewing.location}</p>
              )}
              {viewing.website && (
                <a href={viewing.website} target="_blank" rel="noreferrer" className="text-xs font-medium" style={{ color: '#4f8ef7', fontFamily: 'Outfit' }}>
                  {viewing.website}
                </a>
              )}
            </div>
            {isOwn && !editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 rounded text-sm font-medium transition-all shrink-0"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#b0bed4', fontFamily: 'Outfit' }}
              >
                Edit profile
              </button>
            )}
          </div>

          {/* Reputation bar */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-end justify-between mb-2">
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}>
                Reputation
              </span>
              <span className="text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono', color: tier.color }}>
                {viewing.reputation_points} pts
              </span>
            </div>
            <ReputationBar points={viewing.reputation_points} />
          </div>
        </div>

        {editing && isOwn ? (
          <EditProfileForm
            profile={ownProfile!}
            onCancel={() => setEditing(false)}
            onSaved={async () => { setEditing(false); await loadProfile(); await refreshProfile(); }}
          />
        ) : (
          <>
            {/* Bio */}
            {viewing.bio && (
              <div className="p-6 rounded-xl mb-8" style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}>
                  About
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#b0bed4', fontFamily: 'Outfit' }}>
                  {viewing.bio}
                </p>
              </div>
            )}

            {/* Listings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold" style={{ color: '#f2f4f8', fontFamily: 'Outfit' }}>
                  {isOwn ? 'My listings' : 'Listings'}
                </h2>
                {isOwn && (
                  <Link to="/marketplace" className="text-sm font-medium" style={{ color: '#c9a84c', fontFamily: 'Outfit' }}>
                    + Post new
                  </Link>
                )}
              </div>
              {listings.length === 0 ? (
                <div className="p-8 rounded-xl text-center" style={{ background: '#0e1628', border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <p className="text-sm" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
                    {isOwn ? 'You haven\u2019t posted any listings yet.' : 'No active listings.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listings.map((l) => {
                    const meta = LISTING_TYPE_META[l.listing_type];
                    return (
                      <Link
                        key={l.id}
                        to="/marketplace"
                        className="p-5 rounded-xl no-underline transition-all"
                        style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.06)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${meta.color}18`, color: meta.color, fontFamily: 'JetBrains Mono', fontSize: '0.6rem' }}>
                            {meta.badge}
                          </span>
                          <span className="text-xs" style={{ color: '#c9a84c', fontFamily: 'Outfit', fontWeight: 600 }}>{l.asking}</span>
                        </div>
                        <h3 className="text-base font-semibold mb-1" style={{ color: '#f2f4f8', fontFamily: 'Outfit' }}>{l.title}</h3>
                        <p className="text-xs" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>{l.sector}{l.revenue ? ` · ${l.revenue}` : ''}</p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ReputationBar({ points }: { points: number }) {
  const max = 1000;
  const pct = Math.min(100, (points / max) * 100);
  return (
    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #4f8ef7, #c9a84c, #e0c278)' }}
      />
    </div>
  );
}

function EditProfileForm({ profile, onCancel, onSaved }: { profile: Profile; onCancel: () => void; onSaved: () => void }) {
  const [fullName, setFullName] = useState(profile.full_name);
  const [headline, setHeadline] = useState(profile.headline);
  const [location, setLocation] = useState(profile.location);
  const [website, setWebsite] = useState(profile.website);
  const [bio, setBio] = useState(profile.bio);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.from('profiles').update({
      full_name: fullName,
      headline,
      location,
      website,
      bio,
      updated_at: new Date().toISOString(),
    }).eq('id', profile.id);
    setBusy(false);
    if (err) { setError(err.message); return; }
    onSaved();
  };

  return (
    <form onSubmit={save} className="p-6 rounded-xl" style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h2 className="text-lg font-semibold mb-5" style={{ color: '#f2f4f8', fontFamily: 'Outfit' }}>Edit your profile</h2>
      <div className="flex flex-col gap-4">
        <Field label="Full name">
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} placeholder="Your name" />
        </Field>
        <Field label="Headline">
          <input value={headline} onChange={(e) => setHeadline(e.target.value)} style={inputStyle} placeholder="e.g. Angel Investor · SaaS Founder" />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Location">
            <input value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle} placeholder="e.g. Dublin, Ireland" />
          </Field>
          <Field label="Website">
            <input value={website} onChange={(e) => setWebsite(e.target.value)} style={inputStyle} placeholder="https://…" />
          </Field>
        </div>
        <Field label="Bio">
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tell other members about yourself…" />
        </Field>
        {error && (
          <div className="text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', fontFamily: 'Outfit' }}>
            {error}
          </div>
        )}
        <div className="flex gap-3">
          <button type="submit" disabled={busy} className="px-6 py-2.5 rounded font-semibold text-sm transition-all disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)', color: '#080d1a', fontFamily: 'Outfit' }}>
            {busy ? 'Saving…' : 'Save changes'}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded text-sm font-medium" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#b0bed4', fontFamily: 'Outfit' }}>
            Cancel
          </button>
        </div>
      </div>
    </form>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium tracking-wide" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>{label}</span>
      {children}
    </label>
  );
}
