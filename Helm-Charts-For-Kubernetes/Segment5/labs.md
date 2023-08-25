(10 minutes)

# Go SDK

For the purposes of this section, you don't have to know Go, but you should have some prior programming experience. It's totally fine if you don't know everything that's going on in this lab. This lab is more to show that there are other ways to interact with Helm other than the CLI that we've been using.

To install Go if you don't already have it, you can use the following link:

https://go.dev/doc/install

## List Helm
1. `cd` into `Segment5/advanced/list`
Look through the code and see what's happening. Notice that it's using Helm packages and commands to list the Helm Charts.

2. Initialize the list package (this may fail if you cloned this repo as the go.mod file already exists).
```
go mod init list
```

3. Clean up the packages and pull down any packages that are needed.
```
go mod tidy
```

4. Retrieve the Helm package
```
go get helm.sh/helm/v3/pkg/action
```

5. Run the code
```
go run main.go
```

You should see a YAML output of the Helm Chart.

## Create A Helm Chart
In the previous section, you used Go to list Helm Charts. In this section, let's learn how to create Helm Charts with Go.

1. `cd` into `Segment5/advanced/createchart`

2. Initialize the create package (this may fail if you cloned this repo as the go.mod file already
`go mod init createchart`

3. Pull down and clean up any packages
```
go mod tidy
```

4. Retireve the Helm packages
```
go get helm.sh/helm/v3/pkg/action

go get helm.sh/helm/v3/pkg/action

go get helm.sh/helm/v3/pkg/chart/loader
```

5. Run the helm install
```
go run main.go "../mychart" "nginxapp"
```

6. Once complete, run the following command to see that the Helm Chart was deployed successfully.
```
helm list
```

## Real-World Projects

1. Prometheus: https://github.com/nginxinc/kubernetes-ingress/tree/main/deployments/helm-chart
2. Ingress-nginx: https://github.com/prometheus-community/helm-charts/tree/main/charts/alertmanager
3. Top Ten Helm Charts: https://kubedex.com/top-10/