export default function MovieCard({ movie }) {
  return (
    <div className="bg-gray-500 w-47 h-auto m-5">
      <img
        className="w-full"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="">
        <i className="fa-solid fa-star inline " style={{color: "#FFD43B"}}></i>
        <p className="inline mr-5">{movie.vote_average.toFixed(1)}</p>
        <p className="inline">{movie.vote_count}</p>
        <h3 className="">{movie.title}</h3>
        <p className="line-clamp-3">
          {movie.overview}
        </p>
        <p className="">Дата релізу: {movie.release_date}</p>
      </div>
    </div>
  );
}