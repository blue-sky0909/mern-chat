/* eslint-disable */

import { call, put, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
  createWorkspace,
  fetchWorkspace,
  CREATE_WORKSPACE_REQUEST,
  CREATE_WORKSPACE_SUCCESS,
  FETCH_WORKSPACE_REQUEST,
  FETCH_WORKSPACE_SUCCESS,
  FETCH_WORKSPACE_FAILED
} from '../../modules/Workspace/WorkspaceAction';
import { doneFetchMessages, messageAdded } from '../../actions/activity';

export function* watchCreateWorkspace() {
  yield addDummyMessage();
}

export function* watchFetchWorkspace() {
  yield takeEvery('FETCH_WORKSPACE_REQUEST', fetchWorkspace)
}

// export function* fetchWorkspace(action) {
//   try {
//     const data = yield call(Api.fetchUser, action.payload.url)
//     yield put({
//       type: "FETCH_WORKSPACE_SUCCESS",
//       data
//     })
//   } catch (error) {
//     yield put({
//       type: "FETCH_WORKSPACE_FAILED",
//       error
//     })
//   }
// }