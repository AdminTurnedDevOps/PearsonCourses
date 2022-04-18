package main

import "fmt"

func main() {
	sum := 0
	for {
		sum++ // repeated forever
		if sum == 1 {
			fmt.Println("Not Done")
			continue
			fmt.Println("Definitely not done")
		}
	}

	fmt.Println(sum)
}
