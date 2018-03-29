export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED';

const initialState = {
    isLoaded: false,
    data: {},
    error: null
};

const dashboardReducer = function(state = initialState, action) {
    switch(action.type) {
        case FETCH_MESSAGES_SUCCESS:
            return Object.assign({}, state, {
                isLoaded: true,
                data: action.data,
            });

        case FETCH_MESSAGES_FAILED:
            return Object.assign({}, state, {
                isLoaded: false,
                error: action.error,
            });

        default:
            return state;
    }
};

export default dashboardReducer;
