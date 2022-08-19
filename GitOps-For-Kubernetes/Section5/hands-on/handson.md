https://prometheus-operator.dev/docs/prologue/quick-start/


CD into `kube-prometheus`

```
# Create the namespace and CRDs, and then wait for them to be availble before creating the remaining resources
kubectl create -f manifests/setup

# Wait until the "servicemonitors" CRD is created. The message "No resources found" means success in this context.
until kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done

kubectl create -f manifests/
```

Configure Prometheus to listen to the `/metrics` endpoint from ArgoCD. The Argo Rollouts controller is already instrumented with Prometheus metrics available at /metrics in port 8082. You can use these metrics to look at the health of the controller either via dashboards or via other Prometheus integrations.

```
kubectl apply -f metricsconsumption.yaml
```

```
kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
```

```
kubectl --namespace monitoring port-forward svc/grafana 3000
```

Log into Grafana
```
Username: admin
Password: admin
```

Within Prometheus, import the example ArgoCD dashboard in. It's in the same directory as this `handson.md` file and it's called `argo.json`

You can now see the cluster and apps deployed.