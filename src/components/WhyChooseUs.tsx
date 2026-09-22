import React from 'react';
import { VALUE_PROPS } from '../data/properties';
import { ArrowUpRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenSchedule: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenSchedule }) => {
  return (
    <section id="why-choose-us" className="py-14 sm:py-28 bg-[#F7F6F2] border-y border-[#E8E6DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-xl mb-14 sm:mb-16">
          <span className="text-[12px] font-normal tracking-wide text-[#7A756D] uppercase block mb-3">
            Standards & Assurance
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-[#1A1816] tracking-tight leading-snug">
            A straightforward way to discover property.
          </h2>
          <p className="text-sm text-[#635E56] font-light mt-3 leading-relaxed">
            Every estate and residence on Soft Sands is audited for clear ownership, so you can explore with complete peace of mind.
          </p>
        </div>

        {/* 4 Value Props Grid - Clean, light, photography-supported */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUE_PROPS.map((vp) => (
            <div key={vp.id} className="flex flex-col group">
              {/* Image Preview */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#E8E6DF] mb-4">
                <img
                  src={vp.image}
                  alt={vp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>

              {/* Text */}
              <h3 className="text-base font-medium text-[#1A1816] mb-1.5">
                {vp.title}
              </h3>
              <p className="text-xs text-[#635E56] font-light leading-relaxed">
                {vp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Minimal Enquire Note */}
        <div className="mt-14 pt-8 border-t border-[#E8E6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-[#7A756D] font-light">
            Questions regarding titles or estate covenants? We provide full documentation prior to visits.
          </p>
          <button
            onClick={onOpenSchedule}
            className="inline-flex items-center gap-1.5 text-xs text-[#1A1816] font-medium hover:underline self-start sm:self-auto"
          >
            <span>Speak with an advisor</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
