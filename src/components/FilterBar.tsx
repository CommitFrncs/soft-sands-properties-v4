import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { FilterState, EstateLocation, PropertyType } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalMatches: number;
}

const LOCATIONS: { label: string; value: EstateLocation }[] = [
  { label: 'All locations in Ibadan', value: 'All' },
  { label: 'Alalubosa GRA', value: 'Alalubosa GRA' },
  { label: 'Kolapo Ishola / Akobo', value: 'Kolapo Ishola Estate' },
  { label: 'Jericho GRA', value: 'Jericho GRA' },
  { label: 'Bodija Estate', value: 'Bodija Estate' },
  { label: 'Aerodrome Estate / Samonda', value: 'Aerodrome Estate' },
  { label: 'Oluyole Estate', value: 'Oluyole Estate' },
  { label: 'Carlton Gate Estate', value: 'Carlton Gate Estate' },
];

const PROPERTY_TYPES: { label: string; value: PropertyType }[] = [
  { label: 'All property types', value: 'All' },
  { label: 'Detached Duplex', value: 'Detached Duplex' },
  { label: 'Terrace Duplex', value: 'Terrace Duplex' },
  { label: 'Semi-Detached', value: 'Semi-Detached' },
  { label: 'Luxury Bungalow', value: 'Luxury Bungalow' },
  { label: 'Serviced Land', value: 'Serviced Land' },
];

