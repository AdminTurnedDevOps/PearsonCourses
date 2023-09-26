15 minutes

## Configure A Network Policy

1. Run the following Pods

```
kubectl run busybox1 --image=busybox --labels app=busybox1 -- sleep 3600
kubectl run busybox2 --image=busybox --labels app=busybox2 -- sleep 3600
```

2. Obtain IP address of Pods

```
kubectl get pods -o wide
```

3. Run a ping against `busybox1`

```
kubectl exec -ti busybox2 -- ping -c3 ip_of_busybox_one
```

You should see that the Ping worked.

4. Create a network policy that blocks all ingress traffic to `busybox1`

```
kubectl apply -f - <<EOF
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: web-deny-all
spec:
  podSelector:
    matchLabels:
      app: busybox1
  ingress: []
EOF
```

5. Run the Ping again.

```
kubectl exec -ti busybox2 -- ping -c3 ip_of_busybox_one
```

There should now be 100% packet loss.

## Creating Kubernetes Secrets

1. Create a new secret called `testsecret`
```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: testsecret
type: Opaque
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm
EOF
```

2. Confirm that the secret was created by running the following command.
```
kubectl get secrets
```

You can now see the secret in plain text.
```
kubectl get secret testsecret -o jsonpath='{.data}'
```

3. Inject the secret into a Pod.
```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginxpod
spec:
  containers:
  - name: mypod
    image: nginx:latest
  volumes:
  - name: foo
    secret:
      secretName: testsecret
EOF
```