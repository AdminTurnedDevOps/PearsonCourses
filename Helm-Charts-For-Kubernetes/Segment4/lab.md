
# Environments

In this lab, you're going to see the power of where Helm Charts shine a ton, which is how to deploy a Chart to each environment.

When you're working in any production environment, you'll most likely have something like:
- Dev
- Staging
- Production

Within each environment, the values will be different. For example, you might deploy one Replica to Dev, two replicas to Staging, and three replicas to Production.

## Create Namespaces
Create the Namespaces for each environment

```
kubectl create namespace dev
```

```
kubectl create namespace staging
```

```
kubectl create namespace prod
```

## New Charts

For the new environments (Dev, Staging, Prod) you won't need three Helm Charts. Instead, you'll see `value.yaml` files for each environment.

1. Create a new Helm Chart
```
helm create nginxvalues
```

2. Next, within the `nginxvalues` Directory, create a new directory called `values`.

3. Within the `values` directory, create three directories:
- dev
- staging
- prod

4. Copy the `values.yaml` file that's in the `nginxvalues` directory into the dev, staging, and prod directories.

5. Change the replica count variable:
- Keep dev as one
- Change staging to two
- Change prod to three

## Install For Dev
When you want to use specific `value.yaml` files for each environment, you can specifiy them with the `-f` flag.
1. First, install the Helm Chart for the dev environment.
```
helm install nginxdev nginxvalues -n dev -f nginxvalues/values/dev/values.yaml
```

Run the following and you'll see that one Pod exists.
```
kubectl get pods -n dev
```

## Install For Staging
1. Run the following to install into the staging Namespace.

```
helm install nginxstaging nginxvalues -n staging -f nginxvalues/values/staging/values.yaml
```

Confirm that two Pods exist.
```
kubectl get pods -n staging
```

## Install For Prod
1. Run the following to install into the prod Namespace
```
helm install nginxprod nginxvalues -n prod -f nginxvalues/values/prod/values.yaml
```

Confirm that three Pods exist.
```
kubectl get pods -n prod
```

## Cleanup
1. To clean up the environments that you just created, you can run the following commands for each Namespace.

```
helm uninstall nginxdev -n dev
```

```
helm uninstall nginxstaging -n staging
```

```
helm uninstall nginxprod -n prod
```

# Running Configs With Values.yaml

In the previous labs, you saw how to create a `values` directory, put each value file in, and then run the configs.

In this section, you'll learn how you can create a values file in the primary Helm Chart directory without the `values` directory.

Personally, I always prefer the method of putting the value files in the `values` directory. There's no difference from a technical perspective. I just believe it looks cleaner.

1. Create three files within the Helm Chart directory.
```
values-dev.yaml
values-staging.yaml
values-prod.yaml
```

Once created, populate the Value files with the defaults in the `values.yaml` file.

2. Create Namespaces for each environment (if this fails it's because you already have them created from the previous lab)
```
kubectl create namespace dev
kubectl create namespace staging
kubectl create namespace prod
```

3. Create the Helm Charts
Now that the value files are complete, you can create the Helm Charts in the same fashion as the previous labs. You'll still use the `-f` flag, but you'll just point to the new value files instead of the value files in the directory.

```
helm install nginxdev nginxvalues -n dev -f nginxvalues/values-dev.yaml
helm install nginxstaging nginxvalues -n staging -f nginxvalues/values-staging.yaml
helm install nginxprod nginxvalues -n prod -f nginxvalues/values-prod.yaml
```
To check that the Pods deployed successfully:
```
kubectl get pods -n dev
kubectl get pods -n staging
kubectl get pods -n prod
```

4. Cleanup
```
helm uninstall nginxdev -n dev
helm uninstall nginxstaging -n staging
helm uninstall nginxprod -n prod
```

# Helm Chart Pipelines/Go Templates

The purpose of this lab is to use some of the functions that you learned about in this section to create a Helm Chart and update values of the Helm Chart with pipeline values

1. Create a Helm Chart
```
helm create nginxpipelines
```

2. Open up the Helm Chart and go to templates --> `deployment.yaml`

3. Replace line 6 of the `deployment.yaml` with the following:
```
{{- include "nginxpipelines.labels" . | indent 4 | lower }}
```

This code ensures that the labels are all lower case, which is what the `lower` pipeline is used for. Per best practices and standards, lowercase RFC 1123 subdomain must consist of lower case alphanumeric characters, so you want to ensure that your labels are lowercase.

4. Run the following to install the Helm Chart
```
helm install nginxupdate .
```

The Helm Chart is now created and the labels are all lowercase.

5. Clean up
```
helm uninstall nginxupdate
```