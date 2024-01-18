import { createReducer, on } from '@ngrx/store';

import {
  authenticateFail,
  authenticateSucess,
  clearAuthError,
  login,
  logout,
  refreshJWTToken,
  setLoginActive,
  setSignUpActive,
  signUp,
} from './auth.actions';
import { UserAuthenticated } from '../models/user.authenticated.model';
import { ErrorResponse } from '../../../shared/models/error-response.model';

export interface State {
  userAuthenticated: UserAuthenticated | null;
  authError: ErrorResponse | null;
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
  on(clearAuthError, (state, action) => {
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
  on(refreshJWTToken, (state, action) => {
    return {
      ...state,
      loading: true,
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
