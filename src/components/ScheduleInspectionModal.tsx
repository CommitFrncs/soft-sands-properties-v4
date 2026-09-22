import React, { useState } from 'react';
import { X, Calendar, Video, MapPin, CheckCircle2 } from 'lucide-react';
import { Property } from '../types';

interface ScheduleInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty: Property | null;
  allProperties: Property[];
}

export const ScheduleInspectionModal: React.FC<ScheduleInspectionModalProps> = ({
  isOpen,
  onClose,
  selectedProperty,
  allProperties,
}) => {
  const [propertyId, setPropertyId] = useState<string>(selectedProperty?.id || (allProperties[0]?.id ?? ''));
  const [inspectionType, setInspectionType] = useState<'physical' | 'virtual'>('physical');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentProperty = allProperties.find((p) => p.id === propertyId) || selectedProperty || allProperties[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1816]/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#FAFAF7]/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/70 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleReset}
          className="liquid-glass-pill absolute top-5 right-5 p-2 rounded-full text-[#7A756D] hover:text-[#1A1816] transition-all hover:scale-105"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-[11px] font-normal tracking-wide text-[#7A756D] uppercase block mb-1">
                Private Viewing
              </span>
              <h3 className="text-xl font-normal text-[#1A1816] tracking-tight">
                Schedule a Visit
              </h3>
              <p className="text-xs text-[#635E56] font-light mt-1">
                Accompanied estate gate entry with a senior property advisor.
              </p>
            </div>

            {/* Tour Type Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5F4F0] rounded-xl border border-[#E8E6DF]">
              <button
                type="button"
                onClick={() => setInspectionType('physical')}
                className={`py-2 px-3 rounded-lg text-xs font-normal flex items-center justify-center gap-1.5 transition-colors ${
                  inspectionType === 'physical'
                    ? 'bg-[#1A1816] text-[#FAFAF7]'
                    : 'text-[#635E56] hover:text-[#1A1816]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Physical Estate Visit</span>
              </button>

              <button
                type="button"
                onClick={() => setInspectionType('virtual')}
                className={`py-2 px-3 rounded-lg text-xs font-normal flex items-center justify-center gap-1.5 transition-colors ${
                  inspectionType === 'virtual'
                    ? 'bg-[#1A1816] text-[#FAFAF7]'
                    : 'text-[#635E56] hover:text-[#1A1816]'
                }`}
              >
                <Video className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Live Video Tour (Diaspora)</span>
              </button>
            </div>

            {/* Property Selector */}
            <div>
              <label className="block text-xs text-[#7A756D] font-light mb-1.5">
                Selected Property
              </label>
              <select
                value={currentProperty?.id}
                onChange={(e) => setPropertyId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816] text-[#1A1816]"
              >
                {allProperties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.estateName})
                  </option>
                ))}
              </select>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#7A756D] font-light mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oluwaseun Adeleke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816] text-[#1A1816]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#7A756D] font-light mb-1">
                  WhatsApp / Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 or +44..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816] text-[#1A1816]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#7A756D] font-light mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816] text-[#1A1816]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#7A756D] font-light mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816] text-[#1A1816]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#7A756D] font-light mb-1">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#E8E6DF] focus:outline-none focus:border-[#1A1816] text-[#1A1816]"
                >
                  <option value="10:00 AM">Morning (10:00 AM)</option>
                  <option value="12:00 PM">Midday (12:00 PM)</option>
                  <option value="2:30 PM">Afternoon (2:30 PM)</option>
                  <option value="4:30 PM">Late Afternoon (4:30 PM)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#1A1816] hover:bg-[#2E3B33] text-[#FAFAF7] text-xs font-normal transition-colors"
            >
              Confirm Viewing Request
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F5F4F0] text-[#1A1816] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-normal text-[#1A1816]">
                Inspection Booked
              </h3>
              <p className="text-xs text-[#635E56] font-light max-w-xs mx-auto">
                Thank you, {fullName}. Our advisory team will reach out via WhatsApp at {phone} with your estate gate entry clearance pass.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E8E6DF] text-left text-xs text-[#635E56] font-light space-y-1">
              <p className="font-medium text-[#1A1816]">{currentProperty?.title}</p>
              <p>{currentProperty?.estateName}, {currentProperty?.locationArea}</p>
              <p className="text-[#8A847B]">{preferredDate || 'Tomorrow'} at {timeSlot} ({inspectionType === 'physical' ? 'Physical Gate Entry' : 'Live Video Tour'})</p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-[#1A1816] text-[#FAFAF7] text-xs font-normal"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
