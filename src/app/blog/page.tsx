import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from './data';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

export const metadata = {
  title: 'Architectural Research Journal | AGNAA Hyderabad',
  description: 'First-principles architectural insights, structural engineering masterclasses, and design philosophy by Ar. M. Sridhar Chauhan (SPA Delhi).',
  alternates: {
    canonical: 'https://agnaa.in/blog',
  },
};

export default function BlogListingPage() {
  return (
    <div className="bg-white min-h-screen text-[#1C1C72] pt-24">
      {/* HEADER */}
      <section className="py-16 md:py-24 text-center px-4 bg-[#F5F5F7] border-b border-gray-200 relative overflow-hidden">
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7B2DBF]/20 to-transparent"></div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1C72]/5 text-[#7B2DBF] font-bold text-xs uppercase tracking-widest mb-4">
          <BookOpen size={14} /> blog.agnaa.in Knowledge Engine
        </div>
        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-[#1C1C72]">
          AGNAA Architectural Journal
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-bold max-w-2xl mx-auto">
          First-Principles Architecture • Structural Physics • Human Ergonomics | Spoken by AGNAA Design Studio
        </p>
      </section>

      {/* POSTS GRID */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(28,28,114,0.08)] hover:border-[#7B2DBF]/40 transition-all duration-500 hover:-translate-y-2 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#7B2DBF] uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1"><Tag size={12}/> {post.category}</span>
                    <span className="flex items-center gap-1 text-gray-400 font-medium"><Clock size={12}/> {post.readTime}</span>
                  </div>

                  <h2 className="text-2xl font-black mb-4 text-[#1C1C72] leading-tight group-hover:text-[#7B2DBF] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div className="text-xs text-gray-400 font-semibold mb-6 border-t border-gray-100 pt-4">
                    Based on: <span className="text-[#1C1C72] font-bold">{post.bookSource}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest text-[#1C1C72] group-hover:text-[#7B2DBF] transition-colors"
                  >
                    Read Studio Insights <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
