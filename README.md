<h1 align="center">
  <br>
  <a href="https://github.com/lunartyx"><img src="./assets/img/OIG3-modified.png" width="400" alt="Portainer & Swarm"></a>
  <br>
  Portainer & Swarm
  <br>
</h1>

<p align="center">This is a full tutorial to set up a Portainer Envoirenment with a company Setup</p>

<br>

#### Table of Contents <br> =================

- [Server Installation 🐧](#install-a-container-env-to-launch-microservices-)
- [Server Setup 💻](#setting-up-the-server-)
  - [Firewall 🧱](#firewall-installation--config-)
- [Base Infrastructure 🏠](#setting-up-the-base-infrastructure-)
  - [Docker Swarm Installation 🐳](docker-swarm-installation-)
  - [Portainer Installation 🏗️](#portainer-installation-️)
  - [Portainer Configuration ⚙️](portainer-config-️)
- [Microservices 📲](microservices-)
  - [Reverse Proxy Manager 📯](nginx-reverse-proxy-manager-)

# Install a Container Env to launch microservices 🐧

This Project helps you build a Container environment with Portainer on a Kubernetes base.

To start I've set up a debian 12 server on VMWare Workstation
<br  />

# Setting up the server 💻

First things first we set up some extra services which are useful
Change you user to root with <br />
`su - root`

update you system with<br />
`apt update` <br />
`apt upgrade`
<br  />

## Firewall installation & config 🧱

First we install "Uncomplicated Firewall". Like the name says its a easy to use Firewall.<br />
`apt install -y ufw`

To configure this we can use other commands.<br />
`ufw allow ssh && ufw allow 80/tcp && ufw allow 443/tcp`

To configure the services later we should also allow some other ports.<br />
`ufw allow 9443/tcp`

To apply the changes and enable ufw use the following command<br />
`ufw enable`
<br  />

# Setting up the base Infrastructure 🏠

## Docker Swarm installation 🐳

First we install this packages to handle the certificates<br />
`apt install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common`

To check if the download isn't hacked we download the certificate from docker<br />
`curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -`

Change the writing permission to the certificate<br />
`add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"`

To add the docker's packages to apt copy paste the following command<br />
`apt update`

Now we install docker<br />
`apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

To test if docker is successfully installed run the hello world container<br />
`docker run hello-world`

After the docker installation we create a swarm.<br />
`docker swarm init --advertise-addr <YOUR IP ADDRESS>`
<br  />

## Portainer installation 🏗️

To install portainer to our cluster we use this command<br />
`curl -L https://downloads.portainer.io/ce2-19/portainer-agent-stack.yml -o portainer-agent-stack.yml`<br />

`docker stack deploy -c portainer-agent-stack.yml portainer`

You will need to wait about a minute until the container is fully up. After that you can access the Webinterface with your ip.<br />

`https://<YOUR IP ADDRESS>:9443/#!/init/admin`

After you set you password you may be asked to restart your container. To do so list you containers and restart it.<br />
`docker container ls`<br />
Important take the portainer-ce container<br />
`docker restart <container ID>`
<br />

## Portainer config ⚙️

Now we create a new environment for our containers.
We go over to environments and click on Docker Swarm, then start Wizard.

Now there are different ways to install the environment. I prefer the agent.
So we click on agent

We can find a command there to set up a new image. we copy this in a notepad and edit some parameters<br />

> --name portainer_agent<br />

Im changing it to `swarm_public`<br />
optionally you can change the port too

> -p 9001:9001/tcp<br />

But i leave it as it is.<br />

We can copy paste the whole command on our server and run it<br />

On our web UI we now insert the name and environment address<br />

> swarm_public<br /> > <YOUR IP ADDRESS><br />

We click on connect and the work is done. You successfully set up a portainer environment!
<br />

# Microservices 📲

What whould a infrastructure be without some services?
I will explane here how to set up a microservice environment with a reverse proxy, a loadbalancer, a frontent, a backend, an api server and a monitoring tool
<br />

## NGINX Reverse Proxy Manager 📯

Now we set up a reverse proxy.
To do so we go over to our swarm_public environment.

First we set up 2 volumes. For that we go to volumes and add a volume.
This is my naming:

> reverseproxy_certs<br />
> reverseproxy_data<br />

Now we create the template

Under app template to custom template.
We add a custom template.

Here are the parameters i've used.

> Title: nginx_reverse_proxy_manager<br />
> Descr.: nginx_reverse_proxy_manager<br />
> Ico.URL: https://nginxproxymanager.com/icon.png<br />
> Platform: Linux<br />
> Type: Swarm<br />

As the docker compose file i used [this image](./images/compose/nginx_reverse_proxy_manager.docker-compose)

After you deployed it you need to go to services in the portainer menu.
There you go over to you nginx service and scroll down to mounts.

Change the type of those mounts to "Volume" and for the target "/data" you choose your data volume.
As well with the lets encrypt target change this one to your certs volume.

Finally scroll up and click apply changes.
<br />

## Registry

## NGINX Load Balancer

## NodeJS Web-Server

## NodeJS API

##
