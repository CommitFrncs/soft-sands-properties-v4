import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenSchedule: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSchedule }) => {
  return (
    <footer className="bg-[#F4F3EE] text-[#1A1816] text-xs border-t border-[#E8E6DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Pre-footer Callout */}
        <div className="pb-16 mb-16 border-b border-[#E8E6DF] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-normal text-[#1A1816] tracking-tight">
              Ready to explore Ibadan's gated enclaves?
            </h3>
            <p className="text-sm text-[#635E56] font-light mt-3 leading-relaxed">
              Our legal and property advisory team provides verified title surveys, accompanied gate entry passes, and uncompromised guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/2348038924100?text=Hello%20Soft%20Sands%20Properties,%20I%20would%20like%20to%20inquire%20about%20available%20gated%20estate%20properties%20in%20Ibadan."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full border border-[#E8E6DF] bg-white text-[#1A1816] hover:bg-[#FAF9F5] transition-colors inline-flex items-center gap-1.5"
            >
              <span>WhatsApp Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <button
              onClick={onOpenSchedule}
              className="px-5 py-2.5 rounded-full bg-[#1A1816] hover:bg-[#2E3B33] text-[#FAFAF7] transition-colors inline-flex items-center gap-1.5 font-normal"
            >
              <span>Book a Viewing</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 pb-16 border-b border-[#E8E6DF]">
          
          {/* Brand & Address */}
          <div className="space-y-3 sm:col-span-1">
            <span className="font-medium text-base text-[#1A1816] tracking-tight block">
              Soft Sands Properties
            </span>
            <p className="text-xs text-[#635E56] font-light leading-relaxed">
              Plot 14, Commercial Avenue, Ring Road / Bodija, Ibadan, Oyo State, Nigeria.
            </p>
            <div className="pt-2 text-xs text-[#7A756D] font-light space-y-1">
              <p>+234 803 892 4100</p>
              <p>inquiries@softsandsproperties.ng</p>
            </div>
          </div>

          {/* Gated Estates */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-[#1A1816] uppercase tracking-wider">
              Estates in Ibadan
            </h4>
            <ul className="space-y-2 text-[#635E56] font-light">
              <li><a href="#properties-section" className="hover:text-[#1A1816] transition-colors">Alalubosa GRA</a></li>
              <li><a href="#properties-section" className="hover:text-[#1A1816] transition-colors">Kolapo Ishola / Akobo</a></li>
              <li><a href="#properties-section" className="hover:text-[#1A1816] transition-colors">Jericho GRA</a></li>
              <li><a href="#properties-section" className="hover:text-[#1A1816] transition-colors">Bodija Estate</a></li>
              <li><a href="#properties-section" className="hover:text-[#1A1816] transition-colors">Aerodrome Heritage</a></li>
            </ul>
          </div>

          {/* Verification & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-[#1A1816] uppercase tracking-wider">
              Standards
            </h4>
            <ul className="space-y-2 text-[#635E56] font-light">
              <li><a href="#why-choose-us" className="hover:text-[#1A1816] transition-colors">Governor's Consent Audits</a></li>
              <li><a href="#why-choose-us" className="hover:text-[#1A1816] transition-colors">C of O Verification</a></li>
              <li><a href="#why-choose-us" className="hover:text-[#1A1816] transition-colors">Diaspora Escrow Protocol</a></li>
              <li><a href="#why-choose-us" className="hover:text-[#1A1816] transition-colors">Cadastral Survey Charting</a></li>
            </ul>
          </div>

          {/* Accreditation & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-[#1A1816] uppercase tracking-wider">
              Assurance
            </h4>
            <div className="text-xs text-[#635E56] font-light space-y-2">
              <p>CAC Registered: RC 1894022</p>
              <p>Accredited REDAN Member (Oyo State Chapter)</p>
              <p className="pt-2 text-[#7A756D]">Mon – Sat: 8:30 AM – 5:30 PM WAT</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A756D] font-light">
          <p>
            © {new Date().getFullYear()} Soft Sands Properties Limited. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a 
              href="https://wa.me/2348038924100" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#1A1816] transition-colors"
            >
              WhatsApp
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#1A1816] transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#1A1816] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
