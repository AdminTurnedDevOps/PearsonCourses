## Install Istio
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

## Istio Sidecar Injection

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

## Install Kiali Dashboard

`kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.15/samples/addons/kiali.yaml`