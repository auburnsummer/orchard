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

# download postgrest
cd /tmp
wget https://github.com/PostgREST/postgrest/releases/download/v7.0.1/postgrest-v7.0.1-linux-x64-static.tar.xz
tar xfJ postgrest-v7.0.1-linux-x64-static.tar.xz
sudo cp postgrest /usr/local/bin

# PM2
# sudo npm install pm2 -g

# install an IPFS instance.
cd /tmp
wget https://github.com/ipfs/go-ipfs/releases/download/v0.5.1/go-ipfs_v0.5.1_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.5.1_linux-amd64.tar.gz
cd go-ipfs
sudo bash install.sh

ipfs init --profile server

sudo cp /vagrant/vagrant_scripts/ipfsd.service /lib/systemd/system/
sudo systemctl enable ipfsd
sudo systemctl start ipfsd


# Make a random key and corresponding jwt token.

< /dev/urandom tr -dc A-Za-z0-9 | head -c32 > /vagrant/backend/key
npx jwtgen -a HS256 -s "$(< /vagrant/backend/key)" -c "role=edit_anon" > /vagrant/backend/token

# if a .env file doesn't exist
if [ ! -f /vagrant/.env ]; then
    echo "POSTGREST_TOKEN=" > /vagrant/.env
fi

# add our token we just made into the .env
sed -i '/POSTGREST_TOKEN=/g' /vagrant/.env
printf "\nPOSTGREST_TOKEN=" >> /vagrant/.env
cat /vagrant/backend/token >> /vagrant/.env


# Delete node_modules.
rm -rf /vagrant/scraper/node_modules

# ...and make an empty folder in its place
mkdir /vagrant/scraper/node_modules

# then make another folder outside of the synced folder.
mkdir /home/vagrant/scraper_node_modules

# bind mount them together
sudo mount --bind /home/vagrant/scraper_node_modules /vagrant/scraper/node_modules
sudo chown vagrant /vagrant/scraper/node_modules

# code-server
curl -fsSL https://code-server.dev/install.sh | sh
sudo cp /vagrant/vagrant_scripts/code-server.service /lib/systemd/system/
sudo systemctl enable code-server
sudo systemctl start code-server

ip addr