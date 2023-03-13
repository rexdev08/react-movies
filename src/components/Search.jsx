import { breakpoints } from "../../GlobalStyles";
import Card from "./Card";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  const category = "movie";
  const VisorRef = useRef(null);
  const { search } = useParams();
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});
  const [results, setResults] = useState([]);

  const key = "0dc5a070f36e84311c0ff991acad3019";

  const url = `
  https://api.themoviedb.org/3/search/${category}?api_key=${key}&query=${search}&page=${page}`;

  const urlBase = `
  https://api.themoviedb.org/3/search/${category}?api_key=${key}&query=${search}&page=1`;

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
  }, [search]);

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

    observer.observe(VisorRef.current);

    return () => {
      observer.disconnect();
    };
  }, [info]);

  return (
    <Main>
      <GridContainer>
        {results ? (
          results.map((item) => {
            const {
              id,
              title,
              poster_path,
              vote_average,
              overview,
              release_date,
              name,
              first_air_date,
            } = item;
            return (
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
            );
          })
        ) : (
          <h2>no hay</h2>
        )}
      </GridContainer>
      <Visor ref={VisorRef} />
    </Main>
  );
};

const Main = styled.main`
  margin-top: 3rem;
  display: grid;
  place-content: center;
  background-color: #000000;
  padding: 1rem;
`;

const GridContainer = styled.div`
  margin-top: 3rem;
  width: 95vw;
  /* max-width: ${breakpoints.xl}; */
  min-height: calc(100vh - 3rem);
  /* background-color: #cc0d0d; */
  display: grid;
  justify-content: center;
  align-content: center;
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
