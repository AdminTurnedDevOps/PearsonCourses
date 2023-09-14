10 minutes

1. Create the new Namespace.
```
kubectl create namespace test
```

2. Specifiy a resource quota.
```
kubectl apply -f - <<EOF
apiVersion: v1
kind: ResourceQuota
metadata:
  name: memorylimit
  namespace: test
spec:
  hard:
    requests.memory: 512Mi
    limits.memory: 1000Mi
EOF
```

3. Deploy a Pod with the resource quota in place.
```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: frontend
  namespace: test
spec:
  containers:
  - name: app
    image: nginx:latest
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "64Mi"
EOF
```

4. Try running the same, but the below will fail as it's over the limit.
```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: frontendfail
  namespace: test
spec:
  containers:
  - name: app
    image: nginx:latest
    resources:
      requests:
        memory: "800Mi"
        cpu: "250m"
      limits:
        memory: "800Mi"
EOF
```

You should see an error similiar to the below.

```
Error from server (Forbidden): error when creating "STDIN": pods "frontendfail" is forbidden: exceeded quota: memorylimit, requested: requests.memory=800Mi, used: requests.memory=64Mi, limited: requests.memory=512Mi
```