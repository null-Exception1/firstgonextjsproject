package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type Movie struct {
	Name     string `json:"name"`
	Duration int    `json:"duration"`
	Rating   int    `json:"rating"`
}

var movies []Movie

func GetHandler(w http.ResponseWriter, res *http.Request) {
	fmt.Println("GET", movies)

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	str, _ := json.Marshal(movies)

	fmt.Fprintf(w, string(str))

}
func SetHandler(w http.ResponseWriter, res *http.Request) {
	queryParams := res.URL.Query()

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	name := queryParams.Get("name")
	duration, _ := strconv.Atoi(queryParams.Get("duration"))
	rating, _ := strconv.Atoi(queryParams.Get("rating"))

	toadd := Movie{name, duration, rating}
	//fmt.Println(movies)
	movies = append(movies, toadd)
	//fmt.Println(movies)
	fmt.Println("New add req", name, duration, rating)
	fmt.Fprintf(w, "true")
}
func main() {
	movies = make([]Movie, 0)

	http.HandleFunc("/get", GetHandler)
	http.HandleFunc("/add", SetHandler)

	http.ListenAndServe("localhost:8080", nil)
}
