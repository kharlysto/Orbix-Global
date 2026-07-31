import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { AuthModal } from '../components/AuthModal';

// ─── Data ───────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    number: '01',
    label: 'Connect & Network',
    heading: 'Build relationships that move markets.',
    body: 'Discover entrepreneurs, investors, and strategic partners aligned with your goals. Our intelligent matching surfaces the right connections at exactly the right moment.',
    stat: '2.4M+',
    statLabel: 'Active professionals',
    accent: 'gold',
  },
  {
    number: '02',
    label: 'Marketplace',
    heading: 'Buy, sell, and invest with confidence.',
    body: 'List businesses for acquisition, offer equity stakes, or find investment opportunities across every sector. Each listing is verified, structured, and ready to transact.',
    stat: '$18B+',
    statLabel: 'Deal flow facilitated',
    accent: 'electric',
  },
  {
    number: '03',
    label: 'Digital Office',
    heading: 'Your entire operation, one workspace.',
    body: 'Secure video, collaborative whiteboards, shared documents, task boards, and file storage — all integrated. Replace five tools with one environment your team actually uses.',
    stat: '340+',
    statLabel: 'Enterprise teams',
    accent: 'gold',
  },
  {
    number: '04',
    label: 'Reputation System',
    heading: 'Trust, quantified and verified.',
    body: 'Every deal, collaboration, and introduction earns transparent reputation points. Build a credibility score that opens doors to premium opportunities across the ecosystem.',
    stat: '5 pts',
    statLabel: 'Per verified transaction',
    accent: 'electric',
  },
];

const OFFICE_FEATURES = [
  { icon: '◈', label: 'Secure Video Meetings', desc: 'End-to-end encrypted calls with up to 250 participants' },
  { icon: '◎', label: 'Collaborative Whiteboards', desc: 'Real-time visual workspaces with infinite canvas' },
  { icon: '◐', label: 'Document Co-editing', desc: 'Live document collaboration with version history' },
  { icon: '◉', label: 'Task Management', desc: 'Boards, timelines, and dependency tracking' },
  { icon: '◫', label: 'File Storage', desc: '1TB per office with granular permission controls' },
  { icon: '◬', label: 'Shared Notes', desc: 'Meeting notes that sync automatically across your team' },
];

const TESTIMONIALS = [
  {
    quote: 'We closed a $4.2M acquisition through Orbix in 11 days. The deal flow, due diligence tools, and integrated workspace made it frictionless.',
    name: 'Miriam Osei-Bonsu',
    title: 'Managing Partner, Asante Capital',
    avatar: 'MO',
    points: 847,
  },
  {
    quote: 'The reputation system changed how we vet partners. 900+ points is now our baseline before any conversation gets serious.',
    name: 'Rafael Dominguez',
    title: 'CEO, Meridian Ventures',
    avatar: 'RD',
    points: 1203,
  },
  {
    quote: 'Our distributed team of 34 dropped Zoom, Notion, and Asana the same week we moved into our Digital Office. No going back.',
    name: 'Yuki Tanaka',
    title: 'Co-founder, Nexus Labs',
    avatar: 'YT',
    points: 562,
  },
];

