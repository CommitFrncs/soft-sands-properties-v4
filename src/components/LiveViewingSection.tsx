import React, { useState } from 'react';
import { Play, MapPin, X, ArrowUpRight } from 'lucide-react';
import { INTERIOR_IMAGE } from '../data/properties';

interface LiveViewingSectionProps {
  onOpenLocationTour: () => void;
  onOpenVideoTour: () => void;
}

export const LiveViewingSection: React.FC<LiveViewingSectionProps> = ({
  onOpenLocationTour,
  onOpenVideoTour,
}) => {
  const [activeVideoModal, setActiveVideoModal] = useState(false);

  return (
    <section id="live-viewing" className="py-14 sm:py-28 bg-[#F7F6F2] border-t border-[#E8E6DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-xl mb-14">
          <span className="text-[12px] font-normal tracking-wide text-[#7A756D] uppercase block mb-3">
            Remote & Live Viewing
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-[#1A1816] tracking-tight">
            Inspect from anywhere in the world.
          </h2>
          <p className="text-sm text-[#635E56] font-light mt-2 leading-relaxed">
            Designed with diaspora buyers and busy executives in mind. Experience high-definition video walkthroughs and precise satellite estate context.
          </p>
        </div>

        {/* Dual Cards - Visually Simple & Image-driven */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Property Walkthrough Video */}
          <div className="flex flex-col bg-white rounded-2xl border border-[#E8E6DF] overflow-hidden group">
            <div 
              onClick={() => setActiveVideoModal(true)}
              className="relative aspect-[16/10] bg-[#EFECE6] overflow-hidden cursor-pointer"
            >
              <img
                src={INTERIOR_IMAGE}
                alt="Property walkthrough video preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/35 transition-colors">
                <div className="liquid-glass-pill w-14 h-14 rounded-full text-[#1A1816] flex items-center justify-center shadow-lg pl-0.5 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </div>

              <div className="liquid-glass-dark absolute bottom-3 left-4 text-white text-xs font-light px-3 py-1.5 rounded-full">
                4K Architectural Walkthrough · 4:12
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base font-medium text-[#1A1816] mb-1">
                  Property Walkthroughs
                </h3>
                <p className="text-xs text-[#635E56] font-light leading-relaxed mb-4">
                  Step inside verified residences in Alalubosa GRA and Aerodrome Estate with smooth, uncut architectural walkthroughs.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideoModal(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#1A1816] font-medium hover:underline self-start"
              >
                <span>Watch tour</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Interactive Location & Satellite Context */}
          <div className="flex flex-col bg-white rounded-2xl border border-[#E8E6DF] overflow-hidden group">
            <div 
              onClick={onOpenLocationTour}
              className="relative aspect-[16/10] bg-[#E8E6DF] overflow-hidden cursor-pointer"
            >
              {/* Minimalist stylized satellite/map graphic */}
              <div className="w-full h-full bg-[#E5E3DC] relative flex items-center justify-center p-6">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1A1816_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Clean map pins indicating Ibadan estate clusters with Liquid Glass */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between text-xs text-[#1A1816]">
                  <div className="flex justify-between items-start">
                    <span className="liquid-glass-pill px-3 py-1 rounded-full text-[11px] font-medium">
                      Jericho GRA
                    </span>
                    <span className="liquid-glass-pill px-3 py-1 rounded-full text-[11px] font-medium">
                      Bodija Estate
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <div className="liquid-glass-dark text-[#FAFAF7] px-3.5 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      <span>Alalubosa Prime Heights</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="liquid-glass-pill px-3 py-1 rounded-full text-[11px] font-medium">
                      Aerodrome Samonda
                    </span>
                    <span className="liquid-glass-pill px-3 py-1 rounded-full text-[11px] font-medium">
                      Kolapo Ishola / Akobo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base font-medium text-[#1A1816] mb-1">
                  Location & Cadastral Context
                </h3>
                <p className="text-xs text-[#635E56] font-light leading-relaxed mb-4">
                  Review exact perimeter coordinates, arterial access routes, nearby social amenities, and topography before scheduling a physical visit.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenLocationTour}
                className="inline-flex items-center gap-1.5 text-xs text-[#1A1816] font-medium hover:underline self-start"
              >
                <span>Explore locations</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideoModal(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Property Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="p-4 bg-[#1A1816] text-[#FAFAF7] flex items-center justify-between text-xs font-light">
              <span>Alalubosa Prime Heights Estate — 4-Bedroom Villa Tour</span>
              <button 
                onClick={() => {
                  setActiveVideoModal(false);
                  onOpenVideoTour();
                }}
                className="underline hover:text-white"
              >
                View full property details →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
