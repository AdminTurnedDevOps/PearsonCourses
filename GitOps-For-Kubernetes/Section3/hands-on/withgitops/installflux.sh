## Connect To GitHub

flux bootstrap github \
  --owner=adminturneddevops \
  --repository=PearsonCourses \
  --branch=main \
  --path=./clusters/minikube \
  --personal

## Add the repo to Flux

flux create source git nginxdeployment \
  --url=https://github.com/AdminTurnedDevOps/PearsonCourses/GitOps-For-Kubernetes/Section3/hands-on/withgitops \
  --branch=master \
  --interval=10s \
  --export > ./clusters/minikube/podinfo-source.yaml

flux create kustomization nginxdeployment \
  --target-namespace=default \
  --source=podinfo \
  --path="." \
  --prune=true \
  --interval=10s \
  --export > ./clusters/minikube/podinfo-kustomization.yaml