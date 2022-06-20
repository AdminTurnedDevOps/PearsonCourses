package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Print("My current computer is... ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X")
	case "linux":
		fmt.Println("Linux")
	case "windows":
		fmt.Println("Windows")
	}
}
