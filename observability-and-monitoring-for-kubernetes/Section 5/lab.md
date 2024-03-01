15 minutes

## Configuring Kube-Prometheus

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo update

helm install kube-prometheus -n monitoring prometheus-community/kube-prometheus-stack --create-namespace

Forward the port of the UI so you can log into Prometheus and see the Metrics.

```
kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
```

Forward the port of the Grafana UI so you can log in and see the graphs


```
kubectl --namespace monitoring port-forward svc/kube-prometheus-grafana 3000:80
```

To log into Grafana:
1. Username: admin
2. Password: prom-operator

## Configuring Grafana In The Cloud

The method of creating a Grafana Service in the cloud will vary based on cloud provider.

Because the method of getting started is quite long, it makes more sense to link to the guide instead of writing it here.

Managed Grafana in AWS: https://docs.aws.amazon.com/grafana/latest/userguide/getting-started-with-AMG.html

Managed Grafana in Azure: https://learn.microsoft.com/en-us/azure/managed-grafana/quickstart-managed-grafana-portal