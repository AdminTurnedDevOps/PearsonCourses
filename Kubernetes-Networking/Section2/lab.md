10 minutes

## Configuring Cilium

Do the **Install the Cilium CLI** and **Install Cilium** sections

https://docs.cilium.io/en/stable/gettingstarted/k8s-install-default/

**Heads Up**: The reason why I'm having you go to the Cilium docs for the installation
              is because there are different methods for each Kubernetes environment

## Configure Cilum With eBPF

```
helm repo add cilium https://helm.cilium.io/
```

```
helm install cilium cilium/cilium \
--namespace kube-system \
--set egressMasqueradeInterfaces=eth0 \
--set eni.enabled=true \
--set ipam.mode=eni \
--set nodeinit.enabled=true \
--set kubeProxyReplacement=true
```

```
kubectl delete ds -n kube-system kube-proxy
```