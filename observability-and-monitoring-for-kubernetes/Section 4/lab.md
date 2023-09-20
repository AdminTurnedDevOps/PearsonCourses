15 minutes

## Setting Up Container Insights In AWS

Once your EKS cluster is configured, you can use the following bash script

If you need the code to create an EKS cluster, check this out: https://github.com/AdminTurnedDevOps/Kubernetes-Quickstart-Environments/tree/main/aws/eks

```
ClusterName=
RegionName=
FluentBitHttpPort='2020'
FluentBitReadFromHead='Off'
[[ ${FluentBitReadFromHead} = 'On' ]] && FluentBitReadFromTail='Off'|| FluentBitReadFromTail='On'
[[ -z ${FluentBitHttpPort} ]] && FluentBitHttpServer='Off' || FluentBitHttpServer='On'
curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/quickstart/cwagent-fluent-bit-quickstart.yaml | sed 's/{{cluster_name}}/'${ClusterName}'/;s/{{region_name}}/'${RegionName}'/;s/{{http_server_toggle}}/"'${FluentBitHttpServer}'"/;s/{{http_server_port}}/"'${FluentBitHttpPort}'"/;s/{{read_from_head}}/"'${FluentBitReadFromHead}'"/;s/{{read_from_tail}}/"'${FluentBitReadFromTail}'"/' | kubectl apply -f - 
```

## Setting Up Container Insights In Azure

If you need code to set up an AKS cluster, check this out: https://github.com/AdminTurnedDevOps/Kubernetes-Quickstart-Environments/tree/main/azure/aks

To enable container insights:
1. Enable the Addon
```
az aks enable-addons -a monitoring -n <cluster-name> -g <cluster-resource-group-name>
```

You should now be able to see the container insights info in Azure Monitor