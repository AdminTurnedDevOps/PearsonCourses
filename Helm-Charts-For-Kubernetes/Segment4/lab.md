
# Values.yaml Lab

## Create Namespaces
`kubectl create namespace dev`
`kubectl create namespace staging`
`kubectl create namespace prod`

## Charge Directory
`cd Segment4`

## Install For Dev
`helm install nginxdev nginxvalues -n dev -f nginxvalues/values/dev/values.yaml`
`kubectl get pods -n dev`

## Install For Staging
`helm install nginxstaging nginxvalues -n staging -f nginxvalues/values/staging/values.yaml`
`kubectl get pods -n staging`

## Install For Prod
`helm install nginxprod nginxvalues -n prod -f nginxvalues/values/prod/values.yaml`
`kubectl get pods -n prod`

## Cleanup
`helm uninstall nginxdev -n dev`
`helm uninstall nginxstaging -n staging`
`helm uninstall nginxprod -n prod`

# Running Configs With Values.yaml

1. Create three files:
`values-dev.yaml`
`values-staging.yaml`
`values-prod.yaml`

Once created, popular the Value files with your choice of values

2. Create namespaces
```
kubectl create namespace dev
kubectl create namespace staging
kubectl create namespace prod
```

3. Create the Helm Charts
```
helm install nginxdev nginxvalues -n dev -f values-dev.yaml
helm install nginxstaging nginxvalues -n staging -f values-staging.yaml
helm install nginxprod nginxvalues -n prod -f values-prod.yaml
```


4. Cleanup
`helm uninstall nginxdev -n dev`
`helm uninstall nginxstaging -n staging`
`helm uninstall nginxprod -n prod`

# Go Templates Lab