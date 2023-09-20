10 minutes

## Configuring OpenTelemetry

There are two options for OpenTelemetry

- Helm
- Via the Manifest

For all installations, cert-manager is required.

### Installing Cert Manager

```
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.10.1/cert-manager.yaml
```

### Installing OpenTelemetry

Helm:

```
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts

helm repo update

helm install opentelemetry-operator open-telemetry/opentelemetry-operator
```

Manifest:
```
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```