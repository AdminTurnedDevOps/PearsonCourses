15 minutes

## Implement cluster autoscaling in Azure or AWS

### For AWS

https://docs.aws.amazon.com/eks/latest/userguide/autoscaling.html

https://repost.aws/knowledge-center/eks-install-karpenter

### For Azure

1. Run the following and ensure to put in the proper values for the variables.

```
resourceGroup=
aksClusterName=

az aks update \
  --resource-group $resourceGroup \
  --name $aksClusterName \
  --enable-cluster-autoscaler \
  --min-count 1 \
  --max-count 3
```

## Implementing ACI bursting (if you have Azure)

For the purposes of this lab, you'll need a dedicated subnet within your vNet for virtual nodes.

1. Enable the provider
```
az provider register --namespace Microsoft.ContainerInstance
```

2. Deploy the vNode addon.
```
resourceGroup=
aksClusterName=
myVirtualNodeSubnet=

az aks enable-addons \
    --resource-group $resourceGroup \
    --name $aksClusterName \
    --addons virtual-node \
    --subnet-name $myVirtualNodeSubnet
```
