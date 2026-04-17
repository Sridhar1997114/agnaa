"use client";

import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, Building } from 'lucide-react';
import { PROJECTS } from '@/constants';
import { ProjectModal } from '@/components/ProjectModal';
import Image from 'next/image';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [modalProject, setModalProject] = useState<any>(null);

  const filters = ['All', 'Residential', 'Commercial', 'Interiors', 'Landscape'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchFilter = activeFilter === 'All' || p.type === activeFilter;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.loc.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="bg-white min-h-screen text-[#1C1C72] pt-24">
      <section className="py-16 md:py-20 text-center px-4">
        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-[#1C1C72]">Proof: 100+ Masterpieces</h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">Filter by Type | Location | Year | Led by Architect Sridhar</p>
      </section>

      <section className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-xl border-y border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap md:flex-nowrap gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {filters.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${activeFilter === cat ? 'bg-[#1C1C72] text-white border-[#7B2DBF] shadow-[0_0_15px_rgba(123,45,191,0.4)]' : 'bg-[#F5F5F7] text-gray-500 border-transparent hover:border-[#7B2DBF]/50 hover:text-[#1C1C72]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <input 
              type="search" 
              placeholder="Search e.g. Jubilee Hills..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-transparent rounded-full px-5 py-2.5 text-sm font-bold focus:outline-none focus:bg-white focus:border-[#7B2DBF] focus:ring-4 focus:ring-[#7B2DBF]/20 transition-all text-[#1C1C72] placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              onClick={() => setModalProject(project)}
              className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/5] shadow-[0_8px_30px_rgba(28,28,114,0.04)] hover:shadow-[0_15px_40px_rgba(123,45,191,0.2)] hover:border hover:border-[#7B2DBF]/50 transition-all duration-500"
            >
              <Image src={project.img} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C72]/90 via-[#1C1C72]/40 to-transparent group-hover:from-[#1C1C72]/95 group-hover:to-[#7B2DBF]/30 flex flex-col justify-end p-8 opacity-90 group-hover:opacity-100 transition-all duration-500">
                <span className="text-white bg-[#1C1C72]/60 backdrop-blur-md w-fit px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-white/10 group-hover:border-[#7B2DBF]/50">{project.type}</span>
                <h3 className="text-3xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-200 text-sm font-medium flex items-center gap-2"><MapPin size={16} className="text-[#7B2DBF]"/> {project.loc} • {project.year}</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                  <span className="bg-white text-[#1C1C72] px-6 py-3 rounded-full text-sm font-bold inline-block hover:shadow-[0_0_15px_rgba(123,45,191,0.4)] hover:text-[#7B2DBF] transition-all">View Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="text-center py-32 text-gray-400 font-bold text-lg">No projects found matching your criteria.</div>
        )}
      </section>

      <section className="py-24 md:py-32 bg-[#F5F5F7] border-t border-gray-200">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
          <div className="relative aspect-square max-w-md mx-auto">
            <Image src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" alt="Architect Sridhar" fill className="rounded-full shadow-[0_20px_60px_rgba(28,28,114,0.1)] grayscale hover:grayscale-0 hover:shadow-[0_20px_60px_rgba(123,45,191,0.2)] transition-all duration-700 border-4 border-transparent hover:border-[#7B2DBF]/20 object-cover" />
          </div>
          </div>
          <div>
            <h2 className="text-5xl font-black mb-8 tracking-tighter text-[#1C1C72]">Architect Sridhar <br/> From Leukemia to Legacy</h2>
            <blockquote className="text-2xl font-medium text-gray-500 mb-10 border-l-4 border-[#7B2DBF] pl-8 leading-relaxed">
              "Surviving mixed phenotype acute leukemia, I realized time is our only true currency. I built AGNAA to embody Mind, Body, and Soul in every structure we touch."
            </blockquote>
            <a href="/start-project" className="inline-block bg-[#1C1C72] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-[#1C1C72] hover:to-[#7B2DBF] hover:shadow-[0_0_20px_rgba(123,45,191,0.4)] transition-all">Start Your Legacy Project</a>
          </div>
        </div>
      </section>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
}
