-- Optional ENUM types for status and transport type
create type delivery_status as enum ('pending', 'confirmed', 'scheduled', 'in_transit', 'delivered', 'cancelled');
create type transport_type as enum ('enclosed', 'open');

-- Main table
create table if not exists delivery_requests (
  id uuid primary key default gen_random_uuid(),

  -- Customer Info
  customer_name text not null,
  contact text not null,
  email text,

  -- Vehicle Info
  car_model text not null,
  car_make text,
  car_year integer,
  vehicle_type text,  -- sedan, SUV, coupe, etc.
  plate_number text,

  -- Pickup & Dropoff
  pickup_location text not null,
  dropoff_location text not null,
  preferred_pickup_time timestamptz,
  preferred_delivery_time timestamptz,

  -- Logistics
  transport_mode transport_type default 'enclosed',
  status delivery_status default 'pending',
  notes text,

  -- Financials
  quoted_price numeric(10, 2),
  payment_status text default 'unpaid', -- can be changed to enum later

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for status filtering
create index if not exists idx_status on delivery_requests (status);

-- Index for recent requests (descending)
create index if not exists idx_created_at on delivery_requests (created_at desc);

-- Index for quick search by contact (phone)
create index if not exists idx_customer_contact on delivery_requests (contact);

-- Index for pickup and dropoff filtering
create index if not exists idx_pickup_dropoff on delivery_requests (pickup_location, dropoff_location);

-- Index for sorting by preferred delivery windows
create index if not exists idx_preferred_times on delivery_requests (preferred_pickup_time, preferred_delivery_time);

-- Automatically update `updated_at` on row change
create or replace function update_updated_at_column()
returns trigger as $$
begin
   new.updated_at = now();
   return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on delivery_requests
for each row
execute procedure update_updated_at_column();
