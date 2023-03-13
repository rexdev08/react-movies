import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyled>
      <Span>hecho por Raimundo Rincon</Span>
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  width: 100%;
  height: 3rem;
  /* min-height:100vh; */
  background-color: #1e1d1d;
  display: grid;
  align-items: center;
  text-align: center;
`;
const Span = styled.span`
  color: #fafafa;
`;

export default Footer;
