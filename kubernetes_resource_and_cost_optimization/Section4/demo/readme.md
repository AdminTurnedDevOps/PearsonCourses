## Installing Rancher and Portainer

### Portainer

1. Add the Portainer Helm Chart
```
helm repo add portainer https://portainer.github.io/k8s/
```

2. Update repos
```
helm repo update
```

3. Install the Helm Chart
```
helm upgrade --install --create-namespace -n portainer portainer portainer/portainer \
    --set service.type=LoadBalancer \
    --set tls.force=true
```

### Rancher
1. Install Rancher
```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  --privileged \
  rancher/rancher:latest
```

2. Retrieve initial password
docker logs  your_rancher_container_id  2>&1 | grep "Bootstrap Password:"

3. Log in and register cluster.

## Setting limits in Portainer

1. Log into Portainer.
2. Go to your Kubernetes cluster.
3. Go to Namespaces.
4. Set Quotas.