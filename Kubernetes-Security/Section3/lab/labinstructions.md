
## Enabling mTLS

1. Lock down mTLS per each namespace
```
kubectl apply -n default -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: "default"
spec:
  mtls:
    mode: STRICT
EOF

```

2. Lock down mTLS for the entire mesh
```
kubectl apply -n istio-system -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: "default"
spec:
  mtls:
    mode: STRICT
EOF
```

### Cleanup

`kubectl delete peerauthentication -n istio-system default`

## Configure access control for workloads
- https://istio.io/latest/docs/examples/bookinfo/#deploying-the-application
- https://istio.io/latest/docs/tasks/security/authorization/authz-http/