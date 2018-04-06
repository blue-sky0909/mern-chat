import callApi from '../../util/apiCaller';

export const CREATE_WORKSPACE_SUCCESS = 'CREATE_WORKSPACE_SUCCESS';
export const CREATE_WORKSPACE_FAILED = 'CREATE_WORKSPACE_FAILED';
export const CREATE_WORKSPACE_REQUEST = 'CREATE_WORKSPACE_REQUEST';
export const FETCH_WORKSPACE_SUCCESS = 'FETCH_WORKSPACE_SUCCESS';
export const FETCH_WORKSPACE_FAILED = 'FETCH_WORKSPACE_FAILED';
export const FETCH_WORKSPACE_REQUEST = 'FETCH_WORKSPACE_REQUEST';

export function createWorkspaceSuccess(data) {
  return {
    type: CREATE_WORKSPACE_SUCCESS,
    data: data,
  };
}

export function createWorkspaceFailed(error) {
  return {
    type: CREATE_WORKSPACE_FAILED,
    error: error,
  };
}

export function createWorkspaceRequest() {
  return {
    type: CREATE_WORKSPACE_REQUEST,
  };
}

export function getWorkspaceRequest() {
  return {
    type: FETCH_WORKSPACE_REQUEST,
  };
}

export function getWorkspaceSuccess(data) {
  return {
    type: FETCH_WORKSPACE_SUCCESS,
    data: data,
  };
}

export function getWorkspaceFailed(error) {
  return {
    type: FETCH_WORKSPACE_FAILED,
    error: error,
  };
}