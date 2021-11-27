import React from 'react';
import PropTypes from 'prop-types';
import PromptDialog, { Action } from './PromptDialog';

const ConfirmDialog = (props) => (
  <PromptDialog title={props.title} prompt={props.prompt}>
    <Action title={props.confirmText} onAction={props.onConfirm} />
    <Action title={props.cancelText} onAction={props.onCancel} />
  </PromptDialog>
);

ConfirmDialog.propTypes = {
  title: PropTypes.node,
  confirmText: PropTypes.node,
  cancelText: PropTypes.node,
  prompt: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

ConfirmDialog.defaultProps = {
  title: 'Confirm',
  confirmText: 'OK',
  cancelText: 'Cancel'
};

export default ConfirmDialog;
