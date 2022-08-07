flux bootstrap github \
  --owner=adminturneddevops \
  --repository=PearsonCourses \
  --branch=main \
  --path=./clusters/minikube \
  --personal


flux create source git nginxdeployment \
  --url=https://github.com/AdminTurnedDevOps/PearsonCourses/GitOps-For-Kubernetes/Section3/hands-on/withgitops \
  --branch=master \
  --interval=10s \
  --export > ./clusters/minikube/podinfo-source.yaml