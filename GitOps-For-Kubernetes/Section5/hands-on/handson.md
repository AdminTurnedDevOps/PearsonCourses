```
git clone https://github.com/prometheus-operator/kube-prometheus.git
```

CD into `kube-prometheus`

```
kubectl create -f manifests/setup

until kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done

kubectl create -f manifests/
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