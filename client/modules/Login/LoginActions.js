import callApi from '../../util/apiCaller';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_RESET = 'LOGIN_RESET';

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data: data,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error: error,
  };
}

export function login(email, password) {
  return (dispatch) => {
    return callApi('auth/signin', 'post',
      {
        email: email,
        password: password,
      }
    )
    .then(res => dispatch(loginSuccess(res)))
    .catch(error => dispatch(loginFailed(error)));
  };
}

export function reset() {
  return {
    type: LOGIN_RESET,
  };
}
