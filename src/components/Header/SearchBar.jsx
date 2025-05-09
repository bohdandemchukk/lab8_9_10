import {useContext} from "react"
import {SearchContext} from "../../context/SearchContext.jsx"

export default function SearchBar() {

  const {searchValue, setSearchValue} = useContext(SearchContext);

  return (
    <input
      type="text"
      placeholder="Пошук фільмів"
      className="w-full h-13/20 mx-5 p-3 pl-5 mt-1 bg-zinc-900 border border-zinc-700 rounded-3xl text-white
    placeholder-gray-400 focus:outline-none focus:border-zinc-400 transition-all duration-300
    hover:border-zinc-500 hover:shadow-lg"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  )
}