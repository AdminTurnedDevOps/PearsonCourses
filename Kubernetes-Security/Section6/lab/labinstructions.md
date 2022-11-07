## Scan Kubernetes Manifests with Kubescape

1. Sign up for the Kubescape Forever Free editor: https://cloud.armosec.io/account/sign-up

2. Install the Kubescape CLI: https://github.com/kubescape/kubescape

3. Log into the Kubescape UI, and under the dashboard, you’ll see an option to add cluster scans. Click the Add cluster scans button.

4. Next, you have two options to choose from to deploy cluster scanning:

- In Cluster Deployment, which is a Helm Chart that you deploy inside of your cluster.
- With the Kubescape CLI, which you can use locally or even in an automated fashion with a CICD pipeline.

Use the Helm Option. You can copy the code from the Kubescape UI as it'll automatically have your account GUID. 

5. Now that the cluster exists, click on CONFIGURATION SCANNING in the left pane and then click on AllControls.

6. You should see a screenshot similar to the screenshot below.

[](../images/1.png)

7. Click the "scan" button on the top right and run a scan of ALL. Ensure that cluster scanning is enabled on the bottom left.

[](../images//2.png)

You'll see a ton of results on the bottom. You can go through each to get an idea of what they look like.

## Cluster scan with Kube-bench
