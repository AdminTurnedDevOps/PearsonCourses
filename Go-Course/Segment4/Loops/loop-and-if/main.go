package main

import "fmt"

func main() {
	test := "cheese"
	if test == "cheese" {
		for {
			fmt.Println("confirmed")
			// This is going to be infinite unless we use a break
			// break
		}
	}
}
