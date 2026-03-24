import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
      <div className={`px-6 py-4 rounded-2xl border ${type === 'success' ? 'bg-[#1C1C72] border-[#7B2DBF] shadow-[0_0_20px_rgba(123,45,191,0.3)]' : 'bg-white border-gray-200 shadow-lg'} text-white flex items-center gap-3`}>
        <CheckCircle size={20} className={type === 'success' ? 'text-[#7B2DBF]' : 'text-[#1C1C72]'} />
        <span className="font-bold text-white">{message}</span>
      </div>
    </div>
  );
};
