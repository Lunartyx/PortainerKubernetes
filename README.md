# Webapplication with loadbalancer on a Container Env

This Project helps you build a Container Envoirement with Portainer on a Kubernetes base.

To start I've set up a debian 12 server on VMWare Workstation

# Setting up the server

First things first we set up some extra services which are useful
Change you user to root with `su - root`

update you system with
`apt update`
`apt upgrade`

## Firewall installation & config

First we install "Uncomplicated Firewall". Like the name says its a easy to use Firewall.
`apt install ufw`

To configure this we can use other commands.
`ufw allow ssh && ufw allow 80/tcp && ufw allow 443/tcp`

To configure the services later we should also allow some other ports.
`ufw allow 9443/tcp`

To apply the changes and enable ufw use the following command
`ufw enable`

## Docker installation

First we install this package to handle the certificates
`install -m 0755 -d /etc/apt/keyrings`

To check if the download isn't hacked we download the certificate from docker
`curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc`

Change the writing permission to the certificate
`chmod a+r /etc/apt/keyrings/docker.asc`

To add the docker's packages to apt copy paste the following command

> echo \
>  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
>  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
>  tee /etc/apt/sources.list.d/docker.list > /dev/null
> apt update

Now we install docker
`apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

To test if docker is successfully installed run the hello world container
`sudo docker run hello-world`

## MiniKube installation

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

## Kubernetes installation

To install Kubernetes we need to install a few tools to add a registry entry to our package downloader.

`apt install -y apt-transport-https ca-certificates curl gpg`

To check if the download was manipulated we download the kubernetes cerificate.
`curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg`

If someone already tried once to install kubernetes we delete any old content
`echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | tee /etc/apt/sources.list.d/kubernetes.list`

To bring the downloader up to date with the download origin we perform this commands again
`apt update && apt upgrade`

Now we finally install kubernetes
`apt install -y kubectl`

## Portainer installation
