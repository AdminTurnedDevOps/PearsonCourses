 Expose the CDI Upload Proxy. Containerized-Data-Importer (CDI) is a persistent storage management add-on for Kubernetes. It's primary goal is to provide a declarative way to build Virtual Machine Disks on PVCs for Kubevirt VMs

 ```
 kubectl port-forward -n cdi service/cdi-uploadproxy 18443:443
 ```
 
 Upload the ISO
 ```
 ./virtctl-v1.1.0-alpha.0-darwin-amd64 image-upload \
   --image-path=/Users/michael/Downloads/SERVER_EVAL_x64FRE_en-us.iso \
   --pvc-name=isohd \
   --size=20Gi \
   --storage-class=azurefile-premium \
   --uploadproxy-url=https://127.0.0.1:18443 \
   --insecure \
   --wait-secs=240
```