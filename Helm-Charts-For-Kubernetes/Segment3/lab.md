## Create the Helm Chart
1. Create a Helm Chart
```
helm create nginxtestupdate
```

2. Test the Helm Chart with the dry run command.
```
helm install nginx nginxtestupdate --dry-run --debug
```

You'll see the YAML output for what Kubernetes Resources will be deployed.

## Upgrade The Helm Chart

1. View the Chart
```
helm list -a
```

You'll see that no chart currently exists.

2. Deploy the Helm Chart
```
helm install nginx nginxtestupdate/
```

Notice in the above command how you aren't specifying the current directory (`.`). Instead, you're specifying the directory name for the Helm Chart.

3. Run the following command to see how many Pods are available for the Helm Chart.
```
kubectl get Deployments
```

You should only see one replica.

4. Within the `values.yaml`, change the replica count from `1` to `3`

5. Run the upgrade command.
```
helm upgrade nginx nginxupdate/
```

Notice with this upgrade you aren't utilizing the current directory (`.`) like in the last lab. This shows you that you don't have to be in the current directory to upgrade, but instead, point to the Helm Chart directory which you'd like to update.

6. Run `kubectl get deployments` to see that the `replicaSet` changed from 1 to 2.

## View Helm Chart History

You're able to view the Helm Charts history, as in, view the changes that have occurred and when. For example, when you run the below command, you'll see the:
- Revision number
- The time and date that the change occurred
- The description

and a few other pieces of valuable information.

This is great for not only version control, but troubleshooting. If a containerized application goes down at a specific time, you can check out the history and see if any changes were made.

1. Run the history command.
```
helm history nginx
```

## Rollback The Helm Chart

Rollbacks allow you to take a chart that you changed and roll it back to a previous version. For example, if a change was made that perhaps broke an environment, you can roll back that change.

1. Retrieve the history of the Helm Chart
```
helm history nginx
```

2. Take note of the revision number that you want to roll back to

3. Run the rollback command to the revision you wish to roll back to
```
helm rollback nginx 1
```

## Delete The Helm Chart

1. To clean up the Helm Chart, run the following.
```
helm uninstall nginx
```