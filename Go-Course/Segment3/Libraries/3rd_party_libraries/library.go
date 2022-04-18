// go get github.com/gorilla/mux

package main

import "github.com/gorilla/mux"

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", Home)
}

func Home() {

}
