/*
Creation script for the PostgreSQL tables.

Running this script will create the tables and required users.

Run it like:

 # psql -U postgres -f create.sql
*/


-- create the named schema for PostgREST
drop schema if exists orchard cascade;


create schema orchard;


comment on schema orchard is
    'The Organised Repository of Charts for Rhythm Doctor';

-- ##########################
--          TABLES
-- ##########################

-- level table. data comes directly from vitals
create table orchard.level (
    sha256           character (64)   primary key,
    artist           text             not null,
    song             text             not null,
    "difficulty"     int              not null, -- Medium
    seizure_warning  boolean          not null,
    description      text             not null,
    max_BPM          real             not null, -- 0 if no PlaySong events, etc.
    min_BPM          real             not null,
    last_updated     timestamp        not null,
    single_player    boolean          not null,
    two_player       boolean          not null,
    image_ipfs       text             not null,
    hue              real             not null,
    icon_ipfs        text             -- levels don't have to have an icon
);


-- level tags
create table orchard.level_tag (
    sha256  character (64)  references orchard.level(sha256)    on delete cascade,
    tag     text            not null,
    seq     int             not null, -- index of this tag
    primary key (sha256, tag, seq)
);


-- level authors
create table orchard.level_author (
    sha256  character (64)  references orchard.level(sha256)    on delete cascade,
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
    sha256              character (64)  references orchard.level(sha256)    on delete cascade,
    download_url        text             not null,
    submission_method   text            not null, -- e.g. 'discord', 'steam_workshop', etc
    submission_info     jsonb,          -- optional submission-specific data inserted by the driver.
    iid                 text            not null, -- a submission method specific id.

    -- The "approval level" of the level. Higher levels imply passing lower levels.
    -- -1: Level -1 is when a level's been reviewed by someone and they've decided it doesn't pass the competency test.
    -- 0: Level 0 is when a level is awaiting review.
    -- 1: Level 1 is when a level's been reviewed by someone and they've decided it passes the competency test.
    -- 2: Level 2 is "starred", which will be levels that get bonus visual emphasis on the website.
    -- 3??? probably won't exist
    approval            int             not null default 0,

    -- text that can appear regarding the approval level.
    -- for instance, this might show the reason a level has a star ("comp 8 winner"), or why a level was rejected ("oneshots incorrectly cued")
    approval_message    text,

    primary key (sha256)
);


-- booster packs
create table orchard.booster (
    id          serial      primary key,
    name        text        not null,
    json_data   jsonb
);

-- ##########################
--        PROCEDURES
-- ##########################
alter default privileges revoke execute on functions from public;

CREATE FUNCTION orchard.add_level(param json) RETURNS text AS
$$
DECLARE
    my_string text := 'Hello, World!';
BEGIN
    RETURN my_string;
END
$$
LANGUAGE plpgsql;

CREATE FUNCTION orchard.test(a integer, b integer)
RETURNS integer AS $$
 SELECT a + b;
$$ LANGUAGE SQL IMMUTABLE;


-- ##########################
--          ROLES
-- ##########################

-- role for anonymous read-only access
drop role if exists web_anon;
create role web_anon nologin;

grant usage on schema orchard to web_anon;
grant select on orchard.level to web_anon;
grant select on orchard.level_tags to web_anon;
grant select on orchard.level_authors to web_anon;
grant select on orchard.aux_data to web_anon;
grant select on orchard.booster to web_anon;


-- role for access
drop role if exists edit_anon;
create role edit_anon nologin;
grant usage on schema orchard to edit_anon;
grant all on orchard.level to edit_anon;
grant all on orchard.level_tag to edit_anon;
grant all on orchard.level_author to edit_anon;
grant all on orchard.aux_data to edit_anon;
grant all on orchard.booster to edit_anon;
grant execute on function orchard.add_level to edit_anon;
grant execute on function orchard.test to edit_anon;



-- role for authenticating as the anonymous read-only role
drop role if exists authenticator;
create role authenticator noinherit login;


grant web_anon to authenticator;
grant edit_anon to authenticator;