# Orchard

The [rhythm doctor levels website](https://auburnsummer.github.io/rdlevels/) is pretty good right now! However,
there's only a few hundred levels on it. It uses a Google Sheet for the backend. This
works for now, but there are some issues:

 - Hard limit of 10,000 levels (without changing it to use multiple sheets)
 - Doesn't work for people with Privacy Badger because Privacy Badger blocks google scripts
 - Will definitely slow down as more levels get added
 - Also very annoying to try and add any new features since you have to deal with Google Sheets all the time

This project is aimed at creating a more robust replacement which will able to support much more levels, which
I'm calling "orchard" as the codename. It stands for **O**rganised **r**epository of **cha**rts for **r**hythm **d**octor.
The goal is to essentially do for RD what [chorus](https://github.com/Paturages/chorus) did for Clone Hero.

## Design

The most important part of the design about orchard is that the actual sources of levels are decentralised.
A level maker cannot upload a level to orchard directly. Instead, they upload a level to some other source, such as
Discord or Steam Workshop, and orchard syncs the data from each source into a central database which can be
queried and searched. I want level makers to be free to decide where and how they share their levels instead of
being forced to use my system. For the time being, I plan on supporting Discord, Steam Workshop, and Google Drive
sources, with the possibility of implementing more as they emerge.

Architecture wise, Orchard will probably consist of a few different parts:

 - A [PostgreSQL database schema](src/db/create.sql) that uses the [PostgREST](https://github.com/PostgREST/postgrest) API wrapper
    - Ideally, I'd like to expose all required database functions as PostgREST RPC calls and never resort to raw SQL
    - At this point, I'm still unsure about how to do search. I might just end up using `pg_trgm` like chorus does
 - A set of drivers which interact with data sources with a common interface
    - Basically the same thing as chorus's drivers
    - Some of these drivers have their own projects (e.g. [bluebell](https://github.com/auburnsummer/bluebell/) to interact with Steam Workshop)
 - A script which periodically scrapes the drivers to add levels to the database
 - A front-end that uses the PostgREST API to show levels
    - I want to do real fancy web design that looks like RD instead of the current system

...so yeah, that's a bit of work. I have time, since I think it will still be some time before the existing
level website starts becoming overloaded.
