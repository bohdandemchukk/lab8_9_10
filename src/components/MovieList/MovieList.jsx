import MovieCard from "../MovieCard/MovieCard.jsx";
import {useContext} from "react"
import {SearchContext} from "../../context/SearchContext.jsx"
import {useMovies} from "../../hooks/useMovies.js";
import {motion} from "framer-motion"

export default function MovieList() {

  const {searchValue} = useContext(SearchContext)

  const {data, isLoading, error} = useMovies()



  if (isLoading) {
    return <div className="text-white text-center p-8">Завантаження...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">Помилка при завантаженні фільмів.</div>;
  }

  const movies = data?.movies.results || [];

  const filteredMovies = searchValue
    ? movies.filter(movie => {
      const movieTitle = movie.title.toLowerCase();
      return [...searchValue.toLowerCase()].every(char => movieTitle.includes(char));
    })
    : movies;



  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-white flex flex-col items-center justify-center  w-full"
    >
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
    </motion.div>
  );
}