const PRICE_RANGES = [
  { label: 'Any price', min: 0, max: 1000000000 },
  { label: 'Under ₦80M', min: 0, max: 80000000 },
  { label: '₦80M – ₦120M', min: 80000000, max: 120000000 },
  { label: '₦120M – ₦180M', min: 120000000, max: 180000000 },
  { label: 'Above ₦180M', min: 180000000, max: 1000000000 },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalMatches,
}) => {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const activeFiltersCount = 
    (filters.location !== 'All' ? 1 : 0) +
    (filters.propertyType !== 'All' ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 1000000000 ? 1 : 0) +
    (filters.bedrooms !== 'any' ? 1 : 0) +
    (filters.searchQuery.trim() !== '' ? 1 : 0);

  const currentPriceRangeIndex = PRICE_RANGES.findIndex(
    (p) => p.min === filters.minPrice && p.max === filters.maxPrice
  );

  return (
    <>
      {/* Desktop & Tablet Unobtrusive Search Bar */}
      <div className="w-full liquid-glass rounded-2xl p-2.5 sm:p-3 text-[#1A1816] transition-all">
        
        {/* Mobile View Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#9C968C] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
            <input
              type="text"
              placeholder="Search estates or homes..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-white/70 backdrop-blur-xs rounded-xl border border-white/60 focus:outline-none focus:ring-1 focus:ring-[#1A1816] text-[#1A1816] placeholder:text-[#9C968C]"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsMobileModalOpen(true)}
            className="liquid-glass-pill flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[#1A1816] text-xs font-medium shrink-0 hover:scale-105 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#1A1816] text-[#FAFAF7] text-[10px] flex items-center justify-center font-medium">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop Integrated Clean Layout */}
        <div className="hidden md:flex items-center justify-between gap-3 px-2">
          
          {/* Location Selector */}
          <div className="flex-1 py-1.5 px-3 rounded-xl hover:bg-[#F9F8F5] transition-colors border-r border-[#EFECE6] last:border-none">
            <label className="block text-[11px] font-normal text-[#8A847B] uppercase tracking-wider mb-0.5">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value as EstateLocation })}
              className="w-full bg-transparent text-[13px] font-medium text-[#1A1816] focus:outline-none cursor-pointer appearance-none truncate"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="flex-1 py-1.5 px-3 rounded-xl hover:bg-[#F9F8F5] transition-colors border-r border-[#EFECE6] last:border-none">
            <label className="block text-[11px] font-normal text-[#8A847B] uppercase tracking-wider mb-0.5">
              Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value as PropertyType })}
              className="w-full bg-transparent text-[13px] font-medium text-[#1A1816] focus:outline-none cursor-pointer appearance-none truncate"
            >
              {PROPERTY_TYPES.map((pt) => (
                <option key={pt.value} value={pt.value}>
                  {pt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex-1 py-1.5 px-3 rounded-xl hover:bg-[#F9F8F5] transition-colors border-r border-[#EFECE6] last:border-none">
            <label className="block text-[11px] font-normal text-[#8A847B] uppercase tracking-wider mb-0.5">
              Budget
            </label>
            <select
              value={currentPriceRangeIndex !== -1 ? currentPriceRangeIndex : 0}
              onChange={(e) => {
                const selected = PRICE_RANGES[Number(e.target.value)];
                onFilterChange({
                  ...filters,
                  minPrice: selected.min,
                  maxPrice: selected.max,
                });
              }}
              className="w-full bg-transparent text-[13px] font-medium text-[#1A1816] focus:outline-none cursor-pointer appearance-none truncate"
            >
              {PRICE_RANGES.map((pr, idx) => (
                <option key={idx} value={idx}>
                  {pr.label}
                </option>
              ))}
            </select>
          </div>

          {/* Keyword Search */}
          <div className="flex-1 py-1.5 px-3 rounded-xl hover:bg-[#F9F8F5] transition-colors">
            <label className="block text-[11px] font-normal text-[#8A847B] uppercase tracking-wider mb-0.5">
              Keywords
            </label>
            <input
              type="text"
              placeholder="e.g. Alalubosa, Pool"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              className="w-full bg-transparent text-[13px] font-medium text-[#1A1816] placeholder:text-[#9C968C] focus:outline-none truncate"
            />
          </div>

          {/* Quick Clear if filters active */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="p-2 text-[#8A847B] hover:text-[#1A1816] transition-colors"
              title="Reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          )}

          {/* Results Count Pill */}
          <div className="pl-2 pr-1 text-right shrink-0">
            <span className="text-xs text-[#8A847B]">
              <span className="font-medium text-[#1A1816]">{totalMatches}</span> available
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1A1816]/40 backdrop-blur-xs p-4">
          <div className="w-full sm:max-w-md bg-[#FAFAF7] rounded-3xl shadow-xl p-6 space-y-5 max-h-[85vh] overflow-y-auto border border-[#E8E6DF]">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF]">
              <h3 className="font-medium text-base text-[#1A1816]">Filter Properties</h3>
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="p-1 rounded-full text-[#7A756D] hover:text-[#1A1816]"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Keyword */}
            <div>
              <label className="block text-xs text-[#7A756D] mb-1.5 font-normal">Search by keyword</label>
              <input
                type="text"
                placeholder="e.g. Alalubosa, Swimming Pool, C of O"
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#FFFFFF] rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816]"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs text-[#7A756D] mb-1.5 font-normal">Location</label>
              <select
                value={filters.location}
                onChange={(e) => onFilterChange({ ...filters, location: e.target.value as EstateLocation })}
                className="w-full px-4 py-2.5 text-sm bg-[#FFFFFF] rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816]"
              >
                {LOCATIONS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs text-[#7A756D] mb-1.5 font-normal">Property Type</label>
              <select
                value={filters.propertyType}
                onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value as PropertyType })}
                className="w-full px-4 py-2.5 text-sm bg-[#FFFFFF] rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816]"
              >
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs text-[#7A756D] mb-1.5 font-normal">Budget Range</label>
              <select
                value={currentPriceRangeIndex !== -1 ? currentPriceRangeIndex : 0}
                onChange={(e) => {
                  const selected = PRICE_RANGES[Number(e.target.value)];
                  onFilterChange({
                    ...filters,
                    minPrice: selected.min,
                    maxPrice: selected.max,
                  });
                }}
                className="w-full px-4 py-2.5 text-sm bg-[#FFFFFF] rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816]"
              >
                {PRICE_RANGES.map((pr, idx) => (
                  <option key={idx} value={idx}>{pr.label}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs text-[#7A756D] mb-2 font-normal">Bedrooms</label>
              <div className="grid grid-cols-4 gap-2">
                {(['any', 3, 4, 5] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => onFilterChange({ ...filters, bedrooms: b })}
                    className={`py-2 rounded-xl text-xs font-normal transition-colors border ${
                      filters.bedrooms === b
                        ? 'bg-[#1A1816] text-[#FAFAF7] border-[#1A1816]'
                        : 'bg-[#FFFFFF] text-[#1A1816] border-[#E8E6DF]'
                    }`}
                  >
                    {b === 'any' ? 'Any' : `${b}+ Beds`}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#E8E6DF] flex gap-3">
              <button
                type="button"
                onClick={() => {
                  onResetFilters();
                  setIsMobileModalOpen(false);
                }}
                className="flex-1 py-3 rounded-full border border-[#E8E6DF] text-[#1A1816] text-xs font-medium"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="flex-1 py-3 rounded-full bg-[#1A1816] text-[#FAFAF7] text-xs font-medium"
              >
                Show {totalMatches} {totalMatches === 1 ? 'home' : 'homes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
