# Hands-On Lab
## Create A Helm Chart
1. Create a Helm Chart with the following command
`helm create mychart`

## Install Helm Chart
1. Install the Helm Chart that's in your current directory and give it a name called `nginxapp`
`helm install nginxapp .`

## Upgrade A Chart

1. `helm install nginxapp .`
2. Go into the `values.yaml` file and change the replica count to `2`
3. `helm upgrade nginxapp .`

## Uninstall The Helm Chart
1. Uninstall a Helm Chart with the following command
`helm uninstall nginxapp `