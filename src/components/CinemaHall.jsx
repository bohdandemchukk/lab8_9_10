import {useLoaderData} from "react-router-dom"
import axios from "axios";
import BookingForm from "./BookingForm.jsx";
import {useState, useEffect} from "react";


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

  // const [modalOpened, setModalOpened] = useState(false);


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

  /*
  function handleButton() {
    if (selectedSeats.find(seat => seat.selected)) {
      setModalOpened(true)
    } else {
      alert("Будь ласка, оберіть місця")
    }
  } */

  function handleButton() {

    const reservedSeats = selectedSeats.map(seat => seat.selected ? {...seat, available: false,
    selected: false} : seat)


    setSelectedSeats(reservedSeats)

    localStorage.setItem(`seats-${movie.id}`, JSON.stringify(reservedSeats))


  }


  return (
    <>
      <div className="text-white flex flex-col items-center justify-center min-h-screen w-full p-4">
        <h1 className="text-2xl sm:text-3xl mb-3 text-center">{movie.title}</h1>
        <h2 className="text-lg sm:text-xl mb-4 text-center">Бронювання квитків</h2>

        <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-5">
          <div className="flex justify-center">
            <img
              className="w-40 sm:w-40 md:w-50 lg:w-60 rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-2">
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
    </>
  )
}

