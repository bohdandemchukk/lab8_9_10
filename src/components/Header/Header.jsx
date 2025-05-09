import SearchBar from "./SearchBar.jsx";
import {useNavigate, useLocation} from "react-router-dom"
import {useContext} from "react"
import {SearchContext} from "../../context/SearchContext.jsx";

export default function Header() {

  const {searchValue, setSearchValue} = useContext(SearchContext)
  const location = useLocation();
  const navigate = useNavigate();

  function logoClick() {
    if (location.pathname !== "/") {
      navigate("/")
    }

    if (searchValue) {
      setSearchValue("")
    }

  }

  return (
    <header className="flex fixed h-20 inset-0 bg-zinc-900
     border-solid border-zinc-800 border-1 z-50 w-full
     items-center justify-between px-5
     ">
      <img className="cursor-pointer h-18 hover:opacity-70 transition-opacity duration-300"
           src="/Multiplex_logo.svg.png"
           onClick={() => logoClick()}/>

      <SearchBar/>

      <section className="w-1/4 gap-5 flex items-center">
        <p className="text-white text-lg">Львів, Victoria Gardens</p>
        <a href = "https://maps.app.goo.gl/CLwyfJtepTaK5Wu27" target = "_blank">
          <i className="fa-sharp fa-solid fa-location-dot fa-2xl cursor-pointer hover:opacity-70
          transition-opacity duration-300"
             style={{color: "#ee1111"}}></i>
        </a>
      </section>

    </header>
  )
}