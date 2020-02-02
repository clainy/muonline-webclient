import { USER_LOGOUT } from 'redux/types/actions';

// Types
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const userLogout: ActionCreator<ThunkAction<
  void,
  AppState,
  any,
  Action
>> = () => dispatch => {
  localStorage.nyxLogin = null;
  localStorage.nyxToken = null;

  dispatch({
    type: USER_LOGOUT
  });
};

export default userLogout;
