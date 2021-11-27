import React from 'react';
import combineClasses from 'classnames';
import { Button } from '@tbiegner99/react-forms';
import Modal from '../elements/modal/Modal';
import styles from './promptDialog.css';
import { H1, H2, H3 } from '../elements/headers/Headers';

const PromptDialog = (props) => (
  <Modal className={combineClasses(props.className, styles.promptDialog)}>
    <header>
      <H2>{props.title}</H2>
    </header>
    <main>{props.prompt}</main>
    <footer>{props.children}</footer>
  </Modal>
);

export const Action = (props) => {
  const ButtonType = props.buttonType || Button;
  return (
    <ButtonType onClick={props.onAction} tooltip={props.tooltip}>
      {props.title}
    </ButtonType>
  );
};

export default PromptDialog;
