# Build An Underlying Platform (Security)

15 minutes

## Implementing OPA

1. Add the OPA Helm Chart
```
helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
```

2. Install the OPA Helm Chart
```
helm install gatekeeper/gatekeeper --name-template=gatekeeper --namespace gatekeeper-system --create-namespace
```

OR

```
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/master/deploy/gatekeeper.yaml
```

3. Confirm that all Kubernetes resources were deployed.
```
kubectl get all -n gatekeeper-system
```

1. The config is your definition of what Gatekeeper is allowed to create policies for. For example, in the config.yaml below, Gatekeeper knows that it can only specify Policies for Pods, but no other Kubernetes resources.

```
kubectl create -f - <<EOF
apiVersion: config.gatekeeper.sh/v1alpha1
kind: Config
metadata:
  name: config
  namespace: "gatekeeper-system"
spec:
  sync:
    syncOnly:
      - group: ""
        version: "v1"
        kind: "Pod"
EOF
```

2. The Constraint Template is the rule/policy that you want to configure for your environment. It's a template, so you can use it across multiple constraints.

For example, there's a Rego policy in the constraint template in this directory that ensures no one can utilize the latest tag of a container image.

```
kubectl create -f - <<EOF
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: blocklatesttag
  annotations:
    description: Blocks container images from using the latest tag
spec:
  crd:
    spec:
      names:
        kind: blocklatesttag # this must be the same name as the name on metadata.name (line 4)
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package blocklatesttag
        violation[{"msg": msg, "details": {}}]{
        input.review.object.kind == "Pod"
        imagename := input.review.object.spec.containers[_].image
        endswith(imagename,"latest")
        msg := "Images with tag the tag \"latest\" is not allowed"
        }
EOF
```

3. The constraint itself is taking the template that you created above and bringing it to life. It allows you to utilize the template to create your own policy inside of a Kubernetes cluster.

```
kubectl create -f - <<EOF
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: blocklatesttag
metadata:
  name: nolatestcontainerimage
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
  parameters:
    annotation: "no-latest-tag-used"
EOF
```

4. To confirm that the OPA policy that you implemented works, you can test it out with the two Kubernetes Manifests below.

The Manifest with the latest tag won’t work because you created a policy in the previous step to ensure that latest tags cannot be used. The deployment itself will deploy, but the Pods won’t come online.

Try running the below.

```
kubectl create -f - <<EOF
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
EOF
```

5. Wait a few minutes and when you see that it doesn't come online, delete it.
```
kubectl delete deployment nginx-deployment
```

6. The Manifest below will work and the Pods will come online because a container image version number is specified.
```
kubectl create -f - <<EOF
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
        image: nginx:1.23.1
        ports:
        - containerPort: 80
EOF
```


## Implementing Kyverno

1. Install Kyverno on your Kubernetes cluster.
```
kubectl create -f https://raw.githubusercontent.com/kyverno/kyverno/main/config/install.yaml
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


## Implementing Kube-Bench

Kube-Bench is a tool that you can use for security scanning of clusters. It utilizes CIS Benchmarks, so the repeatability aspect for you is available.

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