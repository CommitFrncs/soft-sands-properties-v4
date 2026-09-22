import React from 'react';
import { Property, FilterState, EstateLocation } from '../types';
import { PropertyCard } from './PropertyCard';

interface PropertyListingsProps {
  properties: Property[];
  allProperties: Property[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  currency: 'NGN' | 'USD';
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleInspection: (property: Property) => void;
}

const QUICK_ESTATE_TABS: { label: string; value: EstateLocation }[] = [
  { label: 'All', value: 'All' },
  { label: 'Alalubosa GRA', value: 'Alalubosa GRA' },
  { label: 'Kolapo Ishola', value: 'Kolapo Ishola Estate' },
  { label: 'Jericho GRA', value: 'Jericho GRA' },
  { label: 'Bodija', value: 'Bodija Estate' },
  { label: 'Aerodrome', value: 'Aerodrome Estate' },
];

export const PropertyListings: React.FC<PropertyListingsProps> = ({
  properties,
  allProperties,
  filters,
  onFilterChange,
  onResetFilters,
  currency,
  savedIds,
  onToggleSave,
  onSelectProperty,
  onScheduleInspection,
}) => {
  return (
    <section id="properties-section" className="py-12 sm:py-24 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#E8E6DF] mb-10">
          <div>
            <span className="text-[12px] font-normal tracking-wide text-[#7A756D] uppercase block mb-2">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#1A1816] tracking-tight">
              Gated Properties in Ibadan
            </h2>
          </div>

          {/* Location Tabs & Sort */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#7A756D]">
            
            {/* Quick Location Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {QUICK_ESTATE_TABS.map((tab) => {
                const isSelected = filters.location === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => onFilterChange({ ...filters, location: tab.value })}
                    className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap text-xs font-normal ${
                      isSelected
                        ? 'bg-[#1A1816] text-[#FAFAF7] shadow-xs'
                        : 'hover:liquid-glass-pill hover:text-[#1A1816] text-[#7A756D]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#E8E6DF]">
              <span className="text-[#8A847B]">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
                className="bg-transparent text-[#1A1816] font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price (low to high)</option>
                <option value="price-desc">Price (high to low)</option>
                <option value="size-desc">Largest size</option>
                <option value="newest">Newest</option>
              </select>
            </div>

          </div>
        </div>

        {/* 3-Column Property Grid with Generous Whitespace */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {properties.map((property, idx) => (
              <PropertyCard
                key={property.id}
                index={idx}
                property={property}
                currency={currency}
                isSaved={savedIds.includes(property.id)}
                onToggleSave={onToggleSave}
                onSelectProperty={onSelectProperty}
                onScheduleInspection={onScheduleInspection}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center max-w-sm mx-auto">
            <p className="text-sm font-normal text-[#1A1816] mb-1">
              No matching properties found
            </p>
            <p className="text-xs text-[#7A756D] font-light mb-5">
              Try adjusting your filter parameters to see available listings in other Ibadan estates.
            </p>
            <button
              onClick={onResetFilters}
              className="px-5 py-2 rounded-full border border-[#E8E6DF] text-xs text-[#1A1816] hover:bg-[#F4F3EE] transition-colors"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
