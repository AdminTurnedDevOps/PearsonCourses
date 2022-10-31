## NetworkPolicy implementation

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

kubectl create -f - <<EOF
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

5. Run the Ping again.
```
kubectl exec -ti busybox2 -- ping -c3 ip_of_busybox_one
```

There should now be 100% packet loss.

## Test Policy
Illuminatio is an open-source network policy tester. Instead of having to run the Pods and confirm that the policy is working as expected (as you usually should do anyways), the other option is to use Illuminatio to test.

1. Install and configure Illuminatio
`pip3 install git+https://github.com/inovex/illuminatio`

2. Run the scan
`illuminatio clean run`

## Implement a security context in a Deployment Manifest
