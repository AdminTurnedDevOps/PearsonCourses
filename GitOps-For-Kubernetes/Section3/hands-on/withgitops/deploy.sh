flux create kustomization nginxdeployment \
  --target-namespace=default \
  --source=nginxdeployment \
  --path="GitOps-For-Kubernetes/Section3/hands-on/withgitops" \
  --prune=true \
  --interval=10s \
  --export > ./clusters/minikube/nginxdeployment-kustomization.yaml