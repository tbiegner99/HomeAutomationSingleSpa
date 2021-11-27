import React from 'react';
import combineClasses from 'classnames';

import styles from './index.css';

const HeaderNavBar = (props) => {
  const { children, className } = props;
  const combinedClasses = combineClasses(styles.navBar, className);
  return (
    <div {...props} className={combinedClasses}>
      {children}
    </div>
  );
};

export default HeaderNavBar;
