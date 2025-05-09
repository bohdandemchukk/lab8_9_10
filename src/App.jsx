import React from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import { movieLoader } from './components/MovieList/MovieList.jsx';
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import { cinemaLoader } from "./components/CinemaHall/CinemaHall.jsx";
import Layout from "./components/Layout/Layout.jsx"
import SearchProvider from "./context/SearchContext.jsx"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, element: <Home/>, loader: movieLoader},
      {
        path:"/booking/:filmId",
        element: <Booking/>,
        loader: cinemaLoader
      }
    ]
  },
  {
    path:"/*",
    element: <Navigate to="/" replace/>
  }
]);

export default function App() {
  return (
    <SearchProvider>
      <RouterProvider router={router}/>
    </SearchProvider>
  );
}
