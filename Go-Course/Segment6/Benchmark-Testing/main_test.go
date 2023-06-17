package main

import (
	"log"
	"testing"
)

func BenchmarkAddition(b *testing.B) {
	if b == nil {
		log.Println("The testing package contains no values")
	}

	addition(4)

}
