Instructions to get Kubeflow up and running on any Kubernetes environment

```
git clone https://github.com/kubeflow/manifests.git
```

```
cd manifests
```

```
# Beta
git checkout v1.8-branch

# Prod
git checkout v1.8.0
```

From the `manifests` kubeflow directory, run the following:
```
while ! kustomize build example | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 20; done
```

Once everything is installed you can access Kubeflow by logging into the dashboard.

6. Access the portal
```
kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```

Default username: user@example.com
Default password: 12341234

**To Delete**
```
while ! kustomize build example | kubectl delete -f -; do echo "Retrying to apply resources"; sleep 20; done
```
