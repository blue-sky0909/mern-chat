/* eslint-disable */

import { all, takeEvery } from 'redux-saga/effects';

import { CREATE_WORKSPACE_REQUEST, CREATE_WORKSPACE_SUCCESS, FETCH_WORKSPACE_REQUEST, FETCH_WORKSPACE_SUCCESS } from '../../modules/Workspace/WorkspaceAction';
import { createWorkspaceSaga, fetchWorkspaceSaga } from './sagas';

function* watchStartCreateWorkspace() {
  yield put({ type: 'CREATE_WORKSPACE_REQUEST' })
}

function* watchCreateWorkspace() {
  yield takeEvery(CREATE_WORKSPACE_SUCCESS, createWorkspaceSaga);
}

function* watchStartFetchWorkspace() {
  yield put({ type: 'FETCH_WORKSPACE_REQUEST' })
}

function* watchFetchWorkspace() {
  yield takeEvery(FETCH_WORKSPACE_SUCCESS, fetchWorkspaceSaga);
}

export default function* rootSaga() {
  yield all([
    watchStartCreateWorkspace(),
    watchCreateWorkspace(),
    watchStartFetchWorkspace(),
    watchFetchWorkspace()
  ]);
}
