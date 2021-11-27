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

export const OpenDrawer = createIconComponent(fa['fa-chevron-down']);
export const CloseDrawer = createIconComponent(fa['fa-chevron-up']);
export const AddIcon = createIconComponent(fa['fa-plus']);
export const HomeIcon = createIconComponent(fa['fa-home']);
export const DeleteIcon = createIconComponent(fa['fa-trash']);
export const MusicIcon = createIconComponent(fa['fa-music']);
export const PlaylistIcon = createIconComponent(fa['fa-list']);
export const KareokeIcon = createIconComponent(fa['fa-microphone']);
export const MoveUpIcon = createIconComponent(fa['fa-caret-up']);
export const MoveDownIcon = createIconComponent(fa['fa-caret-down']);

export const ArrowIcon = createIconComponent(fa['fa-long-arrow-alt-up']);
export const CloseIcon = createIconComponent(fa['fa-times']);
