# Go SDK

## List Helm
1. `cd` into `Segment5/advanced/list`
2. `go mod init list`
3. `go mod tidy`
4. `go get helm.sh/helm/v3/pkg/action`
5. `go run main.go`

## Create A Helm Chart
1. `cd` into `Segment5/advanced/createchart`
2. `go mod init list`
3. `go mod tidy`
4. `go get helm.sh/helm/v3/pkg/action`
5. `go get helm.sh/helm/v3/pkg/action`
6. `go get helm.sh/helm/v3/pkg/chart/loader`
7. `go run main.go "../mychart" "nginxapp"`

## Real-World Projects

1. Prometheus: https://github.com/nginxinc/kubernetes-ingress/tree/main/deployments/helm-chart
2. Ingress-nginx: https://github.com/prometheus-community/helm-charts/tree/main/charts/alertmanager
3. Top Ten Helm Charts: https://kubedex.com/top-10/