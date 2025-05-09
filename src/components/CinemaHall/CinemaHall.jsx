import {useLoaderData} from "react-router-dom"
import axios from "axios";
import BookingForm from "../BookingForm/BookingForm.jsx";
import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion"


export async function cinemaLoader({ params }) {


  const { filmId } = params
  const totalSeats = 56;
  const newSeats = [];

  for (let i = 1; i <= totalSeats; i++) {
    newSeats.push({id: i, available: true, selected: false})
  }

  const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}&language=uk-UA`;
  const response = await axios.get(url)

  return {
    movie: response.data,
    seats: newSeats
  }
}


export default function CinemaHall() {

  const {movie, seats} = useLoaderData()

  const [selectedSeats, setSelectedSeats] = useState([])

  const [modalOpened, setModalOpened] = useState(false);


  useEffect(() => {
    const savedSeats = localStorage.getItem(`seats-${movie.id}`)
    if (savedSeats) {
      setSelectedSeats(JSON.parse(savedSeats))
    } else {
      setSelectedSeats(seats)
    }
  }, [movie.id, seats])


  function handleSeatClick(seatId) {

    const updatedSeats = selectedSeats.map(seat =>
      seat.id === seatId ?
      {...seat, selected: !seat.selected} :
        seat)

    setSelectedSeats(updatedSeats)
  }


  function handleButton() {
    if (selectedSeats.find(seat => seat.selected)) {
      setModalOpened(true)
    } else {
      alert("Будь ласка, оберіть місця")
    }
  }

  function confirmBooking() {

    const reservedSeats = selectedSeats.map(seat => seat.selected ? {...seat, available: false,
    selected: false} : seat)


    setSelectedSeats(reservedSeats)

    localStorage.setItem(`seats-${movie.id}`, JSON.stringify(reservedSeats))


  }


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-white flex flex-col items-center justify-center min-h-screen w-full p-4"
      >
      <div className="text-white flex flex-col items-center justify-center min-h-screen w-full p-4">
        <h1 className="text-2xl sm:text-3xl mb-3 text-center">{movie.title}</h1>
        <h2 className="text-lg sm:text-xl mb-4 text-center">Бронювання квитків</h2>

        <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-5">
          <div className="flex justify-center">
            <img
              className="w-40 sm:w-40 md:w-50 lg:w-60 rounded-lg border-solid border-zinc-800 border-1"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8
           gap-3 border-solid border-zinc-800 border-1 p-3 rounded-md w-100">
            {selectedSeats.map(seat => (
              <div
                className={`
                flex items-center justify-center cursor-pointer rounded-sm w-8 h-9
                bg-${seat.selected ? "blue-700" : seat.available ? "green-700" : "red-700"}
              `}
                onClick={() => handleSeatClick(seat.id)}
                key={seat.id}
              >
                {seat.id}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleButton}
          className="mt-6 bg-neutral-800 h-10 px-6 rounded-2xl text-blue-500 cursor-pointer
          hover:bg-blue-500 hover:text-white active:scale-95 transition-all duration-300"
        >
          Забронювати
        </button>
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

