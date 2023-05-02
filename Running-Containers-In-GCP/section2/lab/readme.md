## Deploy GKE With Terraform

Deploy the code found in [this repo](https://github.com/AdminTurnedDevOps/Kubernetes-Quickstart-Environments/tree/main/Google/GKE)

Ensure that you input your appropriate value for the GCP Project Name in the `variables.tf` file.


## Deploy GKE in the UI

1. Log into GCP
2. Go to the Kubernetes Engine pane --> Clusters
3. Click the blue Create button
4. Give the cluster a name, choose your region, and the k8s version that you want (anything above 1.25 is ideal)

At this point, there are several options available. Go through each option that's available in the Node Pools and Cluster section.

## Go over GKE Security Posture

Once you have a cluster deployed, click through the options that are available within the GKE Security Posture pane. You'll see various options from authentication to authorization to any threats within your cluster.