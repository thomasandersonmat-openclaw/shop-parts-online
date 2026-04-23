import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key && val.length) env[key.trim()] = val.join('=').trim();
});

const client = new Client({
  connectionString: env.SUPABASE_DB_URL,
});

async function run() {
  await client.connect();
  console.log('Connected to DB');
  
  await client.query('ALTER TABLE products DISABLE ROW LEVEL SECURITY;');
  console.log('Disabled RLS on products');
  
  await client.end();
}
run();