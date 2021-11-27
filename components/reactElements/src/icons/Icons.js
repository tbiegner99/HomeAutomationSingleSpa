import React from 'react';
import combineClasses from 'classnames';
import fa from '@fortawesome/fontawesome-free/css/all.css';
import far from '@fortawesome/fontawesome-free/css/regular.css';

const createIcon = (cssClass, ...otherClasses) => (props) => {
  const { className, ...otherProps } = props;
  const combinedClasses = combineClasses(cssClass, className, ...otherClasses);
  return <i className={combinedClasses} {...otherProps} />;
};
export const createIconComponent = (...classes) => createIcon(fa.fa, ...classes);

export const createRegularIconComponent = (...classes) => createIconComponent(far.far, ...classes);

export const DeleteIcon = createIconComponent(fa['fa-trash']);
export const MoveUpIcon = createIconComponent(fa['fa-caret-up']);
export const MoveDownIcon = createIconComponent(fa['fa-caret-down']);
