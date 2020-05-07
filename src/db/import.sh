cat create.sql | sed -e '/#INSERT HERE/r add_level.py' > out.sql
psql -U postgres -f out.sql