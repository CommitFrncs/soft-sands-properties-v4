import React, { useState } from 'react';
import { Heart, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currency: 'NGN' | 'USD';
  onToggleCurrency: () => void;
  savedCount: number;
  onOpenFavorites: () => void;
  onOpenSchedule: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onToggleCurrency,
  savedCount,
  onOpenFavorites,
  onOpenSchedule,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/80 backdrop-blur-xl border-b border-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group shrink-0 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#1A1816] text-[#FAFAF7] flex items-center justify-center font-medium text-xs tracking-tighter shrink-0 group-hover:bg-[#2E3B33] transition-colors">
            SS
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 min-w-0">
            <span className="font-medium text-[15px] sm:text-lg tracking-tight text-[#1A1816] group-hover:text-[#2E3B33] transition-colors truncate">
              Soft Sands
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A756D] font-light tracking-wide truncate">
              Gated Estates · Ibadan
            </span>
          </div>
        </a>

        {/* Desktop Navigation - Calm & Understated */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[13px] font-normal text-[#635E56]">
          <a href="#properties-section" className="hover:text-[#1A1816] transition-colors">
            Properties
          </a>
          <a href="#why-choose-us" className="hover:text-[#1A1816] transition-colors">
            Why Us
          </a>
          <a href="#live-viewing" className="hover:text-[#1A1816] transition-colors">
            Live View
          </a>
          <a href="#about-estates" className="hover:text-[#1A1816] transition-colors">
            Estates
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Liquid Glass Currency Switcher */}
          <button
            onClick={onToggleCurrency}
            className="liquid-glass-pill text-[11px] sm:text-[12px] font-medium text-[#1A1816] px-2.5 sm:px-3 py-1.5 rounded-full hover:scale-105 active:scale-95 transition-all min-h-[36px] flex items-center justify-center"
            title="Switch display currency"
            aria-label="Switch display currency"
          >
            {currency}
          </button>

          {/* Saved properties button */}
          <button
            onClick={onOpenFavorites}
            className="liquid-glass-pill relative p-2 sm:p-2.5 rounded-full text-[#635E56] hover:text-[#1A1816] hover:scale-105 active:scale-95 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Saved properties"
            aria-label="View saved properties"
          >
            <Heart className="w-3.5 h-3.5 stroke-[1.5]" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#1A1816] text-[#FAFAF7] text-[9px] font-medium flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </button>

          {/* Primary Understated Action */}
          <button
            onClick={onOpenSchedule}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1816] hover:bg-[#2E3B33] active:scale-95 text-[#FAFAF7] text-[13px] font-normal transition-all shadow-xs"
          >
            <span>Book a Viewing</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Mobile hamburger - Liquid Glass Style */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden liquid-glass-pill p-2 rounded-full text-[#1A1816] hover:text-[#2E3B33] active:scale-95 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 stroke-[1.5]" /> : <Menu className="w-4 h-4 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Liquid Glass Floating Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden liquid-glass border-t border-white/70 px-5 py-5 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            <a 
              href="#properties-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm text-[#1A1816] font-normal py-2.5 px-3 rounded-xl hover:bg-white/60 transition-colors"
            >
              <span>Explore Properties</span>
              <span className="text-xs text-[#7A756D]">Browse listings</span>
            </a>
            <a 
              href="#why-choose-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm text-[#1A1816] font-normal py-2.5 px-3 rounded-xl hover:bg-white/60 transition-colors"
            >
              <span>Why Choose Us</span>
              <span className="text-xs text-[#7A756D]">Title & security</span>
            </a>
            <a 
              href="#live-viewing" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm text-[#1A1816] font-normal py-2.5 px-3 rounded-xl hover:bg-white/60 transition-colors"
            >
              <span>Live Viewing</span>
              <span className="text-xs text-[#7A756D]">Video tours & map</span>
            </a>
            <a 
              href="#about-estates" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm text-[#1A1816] font-normal py-2.5 px-3 rounded-xl hover:bg-white/60 transition-colors"
            >
              <span>Estates & Locations</span>
              <span className="text-xs text-[#7A756D]">Ibadan GRA</span>
            </a>
          </nav>

          <div className="pt-3 border-t border-black/5 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSchedule();
              }}
              className="w-full py-3 rounded-full bg-[#1A1816] hover:bg-[#2E3B33] text-[#FAFAF7] text-center text-xs font-normal transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Book an Inspection Tour</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </button>
            
            <div className="flex items-center justify-between text-xs text-[#7A756D] px-2 pt-1">
              <span>Currency preference</span>
              <button 
                onClick={onToggleCurrency}
                className="liquid-glass-pill px-2.5 py-1 rounded-full font-medium text-[#1A1816] text-[11px]"
              >
                {currency} (Tap to toggle)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
