flux bootstrap github \
  --owner=adminturneddevops \
  --repository=PearsonCourses \
  --branch=main \
  --path=./clusters/minikube \
  --personal


flux create source git nginxdeployment \
  --url=https://github.com/stefanprodan/podinfo \
  --branch=master \
  --interval=30s \
  --export > ./clusters/my-cluster/podinfo-source.yaml