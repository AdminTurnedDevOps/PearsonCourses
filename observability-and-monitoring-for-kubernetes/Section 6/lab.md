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
helm repo add geek-cookbook https://geek-cookbook.github.io/charts/

helm install my-otel-collector geek-cookbook/otel-collector
```

Manifest:
```
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```