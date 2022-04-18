package main

import "fmt"

func main() {
	number1(2)
	double_number(5, 6)
}

func number1(num int) {
	fmt.Println(num)
}

func double_number(num1, num2 int) {
	fmt.Println(num1 + num2)
}
