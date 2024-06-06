10 minutes

## Cluster Networking In The Cloud

### AKS

An (AKS) cluster configured with API Server VNet Integration projects the API server endpoint directly into a delegated subnet in the VNet where AKS is deployed. API Server VNet Integration enables network communication between the API server and the cluster nodes without requiring a private link or tunnel

1. Add the AKS preview option
```
az extension add --name aks-preview
```

2. Regster the vNet Integration
```
az feature register --namespace "Microsoft.ContainerService" --name "EnableAPIServerVnetIntegrationPreview"
```

3. Confirm that the status is `registered`
```
az provider register --namespace Microsoft.ContainerService
```

4. Deploy a secure and private cluster

This is incredibly important in the Managed Kubernetes Service space. Unfortunately, a lot of clusters tend
to be public facing, which is a big no-no from a network security perspective. This integration makes
it easier to manage and use private clusters.

```
az aks create --name <cluster-name> \
--resource-group <resource-group> \
--location <location> \
--network-plugin azure \
--enable-private-cluster \
--enable-apiserver-vnet-integration \
--generate-ssh-keys
```




### EKS

Creating a proper network for EKS is crucial to ensure that you not only have enough IP addresses available,
but to ensure that the cluster is private. Despite the fact that most clusters end up accidentally being
on the public network, we want to stop that as much as possible.

1. Open the AWS CloudFormation console at https://console.aws.amazon.com/cloudformation.

2. From the navigation bar, select an AWS Region that supports Amazon EKS.

3. Choose **Create stack**, With new resources (standard).

4. Under Prerequisite - Prepare template, make sure that Template is ready is selected and then under Specify template, select Amazon S3 URL.

Create a VPC for ipv4:
```
https://s3.us-west-2.amazonaws.com/amazon-eks/cloudformation/2020-10-29/amazon-eks-vpc-private-subnets.yaml
```

5. On the Specify stack details page, enter the parameters

6. On the Review page, choose Create stack.

7. When your stack is created, select it in the console and choose Outputs.

You'll now see the new info for your network.



## Local Cluster Creation

If you don't have an AKS or EKS cluster per the prerequisites, you can use this time to create a Kind or Minikube cluster (ensure to use 3 nodes for each)

Minikube: https://minikube.sigs.k8s.io/docs/tutorials/kubernetes_101/module1/

```
minikube start --nodes 3
```

Kind: https://kind.sigs.k8s.io/docs/user/quick-start