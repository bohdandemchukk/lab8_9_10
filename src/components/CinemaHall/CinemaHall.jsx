import {useParams} from "react-router-dom"
import BookingForm from "../BookingForm/BookingForm.jsx";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion"
import {useMovies} from "../../hooks/useMovies.js";
import {useSeats} from "../../hooks/useSeats.js"

export default function CinemaHall() {

  const [modalOpened, setModalOpened] = useState(false);

  const { filmId } = useParams()
  const filmIdNumber = Number(filmId)

  const {data, isLoading, error} = useMovies()
  const movie = data?.movies.results.find(movie => movie.id === filmIdNumber)

  const movieGenres = movie?.genre_ids ?
    movie.genre_ids.map(genre_id => data.genres.find(genre => genre.id === genre_id).name)
    : null

  const {seats, toggleSeat, bookSeats} = useSeats(filmId)

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (error || !movie) {
    return <div>Фільм не знайдено.</div>;
  }


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-white w-full"
      >
        <div className="flex flex-col items-center justify-center w-full">

          <div className="flex flex-col lg:flex-row w-full items-start justify-center gap-10">


            <div className="flex flex-col items-center lg:sticky lg:top-5">
              <div className="flex justify-center">
                <img
                  className="w-40 sm:w-40 md:w-50 lg:w-60 rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    boxShadow: "0 15px 40px -8px rgba(109, 129, 150, 0.1)",
                    border: "1px solid rgba(109,129,150, 0.3)"
                  }}
                />
              </div>

              <div className="mt-4 text-center w-full">
                <h2 className="text-xl font-bold text-white mb-1 max-w-full">{movie.title}</h2>
                <p className="text-sm text-zinc-400 mb-3">{movie.release_date ? movie.release_date.slice(0, 4) : null}</p>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-indigo-400">
                      <span className="text-indigo-400 font-bold">{Math.round(movie.vote_average * 10) / 10}</span>
                    </div>
                    <span className="text-xs text-zinc-400 ml-1">TMDB</span>
                  </div>

                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {movieGenres && movieGenres.map(genre => (
                    <span key={genre} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md">
                      {genre}
                    </span>
                  ))}
                </div>

              </div>

            </div>

            <div>
            <div className="text-left h-auto w-auto max-w-[300px] mt-3 border-t border-zinc-700 pt-3">
              <h3 className="text-zinc-300 text-sm font-medium mb-2">Опис:</h3>
              <p className="text-xs text-zinc-400">{movie.overview}</p>
            </div>

            <div className="mt-4 bg-zinc-800/50 rounded-lg p-3 w-full">
              <h3 className="text-sm font-medium text-zinc-300 mb-2">Інформація про сеанс</h3>
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Дата:</span>
                <span className="text-white">{movie.release_date}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Час:</span>
                <span className="text-white">19:30</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Зал:</span>
                <span className="text-white">2</span>
              </div>
            </div>
            </div>

            <div className="flex flex-col items-center bg-zinc-900/80 rounded-xl border border-zinc-700 shadow-xl py-5">
              <div className="w-full mb-6">
                <div className="w-7/10 h-2 bg-gradient-to-r from-indigo-300 to-slate-400 rounded-full mx-auto mb-5"></div>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-3 px-6 w-full">
                {seats.map(seat => (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                    flex items-center justify-center cursor-pointer rounded-md w-8 h-9 md:w-10 md:h-11
                    ${seat.selected ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30" :
                      seat.available ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" :
                        "bg-red-700 text-zinc-200 opacity-80"}
                    transition-all duration-200
                  `}
                    onClick={() => seat.available && toggleSeat(seat.id)}
                    key={seat.id}
                  >
                    {seat.id}
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-6 mt-5">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-zinc-800 rounded-sm"></div>
                  <span className="text-sm text-zinc-400">Вільно</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                  <span className="text-sm text-zinc-400">Обрано</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-700/70 rounded-sm"></div>
                  <span className="text-sm text-zinc-400">Зайнято</span>
                </div>
              </div>
              <button
                onClick={() => bookSeats(filmId)}
                className="mt-6 bg-neutral-800 h-10 px-6 rounded-2xl text-indigo-300 cursor-pointer
            hover:bg-slate-700 hover:text-indigo-200 active:scale-95 transition-all duration-300"
              >
                Забронювати
              </button>
            </div>
          </div>


        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpened && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center text-white z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpened(false)}
          >
            <motion.div
              className="bg-zinc-900 p-6 rounded-lg max-w-md w-full border-solid border-zinc-800 border-2 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpened(false)}
                className="absolute top-2 right-3 text-white text-xl hover:text-red-400 cursor-pointer"
              >
                &times;
              </button>

              <h2 className="text-xl font-bold mb-2">Оформлення квитків</h2>
              <h3 className="text-lg mb-2">{movie.title}</h3>
              <h4 className="mb-3">Обрані місця: </h4>
              <BookingForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}