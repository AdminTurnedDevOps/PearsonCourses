package main

import (
	"fmt"
	"log"
)

func main() {
	ifstatement()
}

func ifstatement() {
	test := "Mike"

	if test != "Mike" {
		log.Fatalln("Its broken!")
	}

	if test == "Mike" {
		fmt.Println("Hurray!")
	}
}
