import React from 'react';
import styles from './menuHeader.css';
import WeatherStatus from '../weather/WeatherStatus';
import Sunrise from '../weather/Sunrise';
import CurrentTime from '../../components/elements/CurrentTime';
import { RefreshIcon } from '../../components/icons/Icons';
import { American } from '../../utils/Units';

const MenuHeader = (props) => (
  <div className={styles.menuHeader} onClick={props.onClick}>
    <RefreshIcon onClick={() => window.location.reload()} className={styles.refreshButton} />
    <CurrentTime format="dddd MMMM Do YYYY" />
    <div className={styles.status}>
      <WeatherStatus />
      <CurrentTime format="hh:mma" />
      <Sunrise units={American} />
    </div>
  </div>
);

export default MenuHeader;
