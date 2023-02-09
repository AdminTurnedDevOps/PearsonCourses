**If the `kube-prometheus` directory is empty for you, please re-clone it here**: https://prometheus-operator.dev/docs/prologue/quick-start/

Start Fresh! 

This lab is going to be based off of everything we've talked about throughout this course and what we built on. Because of that, a few of these components may already exist. If you're using Minikube, KinD, Docker Desktop, etc..., delete the cluster and deploy a new one.

## Deploy ArgoCD

1. Create a namespace for ArgoCD
`kubectl create namespace argocd`

2. Install Argo
`kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml`

If you aren't in an HA environment that has three (3) nodes (for example, if you're using Minikube)

`kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`

3. Get the initial admin password
`kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d`

4. Open up Argo's UI
`kubectl port-forward -n argocd service/argocd-server :80`

## Log Into Argo
1. Log into the server via the CLI. The port is what ArgoCD is hosting hosted on from the `kubectl port-forward` section in **Server Installation**
`argocd login 127.0.0.1:argocd_port_here`

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

## Monitoring
https://prometheus-operator.dev/docs/prologue/quick-start/

1. Change path
```
cd Section7/kube-prometheus
```

3. Run the following commands
```
# Create the namespace and CRDs, and then wait for them to be availble before creating the remaining resources
kubectl create -f manifests/setup

# Wait until the "servicemonitors" CRD is created. The message "No resources found" means success in this context.
until kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done

kubectl create -f manifests/
```

4. Configure Prometheus to listen to the `/metrics` endpoint from ArgoCD. The Argo Rollouts controller is already instrumented with Prometheus metrics available at /metrics in port 8082. You can use these metrics to look at the health of the controller either via dashboards or via other Prometheus integrations.

```
kubectl apply -f metricconsumption.yaml
```

5. Open up the port for Grafana
```
kubectl --namespace monitoring port-forward svc/grafana 3000
```

6. Log into Grafana
```
Username: admin
Password: admin
```

7. Check Prometheus to confirm it's collecting ArgoCD metrics
```
kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
```

8. Within Prometheus, import the example ArgoCD dashboard in. It's the `argo.json` file.

You can now see the cluster and apps deployed.

## Registering Another Cluster (Optional)

1. Get a list of current contexts that you have available on your `localhost`.

`kubectl config get-contexts -o name`

2. Choose a context that you wish to use. The context that you wish to use will be authenticated to ArgoCD

3. Add the chosen context
`argocd cluster add kubernetes_context_name_here`

## Helpful Docs
- https://argo-cd.readthedocs.io/en/stable/operator-manual/metrics/
- https://argoproj.github.io/argo-rollouts/features/controller-metrics/
- https://prometheus-operator.dev/docs/prologue/quick-start/
- https://prometheus-operator.dev/docs/kube/monitoring-other-namespaces/