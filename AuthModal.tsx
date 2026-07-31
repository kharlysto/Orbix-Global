import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';

type Mode = 'signin' | 'signup';

export function AuthModal({
  open,
  initialMode = 'signup',
  onClose,
}: {
  open: boolean;
  initialMode?: Mode;
  onClose: () => void;
}) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError(null);
      setBusy(false);
    }
  }, [open, initialMode]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res =
      mode === 'signin'
        ? await signIn(email, password)
        : await signUp(email, password, fullName);
    setBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(8,13,26,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-lg"
          style={{ color: '#8899b4' }}
          aria-label="Close"
        >
          ×
        </button>

        <div className="mb-6">
          <div
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: '#c9a84c', fontFamily: 'JetBrains Mono' }}
          >
            {mode === 'signin' ? 'Welcome back' : 'Join Orbix Global'}
          </div>
          <h2
            className="leading-tight"
            style={{
              fontFamily: 'Instrument Serif',
              fontSize: '1.9rem',
              color: '#f2f4f8',
              letterSpacing: '-0.01em',
            }}
          >
            {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          {mode === 'signup' && (
            <Field label="Full name">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                style={inputStyle}
              />
            </Field>
          )}
          <Field label="Email">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={inputStyle}
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              style={inputStyle}
            />
          </Field>

          {error && (
            <div
              className="text-sm p-3 rounded-lg"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#fca5a5',
                fontFamily: 'Outfit',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 py-3 rounded font-semibold transition-all duration-200 hover:scale-[1.01] disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #e0c278)',
              color: '#080d1a',
              fontFamily: 'Outfit',
            }}
          >
            {busy
              ? 'Please wait…'
              : mode === 'signin'
              ? 'Sign in'
              : 'Create account'}
          </button>
        </form>

        <div className="mt-5 text-center">
          <span className="text-sm" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError(null);
            }}
            className="text-sm font-medium"
            style={{ color: '#c9a84c', fontFamily: 'Outfit' }}
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </div>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-xs font-medium tracking-wide"
        style={{ color: '#8899b4', fontFamily: 'Outfit' }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
