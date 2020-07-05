#!/usr/bin/env bash
set -e
set -x

sudo apt-get -y update
sudo apt-get -y install postgresql postgresql-contrib postgresql-plpython3

# node and npm
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# copy our pg_hba.conf
sudo cp /vagrant/backend/pg_hba.conf /etc/postgresql/12/main/pg_hba.conf
sudo systemctl restart postgresql


# install an IPFS instance.
cd /tmp
wget https://github.com/ipfs/go-ipfs/releases/download/v0.6.0/go-ipfs_v0.6.0_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.6.0_linux-amd64.tar.gz
cd go-ipfs
sudo bash install.sh

ipfs init --profile server
ipfs config Addresses.API "/ip4/0.0.0.0/tcp/5001"
ipfs config Addresses.Gateway "/ip4/0.0.0.0/tcp/8080"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'

sudo cp /vagrant/vagrant_scripts/ipfsd.service /lib/systemd/system/
sudo systemctl enable ipfsd
sudo systemctl start ipfsd

#meilisearch
cd /tmp
curl -L https://install.meilisearch.com | sh
sudo cp meilisearch /usr/local/bin
sudo cp /vagrant/vagrant_scripts/meilisearch.service /lib/systemd/system/
sudo systemctl enable meilisearch
sudo systemctl start meilisearch


# Delete node_modules.
rm -rf /vagrant/scraper/node_modules

# ...and make an empty folder in its place
mkdir /vagrant/scraper/node_modules

# then make another folder outside of the synced folder.
mkdir /home/vagrant/scraper_node_modules

# bind mount them together
sudo mount --bind /home/vagrant/scraper_node_modules /vagrant/scraper/node_modules
sudo chown vagrant /vagrant/scraper/node_modules

# Delete node_modules.
rm -rf /vagrant/backend/node_modules

# ...and make an empty folder in its place
mkdir /vagrant/backend/node_modules

# then make another folder outside of the synced folder.
mkdir /home/vagrant/backend_node_modules

# bind mount them together
sudo mount --bind /home/vagrant/backend_node_modules /vagrant/backend/node_modules
sudo chown vagrant /vagrant/backend/node_modules

# code-server
curl -fsSL https://code-server.dev/install.sh | sh
sudo cp /vagrant/vagrant_scripts/code-server.service /lib/systemd/system/
sudo systemctl enable code-server
sudo systemctl start code-server

ip addr