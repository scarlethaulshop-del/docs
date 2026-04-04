-- ============================================================
--  SCARLET HAUL — Supabase Database Setup (v2)
--  Paste this into Supabase → SQL Editor → Run
-- ============================================================

-- PRODUCTS table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric(10,2) not null,
  orig_price numeric(10,2),
  category text default 'devices',
  badge text default 'HOT',
  emoji text default '📦',
  image_url text,
  stock integer,
  supplier_url text,
  whop_plan_id text,
  active boolean default true,
  created_at timestamptz default now()
);

-- ORDERS table (updated with payment_method, credit fields)
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  order_id text not null unique,
  user_id uuid references auth.users(id),
  customer_name text not null,
  customer_email text not null,
  shipping_address text not null,
  payment_method text default 'cashapp',
  payment_handle text,
  items jsonb not null,
  subtotal numeric(10,2),
  credit_applied numeric(10,2) default 0,
  credit_earned numeric(10,2) default 0,
  total numeric(10,2) not null,
  status text default 'pending_payment',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- STORE CREDIT table
create table if not exists store_credit (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) unique not null,
  balance numeric(10,2) default 0,
  lifetime_earned numeric(10,2) default 0,
  updated_at timestamptz default now()
);

-- Row Level Security
alter table products enable row level security;
alter table orders enable row level security;
alter table store_credit enable row level security;

-- Products: public read
create policy "Products are public" on products
  for select using (active = true);

-- Orders: users see own orders
create policy "Users can view own orders" on orders
  for select using (auth.uid() = user_id);

create policy "Anyone can insert orders" on orders
  for insert with check (true);

create policy "Users can update own orders" on orders
  for update using (auth.uid() = user_id);

-- Store credit: users see and update own credit
create policy "Users can view own credit" on store_credit
  for select using (auth.uid() = user_id);

create policy "Users can upsert own credit" on store_credit
  for insert with check (auth.uid() = user_id);

create policy "Users can update own credit" on store_credit
  for update using (auth.uid() = user_id);

-- Indexes
create index if not exists orders_user_id_idx on orders(user_id);
create index if not exists orders_order_id_idx on orders(order_id);
create index if not exists orders_status_idx on orders(status);
create index if not exists store_credit_user_id_idx on store_credit(user_id);

-- Sample products
insert into products (name, description, price, orig_price, category, badge, emoji) values
  ('ProBuds X1', 'Crystal clear sound, noise cancelling, wireless charging case.', 24.99, 49.99, 'devices', 'HOT', '🎧'),
  ('ProBuds Air', 'Ultra-thin design, 30hr battery, IPX5 water resistant.', 19.99, 39.99, 'devices', 'NEW', '🎵'),
  ('PowerBass Pro', 'Deep bass, premium over-ear comfort, foldable design.', 34.99, 79.99, 'devices', 'HOT', '🎼'),
  ('NeckBand X', 'Magnetic earbuds, sport-ready, quick charge 15 min.', 15.99, 29.99, 'devices', 'NEW', '🔊'),
  ('TechCap Vol.1', 'Premium cotton, embroidered logo, adjustable strap.', 22.99, 44.99, 'clothing', 'NEW', '🧢'),
  ('SmartWatch S1', 'Fitness tracking, notifications, 7-day battery.', 39.99, 89.99, 'devices', 'HOT', '⌚');
