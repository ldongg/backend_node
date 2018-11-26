#!/usr/bin/env bash

#update instance
sudo apt-get update && sudo apt-get -y upgrade

# install packages
sudo apt-get install git docker.io -y

sudo usermod -a -G docker $USER
sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo chown -R $USER:$(id -gn $USER) /home/ubuntu/.config
sudo usermod -a -G docker $USER

eval "$(ssh -o StrictHostKeyChecking=no git@github.com)"