import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Load env vars
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key && val.length) env[key.trim()] = val.join('=').trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const products = [
  {
    sku: 'ENG-CAT-3406E',
    name: 'Caterpillar 3406E Diesel Engine Assembly',
    description: 'Fully rebuilt and dyno-tested Caterpillar 3406E engine. Ready to drop in. Includes 1-year warranty.',
    price: 14500.00,
    stock_quantity: 2,
    category: 'Engine Parts',
    condition: 'Rebuilt',
    images: ['https://placehold.co/600x400/111827/ffffff?text=CAT+3406E+Engine'],
    specs: { "Horsepower": "475 HP", "Displacement": "14.6 L", "Weight": "3000 lbs" }
  },
  {
    sku: 'HYD-JD-120C',
    name: 'John Deere Hydraulic Boom Cylinder',
    description: 'OEM-spec replacement hydraulic boom cylinder for John Deere excavators.',
    price: 850.00,
    stock_quantity: 15,
    category: 'Hydraulics',
    condition: 'New',
    images: ['https://placehold.co/600x400/111827/ffffff?text=JD+Hydraulic+Cylinder'],
    specs: { "Bore": "4.5 inch", "Stroke": "36 inch", "Pressure": "3500 PSI" }
  },
  {
    sku: 'UND-KOM-PC200',
    name: 'Komatsu PC200 Track Chain Assembly',
    description: 'Heavy-duty sealed and lubricated track chain for Komatsu PC200 series excavators (45 links).',
    price: 2100.00,
    stock_quantity: 8,
    category: 'Undercarriage',
    condition: 'New',
    images: ['https://placehold.co/600x400/111827/ffffff?text=Komatsu+Track+Chain'],
    specs: { "Links": 45, "Pitch": "190mm", "Weight": "1200 lbs" }
  },
  {
    sku: 'ELEC-CUM-ISX',
    name: 'Cummins ISX15 Fuel Injector',
    description: 'Remanufactured fuel injector for Cummins ISX15 engines. Core exchange required.',
    price: 350.00,
    stock_quantity: 40,
    category: 'Electrical',
    condition: 'Rebuilt',
    images: ['https://placehold.co/600x400/111827/ffffff?text=Cummins+Injector'],
    specs: { "Voltage": "12V", "Application": "ISX15" }
  }
];

async function seed() {
  console.log('Seeding products...');
  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'sku' })
      .select();
    
    if (error) {
      console.error('Error inserting', product.sku, error);
    } else {
      console.log('Inserted:', product.sku);
    }
  }
  console.log('Seeding complete!');
}

seed();