15 minutes

## Build A Wasm-based Docker container image

If you don't have Docker installed, please google "install docker" and install via the proper method for your operating system

1. Use the binary from lab two: `main.wasm` (the Go app)

2. Create the following Dockerfile.
```
FROM scratch

COPY main.wasm .

CMD [ "/main.wasm" ]
```

3. Build the container image with Buildx.
```
docker buildx build --platform wasi/wasm -t gowasm .
```

5. Run the container with Wasmtime
```
docker run --rm --runtime=io.containerd.wasmtime.v1 --platform=wasi/wasm gowasm:latest
```

6. Run the container image with Wasmedge (it's another runtime). You may have to delete the running container from the previous section.

```
docker run --rm --runtime=io.containerd.wasmedge.v1 --platform=wasi/wasm gowasm:latest
```