(15 minutes)

## Argo

https://github.com/argoproj/argo-helm/blob/main/charts/argo-cd/values.yaml

```
helm repo add argo https://argoproj.github.io/argo-helm
```

```
helm install argocd -n argocd argo/argo-cd \
--set redis-ha.enabled=true \
--set controller.replicas=1 \
--set server.autoscaling.enabled=true \
--set server.autoscaling.minReplicas=2 \
--set repoServer.autoscaling.enabled=true \
--set repoServer.autoscaling.minReplicas=2 \
--set applicationSet.replicaCount=2 \
--set server.service.type=LoadBalancer \
--create-namespace
```

## Istio

https://github.com/istio/istio/blob/master/manifests/charts/istio-control/istio-discovery/values.yaml

```
helm repo add istio https://istio-release.storage.googleapis.com/charts
```

```
helm install istio-base istio/base \
-n istio-system \
--create-namespace
```

```
helm install istiod istio/istiod \
-n istio-system
```

```
helm install istio-ingress istio/gateway -n istio-system
```

## Vault

https://github.com/hashicorp/vault-helm/blob/main/values.yaml

```
helm repo add hashicorp https://helm.releases.hashicorp.com
```

**PVC's are created automatically for persistent storage**

```
helm install vault hashicorp/vault \
    --namespace vault \
    --set server.ha.enabled=true \
    --set server.ha.raft.enabled=true \
    --create-namespace
```