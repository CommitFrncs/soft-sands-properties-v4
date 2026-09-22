import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyListings } from './components/PropertyListings';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TrustStats } from './components/TrustStats';
import { LiveViewingSection } from './components/LiveViewingSection';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ScheduleInspectionModal } from './components/ScheduleInspectionModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Footer } from './components/Footer';
import { PROPERTIES_DATA } from './data/properties';
import { Property, FilterState, EstateLocation } from './types';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  location: 'All',
  propertyType: 'All',
  minPrice: 0,
  maxPrice: 1000000000,
  bedrooms: 'any',
  sortBy: 'recommended',
};

export default function App() {
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  
  // Selected Property for Detail Modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Saved Properties state (persisted in localStorage)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('soft_sands_saved_ids');
      return stored ? JSON.parse(stored) : ['ssp-001'];
    } catch {
      return ['ssp-001'];
    }
  });

  // Modals state
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleProperty, setScheduleProperty] = useState<Property | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Sync savedIds to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('soft_sands_saved_ids', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenSchedule = (property?: Property) => {
    if (property) {
      setScheduleProperty(property);
    } else {
      setScheduleProperty(null);
    }
    setIsScheduleOpen(true);
  };

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((item) => {
      // Search query filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesQuery = 
          item.title.toLowerCase().includes(query) ||
          item.estateName.toLowerCase().includes(query) ||
          item.locationArea.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.titleType.toLowerCase().includes(query) ||
          item.features.some(f => f.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      // Location filter
      if (filters.location !== 'All') {
        if (item.locationArea !== filters.location) return false;
      }

      // Property type filter
      if (filters.propertyType !== 'All') {
        if (item.propertyType !== filters.propertyType) return false;
      }

      // Price filter
      if (item.priceNaira < filters.minPrice || item.priceNaira > filters.maxPrice) {
        return false;
      }

      // Bedroom filter
      if (filters.bedrooms !== 'any') {
        if (item.bedrooms < filters.bedrooms) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        return a.priceNaira - b.priceNaira;
      }
      if (filters.sortBy === 'price-desc') {
        return b.priceNaira - a.priceNaira;
      }
      if (filters.sortBy === 'size-desc') {
        return b.sizeSqm - a.sizeSqm;
      }
      if (filters.sortBy === 'newest') {
        return b.id.localeCompare(a.id);
      }
      // 'recommended' default: featured first, then price
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [filters]);

  const savedPropertiesList = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1816] flex flex-col font-sans selection:bg-[#EAE8E1] selection:text-[#1A1816]">
      {/* Header */}
      <Header
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'NGN' ? 'USD' : 'NGN'))}
        savedCount={savedIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenSchedule={() => handleOpenSchedule()}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Simple, visually strong Hero with integrated search */}
        <Hero
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={() => setFilters(INITIAL_FILTERS)}
          totalMatches={filteredProperties.length}
          onSelectFeatured={() => setSelectedProperty(PROPERTIES_DATA[0])}
        />

        {/* Clean Property Listings (3 columns desktop, photography-focused) */}
        <PropertyListings
          properties={filteredProperties}
          allProperties={PROPERTIES_DATA}
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={() => setFilters(INITIAL_FILTERS)}
          currency={currency}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onScheduleInspection={(prop) => handleOpenSchedule(prop)}
        />

        {/* Why Choose Us - 3–4 concise value propositions, visually light */}
        <WhyChooseUs onOpenSchedule={() => handleOpenSchedule()} />

        {/* Statistics - Elegant, not like a dashboard */}
        <TrustStats
          onSelectEstateLocation={(estateLoc) => {
            setFilters((prev) => ({
              ...prev,
              location: estateLoc as EstateLocation,
            }));
          }}
        />

        {/* Live Property Viewing Feature (Walkthrough Videos & Location Map) */}
        <LiveViewingSection
          onOpenVideoTour={() => setSelectedProperty(PROPERTIES_DATA[1])}
          onOpenLocationTour={() => {
            const el = document.getElementById('about-estates');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* Simple, Clean Footer */}
      <Footer onOpenSchedule={() => handleOpenSchedule()} />

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        currency={currency}
        isSaved={selectedProperty ? savedIds.includes(selectedProperty.id) : false}
        onToggleSave={handleToggleSave}
        onScheduleInspection={(prop) => {
          setSelectedProperty(null);
          handleOpenSchedule(prop);
        }}
      />

      {/* Schedule Inspection Modal */}
      <ScheduleInspectionModal
        isOpen={isScheduleOpen}
        onClose={() => {
          setIsScheduleOpen(false);
          setScheduleProperty(null);
        }}
        selectedProperty={scheduleProperty}
        allProperties={PROPERTIES_DATA}
      />

      {/* Shortlisted Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        savedProperties={savedPropertiesList}
        onRemoveFavorite={handleToggleSave}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onScheduleInspection={(prop) => {
          setIsFavoritesOpen(false);
          handleOpenSchedule(prop);
        }}
        currency={currency}
      />
    </div>
  );
}
