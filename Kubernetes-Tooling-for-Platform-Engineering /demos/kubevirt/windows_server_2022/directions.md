1. Install KubeVirt: `install.sh`

2. `prereqs` page

3. `iso_update.md` page

4. Create the PVC for the Windows Server hard drive: `pvc.yaml`

5. Pull down the Docker Image for the Virtio drivers
- `docker pull quay.io/kubevirt/virtio-container-disk`
- Docs: https://kubevirt.io/user-guide/virtual_machines/windows_virtio_drivers/#how-to-obtain-virtio-drivers

6. Create the VM with the `win2022.yaml`

7. Connect to the VM: `./virtctl-v1.1.0-alpha.0-darwin-arm64 vnc VMNAME`

8. When you get to the screen to install the OS on a disk, you'll see no disks. You have to implement the drivers by clicking the "Load driver" button.