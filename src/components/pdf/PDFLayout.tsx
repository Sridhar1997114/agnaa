import React from 'react';

interface PDFLayoutProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * PDFLayout provides a standardized A4 page container (210mm x 297mm)
 * with dedicated print styles to ensure consistency when using browser print.
 */
export const PDFLayout: React.FC<PDFLayoutProps> = ({ children, title }) => {
  return (
    <div className="pdf-container bg-gray-100 min-h-screen py-8 print:p-0 print:bg-white">
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
        }
        
        .pdf-page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: white;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          padding: 20mm;
          box-sizing: border-box;
          position: relative;
          color: #1a1a1a;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          line-height: 1.5;
        }

        @media print {
          .pdf-page {
            margin: 0;
            box-shadow: none;
            width: 100%;
            min-height: 100vh;
            padding: 15mm;
          }
          .pdf-container {
            padding: 0 !important;
          }
        }
      `}</style>
      
      {title && (
        <div className="max-w-[210mm] mx-auto mb-4 px-4 flex justify-between items-center no-print">
          <h1 className="text-sm font-medium text-gray-500 uppercase tracking-widest">{title}</h1>
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors shadow-lg"
          >
            Digital Export (PDF)
          </button>
        </div>
      )}
      
      <div className="pdf-page">
        {children}
      </div>
    </div>
  );
};
