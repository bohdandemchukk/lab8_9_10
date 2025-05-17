import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import {Outlet, useLocation} from "react-router-dom"


export default function Layout() {

  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className={`pt-${location.pathname === "/" ? "17" : "25"} flex-grow`}>
        <Outlet/>
      </main>
      {location.pathname === "/" && <Footer/>}
    </div>
  )
}