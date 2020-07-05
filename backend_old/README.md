Backend
-------

This folder has the "backend" part of orchard. It uses [PostgREST](http://postgrest.org/en/v7.0.0/),
SQL, and a little bit of Python.

Setting up the database
-----------------------

A number of shell scripts in the [`./src/scripts`](./src/scripts) directory are provided to set up
the database schema.

`create.sh` - Create the database schema. If you add new Python procedures you have to rerun this.
`export.sh` - Dump data from the database.
`import.sh` - Import data from the database.

Running
-------
 1. Install PostgREST.
 2. Copy the [`pg_hba.conf`](./pg_hba.conf) from this repo to the PostgreSQL configuration.
 3. Run the `create.sh` script.
 4. `postgrest tutorial.conf`

