import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TbWorld } from "react-icons/tb";
import { breakpoints } from "../../GlobalStyles";
import Card from "../components/Card";
import placeholder from "../assets/placeholder.jpg";

const Info = () => {
  const [loading, setLoading] = useState(true);
  // const [imageLoad, SetImageLoad] = useState(false);

  const [data, setData] = useState({});

  const { category, id } = useParams();
  // console.log({category},{id})
  const url = `
  https://api.themoviedb.org/3/${category}/${id}?api_key=0dc5a070f36e84311c0ff991acad3019&language=es-ES`;

  const urlVideos = `https://api.themoviedb.org/3/${category}/${id}/videos?api_key=0dc5a070f36e84311c0ff991acad3019&language=en-US`;

  const urlSimilar = `
  https://api.themoviedb.org/3/${category}/${id}/similar?api_key=0dc5a070f36e84311c0ff991acad3019&language=en-US&page=1`;

  const urlRecomendations = `
  https://api.themoviedb.org/3/${category}/${id}/recommendations?api_key=0dc5a070f36e84311c0ff991acad3019&language=en-US&page=1`;

  useEffect(() => {
    const petitions = [url, urlVideos, urlSimilar, urlRecomendations].map(
      (petition) => fetch(petition)
    );

    setLoading(true);
    const fetchData = async () => {
      await Promise.all(petitions).then((response) =>
        Promise.all(response.map((item) => item.json()))
          .then((data) => {
            setData({
              info: data[0],
              videos: data[1].results.slice(0, 3),
              similar: data[2].results,
              recomendations: data[3].results,
            });

            // console.log(data);
          })
          .catch((err) => console.log(err))
      );

      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading && <Modal />}
      {!loading && (
        <>
          <Main>
            <ImageContainer>
              {data.info.backdrop_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.info.backdrop_path}`}
                />
              ) : (
                <ImagePlaceholder src={placeholder} />
              )}

              {data.info?.homepage.length > 0 ? (
                <WebsiteIconContainer
                  href={data.info.homepage}
                  title={data.info.homepage}
                >
                  <WebsiteIcon />
                </WebsiteIconContainer>
              ) : null}
            </ImageContainer>

            <TextContainer>
              <Title>{data.info.title || data.info.name}</Title>
              {category !== "tv" ? (
                <Tagline>{data.info?.tagline}</Tagline>
              ) : (
                <Tagline>
                  {data.info.seasons?.length}
                  {data.info.seasons?.length > 1 ? " Temporadas" : " Temporada"}
                </Tagline>
              )}

              {data.info.genres.length > 0 && (
                <GenresList>
                  <Genre>
                    Genero: {""}
                    {data.info.genres.map((genre) => ` ${genre.name} | `)}
                  </Genre>
                </GenresList>
              )}

              <span>{data.info.release_date || data.info.first_air_date}</span>
            </TextContainer>
            {data.info?.overview.length > 0 && (
              <OverviewContainer>
                <Overview>{data.info.overview}</Overview>
              </OverviewContainer>
            )}

            {data.videos.length > 0 && (
              <ContainerVideos>
                {data.videos.map((video, index) => {
                  return (
                    <Iframe
                      //   width="560"
                      //   height="315"
                      src={`https://www.youtube.com/embed/${video.key}?`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      key={index}
                    ></Iframe>
                  );
                })}
              </ContainerVideos>
            )}
            {data.recomendations.length > 0 && (
              <Wrapper>
                <h2>Recomendaciones</h2>
                <CardGrid>
                  {data.recomendations
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
                </CardGrid>
              </Wrapper>
            )}

            {data.similar.length > 0 && (
              <Wrapper>
                <h2>Similares</h2>
                <CardGrid>
                  {data.similar
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
                </CardGrid>
              </Wrapper>
            )}
          </Main>
        </>
      )}
    </>
  );
};

const Modal = styled.div`
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: #100f10;
  position: fixed;
  top: 0;
  left: 0;
`;

const Main = styled.main`
  /* margin-top: 3rem; */
  min-height: calc(100vh - 3rem);
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ImagePlaceholder = styled.img`
  width: 100%;
  max-height: 80vh;
`;

const Image = styled.img`
  max-height: 80vh;
  object-fit: cover;
  object-position: top center;
`;

const WebsiteIconContainer = styled.a`
  /* background-color: red; */
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const WebsiteIcon = styled(TbWorld)`
  font-size: clamp(1rem, 10vw, 2.5rem);
`;

const TextContainer = styled.div`
  padding-inline: 1rem;
  /* background-color: red; */
`;

const Title = styled.h2``;

const Tagline = styled.h4``;
const GenresList = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Genre = styled.span`
  font-size: var(--fs-small);
`;

const OverviewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
`;

const Overview = styled.p`
  max-width: ${breakpoints.lg};
  /* background-color: #2624249c; */
  font-size: clamp(0.5rem, 4vw, 1rem);
  text-align: center;
  line-height: 1.2rem;
  padding: 1rem;
  /* border: solid pink; */
  border-radius: 0.5rem;

  @media (min-width: 700px) {
    font-size: clamp(0.9rem, 5vw, 1.3rem);
    line-height: 1.6rem;
  }
`;

const ContainerVideos = styled.div`
  margin-block: 2rem;
  /* min-height: 80vh; */
  /* min-height: 50vh; */
  background-color: #2a292988;
  display: flex;
  /* flex-flow: row wrap;
  justify-content: center;
  align-items: center; */
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(320px, 600px));
  grid-template-rows: repeat(auto-fill, auto);
  gap: 2rem;
  padding: 1rem;
`;

const Iframe = styled.iframe`
  width: 100%;
  /* height: 100%; */
  aspect-ratio: 16/9;
  /* width: 400px; */
  /* aspect-ratio: 2/1; */
  /* width:100%;
height:100%; */
  /* background-color:red; */
`;

const Wrapper = styled.div`
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
export default Info;
