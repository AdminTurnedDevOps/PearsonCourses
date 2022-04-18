package main

import "fmt"

var sayhi = "hello world"

func main() {
	testing()
	testing2()
}

func testing() {
	fmt.Println(sayhi)
}

func testing2() {
	fmt.Println(sayhi + " again")
}
