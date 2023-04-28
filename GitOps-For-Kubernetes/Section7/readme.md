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

## OPTIONAL: Deploy ArgoCD With Helm

If you already deplyoed ArgoCD, you will need to delete the installation for this section if you choose to do it. This section is optional.

If you are running a local cluster, like Minikube or Kind, please note that this lab won't work. However, you should still go through the code and see how it looks because this is the solution you'll most likely be using in production.

1. First, add the Helm repo for ArgoCD.

```
helm repo add argo https://argoproj.github.io/argo-helm
```

2. Next, deploy ArgoCD with Helm. The Helm Chart below confirms high availability and that the ArgoCD UI is connected to a load balancer so you don't have to run `kube port-forward`

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

## Deploy An App In A Declarative Fashion

The lab below will showcase how you can use the declarative ArgoCD Application Controller to deploy Helm Charts.

1. Create the Kubeseal Namespace
```
kubectl create namespace kubeseal
```

2. Deploy the Bitnami Sealed Secrets Helm Chart using the declarative Controller for ArgoCD
```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: sealed-secrets
  namespace: argocd
spec:
  project: default
  source:
    chart: sealed-secrets
    repoURL: https://bitnami-labs.github.io/sealed-secrets
    targetRevision: 1.16.1
    helm:
      releaseName: sealed-secrets
  destination:
    server: "https://kubernetes.default.svc"
    namespace: kubeseal
```


## Helpful Docs
- https://argo-cd.readthedocs.io/en/stable/operator-manual/metrics/
- https://argoproj.github.io/argo-rollouts/features/controller-metrics/
- https://prometheus-operator.dev/docs/prologue/quick-start/
- https://prometheus-operator.dev/docs/kube/monitoring-other-namespaces/