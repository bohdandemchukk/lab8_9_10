import React from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import Layout from "./components/Layout/Layout.jsx"
import SearchProvider from "./context/SearchContext.jsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, element: <Home/>},
      {
        path:"/booking/:filmId",
        element: <Booking/>
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
    <>
      <QueryClientProvider client={queryClient}>

          <SearchProvider>
            <RouterProvider router={router}/>
          </SearchProvider>
      </QueryClientProvider>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick theme = "dark" toastClassName="border border-zinc-700 rounded-xl shadow-xl"/>
    </>
  );
}
