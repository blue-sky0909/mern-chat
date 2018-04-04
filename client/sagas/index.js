/* eslint-disable */

import { all } from 'redux-saga/effects';

import workspace from './workspace';

export default function* rootSaga() {
  yield all([
    workspace()
  ]);
}
