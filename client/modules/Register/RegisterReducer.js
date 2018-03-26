export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const REGISTER_RESET = 'REGISTER_RESET'

const initialState = {
    isLoaded: false,
    data: {},
    error: null
}
const regiterReducer = function(state = initialState, action) {
    switch(action.type) {
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isLoaded: true,
                data: action.user

            })
        case REGISTER_FAILED:
            return Object.assign({}, state, {
                isLoaded: false,
                error: action.error
            })
        case REGISTER_RESET:
            return Object.assign({}, state, {
                isLoaded: false,
                data: {},
                error: null
            })
        default:
            return state
    }
}

export default regiterReducer