const STATS = [
  { value: '190+', label: 'Countries represented' },
  { value: '$18B+', label: 'Total deal flow' },
  { value: '2.4M', label: 'Professionals' },
  { value: '99.98%', label: 'Platform uptime' },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  const primaryCta = () => {
    if (user) navigate('/marketplace');
    else setAuthOpen(true);
  };

  return (
    <>
      <Hero onCta={primaryCta} />
      <PillarsSection />
      <DigitalOfficeSection />
      <ReputationSection />
      <MarketplaceSection onBrowse={() => navigate('/marketplace')} onCta={primaryCta} />
      <TestimonialsSection />
      <CTASection onCta={primaryCta} />
      <AuthModal open={authOpen} initialMode="signup" onClose={() => setAuthOpen(false)} />
    </>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080d1a 0%, #0e1628 60%, #080d1a 100%)' }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,168,76,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 600, height: 600, top: '-10%', right: '-15%', background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 400, height: 400, bottom: '5%', left: '-10%', background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-8">
            <span
              className="px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: '#c9a84c', fontFamily: 'JetBrains Mono' }}
            >
              The Business Ecosystem
            </span>
          </div>

          <h1
            className="mb-6 leading-none"
            style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(52px, 7vw, 96px)', color: '#f2f4f8', letterSpacing: '-0.02em' }}
          >
            Where Global
            <br />
            <em style={{ color: '#c9a84c' }}>Business</em> Gets
            <br />
            Done.
          </h1>

          <p
            className="max-w-2xl mb-10 text-lg leading-relaxed"
            style={{ color: '#8899b4', fontFamily: 'Outfit', fontWeight: 300 }}
          >
            Orbix Global unifies professional networking, business acquisition, investor matching, and team collaboration into one trusted ecosystem — built for entrepreneurs, investors, and companies operating at scale.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-16">
            <button
              onClick={onCta}
              className="px-7 py-3.5 rounded font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)', color: '#080d1a', fontFamily: 'Outfit' }}
            >
              Join Orbix Global
            </button>
            <button
              className="px-7 py-3.5 rounded font-medium text-base transition-all duration-200 flex items-center gap-2"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#b0bed4', fontFamily: 'Outfit' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(79,142,247,0.15)', color: '#4f8ef7' }}
              >
                ▶
              </span>
              Watch overview
            </button>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {STATS.map((s) => (
              <div key={s.value}>
                <div className="text-2xl font-semibold" style={{ fontFamily: 'Outfit', color: '#f2f4f8', letterSpacing: '-0.02em' }}>
                  {s.value}
                </div>
                <div className="text-sm" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HeroGlobe />
    </section>
  );
}

function HeroGlobe() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ right: '-5%', top: '50%', transform: 'translateY(-50%)', width: '52%', maxWidth: 620 }}
    >
      <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-60">
        <circle cx="300" cy="300" r="220" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <circle cx="300" cy="300" r="160" stroke="rgba(201,168,76,0.08)" strokeWidth="1" />
        <circle cx="300" cy="300" r="100" stroke="rgba(79,142,247,0.08)" strokeWidth="1" />
        {[0.4, 0.65, 0.85].map((r, i) => (
          <ellipse key={i} cx="300" cy="300" rx={220 * r} ry={40 + i * 20} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {[0, 30, 60, 90, 120, 150].map((angle, i) => (
          <line
            key={i}
            x1={300 + 220 * Math.cos((angle * Math.PI) / 180)}
            y1={300 + 220 * Math.sin((angle * Math.PI) / 180)}
            x2={300 - 220 * Math.cos((angle * Math.PI) / 180)}
            y2={300 - 220 * Math.sin((angle * Math.PI) / 180)}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />
        ))}
        {[
          { x: 180, y: 160, r: 5, c: '#c9a84c' },
          { x: 420, y: 200, r: 4, c: '#4f8ef7' },
          { x: 350, y: 380, r: 6, c: '#c9a84c' },
          { x: 150, y: 340, r: 4, c: '#4f8ef7' },
          { x: 460, y: 320, r: 3, c: '#4f8ef7' },
          { x: 270, y: 200, r: 3, c: '#e0c278' },
          { x: 400, y: 440, r: 4, c: '#c9a84c' },
          { x: 230, y: 440, r: 3, c: '#4f8ef7' },
          { x: 310, y: 300, r: 8, c: '#c9a84c' },
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r={node.r + 6} fill={node.c} fillOpacity="0.06" />
            <circle cx={node.x} cy={node.y} r={node.r} fill={node.c} fillOpacity="0.7" />
          </g>
        ))}
        {[
          [180, 160, 270, 200], [270, 200, 310, 300], [310, 300, 350, 380],
          [350, 380, 400, 440], [420, 200, 460, 320], [460, 320, 400, 440],
          [180, 160, 150, 340], [150, 340, 230, 440], [310, 300, 420, 200],
          [310, 300, 150, 340],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,168,76,0.15)" strokeWidth="1" strokeDasharray="4 8" />
        ))}
      </svg>
    </div>
  );
}

