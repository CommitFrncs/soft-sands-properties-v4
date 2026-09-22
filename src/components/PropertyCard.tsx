import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { formatPrice } from '../utils/format';

interface PropertyCardProps {
  property: Property;
  currency: 'NGN' | 'USD';
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleInspection: (property: Property) => void;
  index?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  isSaved,
  onToggleSave,
  onSelectProperty,
  index = 0,
}) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ 
        duration: 0.65, 
        delay: (index % 3) * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      onClick={() => onSelectProperty(property)}
      className="group flex flex-col bg-transparent cursor-pointer transition-all duration-300"
    >
      {/* Large Property Image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFECE6] mb-4">
        <img
          src={property.mainImage}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-500 ease-out"
        />

        {/* Quiet Save Heart with Liquid Glass */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(property.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all hover:scale-110 ${
            isSaved
              ? 'bg-[#1A1816] text-[#FAFAF7] shadow-sm'
              : 'liquid-glass-pill text-[#1A1816]'
          }`}
          title={isSaved ? 'Remove from saved' : 'Save property'}
          aria-label="Save property"
        >
          <Heart className={`w-3.5 h-3.5 stroke-[1.5] ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quiet Verification Marker with Liquid Glass */}
        {property.verified && (
          <div className="liquid-glass-pill absolute bottom-3 left-3 px-3 py-1 rounded-full text-[11px] font-normal text-[#1A1816] tracking-wide">
            Verified
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="space-y-1.5">
        
        {/* Price */}
        <div className="text-xl font-normal text-[#1A1816] tracking-tight">
          {formatPrice(property.priceNaira, currency)}
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-medium text-[#1A1816] group-hover:text-[#2E3B33] transition-colors line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-xs text-[#7A756D] font-light">
          {property.estateName}, {property.locationArea}
        </p>

        {/* Specs: Beds · Baths · Size */}
        <p className="text-xs text-[#8A847B] font-light pt-0.5">
          {property.bedrooms > 0 ? (
            <>
              {property.bedrooms} Beds · {property.bathrooms} Baths · {property.sizeSqm} sqm
            </>
          ) : (
            <>
              Serviced Plot · {property.plotSizeSqm} sqm
            </>
          )}
        </p>

        {/* Clean Primary CTA Link */}
        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-[#1A1816] font-medium group-hover:gap-2 transition-all">
            <span>View property</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
          </span>
        </div>

      </div>
    </motion.article>
  );
};
