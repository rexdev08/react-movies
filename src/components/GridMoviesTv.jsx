import { breakpoints } from "../../GlobalStyles";
import useFetchData from "../hooks/useFecthData";
import Card from "./Card";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const GridMoviesTv = ({ category, order }) => {
  const VisorRef = useRef(null);
  const [info, setPage, hasMore] = useFetchData(category, order);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entrie) => {
        if (entrie.isIntersecting) {
          if (hasMore) {
            setPage((page) => page + 1);
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
    <>
      <GridContainer>
        {info ? (
          info.map((item, index) => {
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
                key={id + `${index}`}
                id={id}
                image={poster_path}
                title={title || name}
                overview={overview}
                voteAverage={vote_average}
                releaseDate={release_date || first_air_date}
              />
            );
          })
        ) : (
          <h2>no hay</h2>
        )}
      </GridContainer>
      <Visor ref={VisorRef} />
    </>
  );
};

const GridContainer = styled.div`
  margin-top: 2rem;
  width: 95vw;
  /* max-width: ${breakpoints.xl}; */
  min-height: calc(100vh - 70px);
  background-color: #020202;
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
  height: 80px;
  /* background-color: blue; */
`;

export default GridMoviesTv;
