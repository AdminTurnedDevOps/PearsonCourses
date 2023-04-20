## Implement cost optimization with Cast.ai

Sign up for free to use Cast.ai https://cast.ai/

Install Cast.ai on your k8s cluster

```
curl -H "Authorization: Token (you'll get this from your Cast.ai dashboard when you signed up) "https://api.cast.ai/v1/agent.yaml?provider=aks" | kubectl apply -f -
```

Go to your Cast.ai dashboard and you'll now see your cluster.

## Implement resource optimization with Sosivio

**Ensure that you have at least a two node cluster**

1. Go to the following page to download Sosivio https://www.sosiv.io/app/download

The installation will be based on your OS. The direction below showcase a Mac installer, but you'll also see options for a Windows installer.

2. Untar

```
tar -xvf tar -xvf installer-release-1.5.3-mac.tar.gz
```

3. Run the installer
./installer-release-1.5.3-mac

4. Expose the k8s Service for Sosivio so you can log in

```
kubectl port-forward -n sosivio svc/dashboard 8088:8088
```

Username: admin Password: It'll be displayed on the terminal

If you need the password after it's displayed:

```
kubectl get secrets/sosivio-admin-otp -n sosivio --template={{.data.password}} | base64 -D
```