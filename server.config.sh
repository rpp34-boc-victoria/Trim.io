# Update instance
sudo apt-get update
sudo apt-get upgrade -y

# Git Short Hand Setup
git config --global alias.ci commit
git config --global alias.st status

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-mongosh

# Install NVM and specified Node Version
# sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash;
# source ~/.bashrc
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# nvm install 16.16.0
# node -e "console.log('Running Node.js ' + process.version)"

# Alternate way to install node where it can be run correctly using SSH!!
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs


# Setting up pm2 to run the server as a service on start up
npm install pm2@latest -g
pm2 start dist/server.js
pm2 startup # generate the correct command to set as startup process
# this may change as your version varies
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v16.16.0/bin /home/ubuntu/.nvm/versions/node/v16.16.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
pm2 save
pm2 status

# Creating 1 GB Swap File Memory to allow disk caching during build, which is needed to run the npm build for create-react-app
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
# logging created file
ls -lh /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
# Logging the swap file in 2 different ways below
sudo swapon --show
free -h
# Making it permanet on boot up
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
# Resource :https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-18-04