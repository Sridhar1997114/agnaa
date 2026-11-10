"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { MASTER_STUDIO_REGISTRY, DisciplineType } from '@/data/studioProjects';

export function ProjectsFilterIsland() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineType>('All Disciplines');

  const filteredProjects = useMemo(() => {
    if (activeDiscipline === 'All Disciplines') {
      return MASTER_STUDIO_REGISTRY.slice(0, 6);
    }
    return MASTER_STUDIO_REGISTRY.filter(p => p.discipline === activeDiscipline).slice(0, 6);
  }, [activeDiscipline]);

  return (
    <div className="space-y-10">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          'All Disciplines',
          'Spatial Architecture',
          'Software & Systems',
          'Bespoke Furniture',
          '3D Cinema & Film'
        ].map((disc) => (
          <button
            key={disc}
            onClick={() => setActiveDiscipline(disc as DisciplineType)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              activeDiscipline === disc
                ? 'bg-[#1C1C72] text-white border-[#1C1C72] shadow-sm'
                : 'bg-[#F8F9FA] text-[#5F6368] border-black/[0.08] hover:border-black/[0.2] hover:text-[#1C1C72]'
            }`}
          >
            {disc}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((p) => (
          <Link
            key={p.id}
            href={`/design-studio/${p.id}`}
            className="rounded-3xl border border-black/[0.08] bg-[#F8F9FA] overflow-hidden flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(28,28,114,0.08)] hover:border-[#7B2DBF]/40 transition-all duration-500 group"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                <Image 
                  src={p.image || '/projects/manila/sunder-nursery-garden-house.webp'} 
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase">
                  {p.year}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5F6368]">
                  <span className="font-bold text-[#7B2DBF]">{p.discipline}</span>
                  <span>{p.location}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1C1C72] group-hover:text-[#2563EB] transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-[#5F6368] font-medium line-clamp-2 leading-relaxed">
                  {p.scope}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-black/[0.05] mt-4 flex items-center justify-between text-xs font-bold text-[#1C1C72]">
              <span className="group-hover:text-[#7B2DBF] flex items-center gap-1">
                <span>Inspect Dossier</span>
                <ArrowUpRight size={14} />
              </span>
              <span className="text-[11px] font-mono text-slate-400">{p.clientOrContext}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectsFilterIsland;
