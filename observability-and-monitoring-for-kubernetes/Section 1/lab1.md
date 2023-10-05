10 minutes

## Implement Metrics Server and kube-state-metrics


### Metrics Server
For some clusters, the Metrics Server may already exist. For example, it comes out of the box in AKS. However, in some cases, it may not. You can use Helm to install it.

```
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
```

```
helm upgrade --install metrics-server metrics-server/metrics-server
```


### kube-state-metrics

You typically won't see `kube-state-metrics` out of the box. You can install it with Helm.

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

```
helm install kubestatemetrics prometheus-community/kube-state-metrics
```

## Set Up Cast.ai For Cost and Resource Optimization

Sign up for free to use Cast.ai https://cast.ai/

Install Cast.ai on your k8s cluster

```
curl -H "Authorization: Token (you'll get this from your Cast.ai dashboard when you signed up) "https://api.cast.ai/v1/agent.yaml?provider=aks" | kubectl apply -f -
```

Go to your Cast.ai dashboard and you'll now see your cluster.