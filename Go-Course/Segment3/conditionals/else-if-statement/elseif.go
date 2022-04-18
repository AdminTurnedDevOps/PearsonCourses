package main

import (
	"log"
)

func main() {
	ifstatement()
}

func ifstatement() {
	test := "Mike"

	if test != "Mike" {
		log.Fatalln("Its broken!")
	} else if test != "Tim" {
		log.Fatalln("its really broken")
	}
}
