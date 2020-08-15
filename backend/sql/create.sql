-- run this command to drop everything:
-- drop schema if exists orchard cascade;


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

-- persistent data related to a level.
create table orchard.status (
    --id              varchar (24)    references orchard.level(id)    on delete cascade,
    id              varchar (24)    primary key,   -- base58 encoded
    -- datetime the level was scraped.
    uploaded        timestamp       not null,

    -- The "approval level" of the level. Higher levels imply passing lower levels.
    approval            int             not null default 0,

    -- text that can appear regarding the approval level.
    -- for instance, this might show the reason a level has a star ("comp 8 winner"), or why a level was rejected ("oneshots incorrectly cued")
    approval_message    text,

    -- True if the level has been "deleted"
    recycle_bin         boolean         not null default false
);

-- data from an rdzip file.
create table orchard.level (
    -- FROM THE RDZIP
    id                  varchar(24)      references orchard.status(id) on delete cascade deferrable initially deferred, 
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
    aux                 jsonb            , -- any additional data that's submission-specific
    primary key (id)
);

create index idx_when_uploaded on orchard.status(uploaded);

-- level tags, which are just strings. these are from the rdzip, so we don't make any more assumptions
create table orchard.level_tag (
    id      varchar (24)    references orchard.level(id)    on delete cascade,
    tag     text            not null,
    seq     int             not null, -- index of this tag
    primary key (id, tag, seq)
);

-- a level author, same thing
create table orchard.level_author (
    id      varchar (24)    references orchard.level(id)    on delete cascade,
    author  text            not null,
    seq     int             not null, -- index of this author in the list
    primary key (id, author, seq)
);

create view orchard.levelv as
    select a.*, uploaded, approval, approval_message, recycle_bin from orchard.level as a inner join orchard.status as b on a.id = b.id;