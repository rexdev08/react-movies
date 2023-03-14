import { useEffect } from "react";
import styled from "styled-components";
import { breakpoints } from "../../GlobalStyles";
import useFetchData from "../hooks/useFecthData";
import Card from "../components/Card";
import hero from "../assets/hero.jpg";

const Home = () => {
  const category = { tv: "tv", movies: "movie" };

  const [infoMovies] = useFetchData(category.movies);
  const [infoTv] = useFetchData(category.tv);

  return (
    <>
      <Main>
        <Hero>
          <TextContainer>
            <H2>Bienvenidos.</H2>
            <H3>
              Millones de películas, programas de televisión y personas por
              descubrir. Explora ahora.
            </H3>
          </TextContainer>
        </Hero>

     

        <Section>
          <H2>Peliculas Populares</H2>
          <CardGrid>
            {infoMovies
              .slice(0, 6)
              .map(
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
                    category={category.movies}
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
          </CardGrid>
        </Section>
        <Section>
          <H2>Series Populares</H2>
          <CardGrid>
            {infoTv
              .slice(0, 6)
              .map(
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
                    category={category.tv}
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
          </CardGrid>
        </Section>
      </Main>
    </>
  );
};

const Main = styled.main`
  margin-top: 3rem;
  display: grid;
  /* place-content: center; */
  grid-template-columns: 1fr;
  background-color: #000000;
  /* padding: 1rem; */
`;

const Hero = styled.div`
  /* border:red solid; */
  width: 100%;
  height: 300px;

  /* height: 30vh; */
  object-fit: cover;
  background-image: url(${hero});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: grid;
  /* justify-content: center; */
  align-content: center;

  padding: 1rem;



  @media (min-width: 600px){
    height:400px;

  }
`;


const TextContainer = styled.div`
  max-width: ${breakpoints.xl};
`;
const H2 = styled.h2`
  font-size: clamp();
  padding:1rem;
`;
const H3 = styled.h3`
  font-size: clamp(0.9rem, 7vw, 2rem);
  font-weight: var(--fw-regular);
`;

const Section = styled.div`
  margin-top: 1rem;
  display: grid;
  place-content: center;
  /* background-color: #720909; */
`;

const CardGrid = styled.div`
  width: 95vw;
  /* max-width: ${breakpoints.xl}; */
  /* min-height: calc(100vh - 70px); */
  display: grid;
  justify-content: center;
  align-content: center;
  gap: 1rem;
  padding: 2rem;

  grid-template-columns: repeat(auto-fill, 200px);
  /* grid-template-rows: repeat(auto-fill, 350px); */

  @media (min-width: 700px) {
    width: 85vw;
    grid-template-columns: repeat(auto-fill, 185px);
  }
`;
export default Home;
