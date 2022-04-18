package main

import (
	"fmt"
	"time"
)

func threetimes(from string) {
	for i := 0; i < 3; i++ {
		fmt.Println(from, ":", i)
	}
}

func main() {
	//  goroutines are all about concurrency and dealing with multiple things at the same time
	// not necessarily doing at the same time
	// so in order to print out "secondroutine" could take several more milliseconds than the others

	// Create a Goroutine by putting `go` in front of the function

	go threetimes("direct")

	go threetimes("secondgoroutine")

	go threetimes("goroutine")

	time.Sleep(time.Second)
}
