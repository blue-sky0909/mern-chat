/* eslint-disable */

import {
    all,
    takeEvery,
    call,
    put,
    take,
    fork
} from 'redux-saga/effects';
import {
    CREATE_WORKSPACE_SUCCESS,
    CREATE_WORKSPACE_FAILED,
    CREATE_WORKSPACE_REQUEST,
    FETCH_WORKSPACE_REQUEST,
    FETCH_WORKSPACE_SUCCESS,
    FETCH_WORKSPACE_FAILED
} from '../modules/Workspace/WorkspaceAction';
import {
	getWorkspaceSuccess,
	getWorkspaceFailed,
	createWorkspaceSuccess,
	createWorkspaceFailed,
	createWorkspaceRequest
} from '../modules/Workspace/WorkspaceAction'
import apiCaller from '../util/apiCaller';

function* getWorkspaceList() {
    try {
        const response = yield call(apiCaller, 'workspace/get', 'get');
        yield put(getWorkspaceSuccess(response.workspaces))
    } catch (err) {
        yield put(getWorkspaceFailed(err))
    }
}

function* createWorkspaceReqeset(data) {
	console.log("dsata=======>",data)
	yield put(createWorkspaceRequest(data))    
}

function* createWorkspace(data) {
	console.log("dsata=======>",data)
    try {
        const response = yield call(apiCaller, 'workspace/create', 'post', data.data);
        yield put(createWorkspaceSuccess(response))
    } catch (err) {
        yield put(createWorkspaceFailed(err))
    }
}

export default function* rootSaga() {
    yield takeEvery(FETCH_WORKSPACE_REQUEST, getWorkspaceList)
    yield takeEvery(CREATE_WORKSPACE_REQUEST, createWorkspace)
}
