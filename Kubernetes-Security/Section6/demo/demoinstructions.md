## Manifest Scanning With Kubescape

```
kubescape scan https://github.com/AdminTurnedDevOps/PearsonCourses/tree/main/Helm-Charts-For-Kubernetes/Segment3/nginxupdate
```


## Scan container images with Checkov

1. Install Checkov
```
brew install checkov
```

2. Run a scan
```
checkov --file Section6/demo/nginx.yaml
```

For more installation methods, check out this link: https://www.checkov.io/2.Basics/Installing%20Checkov.html
