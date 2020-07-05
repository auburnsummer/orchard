#!/bin/bash
cd "$(dirname "$0")"

pg_dump -U postgres --column-inserts --data-only --schema=orchard > ../sql/dump.sql