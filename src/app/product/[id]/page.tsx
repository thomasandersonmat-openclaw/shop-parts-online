import { ProductClient } from './ProductClient';
import { supabase } from '@/lib/supabase';

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('id');
  return (products || []).map((p) => ({
    id: p.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ProductClient id={resolvedParams.id} />;
}