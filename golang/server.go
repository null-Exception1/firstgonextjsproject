package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"
)

type Movie struct {
	Name     string `json:"name"`
	Duration int    `json:"duration"`
	Rating   int    `json:"rating"`
}

type Request struct {
	req_type int
	movie    Movie
	w        http.ResponseWriter
}

var movies []Movie
var ticker = time.NewTicker(200 * time.Millisecond)
var ratelimit chan time.Time
var queue chan time.Time

func GetHandler(w http.ResponseWriter, res *http.Request) {

	fmt.Println("[GET]", movies)
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	str, _ := json.Marshal(movies)
	fmt.Fprintf(w, "%s", string(str))
}
func SetHandler(w http.ResponseWriter, res *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	queryParams := res.URL.Query()
	name := queryParams.Get("name")
	duration, _ := strconv.Atoi(queryParams.Get("duration"))
	rating, _ := strconv.Atoi(queryParams.Get("rating"))

	toadd := Movie{name, duration, rating}

	movies = append(movies, toadd)

	fmt.Println("[ADD]", name, duration, rating)
	fmt.Fprintf(w, "true")
}
func RateLimit(handlerfunc http.HandlerFunc) http.HandlerFunc {
	//queue <- time.Now()
	return func(w http.ResponseWriter, res *http.Request) {
		select {
		case <-ratelimit: // wait for if a chance is in ratelimit or not (max 5)
			handlerfunc(w, res)
		default:
			fmt.Println("YO 2 many requests")
		}

	}
}
func Routine() {
	for range ticker.C {
		select {
		case ratelimit <- time.Now(): // try to give chance for a request to snap on ratelimit and take it
		default: // but only every tick and only if ratelimit isnt full
		}
	}
}

/*
-> the request reaches the ratelimit
-> routine delays ratelimit until there is room
*/
func main() {
	movies = make([]Movie, 0)
	ratelimit = make(chan time.Time, 5)
	go Routine()
	http.HandleFunc("/get", RateLimit(GetHandler))
	http.HandleFunc("/add", RateLimit(SetHandler))

	http.ListenAndServe("localhost:8080", nil)
}
