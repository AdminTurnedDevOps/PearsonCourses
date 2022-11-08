## Creating an instance of Vault

1. Add the HashiCorp Help Repo
```
helm repo add hashicorp https://helm.releases.hashicorp.com
```

2. Ensure it's up to date
```
helm repo update
```

3. Install the latest version of the Vault server running in development mode. If you're running locally on minikube or another local instance, the first `helm install` will work just fine.
```
helm install vault hashicorp/vault --set "server.dev.enabled=true"
```

If you go with the `server.dev` option, the token value when logging in is `root`.

If you're running on another type of cluster, like Azure Kubernetes Service, you can use the below.

```
helm install vault hashicorp/vault \
  --set='ui.enabled=true' \
  --set='ui.serviceType=LoadBalancer'
```

4. Open up the Vault web UI by running the following command and utilizing the `vault-ui` Service.
`kubectl get svc`

5. Enter 5 in the *Key shares* and 3 in the *Key threshold* text fields.

6. Download the keys (the option is on the bottom of the screen so just scroll down).

7. Follow the instructions to unseal Vault with the keys that you downloaded

8. To sign into Vault, use the `root_token` key in the Keys JSON file that you downloaded.

9. Exec into the `vault-0` Pod
`kubectl exec -it vault-0 -- /bin/sh`

10. Within the Pod, run the following command to log into Vault via the CLI.
`vault login`

## Enabling Kubernetes Authentication In Vault.

### Enable Kubernetes Auth

```
kubectl exec -ti vault-0 -- /bin/sh
```

```
vault auth enable kubernetes
```

```
vault write auth/kubernetes/config kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443"

```

### Create A Secret

```
vault secrets enable -path=secret kv-v2
```

```
vault kv put secret/config username="helloworld" password="supersecret"
```

### Create A Policy

```
vault policy write apptest - <<EOF
path "secret/data/config" {
  capabilities = ["read"]
}
EOF
```

### Create A Role

```
vault write auth/kubernetes/role/apptest \
    bound_service_account_names=apptest \
    bound_service_account_namespaces=default \
    policies=apptest \
    ttl=24h
```

Exit out of the Pod

### Service Account

Create a new service account in Kubernetes that matches the Role in Vault.

```
kubectl create sa apptest
```

## Kubernetes and Vault Annotations

This approach runs an initContainer and/or sidecar container to communicate with an external secret store.

Typically, secrets are injected into the Pod’s filesystem, making them available to all containers running in a Pod.

It's highly recommend to use this approach when possible. The major benefit is that it decouples the secret store entirely from the application. However, this does make the platform more complex, as facilitating secret injection is now an offering of the Kubernetes-based platform.

```
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginxdeployment
  replicas: 1
  template:
    metadata:
      annotations:
        vault.hashicorp.com/agent-inject: 'true'
        vault.hashicorp.com/role: 'apptest'
        vault.hashicorp.com/agent-inject-secret-database-config.txt: 'secret/data/config'
      labels:
        app: nginxdeployment
    spec:
      serviceAccountName: apptest
      containers:
      - name: nginxdeployment
        image: nginx:latest
        ports:
        - containerPort: 80
EOF
```