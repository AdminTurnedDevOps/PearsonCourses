so let’s say you run this:
```
GOOS=js GOARCH=wasm go build -o greeter.wasm greeter.go
```

That’s exporting a Wasm binary from a Go app called `greeter.wasm`, but what it’s doing is creating a Module, not a component.

Components bring all the same benefits of ordinary Wasm modules as the Component Model is built on top of the Core WebAssembly specification, but they are also interoperable and composable with other components.Interoperability means that components can communicate over strictly-defined interfaces

So if you need a Component version of that `greeter.wasm` which can talk to other apps (or the same app, but running somewhere else - like the same app running on AKS and in a VM somewhere), you need to create a Component. Now, the problem becomes "what language are you using and what tooling do you use". For example, with Go, you can use Tinygo.

Tinygo is doing the work of looking at the code and generating `WIT` based on what you use. The caveat is that it only does that for things that it understands (what's covered by WASI P2 interfaces).

tldr; Tinygo handles the WIT creation for you unless it’s an interface that Wasi2 wasn’t built with/doesn’t understand

Below is an example of creating a Component with Tinygo and Wasi2.

```
tinygo build -o greeter.wasm --target=wasip2 main.go
```

A WIT is then used to generate the imports/exports for the Component. The exports are “I want to ingest data from other components” or “I want to share data with other components”. This is what gives Wasm the cross-architecture piece (Wasm binary running in AKS and the same binary running in a VM, but they can communicate and send traffic back and forth)