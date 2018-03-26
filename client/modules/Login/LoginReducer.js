export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_RESET = 'LOGIN_RESET';

const initialState = {
    isLoaded: false,
    data: {},
    error: null
};

const loginReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoaded: true,
                data: action.data,

            });
        case LOGIN_FAILED:
            return Object.assign({}, state, {
                isLoaded: false,
                error: action.error,
            });
        case LOGIN_RESET:
            return Object.assign({}, state, {
                isLoaded: false,
                data: {},
                error: null
            });
        default:
            return state;
    }
};

export default loginReducer;
