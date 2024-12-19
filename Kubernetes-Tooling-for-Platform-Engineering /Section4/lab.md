# Lab

15 minutes

## ArgoCD
1. First, add the Helm repo for ArgoCD.

```
helm repo add argo https://argoproj.github.io/argo-helm
```

2. Next, deploy ArgoCD with Helm.

**if you aren't running a cluster with 3 or more Worker Nodes, run the following Helm Chart**

```
helm install argocd -n argocd argo/argo-cd --create-namespace
```

You'll need to run a `port-forward` command on the ArgoCD service if you aren't running in HA.

**if you are running a cluster with 3 or more Worker Nodes, run the following Helm Chart**

```
helm install argocd -n argocd argo/argo-cd \
--set redis-ha.enabled=true \
--set controller.replicas=1 \
--set server.autoscaling.enabled=true \
--set server.autoscaling.minReplicas=2 \
--set repoServer.autoscaling.enabled=true \
--set repoServer.autoscaling.minReplicas=2 \
--set applicationSet.replicaCount=2 \
--set server.service.type=LoadBalancer \
--create-namespace
```

## Get Password

Get the initial ArgoCD UI admin password
```
kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```


## Log Into Argo
1. Log into the server via the CLI.
`argocd login localipORloadbalancer:argocd_port_here`

## Update Password
1. In the Argo CD UI, go to User Info --> Update Password

2. Change the password from the initial admin password to a password of your choosing

## Namespace

1. Create a Namespace for your new app
```
kubectl create namespace sock-shop
```

## Deploy The App

The Socks App is a popular microservice demo which you can find here: https://microservices-demo.github.io/deployment/kubernetes-start.html

1. Deploy the Socks App in ArgoCD.
```
argocd app create socks --repo https://github.com/microservices-demo/microservices-demo.git --path deploy/kubernetes --dest-server https://kubernetes.default.svc --dest-namespace sock-shop
```

2. Check the status of the app
```
argocd app get socks
```

2. Check that the app was deployed in the ArgoCD UI


## DevEx

1. Come up with a list of 3-4 things that would enhance developer experience in your organization. Once complete, share the list in the attendee chat. **do not put in company-specific information in the attendee chat**