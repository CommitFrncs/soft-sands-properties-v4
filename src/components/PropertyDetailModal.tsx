import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  Share2, 
  Play, 
  Compass, 
  Check, 
  FileText
} from 'lucide-react';
import { Property } from '../types';
import { formatPrice } from '../utils/format';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  currency: 'NGN' | 'USD';
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onScheduleInspection: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  currency,
  isSaved,
  onToggleSave,
  onScheduleInspection,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showVideoTour, setShowVideoTour] = useState(false);

  if (!property) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} in ${property.estateName}, Ibadan.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1816]/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FAFAF7] rounded-3xl shadow-2xl overflow-hidden border border-[#E8E6DF] my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Liquid Glass */}
        <div className="px-6 py-4 border-b border-white/70 liquid-glass flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-normal text-[#7A756D]">
              {property.estateName} · {property.locationArea}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="liquid-glass-pill p-2 rounded-full text-[#635E56] hover:text-[#1A1816] transition-all hover:scale-105"
              title="Share property"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 stroke-[1.5]" />}
            </button>

            <button
              onClick={() => onToggleSave(property.id)}
              className={`liquid-glass-pill p-2 rounded-full transition-all hover:scale-105 ${
                isSaved
                  ? 'text-[#1A1816] bg-white ring-1 ring-[#1A1816]'
                  : 'text-[#635E56] hover:text-[#1A1816]'
              }`}
              title={isSaved ? 'Saved' : 'Save'}
            >
              <Heart className={`w-4 h-4 stroke-[1.5] ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <div className="w-px h-4 bg-[#E8E6DF] mx-1" />

            <button
              onClick={onClose}
              className="liquid-glass-pill p-2 rounded-full text-[#635E56] hover:text-[#1A1816] transition-all hover:scale-105"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[21/10] rounded-2xl overflow-hidden bg-[#E8E6DF]">
              <img
                src={property.galleryImages[activeImageIndex] || property.mainImage}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              
              {property.verified && (
                <div className="liquid-glass-pill absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-normal text-[#1A1816]">
                  Verified · {property.titleType}
                </div>
              )}

              {/* Live Video Tour Button with Liquid Glass */}
              <button
                onClick={() => setShowVideoTour(true)}
                className="liquid-glass-dark hover:liquid-glass-pill hover:text-[#1A1816] absolute bottom-4 right-4 text-[#FAFAF7] px-4 py-2 rounded-full text-xs font-normal flex items-center gap-2 transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Tour</span>
              </button>
            </div>

            {/* Thumbnail Strip */}
            {property.galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {property.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#1A1816] ring-1 ring-[#1A1816]'
                        : 'border-[#E8E6DF] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#E8E6DF]">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-normal text-[#1A1816] tracking-tight">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#7A756D] font-light">
                <MapPin className="w-3.5 h-3.5 text-[#8A847B]" />
                <span>{property.estateName}, {property.locationArea}, Ibadan</span>
              </div>
            </div>

            <div className="text-2xl sm:text-3xl font-normal text-[#1A1816] tracking-tight shrink-0">
              {formatPrice(property.priceNaira, currency)}
            </div>
          </div>

          {/* Key Specifications Grid - Minimalist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-[#E8E6DF]">
            <div>
              <span className="text-[11px] text-[#8A847B] font-light uppercase tracking-wider block mb-0.5">
                Bedrooms
              </span>
              <span className="text-sm font-medium text-[#1A1816]">
                {property.bedrooms > 0 ? `${property.bedrooms} Ensuite` : 'N/A (Land)'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#8A847B] font-light uppercase tracking-wider block mb-0.5">
                Bathrooms
              </span>
              <span className="text-sm font-medium text-[#1A1816]">
                {property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#8A847B] font-light uppercase tracking-wider block mb-0.5">
                Floor Area
              </span>
              <span className="text-sm font-medium text-[#1A1816]">
                {property.sizeSqm} sqm
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#8A847B] font-light uppercase tracking-wider block mb-0.5">
                Plot Size
              </span>
              <span className="text-sm font-medium text-[#1A1816]">
                {property.plotSizeSqm} sqm
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[#1A1816]">
              About this property
            </h3>
            <p className="text-xs sm:text-sm text-[#635E56] font-light leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features & Amenities */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[#1A1816]">
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#635E56] font-light">
              {property.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A1816]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Due Diligence & Estate Security */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E8E6DF]">
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-[#1A1816] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#2E3B33]" />
                <span>Title & Documentation</span>
              </h4>
              <p className="text-xs text-[#635E56] font-light leading-relaxed">
                Registered Title: <strong className="font-medium text-[#1A1816]">{property.titleType}</strong>. Survey plans charted and verified with the Oyo State Ministry of Lands.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-[#1A1816] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E3B33]" />
                <span>Estate Security</span>
              </h4>
              <p className="text-xs text-[#635E56] font-light leading-relaxed">
                24/7 security checkpoint, perimeter fencing, and restricted visitor entry protocols.
              </p>
            </div>
          </div>

          {/* Clean Location Preview */}
          <div className="pt-4 border-t border-[#E8E6DF] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#1A1816] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#8A847B]" />
                <span>Location Context</span>
              </h3>
              <span className="text-xs text-[#7A756D] font-light">
                {property.estateName}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-[#E8E6DF] text-xs text-[#635E56] font-light flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-[#1A1816] mb-0.5">{property.estateName}, Ibadan</p>
                <p>Paved dual carriageway access · Underground drainage connected · Zero customary dues</p>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${property.estateName}, Ibadan, Nigeria`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-[#1A1816] hover:underline self-start sm:self-auto shrink-0"
              >
                Open in Maps →
              </a>
            </div>
          </div>

        </div>

        {/* Fixed Bottom Booking Bar with Liquid Glass */}
        <div className="p-5 sm:p-6 liquid-glass border-t border-white/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-[#7A756D] font-light">
              Annual estate service charge
            </div>
            <div className="text-xs font-medium text-[#1A1816]">
              ₦{property.serviceChargeAnnualNaira.toLocaleString()} / year
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${property.agentContact.whatsapp}?text=Hello%20Soft%20Sands,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-pill px-4 py-2.5 rounded-full text-xs text-[#1A1816] hover:bg-white transition-all flex items-center gap-1.5 font-normal"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onScheduleInspection(property)}
              className="px-5 py-2.5 rounded-full bg-[#1A1816] hover:bg-[#2E3B33] text-[#FAFAF7] text-xs font-normal transition-colors flex items-center gap-2 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Inspection</span>
            </button>
          </div>
        </div>

      </div>

      {/* Video Walkthrough Overlay if triggered */}
      {showVideoTour && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 sm:p-6">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowVideoTour(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title={property.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
