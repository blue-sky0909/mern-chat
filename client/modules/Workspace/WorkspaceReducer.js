export const CREATE_WORKSPACE_SUCCESS = 'CREATE_WORKSPACE_SUCCESS';
export const CREATE_WORKSPACE_FAILED = 'CREATE_WORKSPACE_FAILED';
export const CREATE_WORKSPACE_REQUEST = 'CREATE_WORKSPACE_REQUEST';
export const FETCH_WORKSPACE_SUCCESS = 'FETCH_WORKSPACE_SUCCESS';
export const FETCH_WORKSPACE_FAILED = 'FETCH_WORKSPACE_FAILED';
export const FETCH_WORKSPACE_REQUEST = 'FETCH_WORKSPACE_REQUEST';

const initialState = {
    isLoaded: false,
    data: {},
    error: null,
    workspaces: []
};

const workspaceReducer = function(state = initialState, action) {
    switch(action.type) {
        case CREATE_WORKSPACE_SUCCESS:
            return Object.assign({}, state, {
                isLoaded: true,
                data: action.data,

            });
        case CREATE_WORKSPACE_FAILED:
            return Object.assign({}, state, {
                isLoaded: true,
                error: action.error,
            });
        case CREATE_WORKSPACE_REQUEST:
            return Object.assign({}, state, {
                isLoaded: false,
                data: {},
                error: null
            });
        case FETCH_WORKSPACE_SUCCESS:
            return Object.assign({}, state, {
                isLoaded: true,
                workspaces: action.data,

            });
        case FETCH_WORKSPACE_FAILED:
            return Object.assign({}, state, {
                isLoaded: true,
                error: action.error,
            });
        case FETCH_WORKSPACE_REQUEST:
            return Object.assign({}, state, {
                isLoaded: false,
                workspaces: [],
                error: null
            });
        default:
            return state;
    }
};

export default workspaceReducer;