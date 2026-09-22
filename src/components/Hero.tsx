import React from 'react';
import { HERO_IMAGE } from '../data/properties';
import { FilterBar } from './FilterBar';
import { FilterState } from '../types';

interface HeroProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalMatches: number;
  onSelectFeatured: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalMatches,
  onSelectFeatured,
}) => {
  return (
    <section className="relative pt-8 sm:pt-16 pb-10 sm:pb-20 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Headline & Introduction */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="inline-block text-[12px] font-normal tracking-wide text-[#7A756D] uppercase mb-4">
            Residential Gated Estates · Ibadan
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-normal text-[#1A1816] tracking-tight leading-[1.15] mb-5">
            Find a home you'll feel confident buying.
          </h1>

          <p className="text-base sm:text-lg text-[#635E56] font-light leading-relaxed max-w-2xl">
            Verified properties across Ibadan, with the clear information, audited land titles, and community context you need to make a calm decision.
          </p>
        </div>

        {/* Integrated Clean Search Bar */}
        <div className="mb-10 sm:mb-14">
          <FilterBar
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            totalMatches={totalMatches}
          />
        </div>

        {/* Hero Visual - Large, Crisp Architectural Photography */}
        <div 
          onClick={onSelectFeatured}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-[#EFECE6] border border-[#E8E6DF] group cursor-pointer"
        >
          <img
            src={HERO_IMAGE}
            alt="Contemporary residential home in an Ibadan gated community"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
          />

          {/* Gentle, natural vignette only at the very bottom for caption readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

          {/* Minimalist Image Caption with Liquid Glass */}
          <div className="absolute bottom-5 sm:bottom-7 left-6 sm:left-8 right-6 sm:right-8 flex items-end justify-between gap-4 text-[#FAFAF7]">
            <div className="liquid-glass-dark px-4 py-2.5 rounded-2xl backdrop-blur-md">
              <p className="text-[11px] text-white/80 font-light mb-0.5">
                Featured Residence
              </p>
              <h2 className="text-sm sm:text-base font-normal tracking-tight text-white">
                Aerodrome Heritage Estate · Samonda, Ibadan
              </h2>
            </div>

            <span className="hidden sm:inline-block liquid-glass-pill px-4 py-2 rounded-full text-xs font-normal text-[#1A1816] hover:scale-105 transition-all cursor-pointer">
              Explore property →
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
