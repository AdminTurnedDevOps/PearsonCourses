15 minutes

## Deploy A Wasm Workload With Wash

1. Install Wash. Below is the Mac method, but if you don't have a Mac, google "wasmcloud install" and you should see an option for your operating system.
```
brew install wasmcloud/wasmcloud/wash
```

2. Check that it is installed properly.
```
wash --version
```

3. Use a Go template to build a new wasmCloud project.
```
wash new component gotesting --template-name hello-world-tinygo
```

4. `cd` into the new template directory.
```
cd gotesting
```

5. Start the project locally.
```
wash dev
```

6. Confirm that the project is running.
```
curl localhost:8000
```