package main

import (
	"fmt"
	"reflect"
)

var (
	name string
	clip int
)

func main() {
	fmt.Println(name)
	fmt.Println(clip)

	fmt.Println(reflect.TypeOf(name))
	fmt.Println(reflect.TypeOf(clip))
}
