package main

import "fmt"

var sayhi string = "hello world"

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
