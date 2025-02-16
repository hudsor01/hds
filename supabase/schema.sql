-- Enable RLS and create necessary extensions
create extension if not exists "uuid-ossp";

-- Create properties table
create table public.properties (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    address text not null,
    city text not null,
    state text not null,
    zip_code text not null,
    property_type text not null,
    units integer not null,
    square_footage numeric not null,
    year_built integer not null,
    purchase_price numeric not null,
    current_value numeric not null,
    monthly_rent numeric not null,
    expenses jsonb not null default '{
        "mortgage": 0,
        "insurance": 0,
        "property_tax": 0,
        "utilities": 0,
        "maintenance": 0,
        "other": 0
    }',
    status text not null default 'ACTIVE',
    image_url text,
    user_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint property_type_check check (property_type in ('SINGLE_FAMILY', 'MULTI_FAMILY', 'APARTMENT', 'COMMERCIAL', 'INDUSTRIAL')),
    constraint status_check check (status in ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'VACANT'))
);

-- Create maintenance_requests table
create table public.maintenance_requests (
    id uuid default uuid_generate_v4() primary key,
    property_id uuid not null references public.properties(id) on delete cascade,
    description text not null,
    priority text not null,
    status text not null default 'PENDING',
    estimated_cost numeric,
    assigned_to text,
    user_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint priority_check check (priority in ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
    constraint status_check check (status in ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'))
);

-- Create financial_history table
create table public.financial_history (
    id uuid default uuid_generate_v4() primary key,
    property_id uuid not null references public.properties(id) on delete cascade,
    month date not null,
    revenue numeric not null,
    expenses numeric not null,
    user_id uuid not null references auth.users(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create updated_at function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_properties_updated_at
    before update on public.properties
    for each row execute function public.handle_updated_at();

create trigger handle_maintenance_requests_updated_at
    before update on public.maintenance_requests
    for each row execute function public.handle_updated_at();

create trigger handle_financial_history_updated_at
    before update on public.financial_history
    for each row execute function public.handle_updated_at();

-- Enable Row Level Security (RLS)
alter table public.properties enable row level security;
alter table public.maintenance_requests enable row level security;
alter table public.financial_history enable row level security;

-- Create RLS policies
create policy "Users can view their own properties"
    on public.properties for select
    using (auth.uid() = user_id);

create policy "Users can insert their own properties"
    on public.properties for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own properties"
    on public.properties for update
    using (auth.uid() = user_id);

create policy "Users can delete their own properties"
    on public.properties for delete
    using (auth.uid() = user_id);

create policy "Users can view their own maintenance requests"
    on public.maintenance_requests for select
    using (auth.uid() = user_id);

create policy "Users can insert their own maintenance requests"
    on public.maintenance_requests for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own maintenance requests"
    on public.maintenance_requests for update
    using (auth.uid() = user_id);

create policy "Users can delete their own maintenance requests"
    on public.maintenance_requests for delete
    using (auth.uid() = user_id);

create policy "Users can view their own financial history"
    on public.financial_history for select
    using (auth.uid() = user_id);

create policy "Users can insert their own financial history"
    on public.financial_history for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own financial history"
    on public.financial_history for update
    using (auth.uid() = user_id);

create policy "Users can delete their own financial history"
    on public.financial_history for delete
    using (auth.uid() = user_id);