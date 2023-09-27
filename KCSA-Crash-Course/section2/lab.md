15 minutes

## AWS Security

https://docs.aws.amazon.com/secretsmanager/latest/userguide/integrating_csi_driver.html

## Azure Security

```
az ad user create --display-name pearsonuser --password 'Password12!@' --user-principal-name pearsonuser@yourdomain.onmicrosoft.com
```

```
az role definition list \
	--query "[?contains(roleName, 'Azure Kubernetes Service RBAC')].{roleName:roleName,description:description}"
```

```
az role assignment create \
    --assignee "pearsonuser@yourdomain.onmicrosoft.com" \
    --role "Azure Kubernetes Service RBAC Reader" \
    --scope $(az aks show \
        --resource-group yourrg \
        --name yourcluster \
        --query id -o tsv)
```

Log into the Azure portal, go to your AKS cluster, and check the permissions on the user.

## GCP Security

https://cloud.google.com/kubernetes-engine/docs/how-to/security-posture-vulnerability-scanning