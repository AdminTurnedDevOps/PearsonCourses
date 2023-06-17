package main

import "fmt"

func main() {

	messages := make(chan string, 5)

	go func() { messages <- "ping" }()

	msg := <-messages
	fmt.Println(msg)
}
