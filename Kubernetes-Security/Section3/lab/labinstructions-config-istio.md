## Enabling mTLS

When enabling mTLS encryption for east-west traffic, you have the ability to lock down mTLS for each Namespace.

For example, the below enables mTLS for the `default` Namespace

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

### Cleanup

`kubectl delete peerauthentication -n istio-system default`

## Configure access control for workloads
- https://istio.io/latest/docs/examples/bookinfo/#deploying-the-application
- https://istio.io/latest/docs/tasks/security/authorization/authz-http/