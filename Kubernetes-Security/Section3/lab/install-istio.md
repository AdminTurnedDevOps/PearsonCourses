## Install Istio

First, add the Istio repo.

```
helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update
```

Create the Namespace for Istio to exist in.
```
kubectl create namespace istio-system
```

Install the base Istio configs.
```
helm install istio-base istio/base -n istio-system
```

Install the full Istio system.
```
helm install istiod istio/istiod -n istio-system
```

*optional*
If you're interested in an Ingress Controller, Istio has one available. You won't need it for any labs moving forward, but it's good to understand how it's done if you'll need it in the future.

Create the Namespace for the Ingress Controller
```
kubectl create namespace istio-ingress
```

Create the label to ensure that Istio is present for all resources within the Namespace.
```
kubectl label namespace istio-ingress istio-injection=enabled
```

Install the Ingress Controller
```
helm install istio-ingress istio/gateway -n istio-ingress --wait
```

**If You Want A Method For Deploying Istio In A Dev Environment**

Istio comes with a CLI method for installing a demo environment. This is not meant for production purposes.

First, install the Istio CLI.
```
curl -L https://istio.io/downloadIstio | sh -
```

Install Istio using the CLI.
```
istioctl install --set profile=demo
```

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
The example below is if you have a Kubernetes Manifest that's called something like `nginx.yaml`. You can then inject the Sidecar into the Kubernetes Deployment as you run it. This type of implementation should be a last resort as it's incredibly manual.

You don't have to run the code below. This is just to showcase an example.
```
istioctl kube-inject -f nginx.yaml | kubectl apply -f -
```

## Install Kiali Dashboard

```
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.15/samples/addons/kiali.yaml
```