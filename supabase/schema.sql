-- Schema FicheVin E-Label (sans auth, funnel simple)
-- Copier-coller dans le SQL Editor de Supabase et cliquer Run

create extension if not exists "uuid-ossp";

-- Table elabels (tout-en-un, simple)
create table public.elabels (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  wine_name text not null,
  vintage integer,
  appellation text,
  color text,
  grape_varieties text[] default '{}',
  alcohol_content real not null,
  residual_sugar real not null default 0,
  total_acidity real not null default 0,
  ingredients jsonb not null default '[]',
  nutrition jsonb not null default '{}',
  allergens text[] default '{}',
  languages text[] not null default '{fr}',
  photo_url text,
  email text,
  created_at timestamptz not null default now()
);

-- Index pour lookup rapide par slug (page publique)
create index idx_elabels_slug on public.elabels(slug);

-- RLS : lecture publique, écriture via service role
alter table public.elabels enable row level security;

create policy "Lecture publique des elabels"
  on public.elabels for select
  using (true);

-- Le service role bypass RLS donc pas besoin de policy insert
