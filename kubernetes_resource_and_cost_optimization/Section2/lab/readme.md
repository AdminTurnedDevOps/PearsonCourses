1. Create the new Namespace.
```
kubectl create namespace test
```

2. Specifiy a resource quota.
```
apiVersion: v1
kind: ResourceQuota
metadata:
  name: memorylimit
  namespace: test
spec:
  hard:
    requests.memory: 512Mi
    limits.memory: 1000Mi
```

3. Deploy a Pod with the resource quota in place.
```
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
```