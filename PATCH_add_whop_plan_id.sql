-- ============================================================
--  SCARLET HAUL — Quick patch
--  Run this in Supabase → SQL Editor → Run
--  Adds the whop_plan_id column to your existing products table
-- ============================================================

-- Add whop_plan_id column (safe — won't error if it somehow exists)
alter table products add column if not exists whop_plan_id text;

-- Also make sure orig_price column exists (some setups may be missing it)
alter table products add column if not exists orig_price numeric(10,2);
alter table products add column if not exists supplier_url text;
alter table products add column if not exists image_url text;
alter table products add column if not exists stock integer;

-- Verify it worked — you should see whop_plan_id in the result
select column_name, data_type 
from information_schema.columns 
where table_name = 'products'
order by ordinal_position;
