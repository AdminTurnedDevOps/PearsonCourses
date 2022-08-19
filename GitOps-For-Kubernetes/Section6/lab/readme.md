
## Helm Chart
Take a look at the Helm Chart in the `nginx` directory. You'll see that it contains a way to deploy an Nginx stateless app.

It has the:
- Deployment.yaml
- Service.yaml

The Helm Chart deployments a stateless web app

## Expose ArgoCD
If you closed out of the kubectl forwarder from lab 4, do that again.

```
kubectl port-forward service/argocd-server :80
```

## Log Into ArgoCD
Log into the server via the CLI. The port is what ArgoCD is hosting hosted on from the `kubectl port-forward` section in **Server Installation**

```
argocd login 127.0.0.1:argocd_port_here
```

## Deploy The App

`argocd app create nginxdeployment --repo https://github.com/AdminTurnedDevOps/PearsonCourses.git --path GitOps-For-Kubernetes/Section6/lab/nginx --dest-server https://kubernetes.default.svc --dest-namespace default`

## ArgoCD Portal

Log into the ArgoCD portal and you'll now see the Helm Chart is deployed.