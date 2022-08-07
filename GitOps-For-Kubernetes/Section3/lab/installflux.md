## Connect To GitHub

The command below not only connects Flux to GitHub, but it creates a new repo called `flux-fleet` where you can manage all of your clusters and repos/sources from one place.

```
flux bootstrap github \
  --owner=adminturneddevops \
  --repository=flux-fleet \
  --branch=main \
  --namespace=flux \
  --path=./clusters/minikube \
  --personal
  ```


## Check Flux Installation
  `flux check --pre`

## Flux-fleet repo

You're going to need to perform your flux commands from the `flux-fleet` repository.

1. Clone the `flux-fleet` repository to your `localhost`
2. `cd` into the `flux-fleet` repo


## Add the repo/source to Flux
```
flux create source git nginxdeployment \
  --url=https://github.com/AdminTurnedDevOps/PearsonCourses \
  --branch=main \
  --interval=10s \
  --export > ./clusters/minikube/nginxdeployment-source.yaml
```

```
git add .
git commit -m "push nginxdeploy source"
git push
```

## Deploy the app
```
flux create kustomization nginxdeployment \
  --target-namespace=default \
  --source=nginxdeploy \
  --path="GitOps-For-Kubernetes/Section3/hands-on/withgitops/kustomize" \
  --prune=true \
  --interval=5m \
  --export > ./clusters/my-cluster/nginxdeployment-kustomization.yaml
  ```

  ```
git add .
git commit -m "deploy nginxdeployment app"
git push
```

## Watch the release
`flux get helmreleases --watch`