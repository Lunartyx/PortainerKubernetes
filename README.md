<h1 align="center">
  <br>
  <a href="https://github.com/lunartyx"><img src="./assets/img/OIG3-modified.png" width="400" alt="Portainer & Swarm"></a>
  <br>
  Portainer & Swarm
  <br>
</h1>

<p align="center">This is a full tutorial to set up a Portainer Envoirenment with a company Setup</p>

<br>

#### Table of Contents <br> ==================

- [Server Installation 🐧](#install-a-container-env-to-launch-microservices-)
- [Server Setup 💻](#setting-up-the-server-)
  - [Firewall 🧱](#firewall-installation--config-)
- [Base Infrastructure 🏠](#setting-up-the-base-infrastructure-)
  - [Docker Swarm Installation 🐳](docker-swarm-installation-)
  - [Portainer Installation 🏗️](#portainer-installation-️)
  - [Portainer Configuration ⚙️](portainer-config-️)
- [Microservices 📲](microservices-)
  - [Reverse Proxy Manager 📯](nginx-reverse-proxy-manager-)
  - [Registry 🗄️](registry)
  - [Webserver-NodeJS 🖼️](nodejs-web-server)
  - [API 🔗](nodejs-api)
  - [Database 💾](database)

# Important!

I uploaded the whole Project as a Virtual machine on my [Google-Drive](https://drive.google.com/file/d/1KMAPkkb4Tdc3oAGnysbiEPwPVc9fZw3S/view?usp=sharing)
If you copied my OVM image please consider using those endpoints and ports cause they slightly disagree to how ive done it.
<br />
Portainer: https://192.168.134.131:9443 User: admin PW: abc.1234<br />
App: http://192.168.134.131:80 -> http://192.168.134.131:180<br />
API: http://192.168.134.131:190<br />
DB: 192.168.134.131:3306 User: admin PW: password<br />
NGINX Reverse Proxy: http://192.168.134.131:81 User: admin@example.com PW: abc.1234<br />
Monitoring: http://192.168.134.131:3000 User: admin PW: abc.1234<br />
Registry Endpoint (No GUI): 192.168.134.131:5001/<IMAGENAME><br />
<br />

# Planning

This is how it should look at the end:
[netplan.png](/assets/planning/Netplan.png)

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

`https://<YOUR IP ADDRESS>:9443`

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

## <p style="color: red;"> DEPRECATED </p>SSL - TLS Certificate 📜

To "Securely" access our envoirement, we need a SSL certificate. Due testing purposes i've generated one on this website.

[regery.com EXTERNAL WEBSITE!!!](https://regery.com/en/security/ssl-tools/self-signed-certificate-generator)

<br />

# Microservices 📲

What whould a infrastructure be without some services?
I will explane here how to set up a microservice environment with a reverse proxy, a loadbalancer, a frontent, a backend, an api server and a monitoring tool
<br />

## Error solution

If you have a error on app templates and cannot see any templates make those changes:
<br />
On your server edit or create the file if it doesnt exist.
<br />

`nano /etc/docker/daemon.json`

<br />
and enter this dns config<br />

```
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
```

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

We configure something to use later.
Go to `http://<YOURIPADDRESS>:81`

There we go to settings and change default route to your ip on port 180.

If you use a loadbalancer point it to the loadbalancer's IP/Port
<br />

## Registry

To setup a registry we have to setup 2 simple things.

First connect to the server and edit the docker daemon file and restart docker.
If the file doesnt exist create it.

`nano /etc/docker/daemon.json`

and enter

`{ "insecure-registries": ["<YOURIPADDRESS>:5000"] }`

So now we go to portainer and head to app-templates

There we filter for Container.

There is a Registry template which we select. Enter a name and deploy it.

Also enter the ip and port to docker settings/Registries so you can pull the images from there

to build and push those are the commands

`docker build -t <YOURIPADDRESS>:5000/<IMAGENAME> .`<br />

`docker push <YOURIPADDRESS>:5000/<IMAGENAME>`

Also add the ip/port to portainer under Registry and add it as custom registry.
<br />

#### Alternative

I got an alternative through GitLab. I ran in some issues with GitHub so i created an alternative repository in gitlab. As soon as i have a fix for either of the problems ill update this.

So how do you login to your GitLab.
First i went over to [GitLab](https://gitlab.com/)<br />

Here under your profile you find Access Tokens.
Create a new one and choose for the rights just everything (i did this and it worked)<br />

Copy it and go over to your server. Now insert 2 commands:<br />

`TOKEN=<yourToken>`<br />
`docker login registry.gitlab.com -u <yourUserName> --password-stdin <<<$TOKEN`<br />
<br />

## NodeJS Web-Server

As a webserver i used the Vite + React Framework and wrote some simple components and functions.

You can just copy the /web/frontend folder and in this one use <br />
`npm run start`
<br />

## NodeJS API

## Database

Here i got you a mariadb.yml file in this repo which you can copy paste to a new custom app template.

We do nearly the same as in NGINX loadbalancer "how to" just use the mariadb.yml

You can find this compose file in /container-images/compose/mariadb.yml

# Images

## Build and Push

Important! You must have done [THIS](registry) step to go further on.

First be sure your docker file is named correctly (Dockerfile) and in a single folder.

`docker build -t registry.gitlab.com/urUserName/YourRepository/YourImageName .`

`docker push registry.gitlab.com/urUserName/YourRepository/YourImageName`

# Frontend

## Error solution

If you try to use `npm run dev`/`npm run start` and it fails with `Error: listen EACCES: permission denied ::1:3000` try this command.

`sudo npm install -g --unsafe-perm=true --allow-root`
