import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h1>Pagina no encontrada, 404</h1>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 3rem);
  display:grid;
  place-content:center;
`;

export default ErrorPage;
