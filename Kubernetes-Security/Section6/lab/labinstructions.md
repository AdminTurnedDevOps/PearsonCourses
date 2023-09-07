10 minutes

## Implementing cluster scanning with Kubescape

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

1. Download kube-bench. The installation options will vary based on your operating system. For example, below is how you can download Kube-benhc on an Ubuntu server.
```
curl -L https://github.com/aquasecurity/kube-bench/releases/download/v0.6.10/kube-bench_0.6.10_linux_amd64.deb -o kube-bench_0.6.10_linux_amd64.deb
```

Then, you can run the installation.

```
sudo apt install ./kube-bench_0.6.10_linux_amd64.deb -f
```

ON MAC
```
curl -L https://github.com/aquasecurity/kube-bench/releases/download/v0.6.2/kube-bench_0.6.2_linux_amd64.tar.gz -o kube-bench_0.6.2_linux_amd64.tar.gz

tar -xvf kube-bench_0.6.2_linux_amd64.tar.gz
```

There are several other installation options. Please see them here: 

2. Once kube-bench is installed, run it on the terminal. 
```
kube-bench
```

It's going to run against your Kubernetes cluster that's in your current context, so you should see a ton of output on the terminal.