/* eslint-disable prefer-destructuring */
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Main from './menu/Main';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Main,
  errorBoundary(/* err, info, props */) {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
  }
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
