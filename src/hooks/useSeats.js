import {useEffect, useState} from "react";
import useToast from "./useToast.js";



export function saveSeats(movieId, seats) {
  localStorage.setItem(`seats-${movieId}`, JSON.stringify(seats))
}

export function getSeats(movieId) {
  

  
  const savedSeats = localStorage.getItem(`seats-${movieId}`)
  if (savedSeats) {
    return JSON.parse(savedSeats)
  }

  else {

    const totalSeats = 56;
    const newSeats = [];

    for (let i = 1; i <= totalSeats; i++) {
      newSeats.push({id: i, available: true, selected: false});
    }
    saveSeats(movieId, newSeats)
    return newSeats;
  }
}

export function useSeats(movieId) {
  
  const {showErrorToast} = useToast();
  
  const [seats, setSeats] = useState([])

  const selectedSeats = seats.filter(seat => seat.selected)

  useEffect(() => {
    const movieSeats = getSeats(movieId);
    setSeats(movieSeats)
  }, [movieId])

  function toggleSeat(seatId) {
    const updatedSeats = seats.map(seat =>
      seat.id === seatId ? {...seat, selected: !seat.selected}
        : seat)
    setSeats(updatedSeats)
  }

  function handleForm(setModalOpened) {
    if (selectedSeats.length > 0) {
      console.log(selectedSeats)
      setModalOpened(true)
    } else {
      showErrorToast("Будь ласка, оберіть бажані місця")
    }
  }

  function bookSeats(movieId) {
    const bookedSeats = seats.map(seat => seat.selected ? {...seat, available: false, selected: false} : seat)
    setSeats(bookedSeats)
    saveSeats(movieId, bookedSeats)
  }

  return { seats, selectedSeats, toggleSeat, bookSeats, handleForm }
}