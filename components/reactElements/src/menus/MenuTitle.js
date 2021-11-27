import React from 'react';
import combineClasses from 'classnames';
import styles from './menuItem.css';

const MenuTitle = (props) => {
  const { className } = props;
  const combinedClasses = combineClasses(styles.menuTitle, className);
  return <strong {...props} className={combinedClasses} />;
};

export default MenuTitle;
