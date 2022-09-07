import React from 'react';
import {MobileNavUl, Button} from './styles';


type Props = {
    open: boolean;
    goToRoute: (route: string) => void;
}

const MobileNav = ({open, goToRoute}: Props) => {


  return (
    <MobileNavUl open={open}>
      <li>&nbsp;</li>
      <li onClick={() => goToRoute('/new-music')}>New Music</li>
      <li onClick={() => goToRoute('/collectibles')}>My Collectibles</li>
      <li><Button onClick={() => goToRoute('/')}>My Collection</Button></li>
    </MobileNavUl>
  )
}

export default MobileNav