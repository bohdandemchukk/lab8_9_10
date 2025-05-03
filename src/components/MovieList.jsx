import MovieCard from "./MovieCard.jsx";
import {useLoaderData} from "react-router-dom";
import axios from "axios";


export async function movieLoader() {

  const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=uk-UA&page=1`;

  const response = await axios.get(url);
  return response.data.results;
}

export default function MovieList() {

  const movies = useLoaderData()


  return (
    <div className="grid grid-cols-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}