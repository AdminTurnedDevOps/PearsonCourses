15 minutes

## Prereqs

Ensure you have the proper prerequisites: https://awslabs.github.io/kubeflow-manifests/docs/deployment/prerequisites/

## Installation

1. With Helm
```
make deploy-kubeflow INSTALLATION_OPTION=helm DEPLOYMENT_OPTION=vanilla
```

2. If you'd prefer, you can use Kustomize instead
```
make deploy-kubeflow INSTALLATION_OPTION=kustomize DEPLOYMENT_OPTION=vanilla
```

3. Access the portal
```
kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```