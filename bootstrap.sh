#!/usr/bin/env bash
set -e

sudo apt-get -y update
sudo apt-get -y install postgresql postgresql-contrib postgresql-plpython3 nodejs npm

# copy our pg_hba.conf
sudo cp /vagrant/src/db/pg_hba.conf /etc/postgresql/12/main/pg_hba.conf
sudo systemctl restart postgresql

# download postgrest
cd /tmp
wget https://github.com/PostgREST/postgrest/releases/download/v7.0.1/postgrest-v7.0.1-linux-x64-static.tar.xz
tar xfJ postgrest-v7.0.1-linux-x64-static.tar.xz
sudo cp postgrest /usr/local/bin

# PM2
sudo npm install pm2 -g

# install an IPFS instance.
cd /tmp
wget https://github.com/ipfs/go-ipfs/releases/download/v0.5.1/go-ipfs_v0.5.1_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.5.1_linux-amd64.tar.gz
cd go-ipfs
sudo bash install.sh

ipfs init --profile server
pm2 start "ipfs daemon"