//import Counter from "./components/Counter.js";
import MovieList from "./components/MovieList.js";
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="flex font-mono text-3xl p-1 m-4">Movies</h1>
      <div className="flex justify-center items-center h-1/2 flex-col">
        <MovieList />
      </div>
    </div >
  );
}
