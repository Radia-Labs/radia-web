import React, { useState } from 'react';
import MobileNav from './MobileNav';
import { StyledBurger } from './styles';
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const goToRoute = (route: string) => {
    navigate(route)
    setOpen(false)
  }
  
  return (
    <React.Fragment>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <MobileNav open={open} goToRoute={goToRoute}/>
    </React.Fragment>
  )
};

export default HamburgerMenu;