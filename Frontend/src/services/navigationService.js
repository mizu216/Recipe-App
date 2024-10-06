// NavigationService.js
import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function _navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function _goBack() {
  navigationRef.current?.goBack();
}

export function _reset(name) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: name}],
  });
}

export function _replace(name, params) {
  if (params) {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  } else {
    navigationRef.current?.dispatch(StackActions.replace(name));
  }
}

// add other navigation functions that you need and export them