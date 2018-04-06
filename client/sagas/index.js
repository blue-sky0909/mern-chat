/* eslint-disable */

import { all } from 'redux-saga/effects';

import workspace from './workspace.saga';

export default function* rootSaga() {
  yield all([
    workspace()
  ]);
}
