import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { Marketplace } from './pages/Marketplace';
import { ProfilePage } from './pages/Profile';

function ComingSoon({ title, blurb }: { title: string; blurb: string }) {
  return (
    <div style={{ background: '#080d1a', minHeight: '100vh', paddingTop: 120, paddingBottom: 80 }}>
      <div className="max-w-xl mx-auto px-6 text-center">
        <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: '#c9a84c', fontFamily: 'JetBrains Mono' }}>
          Coming soon
        </div>
        <h1 className="mb-4 leading-tight" style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(34px, 4vw, 52px)', color: '#f2f4f8', letterSpacing: '-0.02em' }}>
          {title}
        </h1>
        <p className="text-base mb-8" style={{ color: '#8899b4', fontFamily: 'Outfit', fontWeight: 300 }}>
          {blurb}
        </p>
        <Link to="/marketplace" className="inline-block px-6 py-3 rounded font-semibold text-sm transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)', color: '#080d1a', fontFamily: 'Outfit' }}>
          Explore the marketplace →
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ background: '#080d1a', minHeight: '100vh' }}>
          <Nav />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/digital-office" element={<ComingSoon title="Digital Office" blurb="The integrated collaborative workspace — secure video, whiteboards, document co-editing, and task management — is being built next." />} />
            <Route path="/investors" element={<ComingSoon title="Investor Hub" blurb="Discover investment opportunities and connect with accredited investors across every sector." />} />
            <Route path="/pricing" element={<ComingSoon title="Pricing" blurb="From a free tier for individuals to enterprise plans starting at $99/mo. Full pricing details are on the way." />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
