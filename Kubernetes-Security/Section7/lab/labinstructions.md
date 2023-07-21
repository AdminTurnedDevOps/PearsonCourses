10 minutes

## Create a service account

1. Run the following command:
```
kubectl create sa mikeuser
```

## Create a ClusterRole

The cluster role below is essentially like read only permissions.

It creates the following for Kubernetes Pods

- get: Retrieve the data of a known secret by its name.
- list: Get a list of all secrets and/or secret data.
- watch: Watch any secret change and/or change to secret data.

Keep in mind that you can have multiple resources that you're specifying, but it's best to only specify one and create Roles for specific Kubernetes resources.
 

```
kubectl create -f - <<EOF
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
EOF
```

## Create a ClusterRoleBinding

In the previous labs, you created the ClusterRole and the Service Account. Now, you need a way to attach the service account to the Role. That's where a RoleBinding comes into play.

```
kubectl apply -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: read-pod-global
subjects:
- kind: ServiceAccount
  name: mikeuser
  apiGroup: ""
  namespace: default
roleRef:
  kind: ClusterRole
  name: reader
  apiGroup: rbac.authorization.k8s.io
EOF
```

## Add a service account to a Kubernetes Deployment Manifest

Now let's put it all together. The below configurations will create a new service account, a new role that has read/write, bind the role to the service account, and you can use the service account to create a Pod.

1. Create the service account
```
kubectl create sa podcreator
```

2. Create the read and write cluster role

```
kubectl create -f - <<EOF
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: podcreator
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["create", "get", "watch", "list"]
EOF
```

3. Bind the service account and the cluster role.
```
kubectl apply -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: create-pod-global
subjects:
- kind: ServiceAccount
  name: podcreator
  apiGroup: ""
roleRef:
  kind: ClusterRole
  name: podcreator
  apiGroup: rbac.authorization.k8s.io
EOF
```

4. Create a Pod with the Service Account associated.
```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginxpod
spec:
  containers:
  - image: nginx:latest
    name: nginxpod
  serviceAccountName: podcreator
  automountServiceAccountToken: false
EOF
```