-- 12 soruluk (6 şiddet türü x 2) güncel tablo şeması
create table if not exists public.question_responses (
  id bigint generated always as identity primary key,
  session_id text not null check (char_length(session_id) between 8 and 64),
  question_id smallint not null check (question_id between 1 and 12),
  selected_option_id text not null check (char_length(selected_option_id) between 1 and 32),
  is_correct boolean not null default false,
  location_tag text not null default 'genel' check (char_length(location_tag) between 1 and 40),
  created_at timestamptz not null default now()
);

create table if not exists public.purple_ribbons (
  id bigint generated always as identity primary key,
  session_id text not null unique check (char_length(session_id) between 8 and 64),
  location_tag text not null default 'genel' check (char_length(location_tag) between 1 and 40),
  created_at timestamptz not null default now()
);

create index if not exists idx_question_responses_qid
  on public.question_responses (question_id, selected_option_id);

create index if not exists idx_question_responses_loc
  on public.question_responses (location_tag);

create index if not exists idx_purple_ribbons_loc
  on public.purple_ribbons (location_tag);

alter table public.question_responses enable row level security;
alter table public.purple_ribbons enable row level security;

drop policy if exists "Anonim soru istatistigi okuma" on public.question_responses;
create policy "Anonim soru istatistigi okuma"
  on public.question_responses for select to anon using (true);

drop policy if exists "Anonim kurdele okuma" on public.purple_ribbons;
create policy "Anonim kurdele okuma"
  on public.purple_ribbons for select to anon using (true);

drop policy if exists "Anonim soru yaniti ekleme" on public.question_responses;
create policy "Anonim soru yaniti ekleme"
  on public.question_responses for insert to anon
  with check (question_id between 1 and 12 and char_length(location_tag) between 1 and 40);

drop policy if exists "Anonim kurdele ekleme" on public.purple_ribbons;
create policy "Anonim kurdele ekleme"
  on public.purple_ribbons for insert to anon
  with check (char_length(location_tag) between 1 and 40);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'purple_ribbons'
  ) then
    alter publication supabase_realtime add table public.purple_ribbons;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'question_responses'
  ) then
    alter publication supabase_realtime add table public.question_responses;
  end if;
end $$;
