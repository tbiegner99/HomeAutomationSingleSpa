import React from 'react';
import combineClasses from 'classnames';
import styles from './modal.css';

class Modal extends React.Component {
  render() {
    const { className, modalClassName } = this.props;
    return (
      <div className={combineClasses(styles.modal, modalClassName)}>
        <div className={styles.modalBackdrop} />
        <div className={combineClasses(styles.modalWindow, className)}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
