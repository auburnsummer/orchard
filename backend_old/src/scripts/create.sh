#!/bin/bash
cd "$(dirname "$0")"

# create.sh

# Substitute the contents of the Python files into the appropriate positions, then run the result.

cat ../sql/create.sql \
    | sed -e '/#INSERT_ADD_LEVEL_HERE/r ../procedures/add_level.py' \
    | sed -e '/#INSERT_GET_IID_DIFFS_HERE/r ../procedures/get_id_diffs.py' > ../sql/out.sql
psql -U postgres -f ../sql/out.sql