import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '../data';
import { ArrowLeft, BookOpen, CheckCircle2, HelpCircle, ExternalLink } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);
  if (!post) return { title: 'Post Not Found | AGNAA' };

  return {
    title: `${post.title} | AGNAA Design Studio Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://blog.agnaa.in/post/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // JSON-LD Structured Schema for GEO / AI Search
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: 'AGNAA Design Studio',
      url: 'https://agnaa.in/design-studio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AGNAA',
      url: 'https://agnaa.in',
    },
    about: post.category,
    citation: post.backlinks.filter(b => b.type === 'external').map(b => b.url),
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Helper function to render Markdown content & parse clickable backlinks
  const renderFormattedContent = (rawContent: string) => {
    let formatted = rawContent
      // Render headers
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-black text-[#1C1C72] mt-8 mb-4 tracking-tight">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-black text-[#1C1C72] mt-10 mb-5 tracking-tight">$2</h2>')
      // Render bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#1C1C72]">$1</strong>')
      // Render markdown links into styled clickable <a> backlinks
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#7B2DBF] font-bold underline hover:text-[#1C1C72] decoration-2 underline-offset-2 transition-colors">$1</a>'
      )
      // Render bullet lists
      .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc text-gray-700 font-medium my-1">$1</li>')
      // Render linebreaks
      .replace(/\n\n/g, '</p><p class="my-4 text-gray-700 leading-relaxed font-medium">')
      .replace(/\n/g, '<br/>');

    return `<p class="my-4 text-gray-700 leading-relaxed font-medium">${formatted}</p>`;
  };

  return (
    <div className="bg-white min-h-screen text-[#1C1C72] pt-24 pb-20">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* HEADER */}
      <section className="py-12 md:py-20 bg-[#F5F5F7] border-b border-gray-200 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#7B2DBF] hover:text-[#1C1C72] mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Journal Index
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            <span className="bg-[#1C1C72] text-white px-3 py-1 rounded-full">{post.category}</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1C1C72] leading-tight mb-6 tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="text-sm font-bold text-[#1C1C72]">
              Spoken by: <span className="text-[#7B2DBF]">{post.author}</span>
            </div>
            <div className="text-xs text-gray-400 font-semibold">
              Primary Reference: <span className="text-[#1C1C72] font-bold">{post.bookSource}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT BODY */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        {/* DIRECT ANSWER BOX (GEO OPTIMIZED) */}
        <div className="bg-[#1C1C72]/5 border-l-4 border-[#7B2DBF] p-6 md:p-8 rounded-r-2xl mb-12 shadow-sm">
          <div className="flex items-center gap-2 text-[#7B2DBF] font-black text-xs uppercase tracking-widest mb-3">
            <BookOpen size={16} /> Direct Answer (AGNAA Engineering Standard)
          </div>
          <p className="text-base md:text-lg font-semibold text-[#1C1C72] leading-relaxed">
            {post.directAnswer}
          </p>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 mb-12 shadow-[0_10px_30px_rgba(28,28,114,0.03)]">
          <h3 className="text-lg font-black text-[#1C1C72] mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-[#7B2DBF]" size={20} /> Executive Key Takeaways
          </h3>
          <ul className="space-y-3">
            {post.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm md:text-base font-medium text-gray-600">
                <span className="w-2 h-2 rounded-full bg-[#7B2DBF] mt-2 shrink-0"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ARTICLE TEXT WITH PARSED CLICKABLE BACKLINKS */}
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium mb-16 space-y-6">
          <div dangerouslySetInnerHTML={{ __html: renderFormattedContent(post.content) }} />
        </article>

        {/* FAQ ACCORDION / BOX */}
        <div className="bg-[#F5F5F7] rounded-3xl p-6 md:p-10 mb-16 border border-gray-200">
          <h3 className="text-2xl font-black text-[#1C1C72] mb-6 flex items-center gap-2">
            <HelpCircle className="text-[#7B2DBF]" size={24} /> Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {post.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200">
                <h4 className="font-bold text-lg text-[#1C1C72] mb-2">{faq.question}</h4>
                <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AUTHORITATIVE BACKLINKS & AGNAA HUB CARDS */}
        <div className="border-t border-gray-200 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">
              Verified Backlinks & Citation Hub ({post.backlinks.length} Active Links)
            </h4>
            <span className="text-xs font-bold text-[#7B2DBF] bg-[#7B2DBF]/10 px-3 py-1 rounded-full">
              DoFollow Backlinks Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {post.backlinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target={link.type === 'external' ? '_blank' : '_self'}
                rel={link.type === 'external' ? 'noopener noreferrer' : 'dofollow'}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#7B2DBF] hover:bg-[#7B2DBF]/5 transition-all text-sm font-bold text-[#1C1C72] shadow-sm hover:shadow-md"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7B2DBF]"></span>
                  {link.label}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#7B2DBF] font-extrabold">
                  {link.type === 'internal' ? 'AGNAA Hub 🔗' : 'External Citation ↗'}
                </span>
              </a>
            ))}
          </div>

          {/* GLOBAL AGNAA CALC & SERVICE BACKLINK FOOTER BAR */}
          <div className="bg-[#1C1C72] text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-black mb-2">Need Exact Feasibility & Cost Calculations?</h4>
              <p className="text-sm text-gray-300 font-medium">
                Calculate custom setbacks, RCC steel tonnage, FSI bonuses, and Vastu compliance instantly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="https://agnaa.in/start-project"
                target="_blank"
                rel="dofollow"
                className="bg-[#7B2DBF] hover:bg-[#6824A3] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
              >
                Project Estimator ↗
              </a>
              <a
                href="https://agnaa.in/design-studio"
                target="_blank"
                rel="dofollow"
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors border border-white/20"
              >
                Design Studio Hub ↗
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
