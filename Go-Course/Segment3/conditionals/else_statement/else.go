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
	} else if test != "Mike" {
		log.Fatalln("its really broken")
	} else {
		fmt.Println("Its not as big of a deal as I thought")
	}
}
