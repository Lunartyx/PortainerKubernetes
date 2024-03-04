# Webapplication with loadbalancer on a Container Env

This Project helps you build a Container Envoirement with Portainer on a Kubernetes base.

To start I've set up a debian 12 server on VMWare Workstation

<br  />

# Setting up the server

First things first we set up some extra services which are useful
Change you user to root with <br />
`su - root`

update you system with<br />
`apt update` <br />
`apt upgrade`

<br  />

## Firewall installation & config

First we install "Uncomplicated Firewall". Like the name says its a easy to use Firewall.<br />
`apt install ufw`

To configure this we can use other commands.<br />
`ufw allow ssh && ufw allow 80/tcp && ufw allow 443/tcp`

To configure the services later we should also allow some other ports.<br />
`ufw allow 9443/tcp`

To apply the changes and enable ufw use the following command<br />
`ufw enable`

<br  />

## Docker Swarm installation

First we install this packages to handle the certificates<br />
`apt install apt-transport-https ca-certificates curl gnupg2 software-properties-common`

To check if the download isn't hacked we download the certificate from docker<br />
`curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -`

Change the writing permission to the certificate<br />
`add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"`

To add the docker's packages to apt copy paste the following command<br />
`sudo apt update`

Now we install docker<br />
`apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

To test if docker is successfully installed run the hello world container<br />
`docker run hello-world`

After the docker installation we create a swarm.<br />
`docker swarm init --advertise-addr <YOUR IP ADDRESS>`

<br  />

## Portainer installation

To install portainer to a kubernetes container we use this command
`curl -L https://downloads.portainer.io/ce2-19/portainer-agent-stack.yml -o portainer-agent-stack.yml`

docker stack deploy -c portainer-agent-stack.yml portainer

You will need to wait about a minute until the container is fully up. After that you can access the Webinterface with your ip.

`https://<YOUR IP ADDRESS>:9443/#!/init/admin`

## Portainer config
