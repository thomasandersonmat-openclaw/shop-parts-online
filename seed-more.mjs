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
  // Agriculture
  {
    sku: 'AG-JD-WP90',
    name: 'John Deere Tractor Water Pump',
    description: 'High-capacity water pump for John Deere 8R Series tractors. Includes gasket kit.',
    price: 345.50,
    stock_quantity: 12,
    category: 'Agriculture',
    condition: 'New',
    images: ['https://placehold.co/600x400/15803d/ffffff?text=JD+Water+Pump'],
    specs: { "Flow Rate": "90 GPM", "Material": "Cast Iron", "Fits": "8R Series" }
  },
  {
    sku: 'AG-CIH-BELT',
    name: 'Case IH Combine Harvester Drive Belt',
    description: 'Heavy-duty Kevlar reinforced drive belt for Case IH Axial-Flow combines.',
    price: 185.00,
    stock_quantity: 45,
    category: 'Agriculture',
    condition: 'New',
    images: ['https://placehold.co/600x400/b91c1c/ffffff?text=Case+IH+Belt'],
    specs: { "Length": "120 inch", "Type": "V-Belt", "Material": "Kevlar" }
  },
  {
    sku: 'AG-KUB-PTO',
    name: 'Kubota PTO Shaft Assembly',
    description: 'Complete PTO driveline shaft with safety shield for Kubota compact tractors.',
    price: 420.00,
    stock_quantity: 5,
    category: 'Agriculture',
    condition: 'New',
    images: ['https://placehold.co/600x400/ea580c/ffffff?text=Kubota+PTO'],
    specs: { "Spline": "1-3/8 6-Spline", "Length": "48 inch max" }
  },

  // Construction
  {
    sku: 'CON-CAT-TEETH',
    name: 'Caterpillar Excavator Bucket Teeth (Set of 5)',
    description: 'Heavy-duty rock penetration bucket teeth for CAT 320/336 excavators. Pins included.',
    price: 250.00,
    stock_quantity: 30,
    category: 'Construction',
    condition: 'New',
    images: ['https://placehold.co/600x400/facc15/000000?text=CAT+Bucket+Teeth'],
    specs: { "Style": "J-Series", "Material": "Forged Steel", "Weight": "45 lbs" }
  },
  {
    sku: 'CON-BOB-TIRE',
    name: 'Bobcat Skid Steer Tire (12-16.5)',
    description: 'Heavy duty 12-ply pneumatic tire for Bobcat skid steer loaders. Deep tread for mud.',
    price: 285.00,
    stock_quantity: 60,
    category: 'Construction',
    condition: 'New',
    images: ['https://placehold.co/600x400/1f2937/ffffff?text=Skid+Steer+Tire'],
    specs: { "Size": "12-16.5", "Ply": 12, "Tread": "Deep Traction" }
  },
  {
    sku: 'CON-JCB-HYD',
    name: 'JCB Backhoe Hydraulic Main Pump',
    description: 'Rebuilt main hydraulic gear pump for JCB 3CX backhoe loaders.',
    price: 1150.00,
    stock_quantity: 3,
    category: 'Construction',
    condition: 'Rebuilt',
    images: ['https://placehold.co/600x400/facc15/000000?text=JCB+Hydraulic+Pump'],
    specs: { "Flow": "36 GPM", "Pressure": "3600 PSI" }
  },

  // Material Handling
  {
    sku: 'MH-TOY-MAST',
    name: 'Toyota Forklift Mast Roller Bearing',
    description: 'Sealed mast roller bearing replacement for Toyota 8-Series forklifts.',
    price: 45.00,
    stock_quantity: 120,
    category: 'Material Handling',
    condition: 'New',
    images: ['https://placehold.co/600x400/f97316/ffffff?text=Forklift+Bearing'],
    specs: { "OD": "110mm", "ID": "45mm", "Width": "30mm" }
  },
  {
    sku: 'MH-CRN-WHL',
    name: 'Crown Pallet Jack Load Wheel',
    description: 'Polyurethane load wheel with bearings for Crown PTH series hand pallet trucks.',
    price: 32.50,
    stock_quantity: 200,
    category: 'Material Handling',
    condition: 'New',
    images: ['https://placehold.co/600x400/475569/ffffff?text=Pallet+Jack+Wheel'],
    specs: { "Diameter": "2.9 inch", "Width": "3.75 inch", "Material": "Polyurethane" }
  },

  // Forestry
  {
    sku: 'FOR-TIG-SAW',
    name: 'Tigercat Feller Buncher Saw Tooth',
    description: 'Carbide-tipped replacement saw tooth for Tigercat hot saws. High impact resistance.',
    price: 85.00,
    stock_quantity: 400,
    category: 'Forestry',
    condition: 'New',
    images: ['https://placehold.co/600x400/166534/ffffff?text=Saw+Tooth'],
    specs: { "Tip": "Carbide", "Application": "Hot Saw" }
  },

  // Mining
  {
    sku: 'MIN-KOM-BRK',
    name: 'Komatsu Haul Truck Brake Pack',
    description: 'Complete wet disc brake rebuild kit for Komatsu 930E mining haul trucks.',
    price: 4500.00,
    stock_quantity: 2,
    category: 'Mining',
    condition: 'New',
    images: ['https://placehold.co/600x400/1e40af/ffffff?text=Mining+Brakes'],
    specs: { "Type": "Wet Disc", "Weight": "850 lbs", "Fits": "930E" }
  }
];

async function seed() {
  console.log('Seeding extensive parts catalog...');
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
  console.log('Seeding complete! Added 10 new products across various industries.');
}

seed();