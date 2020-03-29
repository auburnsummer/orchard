/*
Creation script for the PostgreSQL tables.

Running this script will create the tables and required users.

Run it like:

 # psql -U postgres -f create.sql
*/


-- create the named schema for PostgREST
drop schema if exists orchard cascade;

-- difficulty type
drop type if exists difficulty;
create type difficulty as ENUM ('Easy', 'Medium', 'Tough', 'Very Tough');


create schema orchard;


comment on schema orchard is
    'The Organised Repository of Charts for Rhythm Doctor';

-- level table
create table orchard.level (
    sha256           character (64)   primary key,
    artist           text             not null,
    song             text             not null,
    "difficulty"     difficulty       not null default 'Medium',
    seizure_warning  boolean          not null default false,
    description      text,
    max_BPM          real,
    min_BPM          real,
    last_updated     timestamp,
    single_player    boolean not null,
    two_player       boolean not null,
    image_URL        text,
    icon_URL         text,
    download_URL     text
);

-- level tags
create table orchard.level_tag (
    sha256  character (64)  references orchard.level(sha256),
    tag     text            not null,
    seq     int             not null, -- index of this tag
    primary key (sha256, tag, seq)
);

-- level authors
create table orchard.level_author (
    sha256  character (64)  references orchard.level(sha256),
    author  text            not null,
    seq     int             not null, -- index of this author in the list
    primary key (sha256, author, seq)
);

-- views that give the tags and authors in order automatically
create view orchard.level_tags as
select sha256, tag from orchard.level_tag
order by seq;

create view orchard.level_authors as
select sha256, author from orchard.level_author
order by seq;

-- auxiliary data (not directly from the rdzip)
create table orchard.aux_data (
    sha256              character (64)  references orchard.level(sha256),
    approved            boolean         not null default false,
    submission_method   text,
    submission_metadata jsonb,
    starred             boolean,
    starReason          text,
    primary key (sha256)
);

-- booster packs
create table orchard.booster (
    id          serial      primary key,
    name        text        not null,
    json_data   jsonb
);

-- role for anonymous read-only access
drop role if exists web_anon;
create role web_anon nologin;

grant usage on schema orchard to web_anon;
grant select on orchard.level to web_anon;
grant select on orchard.level_tags to web_anon;
grant select on orchard.level_authors to web_anon;
grant select on orchard.aux_data to web_anon;
grant select on orchard.booster to web_anon;

-- role for authenticating as the anonymous read-only role
drop role if exists authenticator;
create role authenticator noinherit login;
grant web_anon to authenticator;