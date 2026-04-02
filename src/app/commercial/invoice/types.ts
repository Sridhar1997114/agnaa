import { ServiceTier } from "@/lib/pricing-data";

export interface LineItem {
  id: string;
  name: string;
  category: string;
  tier: ServiceTier;
  basePrice: number;
  quantity: number;
  unit: string;
  multiplier: number;
  total: number;
}

export interface ClientInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  projectLocation: string;
}

export interface InvoiceState {
  invoiceNumber: string;
  date: string;
  client: ClientInfo;
  items: LineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  advanceAmount: number;
  notes: string;
}