// ─── Pillars ────────────────────────────────────────────────────────────────

function PillarsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24" style={{ background: '#080d1a' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-xl">
          <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}>
            Platform pillars
          </div>
          <h2 className="leading-tight" style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(36px, 4vw, 56px)', color: '#f2f4f8', letterSpacing: '-0.02em' }}>
            Everything your business
            <br />
            <em style={{ color: '#c9a84c' }}>needs to grow.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
          {PILLARS.map((p, i) => (
            <div
              key={p.number}
              className="relative p-8 cursor-pointer transition-all duration-300 group"
              style={{
                background: active === i ? 'rgba(201,168,76,0.04)' : '#0e1628',
                borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
              onMouseEnter={() => setActive(i)}
            >
              <div className="text-xs font-medium mb-4 tracking-widest" style={{ fontFamily: 'JetBrains Mono', color: p.accent === 'gold' ? '#c9a84c' : '#4f8ef7' }}>
                {p.number} — {p.label}
              </div>
              <h3 className="mb-3 leading-snug" style={{ fontFamily: 'Instrument Serif', fontSize: '1.6rem', color: '#f2f4f8', letterSpacing: '-0.01em' }}>
                {p.heading}
              </h3>
              <p className="mb-6 text-sm leading-relaxed" style={{ color: '#8899b4', fontFamily: 'Outfit', fontWeight: 300 }}>
                {p.body}
              </p>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-semibold leading-none" style={{ fontFamily: 'Outfit', color: p.accent === 'gold' ? '#c9a84c' : '#4f8ef7', letterSpacing: '-0.03em' }}>
                  {p.stat}
                </span>
                <span className="text-xs pb-1" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
                  {p.statLabel}
                </span>
              </div>
              {active === i && (
                <div className="absolute top-0 left-0 w-0.5 h-full" style={{ background: p.accent === 'gold' ? '#c9a84c' : '#4f8ef7' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Digital Office ─────────────────────────────────────────────────────────

function DigitalOfficeSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#0e1628' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(79,142,247,0.05) 0%, transparent 70%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: '#4f8ef7', fontFamily: 'JetBrains Mono' }}>
              Digital Office
            </div>
            <h2 className="mb-6 leading-tight" style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(34px, 3.5vw, 52px)', color: '#f2f4f8', letterSpacing: '-0.02em' }}>
              Your team's entire
              <br />
              world, <em style={{ color: '#4f8ef7' }}>in one place.</em>
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: '#8899b4', fontFamily: 'Outfit', fontWeight: 300 }}>
              The Digital Office replaces five separate tools with one seamlessly integrated workspace. Secure, fast, and built for businesses that operate globally.
            </p>
            <div className="flex flex-col gap-1">
              {OFFICE_FEATURES.map((f, i) => (
                <button
                  key={f.label}
                  className="text-left px-4 py-3.5 rounded-lg transition-all duration-200 flex items-start gap-4"
                  style={{
                    background: activeFeature === i ? 'rgba(79,142,247,0.08)' : 'transparent',
                    border: activeFeature === i ? '1px solid rgba(79,142,247,0.2)' : '1px solid transparent',
                  }}
                  onMouseEnter={() => setActiveFeature(i)}
                >
                  <span className="text-lg mt-0.5 w-6 shrink-0" style={{ color: activeFeature === i ? '#4f8ef7' : '#8899b4' }}>
                    {f.icon}
                  </span>
                  <div>
                    <div className="text-sm font-medium" style={{ color: activeFeature === i ? '#f2f4f8' : '#b0bed4', fontFamily: 'Outfit' }}>
                      {f.label}
                    </div>
                    {activeFeature === i && (
                      <div className="text-xs mt-0.5" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
                        {f.desc}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <OfficePreview activeFeature={activeFeature} />
          </div>
        </div>
      </div>
    </section>
  );
}

function OfficePreview({ activeFeature }: { activeFeature: number }) {
  const features = OFFICE_FEATURES;
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#080d1a', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0e1628' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
        </div>
        <div className="mx-auto text-xs" style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}>
          orbix.digital — {features[activeFeature].label}
        </div>
      </div>
      <div className="flex h-72">
        <div className="w-12 flex flex-col items-center py-4 gap-3" style={{ background: '#0a0f1e', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
              style={{ background: i === activeFeature ? 'rgba(79,142,247,0.2)' : 'transparent', color: i === activeFeature ? '#4f8ef7' : '#8899b4' }}
            >
              {f.icon}
            </div>
          ))}
        </div>
        <div className="flex-1 p-5 flex flex-col gap-3">
          <div className="text-xs font-medium tracking-wide" style={{ color: '#4f8ef7', fontFamily: 'JetBrains Mono' }}>
            {features[activeFeature].label.toUpperCase()}
          </div>
          {activeFeature === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {['Meridian Call', 'Q3 Strategy', 'Investor Sync', 'Team Standup'].map((name, i) => (
                <div key={i} className="p-3 rounded-lg" style={{ background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.1)' }}>
                  <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(79,142,247,0.2)', color: '#4f8ef7' }}>
                    {name.charAt(0)}
                  </div>
                  <div className="text-xs text-[#b0bed4]">{name}</div>
                  <div className="text-xs text-[#8899b4] mt-0.5">{['Live', 'In 2h', 'Tomorrow', 'Daily'][i]}</div>
                </div>
              ))}
            </div>
          )}
          {activeFeature === 1 && (
            <div className="flex-1 rounded-lg flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.04)', border: '1px dashed rgba(201,168,76,0.2)' }}>
              <div className="text-center">
                <div className="text-3xl mb-2" style={{ color: 'rgba(201,168,76,0.3)' }}>⬡</div>
                <div className="text-xs" style={{ color: '#8899b4' }}>Collaborative whiteboard</div>
                <div className="text-xs mt-1" style={{ color: '#c9a84c' }}>3 collaborators active</div>
              </div>
            </div>
          )}
          {activeFeature === 2 && (
            <div className="flex flex-col gap-2">
              {['Executive Summary Q3', 'Partnership Agreement', 'Growth Roadmap'].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="text-[#4f8ef7] text-xs">◫</div>
                  <div className="flex-1 text-xs" style={{ color: '#b0bed4' }}>{doc}</div>
                  <div className="text-xs" style={{ color: '#8899b4' }}>{['Live', '2 editors', 'Draft'][i]}</div>
                </div>
              ))}
            </div>
          )}
          {activeFeature === 3 && (
            <div className="flex flex-col gap-2">
              {[
                { task: 'Review term sheet', status: 'Done', color: '#27c93f' },
                { task: 'Onboard Meridian team', status: 'Active', color: '#c9a84c' },
                { task: 'Legal sign-off', status: 'Pending', color: '#8899b4' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
                  <div className="flex-1 text-xs" style={{ color: '#b0bed4' }}>{t.task}</div>
                  <div className="text-xs" style={{ color: t.color }}>{t.status}</div>
                </div>
              ))}
            </div>
          )}
          {activeFeature >= 4 && (
            <div className="flex-1 rounded flex items-center justify-center" style={{ background: 'rgba(79,142,247,0.03)', border: '1px solid rgba(79,142,247,0.08)' }}>
              <div className="text-center">
                <div className="text-2xl mb-2 opacity-30">{features[activeFeature].icon}</div>
                <div className="text-xs" style={{ color: '#8899b4' }}>{features[activeFeature].desc}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Reputation ─────────────────────────────────────────────────────────────

function ReputationSection() {
  const tiers = [
    { name: 'Emerging', range: '0–100 pts', color: '#8899b4', perks: ['Basic profile', 'Browse listings', 'Join discussions'] },
    { name: 'Trusted', range: '100–500 pts', color: '#4f8ef7', perks: ['Verified badge', 'Direct messaging', 'Investment access'] },
    { name: 'Established', range: '500–1000 pts', color: '#c9a84c', perks: ['Premium deal flow', 'Partner matching', 'Feature priority'] },
    { name: 'Elite', range: '1000+ pts', color: '#e0c278', perks: ['Exclusive events', 'VIP introductions', 'Advisory board access'] },
  ];

  return (
    <section className="py-24" style={{ background: '#080d1a' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: '#c9a84c', fontFamily: 'JetBrains Mono' }}>
              Reputation System
            </div>
            <h2 className="mb-6 leading-tight" style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(34px, 3.5vw, 52px)', color: '#f2f4f8', letterSpacing: '-0.02em' }}>
              Credibility you
              <br />
              <em style={{ color: '#c9a84c' }}>earn, not claim.</em>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#8899b4', fontFamily: 'Outfit', fontWeight: 300 }}>
              Every completed deal, successful collaboration, and verified business introduction builds your reputation score. Transparent, tamper-proof, and visible to every member.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Amara Nwosu', role: 'Serial Entrepreneur', pts: 1847, tier: 'Elite' },
                { name: 'James Whitfield', role: 'Angel Investor', pts: 734, tier: 'Established' },
                { name: 'Sofia Chen', role: 'M&A Advisor', pts: 312, tier: 'Trusted' },
              ].map((user) => (
                <div key={user.name} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0" style={{ background: 'rgba(201,168,76,0.12)', color: '#c9a84c', fontFamily: 'Outfit' }}>
                    {user.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: '#f2f4f8', fontFamily: 'Outfit' }}>{user.name}</div>
                    <div className="text-xs" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>{user.role}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-semibold" style={{ fontFamily: 'JetBrains Mono', color: user.pts > 1000 ? '#e0c278' : user.pts > 500 ? '#c9a84c' : '#4f8ef7' }}>
                      {user.pts.toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>{user.tier}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs mb-6 font-medium tracking-wide" style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}>
              Reputation tiers
            </div>
            <div className="flex flex-col gap-3">
              {tiers.map((tier) => (
                <div key={tier.name} className="p-5 rounded-xl" style={{ background: '#0e1628', border: `1px solid ${tier.color}22` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: tier.color }} />
                      <span className="font-semibold text-sm" style={{ color: tier.color, fontFamily: 'Outfit' }}>{tier.name}</span>
                    </div>
                    <span className="text-xs" style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}>{tier.range}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tier.perks.map((perk) => (
                      <span key={perk} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${tier.color}14`, color: '#b0bed4', fontFamily: 'Outfit' }}>
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl flex items-center gap-4" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="text-2xl font-bold shrink-0" style={{ fontFamily: 'JetBrains Mono', color: '#c9a84c' }}>+5</div>
              <div>
                <div className="text-sm font-medium" style={{ color: '#f2f4f8', fontFamily: 'Outfit' }}>Per completed transaction</div>
                <div className="text-xs mt-0.5" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
                  Deals, partnerships, introductions, and project completions all earn points
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Marketplace preview ────────────────────────────────────────────────────

function MarketplaceSection({ onBrowse, onCta }: { onBrowse: () => void; onCta: () => void }) {
  const listings = [
    { type: 'Business for Sale', name: 'TechOps SaaS Platform', sector: 'Software', revenue: '$2.4M ARR', asking: '$8.2M', badge: 'Verified', badgeColor: '#27c93f' },
    { type: 'Equity Offering', name: 'Meridian Logistics', sector: 'Supply Chain', revenue: '$12M Revenue', asking: '15% stake', badge: 'Active', badgeColor: '#4f8ef7' },
    { type: 'Seeking Investment', name: 'ClearMed Health AI', sector: 'HealthTech', revenue: '$800K ARR', asking: '$5M raise', badge: 'Series A', badgeColor: '#c9a84c' },
  ];

  return (
    <section className="py-24" style={{ background: '#080d1a' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: '#4f8ef7', fontFamily: 'JetBrains Mono' }}>
              Business Marketplace
            </div>
            <h2 className="leading-tight" style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(34px, 3.5vw, 52px)', color: '#f2f4f8', letterSpacing: '-0.02em' }}>
              Live opportunities,
              <br />
              <em style={{ color: '#c9a84c' }}>ready to transact.</em>
            </h2>
          </div>
          <button
            onClick={onBrowse}
            className="shrink-0 px-5 py-2.5 rounded text-sm font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#b0bed4', fontFamily: 'Outfit' }}
          >
            Browse all listings →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {listings.map((listing, i) => (
            <div
              key={i}
              className="p-6 rounded-xl group cursor-pointer transition-all duration-300"
              style={{ background: '#0e1628', border: '1px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.background = 'rgba(201,168,76,0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = '#0e1628'; }}
              onClick={onBrowse}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${listing.badgeColor}18`, color: listing.badgeColor, border: `1px solid ${listing.badgeColor}30`, fontFamily: 'JetBrains Mono', fontSize: '0.65rem' }}>
                  {listing.badge}
                </span>
                <span className="text-xs" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>{listing.type}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: '#f2f4f8', fontFamily: 'Outfit', letterSpacing: '-0.01em' }}>
                {listing.name}
              </h3>
              <p className="text-sm mb-5" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
                {listing.sector} · {listing.revenue}
              </p>
              <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-xs mb-1" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
                  {listing.type === 'Seeking Investment' ? 'Target raise' : listing.type === 'Equity Offering' ? 'Offering' : 'Asking price'}
                </div>
                <div className="text-xl font-semibold" style={{ color: '#c9a84c', fontFamily: 'Outfit', letterSpacing: '-0.02em' }}>
                  {listing.asking}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ───────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#0e1628' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 60%, rgba(201,168,76,0.04) 0%, transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-xs font-medium tracking-widest uppercase mb-12 text-center" style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}>
          From our members
        </div>
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-center mb-10" style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#f2f4f8', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            &ldquo;{TESTIMONIALS[active].quote}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', fontFamily: 'Outfit' }}>
              {TESTIMONIALS[active].avatar}
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: '#f2f4f8', fontFamily: 'Outfit' }}>{TESTIMONIALS[active].name}</div>
              <div className="text-xs" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>{TESTIMONIALS[active].title}</div>
            </div>
            <div className="ml-2 px-2 py-1 rounded text-xs font-medium" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', fontFamily: 'JetBrains Mono' }}>
              {TESTIMONIALS[active].points} pts
            </div>
          </div>
          <div className="flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className="rounded-full transition-all duration-300"
                style={{ width: active === i ? 24 : 8, height: 8, background: active === i ? '#c9a84c' : 'rgba(255,255,255,0.15)' }}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────────────────

function CTASection({ onCta }: { onCta: () => void }) {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#0e1628' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="text-xs font-medium tracking-widest uppercase mb-6" style={{ color: '#c9a84c', fontFamily: 'JetBrains Mono' }}>
          Start Today
        </div>
        <h2 className="mb-6 leading-tight" style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(36px, 5vw, 64px)', color: '#f2f4f8', letterSpacing: '-0.02em' }}>
          Ready to unlock your
          <br />
          <em style={{ color: '#c9a84c' }}>global business potential?</em>
        </h2>
        <p className="text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#8899b4', fontFamily: 'Outfit', fontWeight: 300 }}>
          Join 2.4 million professionals, entrepreneurs, and investors who are building the future of global business on Orbix Global.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onCta}
            className="w-full sm:w-auto px-8 py-4 rounded font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)', color: '#080d1a', fontFamily: 'Outfit' }}
          >
            Create your account — it's free
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded font-medium text-base transition-all" style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#b0bed4', fontFamily: 'Outfit' }}>
            Talk to sales
          </button>
        </div>
        <p className="mt-6 text-sm" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
          No credit card required · Free tier available · Enterprise plans from $99/mo
        </p>
      </div>
    </section>
  );
}
