import {useEffect, useState} from "react";
import dayjs from "dayjs";


export default function useDate(movie) {
  const [formattedDay, setFormattedDay] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [randomTime, setRandomTime] = useState("");

  useEffect(() => {

    const storedDay = localStorage.getItem(`day-${movie.id}`);
    const storedDate = localStorage.getItem(`date-${movie.id}`);
    const storedTime = localStorage.getItem(`time-${movie.id}`);

    if (storedDay && storedDate && storedTime) {
      setFormattedDay(storedDay);
      setFormattedDate(storedDate);
      setRandomTime(storedTime);
    } else {

      const movie_date = dayjs(movie.release_date).month(5).format("YYYY-MM-DD");
      const newDay = dayjs(movie_date).format("dddd");
      const newDate = dayjs(movie_date).format("D MMMM");

      const newHour = Math.floor(Math.random() * (22 - 10 + 1)) + 10;
      const newMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      const newTime = `${newHour}:${newMinute < 10 ? "0" + newMinute : newMinute}`;

      localStorage.setItem(`day-${movie.id}`, newDay);
      localStorage.setItem(`date-${movie.id}`, newDate);
      localStorage.setItem(`time-${movie.id}`, newTime);

      setFormattedDay(newDay);
      setFormattedDate(newDate);
      setRandomTime(newTime);
    }
  }, [movie.id, movie.release_date]);
  return {formattedDate, formattedDay, randomTime}
}