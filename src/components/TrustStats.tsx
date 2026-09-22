import React from 'react';
import { TRUST_STATS, IBADAN_ESTATE_ZONES } from '../data/properties';
import { ArrowRight } from 'lucide-react';

interface TrustStatsProps {
  onSelectEstateLocation: (estateLocation: string) => void;
}

export const TrustStats: React.FC<TrustStatsProps> = ({ onSelectEstateLocation }) => {
  return (
    <section id="about-estates" className="py-14 sm:py-28 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Minimalist Statistics - Not like a dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-14 sm:pb-24 border-b border-[#E8E6DF]">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1816] tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-[#1A1816] pt-1">
                {stat.label}
              </div>
              <div className="text-xs text-[#7A756D] font-light">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Ibadan Estates & Neighborhoods Directory - Calm Editorial Layout */}
        <div className="pt-16 sm:pt-20">
          <div className="max-w-xl mb-10">
            <span className="text-[12px] font-normal tracking-wide text-[#7A756D] uppercase block mb-2">
              Estate Corridors
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#1A1816] tracking-tight">
              Ibadan's Premier Enclaves
            </h2>
            <p className="text-sm text-[#635E56] font-light mt-2 leading-relaxed">
              From historic colonial GRA districts to newly master-planned tech communities, explore the distinctive character of each gated neighborhood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IBADAN_ESTATE_ZONES.map((zone) => (
              <div
                key={zone.name}
                onClick={() => {
                  onSelectEstateLocation(zone.name.includes('Akobo') ? 'Kolapo Ishola Estate' : zone.name);
                  const el = document.getElementById('properties-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E6DF] hover:border-[#1A1816] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-medium text-[#1A1816] group-hover:text-[#2E3B33] transition-colors">
                      {zone.name}
                    </h3>
                    <span className="text-[11px] text-[#7A756D] font-light">
                      {zone.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#635E56] font-light leading-relaxed mb-4">
                    {zone.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F5F4F0] flex items-center justify-between text-xs">
                  <span className="text-[#8A847B] font-light">
                    Range: <span className="text-[#1A1816] font-normal">{zone.avgPrice}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#1A1816] font-medium group-hover:translate-x-0.5 transition-transform">
                    <span>View homes</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
