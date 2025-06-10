import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/action';
import { showSuccess, showError } from '../../utils/toast';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
};

function setAuthActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  };
}

function unsetAuthActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null
    }
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      showSuccess('berhasil mendaftar silahkan login');
    } catch (error) {
      showError(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthActionCreator(authUser));
    } catch (error) {
      console.error(error);
      showError(error.message);
      dispatch(unsetAuthActionCreator());
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(unsetAuthActionCreator());
    api.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthActionCreator,
  unsetAuthActionCreator,
  asyncRegisterUser,
  asyncSetAuthUser,
  asyncUnsetAuthUser
};