import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import netflix from "../assets/netflix.png";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState(false);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== "") {
        navigate("/search" + "/" + search.replace(/\s/g, "-"));
        setSearch("");
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        setColor(true);
      } else {
        setColor(false);
      }
    });
  }, []);

  return (
    <>
      <Header navbarColor={color}>
        <FlexContainer>
          <Nav>
            <LogoContainer onClick={() => navigate("/")}>
              <Logo src={netflix} />
            </LogoContainer>
            <MenuBtn onClick={() => setShowMenu(!showMenu)} />

            <NavlinksContainer show={showMenu}>
              <CloseBtn onClick={() => setShowMenu(false)}>
                <IoCloseSharp />
              </CloseBtn>

              <A to={"/"} onClick={() => setShowMenu(false)}>
                Inicio
              </A>
              <A to={"/series"} onClick={() => setShowMenu(false)}>
                Series
              </A>
              <A to={"peliculas"} onClick={() => setShowMenu(false)}>
                Peliculas
              </A>
            </NavlinksContainer>
          </Nav>

          <SearchContainer
            onClick={(e) => e.currentTarget.children[1].select()}
          >
            <SerachIcon />
            <SearchInput
              autoComplete="off"
              type={"search"}
              placeholder="Explora por titulos"
              name={"search"}
              value={search}
              onChange={(e) => setSearch(e.target.value.toUpperCase())}
            />
          </SearchContainer>
        </FlexContainer>
      </Header>

      <TopButton onClick={() => window.scrollTo(0, 0)} show={color}>
        <BsFillArrowUpCircleFill />
      </TopButton>
    </>
  );
};

const Header = styled.header`
  width: 100%;
  height: 3rem;
  background-color: ${({ navbarColor }) =>
    navbarColor ? "#1F1F1F" : "transparent"};
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: grid;
  padding-inline: 1rem;
  transition: background-color 0.3s ease;

  @media (max-width: 650px) {
    padding-inline: 0.5rem;
  }
`;
const FlexContainer = styled.div`
  /* background-color: firebrick; */
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: grid;
  place-content: center;
  width: clamp(4rem, 12vw, 6rem);
  cursor: pointer;
`;

const Logo = styled.img`
  /* width:5rem; */
  width: 100%;
`;
const MenuBtn = styled(FaBars)`
  display: none;
  /* background-color: #0095ff; */
  width: clamp(0.8rem, 10vw, 1.3rem);
  height: 100%;
  /* border: none; */
  color: white;
  cursor: pointer;

  @media (max-width: 650px) {
    display: inline;
  }
`;
const Nav = styled.nav`
  width: 100%;
  height: 100%;
  /* border: red solid; */
  display: flex;
  gap: 1rem;

  @media (max-width: 650px) {
    gap: 0.6rem;
  }

  /* background-color: blue; */
`;

const NavlinksContainer = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 650px) {
    /* display: none; */
    width: 10rem;
    height: calc(100vh - 3rem);
    flex-flow: column;
    position: absolute;
    top: 3rem;
    left: 0;
    background-color: #161515;
    /* backdrop-filter: blur(0.5rem); */
    padding-top: 1rem;
    border-top: #ffffffc6 solid 1px;
    transition: translate 0.2s ease;
    translate: ${({ show }) => (show ? "0rem" : "-10rem")};
    gap: 0;
  }
`;

const CloseBtn = styled.button`
  /* width: 1.5rem;
  height: 1.5rem; */
  background-color: transparent;
  display: none;
  border: none;
  color: white;
  font-size: 1.7rem;
  position: absolute;
  top: 10px;
  right: 10px;
  @media (max-width: 650px) {
    display: block;
  }
`;

const A = styled(NavLink)`
  /* width: 5rem; */
  display: grid;
  place-content: center;
  /* padding: 0.2rem; */
  /* border-radius: 0.5rem; */
  color: #e9e9e9;
  transition: scale 0.3s ease;
  font-size: clamp(0.9rem, 4vw, 1rem);
  /* background-color: green; */
  :hover {
    scale: 1.1;
    color: #ffffff;
  }

  width: 100%;

  @media (max-width: 650px) {
    height: 4rem;
  }
`;

const SearchContainer = styled.div`
  /* background-color: saddlebrown; */
  display: flex;
  align-items: center;
  gap: 1rem;
  /* padding-inline: 0.5rem; */
  @media (max-width: 650px) {
    scale: 0.7;
    gap: 0.1rem;
  }
`;
const SerachIcon = styled(BsSearch)`
  /* background-color: white; */
  color: #ffffff;
  font-size: clamp(1rem, 7vw, 1.5rem);
`;
const SearchInput = styled.input`
  border-radius: 0.2rem;
  width: 0px;
  opacity: 0;
  transition: width 0.3s ease;
  :focus {
    width: 200px;
    opacity: 1;
    padding: 0.3rem;
    background-color: black;
    color: white;

    @media (max-width: 650px) {
      width: 160px;
    }
  }
`;

const TopButton = styled.button`
  display: ${({ show }) => (show ? "grid" : "none")};
  position: fixed;
  right: 10px;
  bottom: 40vh;
  z-index: 4;
  /* padding: 1rem; */
  border-radius: 50%;
  border: none;
  background-color: #80808079;
  color: #ffffffc2;
  font-size: 2rem;
  /* display: grid; */
`;
export default Navbar;
