import callApi from '../../util/apiCaller';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_RESET = 'REGISTER_RESET';

export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    user: data
  }
}

export function registerFailed(error) {
  return {
    type: REGISTER_FAILED,
    error: error
  }
}

export function register(email, password, username) {
  return (dispatch) => {
    return callApi('auth/signup', 'post', {     
      email: email,
      password: password,
      username: username
    })
    .then(res => dispatch(registerSuccess(res)))
    .catch(error => dispatch(registerFailed(error)));
  };
}

export function reset() {
  return {
    type: REGISTER_RESET
  }
}