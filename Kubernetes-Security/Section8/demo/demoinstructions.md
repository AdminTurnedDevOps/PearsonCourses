## Creating and retrieving secrets on Kubernetes

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
```
kubectl get svc
```

5. Enter 5 in the *Key shares* and 3 in the *Key threshold* text fields.

6. Download the keys (the option is on the bottom of the screen so just scroll down).

7. Follow the instructions to unseal Vault with the keys that you downloaded

8. To sign into Vault, use the `root_token` key in the Keys JSON file that you downloaded.

9. Exec into the `vault-0` Pod
```
kubectl exec -it vault-0 -- /bin/sh
```

10. Within the Pod, run the following command to log into Vault via the CLI.
```
vault login
```
