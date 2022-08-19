
## Install Operators
```
helm repo add fluxcd https://charts.fluxcd.io
```

```
kubectl apply -f https://raw.githubusercontent.com/fluxcd/helm-operator/1.4.3/deploy/crds.yaml
```

```
helm upgrade -i helm-operator fluxcd/helm-operator \
    --namespace fluxname \
    --set helm.versions=v3
```

Take a look at the operator deployed
```
kubectl get deployments -n fluxname
```

You can now use the `HelmRelease` resource from the `helm.fluxcd.io` API. An example is the `operator.yaml`.