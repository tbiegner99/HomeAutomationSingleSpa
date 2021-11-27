import React from 'react';
import combineClasses from 'classnames';
import styles from './list.css';

const List = (props) => (
  <section className={combineClasses(styles.list, props.className)}>{props.children}</section>
);
export default List;
