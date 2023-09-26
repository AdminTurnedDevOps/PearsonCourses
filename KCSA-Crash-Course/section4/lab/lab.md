10 minutes

## Detecting Compromised Applications

1. To show an overview of the health of a container image.

```
docker scout quickview nginx:latest
```

2. To show a more in-depth view of the container image.
```
docker scout cves nginx:latest
```

3. To show recommendations from a security and compliance perspective when using a particular container image

```
docker scout recommendations nginx:latest
```