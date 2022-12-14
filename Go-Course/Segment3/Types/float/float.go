package main

import "fmt"

func main() {
	floatTest(1.2, 1.5)
}

func floatTest(fl, fl2 float32) {
	fmt.Println(fl + fl2)
}
