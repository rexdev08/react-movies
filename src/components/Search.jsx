import { breakpoints } from "../../GlobalStyles";
import useFetchSearch from "../hooks/useFetchSearch";
import Card from "./Card";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  const category = "movie";
  const VisorRef = useRef(null);
  const { search } = useParams();
  // console.log(search);

  const [info, setPage, hasMore, setLoadMore] = useFetchSearch("movie", search);
  // console.log({info, hasMore})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entrie) => {
        if (hasMore) {
          if (entrie.isIntersecting) {
            // console.log(hasMore);
            setPage((page) => page + 1);
            setLoadMore((more) => !more);
          }
        }
      });
    });

    observer.observe(VisorRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  return (
    <Main>
      <GridContainer>
        {info ? (
          info.map((item) => {
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
