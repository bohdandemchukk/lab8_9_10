import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import MovieList, { movieLoader } from './components/MovieList.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieList />,
    loader: movieLoader
  }
]);

export default function App() {
  return (
    <RouterProvider
      router={router}
    />
  );
}
