import MovieCard from "../MovieCard/MovieCard.jsx";
import {useLoaderData} from "react-router-dom";
import axios from "axios";
import {useContext} from "react"
import {SearchContext} from "../../context/SearchContext.jsx"


export async function movieLoader() {
  const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=uk-UA&page=1`;

  const response = await axios.get(url);
  return response.data.results;
}


export default function MovieList() {

  const {searchValue} = useContext(SearchContext)

  const movies = useLoaderData()

  const filteredMovies = searchValue
    ? movies.filter(movie => {
      const movieTitle = movie.title.toLowerCase();
      return [...searchValue.toLowerCase()].every(char => movieTitle.includes(char));
    })
    : movies;



  return (
    <div className= "flex flex-col items-center">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full p-4">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-white text-center p-8">
          Фільмів не знайдено. Спробуйте змінити критерії пошуку.
        </div>
      )}
    </div>
  );
}

