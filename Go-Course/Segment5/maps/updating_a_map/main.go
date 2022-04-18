package main

import "fmt"

func main() {
	countwithme := map[string]int{
		"A": 1,
		"B": 2,
		"C": 3,
		"D": 4,
	}

	// Without Update
	fmt.Println(countwithme["C"])

	// With udpdate
	// countwithme["B"] = 100
	// fmt.Println(countwithme["B"])
}
