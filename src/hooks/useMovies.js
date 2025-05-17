import axios from "axios";
import {useQuery} from '@tanstack/react-query';

const apiKey = import.meta.env.VITE_MOVIES_API_KEY;


export function useMovies() {
  return useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=uk-UA&page=1`)
      const genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=uk-UA`)
      console.log(response.data)
      return {
        movies: response.data,
        genres: genres.data.genres}
    },
    staleTime: 5 * 60 * 1000
  })
}





