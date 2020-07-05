#!/bin/bash
cd "$(dirname "$0")"

psql -U postgres < ../sql/dump.sql