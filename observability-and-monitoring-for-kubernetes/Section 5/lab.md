15 minutes

## Configuring Kube-Prometheus

Clone the `kube-prometheus` repo

```
git clone https://github.com/prometheus-operator/kube-prometheus.git
```

CD into the `kube-prometheus` repo

Run the following code block together.

```
# Create the namespace and CRDs, and then wait for them to be availble before creating the remaining resources
kubectl create -f manifests/setup

# Wait until the "servicemonitors" CRD is created. The message "No resources found" means success in this context.
until kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done

kubectl create -f manifests/
```

Forward the port of the UI so you can log into Prometheus and see the Metrics.

```
kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
```

Forward the port of the Grafana UI so you can log in and see the graphs


```
kubectl --namespace monitoring port-forward svc/grafana 3000
```

To log into Grafana:
1. Username: admin
2. Password: admin

## Configuring Grafana In The Cloud

The method of creating a Grafana Service in the cloud will vary based on cloud provider.

Because the method of getting started is quite long, it makes more sense to link to the guide instead of writing it here.

Managed Grafana in AWS: https://docs.aws.amazon.com/grafana/latest/userguide/getting-started-with-AMG.html

Managed Grafana in Azure: https://learn.microsoft.com/en-us/azure/managed-grafana/quickstart-managed-grafana-portal