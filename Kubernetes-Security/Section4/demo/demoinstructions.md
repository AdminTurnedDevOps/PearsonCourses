## Enable audit logs on control plane

1. Copy everything in `policy.yaml` in the existing Demo directory.

2. SSH into the Kubernetes cluster and go to:

```
sudo vim /etc/kubernetes/simple-policy.yaml
```

3. Open up the following location:

```
sudo vim /etc/kubernetes/manifests/kube-apiserver.yaml
```

Add in the following:

```
- --audit-log-maxage=7
- --audit-log-maxbackup=2
- --audit-log-maxsize=50
```

```
- --audit-log-path=/var/log/audit.log
- --audit-policy-file=/etc/kubernetes/simple-policy.yaml
```

Under volume mounts, add the following

```
- mountPath: /etc/kubernetes/simple-policy.yaml
  name: audit
  readOnly: true
- mountPath: /var/log/audit.log
  name: audit-log
  readOnly: false
```

Under host path, add the following:

```
- hostPath:
    path: /etc/kubernetes/simple-policy.yaml
    type: File
  name: audit
- hostPath:
    path: /var/log/audit.log
    type: FileOrCreate
  name: audit-log
```

4. Restart kubelet

```
sudo systemctl restart kubelet
```

4. Confirm that the Kubelet is still running

```
kubectl get nodes
```

## View audit logs on a control plane

```
tail -f /var/log/audit.log
```
## Set up a security context in a Pod

1. Run the below.

kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginxdeployment
  replicas: 2
  template:
    metadata:
      labels:
        app: nginxdeployment
    spec:
      securityContext:
        runAsNonRoot: true
      containers:
      - name: nginxdeployment
        image: nginx:latest
        ports:
        - containerPort: 80
EOF

2. Run the following to see Pods
```
kubectl get pods
```

You'll notice how the Pods didn't start.

3. Run the following to see what's going on with the Pods
```
kubectl describe pods pod_name
```

You'll see an output that the Nginx image wants to run the image as root.