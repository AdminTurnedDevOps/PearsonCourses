// Package `main` indicates that the code is compiled as an application,
// not as a shared library. A shared library is something that you would
// important into your application
package main

import "fmt"

// If your code is for a shared library, it does not get a `main` function
func main() {
	fmt.Println("Hello World")
}
