-- AI Recipe Generator - Supabase Database Schema
-- Copy and paste this ENTIRE file into Supabase SQL Editor and run it

-- Step 1: Enable UUID extension
create extension if not exists "uuid-ossp";

-- Step 2: Create custom types
do $$ 
begin
    if not exists (select 1 from pg_type where typname = 'difficulty_level') then
        create type difficulty_level as enum ('easy', 'medium', 'hard');
    end if;
    if not exists (select 1 from pg_type where typname = 'meal_type') then
        create type meal_type as enum ('breakfast', 'lunch', 'dinner', 'snack');
    end if;
end $$;

-- Step 3: Drop tables if they exist (for clean setup)
drop table if exists public.recipe_requests cascade;
drop table if exists public.recipes cascade;
drop table if exists public.users cascade;

-- Step 4: Create the recipes table
create table public.recipes (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text not null,
    ingredients jsonb not null,
    instructions text[] not null,
    prep_time integer not null,
    cook_time integer not null,
    servings integer not null,
    difficulty difficulty_level default 'easy',
    cuisine text not null,
    dietary_restrictions text[] default array[]::text[],
    nutrition_info jsonb,
    image_url text,
    youtube_search_term text,
    user_id uuid references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Step 5: Create the users table
create table public.users (
    id uuid references auth.users(id) on delete cascade primary key,
    email text unique not null,
    name text,
    avatar text,
    dietary_preferences text[] default array[]::text[],
    allergens text[] default array[]::text[],
    favorite_recipes uuid[] default array[]::uuid[],
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Step 6: Create the recipe_requests table
create table public.recipe_requests (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    ingredients text[] not null,
    dietary_restrictions text[] default array[]::text[],
    cuisine text,
    difficulty difficulty_level,
    prep_time integer,
    servings integer,
    meal_type meal_type,
    generated_recipe_id uuid references public.recipes(id) on delete set null,
    created_at timestamptz default now()
);

-- Step 7: Create indexes for better performance
create index idx_recipes_user_id on public.recipes(user_id);
create index idx_recipes_cuisine on public.recipes(cuisine);
create index idx_recipes_difficulty on public.recipes(difficulty);
create index idx_recipes_created_at on public.recipes(created_at);
create index idx_users_email on public.users(email);
create index idx_recipe_requests_user_id on public.recipe_requests(user_id);

-- Step 8: Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

-- Step 9: Create triggers for updated_at columns
create trigger update_recipes_updated_at 
    before update on public.recipes 
    for each row execute function update_updated_at_column();

create trigger update_users_updated_at 
    before update on public.users 
    for each row execute function update_updated_at_column();

-- Step 10: Enable Row Level Security (RLS)
alter table public.recipes enable row level security;
alter table public.users enable row level security;
alter table public.recipe_requests enable row level security;

-- Step 11: Create RLS policies for recipes
create policy "Anyone can view recipes" on public.recipes
    for select using (true);

create policy "Users can insert their own recipes" on public.recipes
    for insert with check (auth.uid() = user_id);

create policy "Users can update their own recipes" on public.recipes
    for update using (auth.uid() = user_id);

create policy "Users can delete their own recipes" on public.recipes
    for delete using (auth.uid() = user_id);

-- Step 12: Create RLS policies for users
create policy "Users can view their own profile" on public.users
    for select using (auth.uid() = id);

create policy "Users can insert their own profile" on public.users
    for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on public.users
    for update using (auth.uid() = id);

-- Step 13: Create RLS policies for recipe requests
create policy "Users can view their own recipe requests" on public.recipe_requests
    for select using (auth.uid() = user_id);

create policy "Users can insert their own recipe requests" on public.recipe_requests
    for insert with check (auth.uid() = user_id);

-- Step 14: Create function to automatically create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.users (id, email, name)
    values (new.id, new.email, new.raw_user_meta_data->>'name');
    return new;
exception when others then
    return new;
end;
$$ language plpgsql security definer;

-- Step 15: Create trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- Step 16: Database setup complete!
-- Sample data will be created when users generate their first recipes

-- Step 17: Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.recipes to anon, authenticated;
grant all on public.users to anon, authenticated;
grant all on public.recipe_requests to anon, authenticated;
grant usage on all sequences in schema public to anon, authenticated;
