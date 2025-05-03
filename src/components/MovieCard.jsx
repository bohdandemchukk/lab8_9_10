import dayjs from "dayjs";
import "dayjs/locale/uk";

dayjs.locale("uk");


export default function MovieCard({ movie }) {

  if (movie.title === "Викрадач коштовностей: Пограбування починається") {
    movie.title = "Викрадач коштовностей"
  }

  const formattedDay = dayjs(movie.release_date).format("dddd");
  const formattedDate = dayjs(movie.release_date).format("D MMMM");




  const randomHour = Math.floor(Math.random() * (22 - 10 + 1)) + 10;
  const randomMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  const randomTime = `${randomHour}:${randomMinute < 10 ? "0" + randomMinute : randomMinute}`;

  return (
    <div className="relative bg-zinc-900 w-50 h-125 m-5 rounded-lg overflow-hidden rounded-tl-none text-white
    border-solid border-zinc-800 border-1 hover:scale-105 transition-transform duration-300">
      <img
        className="w-full object-cover cursor-pointer hover:opacity-50 transition-opacity duration-300"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="flex flex-col mx-3 h-100%">
        <div className = "my-2 mt-3">
          <i className="fa-solid fa-star inline mr-1" style={{color: "#FFD43B"}}></i>
          <p className="inline mr-5 text-sm font-medium">{movie.vote_average.toFixed(1)}</p>
          <i className="fa-solid fa-user mr-1" style={{color: "#105589"}}></i>
          <p className="inline text-sm font-medium">{movie.vote_count}</p>
        </div>
        <h3 className="text-md h-5">{movie.title}</h3>

        <div className="flex flex-col justify-end flex-grow pt-9 ">
          <div className="flex items-center flex-col m-0 text-sm mb-2">
            <p>{formattedDay}, {randomTime}</p>
            <p>{formattedDate}</p>
          </div>

          <button className="bg-neutral-800 h-10 rounded-2xl text-blue-500 cursor-pointer
          hover:bg-blue-500 hover:text-white active:scale-95 transition-all duration-300">Забронювати</button>
        </div>


      </div>
    </div>
  );
}