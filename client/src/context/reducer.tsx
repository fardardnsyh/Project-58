import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  SHOW_EDIT_FORM,
  UPDATE_JOB_BEGIN,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_ERROR,
} from './actions';

import { initialState } from './AppContext';

type StateType = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  showSidebar: boolean;
  editJob: boolean;
  editJobId: string;
};

type ActionType = {
  type: string;
  payload: string;
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case DISPLAY_ALERT:
      return { ...state, alertType: 'error', alertText: 'Please provide all values', showAlert: true };
    case CLEAR_ALERT:
      return { ...state, alertType: '', alertText: '', showAlert: false };
    case SETUP_USER_BEGIN:
      return { ...state, isLoading: true };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'User created successfully',
      };
    case SETUP_USER_ERROR:
      return { ...state, isLoading: false, showAlert: true, alertType: 'error', alertText: action.payload };
    case LOGIN_USER_BEGIN:
      return { ...state, isLoading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'User logged in successfully',
      };
    case LOGIN_USER_ERROR:
      return { ...state, isLoading: false, showAlert: true, alertType: 'error', alertText: action.payload };
    case UPDATE_USER_BEGIN:
      return { ...state, isLoading: true };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'User updated successfully',
      };
    case UPDATE_USER_ERROR:
      return { ...state, isLoading: false, showAlert: true, alertType: 'error', alertText: action.payload };
    case CREATE_JOB_BEGIN:
      return { ...state, isLoading: true };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Job created successfully',
      };
    case CREATE_JOB_ERROR:
      return { ...state, isLoading: false, showAlert: true, alertType: 'error', alertText: 'There was an error' };
    case UPDATE_JOB_BEGIN:
      return { ...state, isLoading: true };
    case UPDATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Job updated successfully',
      };
    case UPDATE_JOB_ERROR:
      return { ...state, isLoading: false, showAlert: true, alertType: 'error', alertText: 'There was an error' };
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case LOGOUT_USER:
      return { ...initialState };
    case SHOW_EDIT_FORM:
      return { ...state, editJob: true, editJobId: action.payload };
    default:
      return state;
  }
}

export default reducer;
