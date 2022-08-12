## CLI Installation
https://argo-cd.readthedocs.io/en/stable/cli_installation/

## Server Installation

Install Argo
`kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.4.3/manifests/ha/install.yaml`

Get the initial admin password
`kubectl  get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d`

Open up Argo's UI
`kubectl port-forward service/argocd-server :80`

Get your current context for your k8s cluster

`kubectl config get-contexts -o name`

Add the context
`argocd cluster add kubernetes_context_name_here`

Log into the server via the CLI
`argocd login 127.0.0.1:argocd_port_here`

## App Deployment
Deploy an app

`argocd app create nginxdeployment --repo https://github.com/AdminTurnedDevOps/kubernetes-examples.git --path imagePullPolicy --dest-server https://kubernetes.default.svc --dest-namespace default`

You should now see the app running in the Argo UI