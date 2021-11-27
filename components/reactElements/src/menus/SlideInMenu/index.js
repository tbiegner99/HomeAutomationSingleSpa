import React from 'react';
import combineClasses from 'classnames';
import styles from './index.css';

const SlideInMenu = (props) => {
  const { children, className, right, open } = props;
  const combinedClasses = combineClasses(styles.slideInMenu, className, {
    [styles.right]: right,
    [styles.left]: !right,
    [styles.open]: open
  });
  return (
    <div {...props} className={combinedClasses}>
      <menu className={styles.menuContainer}>{children}</menu>
    </div>
  );
};

export default SlideInMenu;
