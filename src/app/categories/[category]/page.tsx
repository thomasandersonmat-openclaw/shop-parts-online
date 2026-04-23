import { CategoryClient } from './CategoryClient';

export async function generateStaticParams() {
  return [
    { category: 'construction' },
    { category: 'agriculture' },
    { category: 'material-handling' },
    { category: 'forestry' },
    { category: 'mining' },
    { category: 'engine-parts' },
    { category: 'hydraulics' },
    { category: 'undercarriage' },
    { category: 'electrical' },
    { category: 'filters' }
  ];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  return <CategoryClient rawCategory={resolvedParams.category} />;
}