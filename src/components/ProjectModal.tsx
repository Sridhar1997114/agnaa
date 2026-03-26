import React from 'react';
import { X, MapPin, Calendar, Building, Box } from 'lucide-react';
import { Button } from './Button';

interface Project {
  id: number;
  title: string;
  loc: string;
  year: number;
  type: string;
  area: string;
  img: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_30px_60px_rgba(28,28,114,0.1),0_0_40px_rgba(123,45,191,0.1)] border border-gray-100 focus:outline-none">
        <div className="relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md text-[#1C1C72] rounded-full hover:bg-white hover:text-[#7B2DBF] hover:shadow-[0_0_15px_rgba(123,45,191,0.3)] transition-all z-10"
          >
            <X size={24} />
          </button>
          <img src={project.img} alt={project.title} className="w-full h-64 md:h-96 object-cover rounded-t-3xl" />
        </div>
        <div className="p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1C1C72] mb-4">{project.title}</h2>
          <div className="flex flex-wrap gap-6 text-gray-500 mb-8 font-bold">
            <span className="flex items-center gap-2"><MapPin size={18} className="text-[#7B2DBF]"/> {project.loc}</span>
            <span className="flex items-center gap-2"><Calendar size={18} className="text-[#7B2DBF]"/> {project.year}</span>
            <span className="flex items-center gap-2"><Building size={18} className="text-[#7B2DBF]"/> {project.area} sqft</span>
          </div>
          <p className="text-[#1C1C72]/80 mb-10 text-lg leading-relaxed font-medium">
            A masterclass in modern {project.type.toLowerCase()} design located in the heart of {project.loc}. 
            This project showcases AGNAA's commitment to precision, utilizing local materials and advanced structural techniques to deliver a timeless aesthetic.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/start-project" variant="primary" className="px-8 py-4">Like This? Start Yours</Button>
            <a 
              href={`https://arc.agnaa.in?scene=${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(123,45,191,0.5)] rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden text-center"
            >
              Explore in 3D <Box size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
