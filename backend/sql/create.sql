/*
Creation script for the PostgreSQL tables.

Running this script will create the tables and required users.

Run it like:

 # sh create.sh
*/

-- create the named schema for PostgREST
drop schema if exists orchard cascade;


create schema orchard;


-- ##########################
--          TABLES
-- ##########################


-- A group is an individual community of level creators.
create table orchard.group (
    id              char(36)    primary key,    -- UUID
    name            text        not null,       -- human name for the group.
    website         text        ,               -- optional website / link
    description     text                        -- optional description of the group
);

-- level table.
create table orchard.level (
    -- FROM THE RDZIP
    sha256              varchar (44)     primary key, -- base58btc encoded sha256 hash of the level
    artist              text             not null,
    song                text             not null,
    "difficulty"        int              not null, -- Medium
    seizure_warning     boolean          not null,
    description         text             not null,
    max_BPM             real             not null, -- 0 if no PlaySong events, etc.
    min_BPM             real             not null,
    last_updated        timestamp        not null,
    single_player       boolean          not null,
    two_player          boolean          not null,
    image_ipfs          text             not null, -- ipfs CID of the preview image
    rdzip_ipfs          text             not null, -- ipfs CID of the rdzip file itself
    hue                 real             not null,
    has_classics        boolean          not null,
    has_oneshots        boolean          not null,
    has_squareshots     boolean          not null,
    has_swing           boolean          not null,
    has_freetimes       boolean          not null,
    has_holds           boolean          not null,
    icon_ipfs           text             ,-- levels don't have to have an icon
    group_id            char(36)         references orchard.group(id) on delete cascade,
    group_iid           text             not null,
    aux                 jsonb            -- any additional data that's submission-specific
);

create index idx_last_updated on orchard.level(last_updated);

-- level tags, which are just strings. these are from the rdzip, so we don't make any more assumptions
create table orchard.level_tag (
    sha256  varchar (44)    references orchard.level(sha256)    on delete cascade,
    tag     text            not null,
    seq     int             not null, -- index of this tag
    primary key (sha256, tag, seq)
);

-- a level author, same thing
create table orchard.level_author (
    sha256  varchar (44)    references orchard.level(sha256)    on delete cascade,
    author  text            not null,
    seq     int             not null, -- index of this author in the list
    primary key (sha256, author, seq)
);

-- persistent data related to a level.
create table orchard.status (
    sha256              varchar (44)    references orchard.level(sha256)    on delete cascade,

    -- The "approval level" of the level. Higher levels imply passing lower levels.
    -- -1: Level -1 is when a level's been reviewed by someone and they've decided it doesn't pass the competency test.
    -- 0: Level 0 is when a level is awaiting review.
    -- 1: Level 1 is when a level's been reviewed by someone and they've decided it passes the competency test.
    -- 2: ??????
    -- 3: ??????
    approval            int             not null default 0,

    -- text that can appear regarding the approval level.
    -- for instance, this might show the reason a level has a star ("comp 8 winner"), or why a level was rejected ("oneshots incorrectly cued")
    approval_message    text,
    -- True if the level has been "deleted"
    recycle_bin         boolean         not null default false,

    primary key (sha256)
);