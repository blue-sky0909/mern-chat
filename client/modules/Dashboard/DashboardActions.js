import callApi from '../../util/apiCaller';

export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED';


export function getMessagesSuccess(data) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    data: data,
  };
}

export function getMessagesFailed(error) {
  return {
    type: FETCH_MESSAGES_FAILED,
    error: error,
  };
}

export function getMessages(body) {
  return (dispatch) => {
    return callApi('message', 'post', body)
    .then(res => dispatch(getMessagesSuccess(res)))
    .catch(error => dispatch(getMessagesFailed(error)));
  };
}
