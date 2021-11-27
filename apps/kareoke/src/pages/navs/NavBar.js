import React from 'react';
import { MenuTitle, MenuItem, HeaderNav } from '@tbiegner99/home-automation-components';
import Branding from './Branding';

import { PlaylistIcon, HomeIcon } from '../../icons/Icons';

const renderUserMenu = (props) => (
  <MenuItem onClick={props.onHamburgerClick}>
    <MenuTitle>
      <PlaylistIcon />
    </MenuTitle>
  </MenuItem>
);

const NavBar = (props) => (
  <HeaderNav>
    {renderUserMenu(props)}

    <Branding />
    <HomeIcon onClick={props.onHomeClick} />
  </HeaderNav>
);

export default NavBar;
