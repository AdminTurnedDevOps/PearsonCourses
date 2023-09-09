## Setting Up Artifactory

This lab will go through how to set up Artifactoy. There are a few other ways to do it as well, but using Docker is the least barrier of entry.

```
docker volume create artifactory-data
```

```
docker pull releases-docker.jfrog.io/jfrog/artifactory-pro:latest
```

```
docker run -d --name artifactory -p 8082:8082 -p 8081:8081 -v artifactory-data:/var/opt/jfrog/artifactory releases-docker.jfrog.io/jfrog/artifactory-pro:latest
```

## Configuring Istio

This lab will go through a few different methods of installing Istio and how to configure Pods for Istio Sidecars.

### Install Istio
```
helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update
```

```
kubectl create namespace istio-system
```

```
helm install istio-base istio/base -n istio-system
```

```
helm install istiod istio/istiod -n istio-system
```

*optional*
kubectl create namespace istio-ingress
kubectl label namespace istio-ingress istio-injection=enabled
helm install istio-ingress istio/gateway -n istio-ingress --wait

OR

`curl -L https://istio.io/downloadIstio | sh -`

`istioctl install`

**For one node clusters**:
`istioctl install --set profile=demo`

### Istio Sidecar Injection

Take a look at both options below.

Option 1: When you set the `istio-injection=enabled` label on a namespace and the injection webhook is enabled, any new pods that are created in that namespace will automatically have a sidecar added to them.

```
kubectl label namespace default istio-injection=enabled --overwrite
```

```
kubectl get namespace -L istio-injection
```

Option 2: Manually inject the sidecar container
`istioctl kube-inject -f nginx.yaml | kubectl apply -f -`