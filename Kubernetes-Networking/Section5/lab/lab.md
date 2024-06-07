15 minutes

## Install Kubeshark

1. Install 
```
helm repo add kubeshark https://helm.kubeshark.co
```

```
helm install kubeshark kubeshark/kubeshark
```

2. Forward the `kubeshark` Service.
```
kubectl port-forward -n default service/kubeshark-front 8899:80
```

## Deploy Pods To View API Calls

Below are steps to deploy a demo app

```
git clone https://github.com/digitalocean/kubernetes-sample-apps.git
```

```
cd kubernetes-sample-apps
```

```
kubectl apply -k bookinfo-example/kustomize
```

If you want to see the apps webpage, do the following (this is optional)
```
kubectl port-forward svc/productpage -n bookinfo 8085:9080
```

Once the app stack is up, you should be able to see various API calls from/for the apps within the Kubeshark dashboard.

You'll also be able to see other objects within your Namespaces.

Click on the first one under **Kubeshark Filter Syntax**

One the right side you'll see everything from:
- Node IPs
- Requests
- Responses
- Manifest
- Direction that the API calls are moving in
- Agents