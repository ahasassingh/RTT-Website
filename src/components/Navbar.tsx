import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Journal', href: '#home' },
    { name: 'Expeditions', href: '#explorers' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Mission', href: '#about' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700",
        scrolled ? "py-4 bg-mist-white/90 backdrop-blur-xl border-b border-black/5" : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        {/* Brand */}
        <a 
          href="#" 
          className={cn(
            "font-editorial italic text-[18px] tracking-tight transition-colors duration-500",
            scrolled ? "text-mountain-black" : "text-cloud-white"
          )}
        >
          Royal Tour & Travels
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "relative font-body text-[10px] font-medium uppercase tracking-[0.25em] group overflow-hidden py-1",
                scrolled ? "text-mountain-black" : "text-cloud-white/70 hover:text-cloud-white"
              )}
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-full block">
                {link.name}
              </span>
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 block font-bold">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            <span className={cn("w-full h-px transition-all duration-500", scrolled ? "bg-mountain-black" : "bg-white")} />
            <span className={cn("w-full h-px transition-all duration-500", scrolled ? "bg-mountain-black" : "bg-white")} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute top-full left-0 w-full bg-mist-white border-b border-black/5 py-12 px-8 flex flex-col gap-6 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-editorial text-2xl text-mountain-black"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
