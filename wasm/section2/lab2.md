10 minutes

## Build A Go app For Wasm

1. Create a new file called `main.go`

2. Add in the following code:
```
package main

import "fmt"

func main() {
	wasmTest()
}

func wasmTest() {
	fmt.Println("hello from the WASM beyond!")
}
```

3. Save the file.

4. Run the file locally to confirm it works. If you don't have Go installed, please google "install go" and you'll see a link to install Go for your OS.
```
go run main.go
```

5. Build the Go app with a Wasm architecture
```
GOOS=wasip1 GOARCH=wasm go build -o main.wasm main.go
```

6. Run the Go app.
```
wasmtime main.wasm
```

### Create A Component

Tinygo is doing the work of looking at the code and generating `WIT` based on what you use. The caveat is that it only does that for things that it understands (what's covered by WASI P2 interfaces)

## To Create A Component
```
tinygo build -o greeter.wasm --target=wasip2 main.go
```

## Validate Component
```
wasm-tools component wit greeter.wasm
```