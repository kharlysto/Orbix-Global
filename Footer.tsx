import { Link } from 'react-router-dom';

export function Footer() {
  const cols = [
    {
      heading: 'Platform',
      links: ['Professional Networking', 'Business Marketplace', 'Investment Hub', 'Digital Office', 'Reputation System'],
    },
    {
      heading: 'Company',
      links: ['About Orbix', 'Careers', 'Press', 'Partners', 'Contact'],
    },
    {
      heading: 'Resources',
      links: ['Documentation', 'Help Center', 'Blog', 'Case Studies', 'API'],
    },
    {
      heading: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
    },
  ];

  return (
    <footer style={{ background: '#080d1a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e0c278)' }}
              >
                <span className="text-[#080d1a] font-bold text-sm">O</span>
              </div>
              <span
                className="text-base font-semibold"
                style={{ fontFamily: 'Outfit', color: '#f2f4f8', letterSpacing: '-0.02em' }}
              >
                Orbix<span style={{ color: '#c9a84c' }}>Global</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: '#8899b4', fontFamily: 'Outfit', fontWeight: 300 }}
            >
              The all-in-one business ecosystem for entrepreneurs, investors, and professionals worldwide.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <div
                className="text-xs font-medium tracking-widest uppercase mb-4"
                style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}
              >
                {col.heading}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm transition-colors duration-200 no-underline"
                      style={{ color: '#8899b4', fontFamily: 'Outfit' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#f2f4f8')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#8899b4')}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs" style={{ color: '#8899b4', fontFamily: 'Outfit' }}>
            © 2026 Orbix Global Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs" style={{ color: '#8899b4', fontFamily: 'JetBrains Mono' }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
