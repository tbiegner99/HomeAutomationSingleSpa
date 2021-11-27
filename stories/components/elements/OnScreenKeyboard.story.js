import React from 'react';
import { action } from '@storybook/addon-actions';
import OnScreenKeyboard from '../../../src/components/elements/OnScreenKeyboard';

export default { title: 'OnScreenKeyboard' };

export const basic = () => (
  <OnScreenKeyboard
    onKeyPress={action('Key typed')}
    onEnterPress={action('Enter Pressed')}
    onBackspacePress={action('BackspacePressed')}
  />
);
