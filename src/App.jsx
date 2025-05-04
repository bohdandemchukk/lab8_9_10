import React from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import { movieLoader } from './components/MovieList.jsx';
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import { cinemaLoader } from "./components/CinemaHall.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: movieLoader
  },
  {
    path:"/booking/:filmId",
    element: <Booking/>,
    loader: cinemaLoader
  },
  {
    path:"/*",
    element: <Navigate to="/" replace/>
  }
]);

export default function App() {
  return (
    <RouterProvider
      router={router}
    />
  );
}
