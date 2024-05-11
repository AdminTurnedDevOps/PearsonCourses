15 minutes

## Prereqs

Ensure that you have the prerequisites: https://azure.github.io/kubeflow-aks/main/docs/deployment-options/prerequisites/

## Installation

1. Clone the repo:
```
git clone --recurse-submodules https://github.com/Azure/kubeflow-aks.git
```

2. `cd` into the repo
```
cd kubeflow-aks
```

3. `cd` into the Manifests directory.
```
cd manifests/
```

4. Check out the v1.8 branch and go back to the root directory.
```
git checkout v1.8-branch
cd ..
```

5. Install Kubeflow
```
cp -a deployments/vanilla manifests/vanilla
cd manifests/  
while ! kustomize build vanilla | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 10; done
```

6. Access the portal
```
kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```

Default username: user@example.com
Default password: 12341234