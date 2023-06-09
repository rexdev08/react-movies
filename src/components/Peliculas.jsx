import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Peliculas = () => {
  return (
    <>
      <Main>
        <h1>Peliculas</h1>
        <ButtonContainer>
          <Button to={"/peliculas"}>Popular 🔥</Button>
          <Button to={"/peliculas/top"}>Mejor evaluadas 🥇</Button>
          <Button to={"/peliculas/proximamente"}>Proximamente 🔜</Button>
        </ButtonContainer>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  margin-top: 3rem;
  display: grid;
  place-content: center;
  background-color: #000000;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
margin-top:1rem;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  /* background-color: red; */
  gap: 1rem;
`;

const Button = styled(NavLink)`
font-size: clamp(0.8rem, 4vw, 1rem);
  padding: clamp(0.2rem, 4vw, 0.5rem);
  /* background-color:red; */
  border-radius: 0.3rem;
  border: #a09e9eb3 solid;
  transition: scale 0.3s ease;
  :hover {
    scale: 1.1;
  }
`;

export default Peliculas;
