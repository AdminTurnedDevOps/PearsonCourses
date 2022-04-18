package main

import "fmt"

func main() {

	strings := []string{"hello", "pearson"}
	for i, s := range strings {
		fmt.Println(i, s)
	}

	// numbers := []int{10, 12}
	// for a, b := range numbers {
	// 	fmt.Println(a, b)
	// }
}
