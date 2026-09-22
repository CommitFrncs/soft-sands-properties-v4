import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { formatPrice } from '../utils/format';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleInspection: (property: Property) => void;
  currency: 'NGN' | 'USD';
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemoveFavorite,
  onSelectProperty,
  onScheduleInspection,
  currency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1A1816]/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-[#FAFAF7] h-full shadow-2xl flex flex-col border-l border-[#E8E6DF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Liquid Glass */}
        <div className="px-6 py-5 border-b border-white/60 liquid-glass flex items-center justify-between">
          <div>
            <h3 className="font-normal text-base text-[#1A1816]">
              Saved Properties
            </h3>
            <p className="text-xs text-[#7A756D] font-light">
              {savedProperties.length} {savedProperties.length === 1 ? 'home' : 'homes'} shortlisted
            </p>
          </div>
          <button
            onClick={onClose}
            className="liquid-glass-pill p-1.5 rounded-full text-[#7A756D] hover:text-[#1A1816] transition-all hover:scale-105"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedProperties.length > 0 ? (
            savedProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl border border-[#E8E6DF] p-3.5 flex gap-3.5 group hover:border-[#1A1816] transition-all"
              >
                <div 
                  className="w-20 h-20 rounded-xl overflow-hidden shrink-0 cursor-pointer bg-[#E8E6DF]"
                  onClick={() => {
                    onClose();
                    onSelectProperty(property);
                  }}
                >
                  <img
                    src={property.mainImage}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-sm font-normal text-[#1A1816]">
                        {formatPrice(property.priceNaira, currency)}
                      </span>
                      <button
                        onClick={() => onRemoveFavorite(property.id)}
                        className="text-[#9C968C] hover:text-[#1A1816] p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </div>

                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectProperty(property);
                      }}
                      className="text-xs font-normal text-[#1A1816] line-clamp-1 cursor-pointer hover:underline"
                    >
                      {property.title}
                    </h4>

                    <span className="text-[11px] text-[#7A756D] font-light block truncate">
                      {property.estateName}, {property.locationArea}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2 text-[11px]">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(property);
                      }}
                      className="text-[#1A1816] hover:underline"
                    >
                      View details
                    </button>
                    <span className="text-[#D6D3CB]">·</span>
                    <button
                      onClick={() => {
                        onClose();
                        onScheduleInspection(property);
                      }}
                      className="text-[#635E56] hover:text-[#1A1816]"
                    >
                      Book tour
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-[#8A847B] space-y-2">
              <p className="text-sm font-normal text-[#1A1816]">No properties saved</p>
              <p className="text-xs text-[#7A756D] font-light max-w-xs mx-auto">
                Click the heart on any property card to save and compare residences.
              </p>
            </div>
          )}
        </div>

        {/* Footer with Liquid Glass */}
        {savedProperties.length > 0 && (
          <div className="p-6 border-t border-white/60 liquid-glass">
            <button
              onClick={() => {
                onClose();
                onScheduleInspection(savedProperties[0]);
              }}
              className="w-full py-3 rounded-full bg-[#1A1816] hover:bg-[#2E3B33] text-[#FAFAF7] text-xs font-normal transition-colors flex items-center justify-center gap-2"
            >
              <span>Schedule Inspection for Saved</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
