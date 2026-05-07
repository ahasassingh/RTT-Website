import { useState, useEffect } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['Home', 'Destinations', 'Open Trip', 'About'];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-mist-white/80 backdrop-blur-md py-3'
          : 'bg-transparent py-6'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className={`font-editorial italic text-[16px] tracking-[0.08em] transition-colors duration-300 ${
            scrolled ? 'text-mountain-black' : 'text-cloud-white'
          }`}
        >
          Royal Tour & Travels
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className={`relative font-body text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity duration-300 group ${
                scrolled ? 'text-mountain-black' : 'text-cloud-white/80 hover:text-cloud-white'
              }`}
            >
              {link}
              <span
                className={`absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ${
                  scrolled ? 'bg-mountain-black' : 'bg-cloud-white'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 ${
              scrolled ? 'bg-mountain-black' : 'bg-cloud-white'
            } ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`}
          />
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 ${
              scrolled ? 'bg-mountain-black' : 'bg-cloud-white'
            } ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 ${
              scrolled ? 'bg-mountain-black' : 'bg-cloud-white'
            } ${menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-[52px] bg-mist-white transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 -mt-[52px]">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="font-body text-lg font-medium uppercase tracking-[0.18em] text-mountain-black"
              onClick={() => setMenuOpen(false)}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}