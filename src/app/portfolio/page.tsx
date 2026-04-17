"use client";

import React from 'react';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="bg-white min-h-screen text-[#1C1C72] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden relative">

      {/* Decorative ambient blobs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #7B2DBF 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #1C1C72 0%, transparent 70%)' }}
      />

      {/* Badge */}
      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5F5F7] border border-[#7B2DBF]/20 text-[#7B2DBF] text-xs font-bold tracking-widest uppercase mb-10 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#7B2DBF] animate-pulse" />
        Portfolio · Coming Soon
      </span>

      {/* Heading */}
      <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-center mb-6 leading-none"
          style={{ background: 'linear-gradient(135deg, #1C1C72 40%, #7B2DBF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Under<br />Construction
      </h1>

      {/* Sub-copy */}
      <p className="text-lg md:text-xl text-gray-500 font-medium text-center max-w-xl mb-4 leading-relaxed">
        We&apos;re curating <strong className="text-[#1C1C72]">100+ completed masterpieces</strong> to showcase here — each one a story of space, structure, and soul.
      </p>
      <p className="text-sm text-gray-400 text-center max-w-md mb-14">
        High-resolution project photography is being processed. Check back soon.
      </p>

      {/* Progress bar decoration */}
      <div className="w-full max-w-xs bg-gray-100 rounded-full h-1.5 mb-14 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: '68%', background: 'linear-gradient(90deg, #1C1C72, #7B2DBF)' }}
        />
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/start-project"
          className="bg-[#1C1C72] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-gradient-to-r hover:from-[#1C1C72] hover:to-[#7B2DBF] hover:shadow-[0_0_24px_rgba(123,45,191,0.4)] transition-all duration-300"
        >
          Start Your Project
        </Link>
        <Link
          href="/"
          className="text-[#1C1C72] border border-[#1C1C72]/20 px-8 py-4 rounded-full font-bold text-base hover:border-[#7B2DBF] hover:text-[#7B2DBF] transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

      {/* Bottom footnote */}
      <p className="mt-20 text-xs text-gray-300 tracking-wider uppercase">
        Agnaa Design Studio · Hyderabad
      </p>
    </div>
  );
}
