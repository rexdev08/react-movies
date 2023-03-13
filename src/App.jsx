import { GlobalStyles } from "../GlobalStyles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Series from "./components/Series";
import Peliculas from "./components/Peliculas";
import PopularMovies from "./components/moviesCategorys/PopularMovies";
import TopMovies from "./components/moviesCategorys/TopMovies";
import UpcomingMovies from "./components/moviesCategorys/UpcomingMovies";
import PopularSeries from "./components/seriesCategorys/PopularSeries";
import TopSeries from "./components/seriesCategorys/TopSeries";
import OnAirSeries from "./components/seriesCategorys/OnAirSeries";
import Info from "./components/Info";
import Home from "./components/Home";
import Search from "./components/Search";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/info/:category/:id", element: <Info /> },
      { path: "/search/:search", element: <Search /> },
      {
        path: "/series",
        element: <Series />,
        children: [
          { path: "/series", element: <PopularSeries /> },
          { path: "/series/top", element: <TopSeries /> },
          { path: "/series/en-emision", element: <OnAirSeries /> },
        ],
      },
      {
        path: "/peliculas",
        element: <Peliculas />,
        children: [
          { path: "/peliculas", element: <PopularMovies /> },
          { path: "/peliculas/top", element: <TopMovies /> },
          { path: "/peliculas/proximamente", element: <UpcomingMovies /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
