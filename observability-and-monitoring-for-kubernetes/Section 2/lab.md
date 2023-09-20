10 minutes

## Setting Up Datadog For Kubernetes

1. Sign up for Datadog here: https://www.datadoghq.com/

2. Set environment variables

```
CLUSTER_NAME=
API_KEY=
 (get the API key from Organization Settings in Datadog)
```


```
helm repo add datadog https://helm.datadoghq.com
```

```
helm repo update
```

```
helm install datadog -n datadog \
--set datadog.site='datadoghq.com' \
--set datadog.clusterName=$CLUSTER_NAME \
--set datadog.clusterAgent.replicas='2' \
--set datadog.clusterAgent.createPodDisruptionBudget='true' \
--set datadog.kubeStateMetricsEnabled=true \
--set datadog.kubeStateMetricsCore.enabled=true \
--set datadog.logs.enabled=true \
--set datadog.logs.containerCollectAll=true \
--set datadog.apiKey=$API_KEY \
--set datadog.processAgent.enabled=true \
--set targetSystem='linux' \
datadog/datadog --create-namespace
```