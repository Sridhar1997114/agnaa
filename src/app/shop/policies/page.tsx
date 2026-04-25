import React from 'react';
import { ArrowLeft, Shield, FileText, Gavel } from 'lucide-react';
import Link from 'next/link';

export default function PoliciesPage() {
  const policies = [
    {
      icon: <Shield className="text-brand-violet" />,
      title: 'Payment & Refunds',
      content: 'All shop services are 100% prepaid. Due to the digital and service-based nature of our work, we do not offer refunds once the brief has been accepted and work has commenced. If an order is cancelled before work starts, a 20% processing fee is retained.'
    },
    {
      icon: <FileText className="text-brand-violet" />,
      title: 'Revision Policy',
      content: 'Revision rounds are defined per package. A "round" consists of a set of feedback points submitted at once. Significant changes in scope (e.g. changing the business name mid-logo design) are not considered revisions and will require a new order.'
    },
    {
      icon: <Gavel className="text-brand-violet" />,
      title: 'Copyright & Usage',
      content: 'Upon full payment and project completion, you own the final designs for your use. AGNAA Design Studio retains the right to showcase the work in our portfolio, case studies, and marketing materials unless a specific Non-Disclosure Agreement is purchased.'
    }
  ];

  return (
    <div className="pb-32">
      <section className="pt-24 pb-20 border-b border-brand-card">
        <div className="container mx-auto px-6">
          <Link href="/shop" className="text-brand-muted hover:text-white transition-colors mb-12 font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Shop
          </Link>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8">
            Rules of <span className="text-brand-violet">Engagement</span>
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl font-bold leading-relaxed">
            The AGNAA Shop operates on trust, speed, and clear boundaries.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 gap-12">
            {policies.map((p, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-brand-card/30 border border-brand-card">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-brand-violet/10 rounded-2xl">{p.icon}</div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{p.title}</h3>
                </div>
                <p className="text-lg text-brand-muted leading-relaxed font-semibold">
                  {p.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-10 rounded-3xl bg-brand-dark border border-brand-card shadow-inner">
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">Legal Note</h4>
            <p className="text-brand-muted text-sm leading-relaxed font-bold">
              AGNAA Shop is a productized design vertical of AGNAA Design Studio. All transactions are subject to the laws of Telangana, India. By using this storefront, you agree to these operating policies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
