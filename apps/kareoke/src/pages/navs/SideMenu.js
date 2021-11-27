import React from 'react';
import { SlideInMenu, MenuItem } from '@tbiegner99/home-automation-components';
import { CloseIcon } from '../../icons/Icons';
import styles from './sideMenu.css';

const SideMenu = (props) => {
  const { open, onClose, children } = props;
  return (
    <SlideInMenu className={styles.sideMenu} open={open}>
      <div className={styles.content}>
        <MenuItem className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </MenuItem>
        {children}
      </div>
    </SlideInMenu>
  );
};

export default SideMenu;
