import { breakpoints } from "../../GlobalStyles";
import Card from "./Card";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  // const category = "movie";
  const VisorRef = useRef(null);
  const { search } = useParams();
  const [category, setCategory] = useState("movie");
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});
  const [results, setResults] = useState([]);

  const url = `
  https://api.themoviedb.org/3/search/${category}?api_key=${
    import.meta.env.VITE_API_KEY
  }&query=${search}&page=${page}`;

  const urlBase = `
  https://api.themoviedb.org/3/search/${category}?api_key=${
    import.meta.env.VITE_API_KEY
  }&query=${search}&page=1`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlBase);
        const data = await response.json();
        setInfo(data);
        setResults(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setInfo(data);
        setResults([...results, ...data.results]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entrie) => {
        if (info.page < 500 && info.page < info.total_pages) {
          if (entrie.isIntersecting) {
            setPage((page) => page + 1);
          }
        }
      });
    });

    if (VisorRef.current) {
      observer.observe(VisorRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [info]);

  if (results.length > 0) {
    return (
      <Main>
        <ButtonContainer>
          <Button onClick={() => setCategory("movie")}>Peliculas 🎬</Button>
          <Button onClick={() => setCategory("tv")}>TV 📺</Button>
        </ButtonContainer>
        <GridContainer>
          {results.map(
            ({
              id,
              title,
              poster_path,
              vote_average,
              overview,
              release_date,
              name,
              first_air_date,
            }) => (
              <Card
                category={category}
                key={id}
                id={id}
                image={poster_path}
                title={title || name}
                overview={overview}
                voteAverage={`${vote_average}`.slice(0, 3)}
                releaseDate={release_date || first_air_date}
              />
            )
          )}
        </GridContainer>
        <Visor ref={VisorRef} />
      </Main>
    );
  } else {
    return (
      <Main>
        <ButtonContainer>
          <Button onClick={() => setCategory("movie")}>Peliculas 🎬</Button>
          <Button onClick={() => setCategory("tv")}>TV 📺</Button>
        </ButtonContainer>
   
          <h1>sin resultados 😱</h1>
     
      </Main>
    );
  }
};

const ButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  /* background-color: red; */
  gap: 1rem;
`;

const Button = styled.button`
  font-size: clamp(0.8rem, 4vw, 1rem);
  padding: clamp(0.2rem, 4vw, 0.5rem);
  background-color: transparent;
  color: white;
  border-radius: 0.3rem;
  border: #a09e9eb3 solid;
  transition: scale 0.3s ease;

  font-weight: 600;
  :hover {
    scale: 1.1;
  }
  cursor: pointer;
`;

const Main = styled.main`
  /* margin-top:3rem; */
  min-height: calc(100vh - 3rem);
  display: grid;
  place-content: center;
  /* background-color: #ab0c0c; */
  padding: 1rem;
`;

const GridContainer = styled.div`
  margin-top: 1rem;
  width: 95vw;
  /* max-width: ${breakpoints.xl}; */
  min-height: calc(100vh - 3rem);
  /* background-color: #cc0d0d; */
  display: grid;
  justify-content: center;
  align-content: start;
  gap: 1rem;
  padding: 1rem;

  grid-template-columns: repeat(auto-fill, 200px);
  /* grid-template-rows: repeat(auto-fill, 350px); */

  @media (min-width: 700px) {
    width: 85vw;
    grid-template-columns: repeat(auto-fill, 185px);
  }

  
`;

const Visor = styled.div`
  width: 100%;
  height: 10px;
  /* background-color: blue; */
`;

export default Search;
