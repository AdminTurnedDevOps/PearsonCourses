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

15 minutes

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

10 minutes

### Implement cost optimization with Cast.ai

Sign up for free to use Cast.ai https://cast.ai/

Install Cast.ai on your k8s cluster

```
curl -H "Authorization: Token (you'll get this from your Cast.ai dashboard when you signed up) "https://api.cast.ai/v1/agent.yaml?provider=aks" | kubectl apply -f -
```

Go to your Cast.ai dashboard and you'll now see your cluster.

### Implement resource optimization with Sosivio

**Ensure that you have at least a two node cluster**

1. Go to the following page to download Sosivio https://www.sosiv.io/app/download

The installation will be based on your OS. The direction below showcase a Mac installer, but you'll also see options for a Windows installer.

2. Untar

```
tar -xvf tar -xvf installer-release-1.5.3-mac.tar.gz
```

3. Run the installer
./installer-release-**

4. Expose the k8s Service for Sosivio so you can log in

```
kubectl port-forward -n sosivio svc/dashboard 8088:8088
```

Username: admin Password: It'll be displayed on the terminal

If you need the password after it's displayed:

```
kubectl get secrets/sosivio-admin-otp -n sosivio --template={{.data.password}} | base64 -D
```