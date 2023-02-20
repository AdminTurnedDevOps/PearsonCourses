## Deploy OPA Gatekeeper

1. Add the OPA Helm Chart
```
helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
```

2. Install the OPA Helm Chart
```
helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace gatekeeper-system --create-namespace
```

3. Confirm that all Kubernetes resources were deployed.
```
kubectl get all -n gatekeeper-system
```

## Implementing Kyverno policies

1. Install Kyverno on your Kubernetes cluster via Helm.
```
helm repo add kyverno https://kyverno.github.io/kyverno/

helm repo update

helm install kyverno kyverno/kyverno -n kyverno --create-namespace
```

2. Confirm that all of the resources are running.
```
kubectl get all -n kyverno
```

3. Create a new YAML file, call it `disallow.yaml`, and add in the following config.
```
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-latest-tag
  annotations:
    policies.kyverno.io/title: Disallow Latest Tag
    policies.kyverno.io/category: Best Practices
    policies.kyverno.io/severity: medium
    policies.kyverno.io/subject: Pod
    policies.kyverno.io/description: >-
      The ':latest' tag is mutable and can lead to unexpected errors if the
      image changes. A best practice is to use an immutable tag that maps to
      a specific version of an application Pod. This policy validates that the image
      specifies a tag and that it is not called `latest`.      
spec:
  validationFailureAction: audit
  background: true
  rules:
  - name: validate-image-tag
    match:
      resources:
        kinds:
        - Pod
        - Deployment
    validate:
      message: "Using a mutable image tag e.g. 'latest' is not allowed."
      pattern:
        spec:
          containers:
          - image: "!*:latest"
```

4. Run the following:
```
kubectl create -f Kyverno/disallow.yaml
```

5. Create a new YAML file called nginx.yaml and paste in the following configuration.
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginxdeployment
  replicas: 2
  template:
    metadata:
      labels:
        app: nginxdeployment
    spec:
      containers:
      - name: nginxdeployment
        image: nginx:latest
        ports:
        - containerPort: 80
```

You should see an output similiar to the below.

```
kubectl create -f nginx.yaml
Error from server: error when creating "nginx.yaml": admission webhook "validate.kyverno.svc-fail" denied the request: 

policy Deployment/default/nginx-deployment for resource violation: 

require-labels:
  autogen-check-for-labels: 'validation error: label ''app.kubernetes.io/name'' is
    required. rule autogen-check-for-labels failed at path /spec/template/metadata/labels/app.kubernetes.io/name/'
```