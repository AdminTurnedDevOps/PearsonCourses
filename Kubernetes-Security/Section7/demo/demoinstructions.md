## Create a service account

```
kubectl create -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: miketest
automountServiceAccountToken: false
EOF
```

## Quick look at Kubescapes RBAC Visualizer

Open up in Kubescape