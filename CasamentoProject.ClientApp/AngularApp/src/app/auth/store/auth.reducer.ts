import { createReducer, on } from '@ngrx/store';

import {
  authenticateFail,
  authenticateSucess,
  clearError,
  login,
  logout,
  setLoginActive,
  setSignUpActive,
  signUp,
} from './auth.actions';
import { UserAuthenticated } from '../user.authenticated.model';

export interface State {
  userAuthenticated: UserAuthenticated;
  authError: string;
  loading: boolean;
  formActive: string;
}

const initialState: State = {
  userAuthenticated: null,
  authError: null,
  loading: false,
  formActive: 'login-active',
};

export const authReducer = createReducer(
  initialState,
  on(authenticateSucess, (state, action) => {
    const user = action.user;
    return {
      ...state,
      authError: null,
      userAuthenticated: user,
      loading: false,
    };
  }),
  on(clearError, (state, action) => {
    return { ...state, authError: null };
  }),
  on(login, (state, action) => {
    return { ...state, authError: null, loading: true };
  }),
  on(signUp, (state, action) => {
    return { ...state, authError: null, loading: true };
  }),
  on(authenticateFail, (state, action) => {
    return {
      ...state,
      userAuthenticated: null,
      authError: action.error,
      loading: false,
    };
  }),
  on(setSignUpActive, (state, action) => {
    return {
      ...state,
      formActive: 'sign-up-active',
    };
  }),
  on(setLoginActive, (state, action) => {
    return {
      ...state,
      formActive: 'login-active',
    };
  }),
  on(logout, (state, action) => {
    return { ...state, userAuthenticated: null };
  })
);
