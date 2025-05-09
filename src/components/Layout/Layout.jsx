import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import {Outlet} from "react-router-dom"


export default function Layout() {

  return (
    <div className="flex flex-col">
      <Header/>
      <main className="pt-17 flex-grow">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}