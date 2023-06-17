package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAddition(t *testing.T) {
	x := 2
	y := 2

	assert.Equal(t, x, y, "x and y should be the same")
}
