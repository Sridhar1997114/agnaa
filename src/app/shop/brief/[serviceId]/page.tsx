"use client";

import React from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, notFound, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { shopServices } from '@/data/shop-services';
import { BriefForm } from '@/components/shop/BriefForm';

export default function BriefPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = params?.serviceId as string;
  const tier = (searchParams?.get('tier') || 'Professional') as any;
  const service = serviceId ? shopServices[serviceId] : null;

  if (!service) {
    notFound();
  }

  const tierData = tier === 'Starter' ? service.starter : tier === 'Premium' ? service.premium : service.professional;

  return (
    <div className="pb-32 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <Link 
          href={`/shop/services/${serviceId}`} 
          className="inline-flex items-center gap-2 text-brand-muted hover:text-white transition-colors mb-12 font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Service
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
              Project Brief
            </h1>
            <p className="text-brand-muted font-bold text-lg">
              Fill in the details for your <span className="text-brand-violet">{service.title}</span>.
            </p>
          </div>

          <BriefForm 
            serviceName={service.title}
            tier={tier}
            price={tierData.price}
          />

          <div className="mt-12 text-center text-brand-muted text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-brand-card"></span>
            Structured by AGNAA Design Studio
            <span className="h-px w-12 bg-brand-card"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
