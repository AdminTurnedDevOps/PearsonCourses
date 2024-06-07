10 minutes

## Troubleshooting Pods

There are five commands that we care about when it comes to troubleshooting Kubernetes:

```
kubectl describe
```
```
kubectl get events
```
```
kubectl logs
```
```
kubectl debug
```
```
kubectl top
```

Let's test how to use all of them.

First, deploy a sample app:

```
git clone https://github.com/digitalocean/kubernetes-sample-apps.git

cd kubernetes-sample-apps

kubectl apply -k bookinfo-example/kustomize

```

You can now start testing out the commands.
1. `kubectl top` gives you the ability to see resource optimization for both Pods and Nodes. Run the following:
```
kubectl top node
```

```
kubectl top pod
```

2. `kubectl debug` gives you the ability to debug a running object.
Get the name of a Pod from your demo app.
```
kubectl get pods -n bookinfo
```

Run the debug against the Pod. For example:
```
kubectl debug ratings-v1-749c48dd8d-wthdj -n bookinfo -it --image=busybox -c debugger
```

You now have a terminal to debug your Pod.

3. Take the same Pod and see if any logs are present. For example:
```
kubectl logs -n bookinfo reviews-v3-58d958c698-snh48
```

4. `kubectl get events` shows you all events from the Node to the Pod level for what's happening within your environment.

Run `kubectl get events` and you should see several. Here's an example output:
```
eHasSufficientMemory
32m         Normal    NodeHasNoDiskPressure     node/ip-192-168-89-24.ec2.internal    Node ip-192-168-89-24.ec2.internal status is now: NodeHasNoDiskPressure
32m         Normal    NodeHasSufficientPID      node/ip-192-168-89-24.ec2.internal    Node ip-192-168-89-24.ec2.internal status is now: NodeHasSufficientPID
32m         Normal    NodeAllocatableEnforced   node/ip-192-168-89-24.ec2.internal    Updated Node Allocatable limit across pods
32m         Normal    RegisteredNode            node/ip-192-168-89-24.ec2.internal    Node ip-192-168-89-24.ec2.internal event: Registered Node ip-192-168-89-24.ec2.internal in Controller
32m         Normal    Synced                    node/ip-192-168-89-24.ec2.internal    Node synced successfully
31m         Normal    Starting                  node/ip-192-168-89-24.ec2.internal    
31m         Normal    NodeReady                 node/ip-192-168-89-24.ec2.internal    Node ip-192-168-89-24.ec2.internal status is now: NodeReady
```

5. `describe` allows you to see the entire spec of an object.
```
kubectl describe pod PODNAME
```

```
kubectl describe deployment DEPLOYMENTNAME
```