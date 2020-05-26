# create.sh
# Substitute the contents of the Python files into the appropriate positions, then run the result.
cat create.sql | sed -e '/#INSERT_ADD_LEVEL_HERE/r procedures/add_level.py' | sed -e '/#INSERT_GET_IID_DIFFS_HERE/r procedures/get_id_diffs.py' > out.sql
psql -U postgres -f out.sql