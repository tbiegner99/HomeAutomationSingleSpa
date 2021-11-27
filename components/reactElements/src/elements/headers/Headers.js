import React from 'react';
import combineClasses from 'classnames';
import styles from './headers.css';

export const H1 = (props) => (
  <h1 className={combineClasses(props.className, styles.h1)}>{props.children}</h1>
);
export const H2 = (props) => (
  <h2 className={combineClasses(props.className, styles.h2)}>{props.children}</h2>
);
export const H3 = (props) => (
  <h3 className={combineClasses(props.className, styles.h3)}>{props.children}</h3>
);
export const H4 = (props) => (
  <h4 className={combineClasses(props.className, styles.h4)}>{props.children}</h4>
);
export const H5 = (props) => (
  <h5 className={combineClasses(props.className, styles.h5)}>{props.children}</h5>
);
export const H6 = (props) => (
  <h6 className={combineClasses(props.className, styles.h6)}>{props.children}</h6>
);
export const H7 = (props) => (
  <div className={combineClasses(props.className, styles.h7)}>{props.children}</div>
);
