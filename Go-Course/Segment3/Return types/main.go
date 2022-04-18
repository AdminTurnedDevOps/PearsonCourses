package main

import "fmt"

func main() {
	name("Mike")
	// name(0)
}

func name(name string) string {
	fmt.Println(name)

	return name
	// return 0
}
