import styled from "styled-components";
import { Link } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";

const Card = ({
  id,
  title,
  overview,
  image,
  voteAverage,
  releaseDate,
  category,
}) => {
  return (
    <Link to={`/info/${category}/${id}`}>
      <CardStyled id={id}>
        {image ? (
          <Image
            src={`https://image.tmdb.org/t/p/w342/${image}`}
            loading={"lazy"}
            alt={title}
          />
        ) : (
          <Placeholder src={placeholder} loading={"lazy"} alt={title} />
        )}

        {
          <InfoContainer>
            {<Title>{title}</Title>}
            {<Date>{releaseDate}</Date>}
          </InfoContainer>
        }
        <VoteAverage average={voteAverage}>{voteAverage}</VoteAverage>
        {/* <Overview>{overview}</Overview> */}
      </CardStyled>
    </Link>
  );
};

const CardStyled = styled.div`
  width: 100%;
  height: 100%;
  @media (hover: none) {
    min-height: 350px;
  }
  border-radius: 0.5rem;
  text-align: center;
  /* box-shadow: 4px 4px 15px 1px #1f1e1e; */
  position: relative;
  transition: scale 0.4s ease;
  /* background-color: #181818; */
  /* padding: 0.2rem; */
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  @media (hover: hover) {
    background-color: #101010;

    @media (min-width: 700px) {
      height: 260px;

      :hover {
        flex-flow: row;

        width: 300px;
        z-index: 2;
        scale: 1.2;
        display: flex;
        translate: -50px;
      }
    }
  }
`;
const Image = styled.img`
  width: 100%;
  /* height:350px; */
  height: 100%;
  min-height: 230px;
  /* background-color: #a91212; */
  border-radius: 0.5rem;
  object-fit: fit;
`;

const Placeholder = styled.img`
  max-width: 160px;
  /* height:350px; */
  height: 100%;
  min-height: 230px;
  /* background-color: #a91212; */
  border-radius: 0.5rem;
  object-fit: fit;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.2rem;
  /* background-color: #100f0f; */

  @media (hover: hover) {
    /* background-color: green; */

    @media (min-width: 700px) {
      display: none;
      ${CardStyled}:hover & {
        display: block;
      }
    }
  }
`;

const Title = styled.h2`
  font-size: clamp(0.5rem, 5vw, 0.9rem);
  margin-top: 0.5rem;
  line-break: none;
  text-align: center;
  /* background-color: red; */
`;

const Date = styled.span`
  color: #e6e6e6;
  font-size: var(--fs-small);
`;

const Overview = styled.p``;
const VoteAverage = styled.span`
  width: 2.5rem;
  aspect-ratio: 1/1;
  position: absolute;
  left: -1rem;
  bottom: 0.5rem;
  background-color: ${({ average }) => {
    if (average < 5) {
      return "red";
    } else if (average > 5) {
      return "green";
    } else {
      return "gold";
    }
  }};
  border-radius: 50%;
  /* padding: 0.5rem; */
  color: black;
  font-weight: var(--fw-black);
  text-align: center;
  display: grid;
  place-content: center;
`;

export default Card;
