import React from 'react';
import combineClasses from 'classnames';

export default (props) => {
  const classes = combineClasses(props.className);
  return (
    <div role="menu" className={classes}>
      {props.children}
    </div>
  );
};
