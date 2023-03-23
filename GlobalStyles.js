import { createGlobalStyle } from "styled-components";

const theme = {
  dark: {
    colorPrimary: "#db0000",
    bgColor: "#1D1D1F",
    textColor: "#FAFAFA",
  },
  light: {
    colorPrimary: "#db0000",
    bgColor: "#FAFAFA",
    textColor: "#1D1D1F",
  },
};

const breakpoints = {
  //breakpoints
  xs: "320px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px",
};

const GlobalStyles = createGlobalStyle`



//variables css
:root{

  //colores
  --color-primary:#db0000;
  --color-secondary:#086ACD;
  --color-third:#0A68CB;
  --color-fourth:#29d8db;
  --color-fifth:#242E6D;

  --color-text: #7A7A7A;
  --color-text-black:#4A4A4A;
  

  //font-family
  --ff-primary:'Montserrat', sans-serif;
  --ff-body:var(--ff-primary);
  --ff-headeing:var(--ff-primary);
  
    //font-size
    --fs-small:.8125rem;//13px
    --fs-small-plus:0.9rem;//14px
    --fs-regular:1rem;//16px
    --fs-medium:1.2rem;//19.2
    --fs-large:1.875rem;//30px
    --fs-xl:2rem;//36px

  //font-weight
  
  --fw-small:300;
  --fw-regular:400;
  --fw-medium:500;
  --fw-bold:700;
  --fw-black:900;

  --fs-body:var(--fs-small);
  --fs-nav:var(--fs-regular);
  --fs-button:var(--fs-small);
  --fs-h1:clamp(1.2rem, 7vw, 3.8rem);
  --fs-h2:clamp(1.2rem, 10vw, 2.3rem);
  --fs-h3:clamp(1.1rem, 10vw, 2rem);
  --fs-h4:clamp(.5rem, 7vw, 1rem);

  //border-radius
  --br-50:.5rem;
  --br-100:1rem;

  //transitions

--ease:color .5s ease, background-color .2s ease;



}


//css reset
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: var(--ff-body);
}

html{
  scroll-behavior:smooth ;
}

//scroll-bar
::-webkit-scrollbar{
  background-color:#1D1D1F;
}

::-webkit-scrollbar-thumb{
  background-color:#db0000;
  border-radius:.5rem;
  :hover{
    background-color: #831010;
  }
}

::-webkit-scrollbar-track{
  background-color:inherit;
}


//body

body{
  /* background-color:#1D1D1F; */
  background-color:black;
  color:white;
}

//headings
h1{
  font-size:var(--fs-h1);
  font-weight:var(--fw-black);
}
h2{
  font-size:var(--fs-h2);
  font-weight:var(--fw-black);
}
h3{
  font-size:var(--fs-h3);
  font-weight:var(--fw-black);
}
h4{
  font-size:var(--fs-h4);
  font-weight:var(--fw-black);
}


a{
  font-size:var(--fs-medium);
  text-decoration: none;
  color:inherit;
}


img{
  width:100%;
  height:auto;
}

li{
  list-style:none;
}


`;

export { GlobalStyles, breakpoints, theme };
