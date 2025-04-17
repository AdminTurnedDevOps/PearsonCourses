10 minutes

## Compile An Existing Rust App For Wasm

1. If you don't already have Rust installed, please google "download rust" and you'll see a link for the appropriate operating system you're on.

2. Create a new file called `myapp.rs`

3. Add the following code to the file:
```
fn main() {
    println!("Hello, world!");
}
```

4. Run the file to build the binary.
```
rustc myapp.rs
```

5. You'll now see an executable created in the directory. Run the following to execute the binary.
```
./myapp
```

6. Compile the binary
```
rustup target add wasm32-wasip1

rustc myapp.rs --target wasm32-wasip1
```

7. Run the binary
```
wasmtime myapp.wasm
```