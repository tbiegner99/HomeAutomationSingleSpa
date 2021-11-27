import React from 'react';
import combineClasses from 'classnames';
import styles from './menuItem.css';

const renderMenuIcon = (icon) => {
  if (icon === null || typeof icon === 'undefined') {
    return null;
  }
  return <div className={styles.icon}>{icon}</div>;
};

const MenuItem = (props) => {
  const { className, children, icon, selected, ...otherProps } = props;
  const combinedClasses = combineClasses(styles.menuItem, className, {
    [styles.selected]: selected
  });

  return (
    <section {...otherProps} className={combinedClasses}>
      {renderMenuIcon(icon)}
      <div>{children}</div>
    </section>
  );
};

export default MenuItem;
