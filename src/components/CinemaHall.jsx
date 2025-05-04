import {useLoaderData} from "react-router-dom"
import axios from "axios";

import {useState, useEffect} from "react";


export async function cinemaLoader({ params }) {

  const { filmId } = params
  const totalSeats = 56;
  const newSeats = [];

  console.log("loader:", filmId)

  for (let i = 1; i <= totalSeats; i++) {
    newSeats.push({id: i, available: true})
  }

  console.log(newSeats)

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
      {...seat, available: !seat.available} :
        seat)

    setSelectedSeats(updatedSeats)

    localStorage.setItem(`seats-${movie.id}`, JSON.stringify(updatedSeats))
  }

  console.log(useLoaderData())


  return (
    <div className="text-white flex flex-col items-center justify-center h-screen w-full">
      <h1 className = "text-3xl mb-3">{movie.title}</h1>
      <h2 className = "text-xl">Бронювання квитків</h2>
      <div className="mt-5 grid grid-cols-8">
        {selectedSeats.map(seat =>
          <div className =
                 {`flex bg-${seat.available === true ? "green-700" : "blue-600"} 
                  m-2 w-11 h-12 items-center
                  justify-center cursor-pointer rounded-sm`}
                onClick = {() => handleSeatClick(seat.id)}
                key = {seat.id}>
            {seat.id}
          </div>)
        }
      </div>
    </div>
  )


}

