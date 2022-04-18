1. Create a Go file

A Go file always ends with a `.go` extension. To create a go file, you create a new file and just give it a name with a `.go` extension. For example, `main.go`.

One thing to keep in mind here is with your IDE or code editor, like VS Code, there are extensions available for syntax highlightning, color schemes, etc... VS Code has a Go extension.

Go install all of the Go tools in VS Code, on your keyboard, hit COMMAND + SHIFT + P and install the `Go: Install/Update tools`

When you're creating your first Go file, chances are it's going to be a `main.go` file. Think of the `main.go` file as the entry point. "you shall not pass... unless you have a main.go file". You can have other files, like `some_part_of_the_app.go`, but that's going to be a sub-file of sorts. Think of it as the `main.go` isn't mandatory, but it's a best practice.

The other files, like `some_part_of_the_app.go`, are Packages. Those Packages can be used throughout your Go application.

When you use `some_part_of_the_app.go` you don't need a `main.go` file itself, but a main package with a func main() is required for executables. When I say executables, I mean a, .EXE, .PKG, or to even just run the code/file.