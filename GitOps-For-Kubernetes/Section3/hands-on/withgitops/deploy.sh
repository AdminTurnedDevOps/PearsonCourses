flux create kustomization nginxdeployment \
  --target-namespace=default \
  --source=nginxdeployment \
  --path="./kustomize" \
  --prune=true \
  --interval=5m \
  --export > ./clusters/minikube/nginxdeployment-kustomization.yaml