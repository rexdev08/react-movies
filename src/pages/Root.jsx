import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import styled from "styled-components";

const Root = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 3rem);
`;

export default Root;
