import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { AuthModal } from './AuthModal';

export function Nav() {
  const { user, profile, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,13,26,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)' }}
            >
              <span className="text-[#080d1a] font-bold text-sm" style={{ fontFamily: 'Outfit' }}>
                O
              </span>
            </div>
            <span
              className="text-xl font-semibold tracking-tight"
              style={{
                fontFamily: 'Outfit',
                color: '#f2f4f8',
                letterSpacing: '-0.02em',
              }}
            >
              Orbix<span style={{ color: '#c9a84c' }}>Global</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/marketplace">Marketplace</NavLink>
            <NavLink to="/digital-office">Digital Office</NavLink>
            <NavLink to="/investors">Investors</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/marketplace"
                  className="text-sm px-4 py-2 rounded font-medium no-underline transition-colors"
                  style={{ color: '#b0bed4', fontFamily: 'Outfit' }}
                >
                  Browse
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg no-underline transition-colors"
                  style={{
                    color: '#f2f4f8',
                    fontFamily: 'Outfit',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}
                  >
                    {(profile?.full_name || user.email || '?').charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm">{profile?.full_name?.split(' ')[0] || 'Account'}</span>
                </Link>
                <button
                  onClick={signOut}
                  className="text-sm px-3 py-2 rounded transition-colors"
                  style={{ color: '#8899b4', fontFamily: 'Outfit' }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-sm px-4 py-2 rounded transition-colors"
                  style={{ color: '#b0bed4', fontFamily: 'Outfit' }}
                  onClick={() => openAuth('signin')}
                >
                  Sign in
                </button>
                <button
                  className="text-sm px-5 py-2 rounded font-medium transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #c9a84c, #e0c278)',
                    color: '#080d1a',
                    fontFamily: 'Outfit',
                  }}
                  onClick={() => openAuth('signup')}
                >
                  Get started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#8899b4]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className="block h-px w-full bg-current transition-all" />
              <span className="block h-px w-4 bg-current transition-all" />
              <span className="block h-px w-full bg-current transition-all" />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-4"
            style={{ background: 'rgba(8,13,26,0.97)' }}
          >
            <Link to="/marketplace" onClick={() => setMenuOpen(false)} className="text-sm py-2 no-underline" style={{ color: '#b0bed4', fontFamily: 'Outfit' }}>
              Marketplace
            </Link>
            <Link to="/digital-office" onClick={() => setMenuOpen(false)} className="text-sm py-2 no-underline" style={{ color: '#b0bed4', fontFamily: 'Outfit' }}>
              Digital Office
            </Link>
            <Link to="/investors" onClick={() => setMenuOpen(false)} className="text-sm py-2 no-underline" style={{ color: '#b0bed4', fontFamily: 'Outfit' }}>
              Investors
            </Link>
            <Link to="/pricing" onClick={() => setMenuOpen(false)} className="text-sm py-2 no-underline" style={{ color: '#b0bed4', fontFamily: 'Outfit' }}>
              Pricing
            </Link>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm py-2 no-underline" style={{ color: '#f2f4f8', fontFamily: 'Outfit' }}>
                  My Profile
                </Link>
                <button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  className="text-sm py-2 text-left"
                  style={{ color: '#8899b4', fontFamily: 'Outfit' }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuth('signin')}
                  className="text-sm py-2 text-left"
                  style={{ color: '#b0bed4', fontFamily: 'Outfit' }}
                >
                  Sign in
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="text-sm px-5 py-2.5 rounded font-medium"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)', color: '#080d1a', fontFamily: 'Outfit' }}
                >
                  Get started
                </button>
              </>
            )}
          </div>
        )}
      </nav>
      <AuthModal open={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} />
    </>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-sm transition-colors duration-200 no-underline"
      style={{ color: '#8899b4', fontFamily: 'Outfit', fontWeight: 400 }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#f2f4f8')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#8899b4')}
    >
      {children}
    </Link>
  );
}
