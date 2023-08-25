(10 minutes)

## Create A Helm Chart
1. Create a Helm Chart with the following command
```
helm create mychart
```

## Install Helm Chart
1. `cd` into the `mychart` directory.

2. Install the Helm Chart that's in your current directory and give it a name called `nginxapp`
```
helm install nginxapp .
```

## Upgrade A Chart

1. Go into the `values.yaml` file within the Helm Chart that you created and change the replica count to `2`. The replica count should be on line 5.

2. Run the Upgrade command
```
helm upgrade nginxapp .
```

## Uninstall The Helm Chart
1. Uninstall a Helm Chart with the following command
```
helm uninstall nginxapp
```