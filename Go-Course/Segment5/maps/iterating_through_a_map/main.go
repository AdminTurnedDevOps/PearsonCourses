package main

import "fmt"

func main() {
	countwithme := map[string]int{
		"A": 1,
		"B": 2,
		"C": 3,
		"D": 4,
	}

	for key, val := range countwithme {
		fmt.Printf("key here %v and value here %v\n", key, val)
	}
}
