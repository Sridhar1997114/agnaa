import React from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0D0D14] text-[#F0F0F6] font-sans">
      <main>
        {children}
      </main>
    </div>
  );
}
