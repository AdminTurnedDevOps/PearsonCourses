15 minutes

## Configuring Grafana and Prometheus

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

## View Network Traffic Within Prometheus

Within Grafana, go to:
1. Click the hamburger on the left
2. Go to Dashboards
3. View all of the:
- kubernetes/networking/* dashboards
- kubernetes/proxy dashboard

## Resource Optimization For Pods

### Horizontal Pod Autoscaling (HPA)

```
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: "250m"
EOF
```

```
kubectl apply -f - <<EOF
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: nginx
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50
EOF
```