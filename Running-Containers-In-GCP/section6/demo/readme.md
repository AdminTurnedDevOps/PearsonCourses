## Run Kubeadm On VMs

1. First, create two virtual machines. In a production environment, you'd want at least three (3) Control Planes and 3-4 Worker Nodes, but for demo purposes and to keep costs down, you can stick to two in total. One will be for the Control Plane and the other will be for the Worker Node.

2. The next steps/commands will show you how to set up and configure the Control Plane and the Worker Nodes. This is going to feel very manual, and it's meant to. The reason why is because you can't automate something that you don't know how to do manually yet. Because of that, I decided to keep the commands in a manual/imperative way so you can see each step.

### Install The Control Plane

1. Update the server
```
sudo apt update -y
```

2. Install transport layer
```
sudo apt-get install -y apt-transport-https curl
```

3.  Install Kubernetes package on Ubuntu
```
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt update -y 

sudo su -
```

4. Install and configure the CRI-O container runtime
```
OS=xUbuntu_20.04
VERSION=1.22

echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS/ /" > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
echo "deb http://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/$VERSION/$OS/ /" > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable:cri-o:$VERSION.list

curl -L https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable:cri-o:$VERSION/$OS/Release.key | apt-key add -
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS/Release.key | apt-key add -
```

5. Exit out of `sudo`
```
exit
```

6. Update and install CRI-O for the Container Runtime
```
sudo apt update -y
sudo apt install cri-o cri-o-runc -y

sudo systemctl daemon-reload
sudo systemctl enable crio --now
```

7. Check to see CRI-O is installed properly
```
apt-cache policy cri-o
```

8. Turn off swap
```
swapoff -a
```

9. sysctl settings and ip tables
```
sudo modprobe overlay
sudo modprobe br_netfilter

sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
```

```
sudo sysctl --system
```

10. Install and configure Kubeadm with the latest version of Kubernetes.
```
sudo apt-get install -y kubelet kubeadm kubectl
```

11. Put the workloads on hold.
```
sudo apt-mark hold kubelet kubeadm kubectl
```

### Configure The Control Plane

1. Define variables for the `kubeadm init` command. Examples below. These variables will create a local Linux user, which is needed for the installation.
```
sudo su -

user=k8stest
pass='Password12!@'
sudo useradd -m -d /home/$user $user
sudo echo "$user:$pass" | chpasswd
usermod -aG sudo $user
```

2. Exit out of `sudo`.
```
exit
```

3. Configure the IP ranges for the Control Plane and the Kubernetes Network. Depending on where you are deploying, you could either have just a public subnet, or a public and private subnet. If you have just a public subnet, use the same value for the `ip_address` and `publicIP`, along with the CIDR range. This IP will be the Control Planes public IP. If you have a private and public subnet, use the public IP for the publicIP, the private IP for the ip_address, and the private IP range for the CIDR.

An example IP config is below.

```
ip_address=172.17.0.4
cidr=172.17.0.0/16
publicIP=40.117.168.164
```

4. Once you set the variables for the IP addresses and CIDR range, run the `kubeadm init` command below.

sudo kubeadm init --control-plane-endpoint $publicIP --apiserver-advertise-address $ip_address --pod-network-cidr=$cidr --upload-certs

```
If you are deploying in the cloud, you may find yourself in a situation where the init fails because the Kubelet connect communicate with the API server

This typically happens in public clouds due to network restrictions

If it happens to you, open up the following ports: https://kubernetes.io/docs/reference/ports-and-protocols/
```

Once the `kubeadm init` command finishes, you'll see an output. The output will show a `kubeadm join` command specifically for the Worker Nodes. Copy that command because you'll need it in the next section.

5. To start using your Kubernetes cluster, you need to configure your home user settings.
```
su -l k8stest
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

6. Next, you'll need to configure a Container Network Interface (CNI). You can use any CNI you'd prefer, but the below has been tested utilizing Weave.
```
kubectl apply -f https://github.com/weaveworks/weave/releases/download/v2.8.1/weave-daemonset-k8s.yaml
```

### Configure The Worker Node

To configure the Worker Node, run the `kubeadm join` command on the Worker Node.

Once complete, you should be able to see it show up when you run `kubectl get nodes` on the Control Plane.