package main

import (
	"fmt"
	"reflect"
)

var (
	name = "Kubernetes"
	clip = 2
)

func main() {
	fmt.Println(name)
	fmt.Println(clip)

	fmt.Println(reflect.TypeOf(name))
	fmt.Println(reflect.TypeOf(clip))
}
