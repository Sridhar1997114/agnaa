import React from 'react';
import { Building, MapPin, Mail, Phone } from 'lucide-react';

interface SelectedService {
  id: string;
  name: string;
  scope: string;
  days: string;
  revisions: string;
  priceLow: number;
  priceHigh: number;
}

interface QuotePDFProps {
  projectDetails: {
    name: string;
    location: string;
    planArea: number;
    elevationArea: number;
    floors: number;
    complexity: string;
  };
  services: SelectedService[];
  totalAgnaaLow: number;
  totalAgnaaHigh: number;
  totalMarketPrice: number;
  date: string;
}

export const QuotePDF: React.FC<QuotePDFProps> = ({ 
  projectDetails, 
  services, 
  totalAgnaaLow, 
  totalAgnaaHigh, 
  totalMarketPrice, 
  date 
}) => {
  return (
    <div id="quote-pdf-content" className="bg-white text-[#1C1C72] w-[794px] min-h-[1123px] relative mx-auto p-12 font-sans shadow-lg hidden">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-[#1C1C72]/10 pb-8 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-[#1C1C72] mb-1">AGNAA</h1>
          <p className="text-[#7B2DBF] font-bold tracking-widest text-sm uppercase">Design Studio</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-2xl text-[#1C1C72]">Official Quote</p>
          <p className="text-gray-500 font-medium">Date: {date}</p>
          <p className="text-gray-500 font-medium tracking-widest text-sm mt-1">VALID FOR 7 DAYS</p>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-[#F5F5F7] rounded-2xl p-6 mb-8 border border-gray-100">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Building size={20} className="text-[#7B2DBF]"/> Project Specification</h2>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div><span className="text-gray-500 block text-xs uppercase font-bold tracking-wider mb-1">Project Name</span><span className="font-bold text-lg">{projectDetails.name || 'Untitled Project'}</span></div>
          <div><span className="text-gray-500 block text-xs uppercase font-bold tracking-wider mb-1">Location</span><span className="font-bold text-lg">{projectDetails.location || 'TBA'}</span></div>
          <div><span className="text-gray-500 block text-xs uppercase font-bold tracking-wider mb-1">Total Plan Area</span><span className="font-medium text-lg">{projectDetails.planArea} sqft</span></div>
          <div><span className="text-gray-500 block text-xs uppercase font-bold tracking-wider mb-1">Elevation Area</span><span className="font-medium text-lg">{projectDetails.elevationArea} sqft</span></div>
          <div><span className="text-gray-500 block text-xs uppercase font-bold tracking-wider mb-1">Complexity</span><span className="font-medium text-lg capitalize">{projectDetails.complexity}</span></div>
          <div><span className="text-gray-500 block text-xs uppercase font-bold tracking-wider mb-1">Floors</span><span className="font-medium text-lg">G+{projectDetails.floors}</span></div>
        </div>
      </div>

      {/* Itemized Services */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Selected Services</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-[#1C1C72] text-[#1C1C72]">
              <th className="py-3 px-2 font-bold uppercase text-xs tracking-wider">Service & Scope</th>
              <th className="py-3 px-2 font-bold uppercase text-xs tracking-wider text-center">Delivery</th>
              <th className="py-3 px-2 font-bold uppercase text-xs tracking-wider text-center">Revisions</th>
              <th className="py-3 px-2 font-bold uppercase text-xs tracking-wider text-right">Investment</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="py-4 px-2">
                  <div className="font-bold text-[15px]">{s.name}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.scope}</div>
                </td>
                <td className="py-4 px-2 text-center text-sm font-medium">{s.days}</td>
                <td className="py-4 px-2 text-center text-sm font-medium">{s.revisions}</td>
                <td className="py-4 px-2 text-right font-bold text-[#1C1C72]">
                  {s.priceLow === s.priceHigh ? `₹${s.priceLow.toLocaleString()}` : `₹${s.priceLow.toLocaleString()} - ₹${s.priceHigh.toLocaleString()}`}
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr><td colSpan={4} className="py-8 text-center text-gray-400 font-medium">No services selected</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pricing Summary */}
      <div className="flex flex-col items-end mb-12">
        <div className="w-[400px] bg-gray-50 p-6 rounded-2xl border border-gray-100 text-right">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 font-medium">Standard Market Price</span>
            <span className="line-through text-lg font-bold text-gray-400">₹{totalMarketPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <span className="font-bold text-[#7B2DBF]">Agnaa Competitive Edge</span>
            <span className="text-[#7B2DBF] font-bold">~60% Savings</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[#1C1C72] font-black text-xl uppercase tracking-tighter">Total Investment</span>
            <span className="text-3xl font-black text-[#1C1C72]">
              {totalAgnaaLow === totalAgnaaHigh 
                ? `₹${totalAgnaaLow.toLocaleString()}` 
                : `₹${totalAgnaaLow.toLocaleString()} - ₹${totalAgnaaHigh.toLocaleString()}`}
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-2 font-medium">Exclusive of applicable GST (18%)</div>
        </div>
      </div>

      {/* Payment Terms & Footer */}
      <div className="mt-auto absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-gray-200 pt-8">
        <div className="w-1/2">
          <h3 className="font-bold text-sm mb-3 text-[#1C1C72]">Payment Terms</h3>
          <ul className="text-xs text-gray-500 space-y-2 font-medium">
            <li>• <strong className="text-[#1C1C72]">50% Advance</strong> — To commence work</li>
            <li>• <strong className="text-[#1C1C72]">50% Balance</strong> — On final delivery</li>
            <li>• Quote valid for exactly 7 days from generation.</li>
          </ul>
        </div>
        <div className="w-1/2 text-right">
          <p className="font-black text-[#1C1C72] text-lg mb-1">Architect Sridhar</p>
          <div className="text-xs text-gray-500 font-medium flex flex-col items-end gap-1">
            <span className="flex items-center gap-1"><MapPin size={12}/> Hyderabad, Telangana</span>
            <span className="flex items-center gap-1"><Phone size={12}/> +91 XXXXX XXXXX</span>
            <span className="flex items-center gap-1"><Mail size={12}/> studio@agnaa.in</span>
          </div>
        </div>
      </div>
    </div>
  );
};
