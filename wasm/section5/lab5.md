15 minutes

## Run A Wasm Runtime On Kubernetes

You'll see three installation methods below:
1. AKS
2. EKS
3. Minikube

Feel free to use whichever you have available.

### AKS

```
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.3/cert-manager.crds.yaml
```

```
helm repo add jetstack https://charts.jetstack.io
helm repo update
```

```
helm install \
  cert-manager jetstack/cert-manager --version v1.14.3 \
  --namespace cert-manager --create-namespace \
  --wait
```

Kwasm is responsible for implementing a containerd shim on the nodes. This way, Wasm doesn't need a
separate runtime on the k8s worker nodes.
```
helm repo add kwasm http://kwasm.sh/kwasm-operator/

helm install \
  kwasm-operator kwasm/kwasm-operator \
  --namespace kwasm --create-namespace \
  --version 0.2.3 \
  --set kwasmOperator.installerImage=ghcr.io/spinkube/containerd-shim-spin/node-installer:v0.15.1
```

Annotate nodes that should be able to run Spin Apps with `kwasm.sh/kwasm-node=true`
```
kubectl annotate node --all kwasm.sh/kwasm-node=true
```

Deploy Spin:
# Two spin CRDs
```
kubectl apply -f https://github.com/spinkube/spin-operator/releases/download/v0.2.0/spin-operator.crds.yaml
kubectl apply -f https://github.com/spinkube/spin-operator/releases/download/v0.2.0/spin-operator.runtime-class.yaml

# Spin operator
helm install spin-operator --version 0.2.0 \
  --namespace spin-operator --create-namespace \
  --wait oci://ghcr.io/spinkube/charts/spin-operator

# spin app executor
kubectl apply -f https://github.com/spinkube/spin-operator/releases/download/v0.2.0/spin-operator.shim-executor.yaml
```

### Minkube

https://docs.krustlet.dev/howto/krustlet-on-minikube/

### AWS EKS

### Deploy The Workload

1. Create a new file called `deployment.yaml`

2. Save the followng k8s Manifest in `deployment.yaml`.
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wasm-spin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: wasm-spin
  template:
    metadata:
      labels:
        app: wasm-spin
    spec:
      runtimeClassName: wasmtime-spin-v2
      containers:
        - name: spin-hello
          image: ghcr.io/spinkube/containerd-shim-spin/examples/spin-rust-hello:v0.15.1
          command: ["/"]
          resources:
            limits:
              cpu: 100m
              memory: 128Mi
            requests:
              cpu: 100m
              memory: 128Mi
```

Notice the image - it's a sample Rust app running in a Wasm binary.

3. Deploy the app:
```
kubectl apply -f deployment.yaml
```