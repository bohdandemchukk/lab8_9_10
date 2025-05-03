import MovieCard from "./MovieCard.jsx";
import {useLoaderData} from "react-router-dom";
import axios from "axios";

import {useState} from "react"


export async function movieLoader() {
  const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=uk-UA&page=1`;

  const response = await axios.get(url);
  return response.data.results;
}

export default function MovieList() {

  const [searchValue, setSearchValue] = useState(null)
  const movies = useLoaderData()

  const filteredMovies = searchValue
    ? movies.filter(movie => {
      const movieTitle = movie.title.toLowerCase();
      return [...searchValue.toLowerCase()].every(char => movieTitle.includes(char));
    })
    : movies;



  return (
    <div className= "flex flex-col items-center">
      <input
        type="text"
        placeholder="Пошук фільмів"
        className="w-95/100 p-3 pl-5 mt-3 bg-zinc-900 border border-zinc-700 rounded-3xl text-white
    placeholder-gray-400 focus:outline-none focus:border-zinc-400 transition-all duration-300
    hover:border-zinc-500 hover:shadow-lg"

        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="grid grid-cols-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
          </div>
  );
}