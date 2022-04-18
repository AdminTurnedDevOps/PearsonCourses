package main

import "fmt"

func main() {

	type car struct {
		make     string
		model    string
		color    string
		quantity int
	}

	// You can initialize your Struct in a few ways
	// var iWantanR8 car
	// iWantanR8 := new(car)

	iWantAnR8 := car{
		make:     "Audi",
		model:    "R8",
		color:    "blue",
		quantity: 1,
	}

	fmt.Println(iWantAnR8.make)
	fmt.Println("just kidding. I want a....")

	iWantAnR8.make = "lambo"
	fmt.Println(iWantAnR8.make)
}
