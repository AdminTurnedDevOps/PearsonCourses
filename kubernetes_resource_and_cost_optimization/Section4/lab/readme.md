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

### Rancher On Kubernetes

1. Install Ingress
```
NAMESPACE=ingress-system

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx \
  --create-namespace \
  --namespace=ingress-system \
  --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz
```

2. Install `cert-manager`
```
helm repo add jetstack https://charts.jetstack.io

helm repo update

helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --set installCRDs=true \
  --create-namespace
```

3. Install Rancher

```
helm repo add rancher-stable https://releases.rancher.com/server-charts/latest

helm install rancher rancher-stable/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set global.cattle.psp.enabled=false \
  --set replicas=3 \
  --create-namespace
```

4. Retrieve Rancher password.
```
kubectl get secret --namespace cattle-system bootstrap-secret -o go-template='{{.data.bootstrapPassword|base64decode}}{{ "\n" }}'
```

5. Access Rancher UI.
```
kubectl port-forward -n cattle-system svc/rancher 8080:443
```

### Rancher Local On Docker Container (optional)
1. Install Rancher
```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  --privileged \
  rancher/rancher:latest
```

2. Retrieve initial password
docker logs your_rancher_container_id  2>&1 | grep "Bootstrap Password:"

3. Log in and register cluster.

## Viewing Resources

### Portainer

1. Log into Portainer
2. Go to your Kubernetes cluster
3. Click on Cluster

You should now be able to see the cluster resources available.

### Rancher

1. Log into Rancher
2. Go to Clusters

You should now be able to see information regarding your cluster.